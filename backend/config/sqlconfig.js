import pg from 'pg';

const { Pool } = pg;

let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    pool.on('error', (err) => console.error('PG pool error:', err.message));
  }
  return pool;
}

// ─── MySQL → PostgreSQL query converter ───────────────────────────────────────
function convertQuery(sql, params) {
  let pgSql = sql
    // Strip MySQL schema prefix from table names
    .replace(/\bcrm_db\./g, '')

    // MySQL LAST_INSERT_ID() → PostgreSQL lastval()
    .replace(/\bLAST_INSERT_ID\s*\(\s*\)/gi, 'lastval()')

    // Strip backtick identifiers
    .replace(/`/g, '')

    // MySQL IF(cond, true_val, false_val) → CASE WHEN cond THEN true_val ELSE false_val END
    .replace(/\bIF\s*\(([^,]+),\s*([^,]+),\s*([^)]+)\)/gi,
      (_, cond, tv, fv) => `CASE WHEN ${cond.trim()} THEN ${tv.trim()} ELSE ${fv.trim()} END`)

    // SUM(expr = val)  /  SUM(expr IN (...))  /  SUM(expr = val AND expr2 = val2)
    // → SUM(CASE WHEN expr = val THEN 1 ELSE 0 END)
    // We detect SUM(…) where the argument contains a comparison operator but NOT
    // an aggregate or subquery (simple heuristic: no nested parens with SELECT)
    .replace(/\bSUM\(([^()]*(?:=|<>|!=|<=|>=|<(?!<)|(?<!>)>|\bIN\b|\bAND\b|\bOR\b)[^()]*)\)/gi,
      (_, inner) => `SUM(CASE WHEN ${inner.trim()} THEN 1 ELSE 0 END)`)

    // Convert MySQL double-quoted string literals → single quotes
    // Only targets double-quoted values that follow =, IN (, LIKE, or a comma
    // e.g.  = "Before"   |   IN ("FCL", "LCL")   |   "20'"
    .replace(/(?<==\s*|IN\s*\([^)]*|,\s*)"((?:[^"\\]|\\.)*)"/g,
      (_, inner) => `'${inner.replace(/'/g, "''")}'`)

    // Replace remaining MySQL ? placeholders → $1, $2, …
    ;

  let i = 0;
  pgSql = pgSql.replace(/\?/g, () => `$${++i}`);

  // Auto-append RETURNING id to INSERT statements so insertId works
  if (/^\s*INSERT\s+/i.test(pgSql) && !/RETURNING/i.test(pgSql)) {
    pgSql = pgSql.trimEnd().replace(/;?\s*$/, '') + ' RETURNING id';
  }

  return { pgSql, params: params || [] };
}

// Serialize params for PostgreSQL compatibility:
//   - JS arrays/objects → JSON strings (for JSONB columns)
//   - JS booleans → 0/1 integers (for SMALLINT columns that were TINYINT in MySQL)
function serializeParams(params) {
  if (!params) return params;
  return params.map((p) => {
    if (p === null || p === undefined) return p;
    if (typeof p === 'boolean') return p ? 1 : 0;
    if (typeof p === 'object') return JSON.stringify(p);
    return p;
  });
}

async function runQuery(sql, params) {
  const { pgSql, params: pgParams } = convertQuery(sql, serializeParams(params));
  try {
    const result = await getPool().query(pgSql, pgParams);
    const rows = result.rows;
    // Attach mysql2-compatible metadata to the rows array
    rows.affectedRows = result.rowCount;
    rows.insertId = rows[0]?.id ?? null;
    return [rows, result.fields];
  } catch (err) {
    console.error('DB error:', err.message, '\nSQL:', pgSql, '\nParams:', pgParams);
    throw err;
  }
}

// Returns a mysql2-compatible connection-like object
export const connectMySQL = async () => ({
  execute: (sql, params) => runQuery(sql, params),
  query:   (sql, params) => runQuery(sql, params),
  release: () => {},
});
