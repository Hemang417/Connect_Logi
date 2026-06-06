import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

function getContactDifferences(oldContacts, newContacts) {
  const changes = [];

  const maxLength = Math.max(oldContacts.length, newContacts.length);
  for (let i = 0; i < maxLength; i++) {
    const oldC = oldContacts[i] || {};
    const newC = newContacts[i] || {};
    const diffFields = [];

    for (const key of new Set([...Object.keys(oldC), ...Object.keys(newC)])) {
      if ((oldC[key] || "") !== (newC[key] || "")) {
        diffFields.push(
          `${key} changed from "${oldC[key] || "-"}" to "${newC[key] || "-"}"`
        );
      }
    }

    if (diffFields.length) {
      changes.push(`Contact ${i + 1}:\n  ${diffFields.join("\n  ")}`);
    }
  }

  return changes.join("\n\n");
}

function formatValue(value) {
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed
        .map(
          (contact, index) =>
            `Contact ${index + 1}:\n${Object.entries(contact)
              .map(([k, v]) => `  ${k}: ${v}`)
              .join("\n")}`
        )
        .join("\n\n"); // space between contacts
    } else if (typeof parsed === "object") {
      return Object.entries(parsed)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
    }
  } catch {
    // Not JSON, return as-is
    return value;
  }
}

// STORING
export const OrgDataStorage = async (
  clientname,
  orgname,
  orgcode,
  address,
  country,
  state,
  city,
  postalCode,
  phoneNumber,
  emailAddress,
  PAN,
  GST,
  IEC,
  creditdays,
  branchName,
  username,
  createdon,
  checkedBoxOptions,
  orgganizationTypeOptions,
  contactDetails,
  showClientCode,
  followup2,
  followup3
) => {
  console.log(
    clientname,
    orgname,
    orgcode,
    address,
    country,
    state,
    city,
    postalCode,
    phoneNumber,
    emailAddress,
    PAN,
    GST,
    IEC,
    creditdays,
    branchName,
    username,
    createdon,
    checkedBoxOptions,
    orgganizationTypeOptions,
    contactDetails,
    showClientCode,
    followup2,
    followup3
  );

  try {
    // Check if data exists in the approvalorg table for the provided clientname, orgname, and orgcode
    const [existingOrgRows] = await connection.execute(
      `
            SELECT * FROM crm_db.approvalorg WHERE clientname = ? AND orgname = ? AND orgcode = ?
        `,
      [clientname, orgname, orgcode]
    );

    // const [existingOrgRows] = await connection.execute(
    //   `
    //         SELECT * FROM approvalorg WHERE clientname = ? AND orgname = ? AND orgcode = ?
    //     `,
    //   [clientname, orgname, orgcode]
    // );

    console.log("existingOrgRows", existingOrgRows.lenght);

    if (existingOrgRows.length > 0) {
      const clientCode = `${clientname.slice(0, 2).toUpperCase()}-${orgname
        .slice(0, 2)
        .toUpperCase()}-${branchName.slice(0, 2).toUpperCase()}`;
      const firstEmptyIndex = clientname.indexOf(" ");
      const aliasisthis = clientname
        .slice(0, firstEmptyIndex !== -1 ? firstEmptyIndex : orgname.length)
        .toLowerCase();
      // If the organization already exists in approvalorg, insert into organizations table
      const [insertedRows] = await connection.execute(
        `
                INSERT INTO crm_db.organizations (alias ,clientname, orgname, orgcode, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, branchname, username, createdon , uniquevalue , clientCode , checkedBoxOptions , orgganizationTypeOptions , contactDetails , showClientCode , followup2, followup3)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

            `,
        [
          aliasisthis,
          clientname,
          orgname,
          orgcode,
          address,
          country,
          state,
          city,
          postalCode,
          phoneNumber,
          emailAddress,
          PAN,
          GST,
          IEC,
          creditdays,
          branchName,
          username,
          createdon,
          "OrgButton",
          clientCode,
          checkedBoxOptions,
          orgganizationTypeOptions,
          contactDetails,
          showClientCode,
          followup2,
          followup3,
        ]
      );

      const insertedId = insertedRows.insertId;
      console.log("Inserted into organizations with ID:", insertedId);
      return insertedId;
    } else {
      // If the organization does not exist, proceed to insert into approvalorg
      const firstEmptyIndex = clientname.indexOf(" ");
      const aliasisthis = clientname
        .slice(0, firstEmptyIndex !== -1 ? firstEmptyIndex : orgname.length)
        .toLowerCase();

      const [rows] = await connection.execute(
        `
                INSERT INTO crm_db.approvalorg (clientname, alias, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, orgname, orgcode, branchname, username, uniquevalue, createdon , checkedBoxOptions , orgganizationTypeOptions , contactDetails , showClientCode , followup2, followup3)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
        [
          clientname,
          aliasisthis,
          address,
          country,
          state,
          city,
          postalCode,
          phoneNumber,
          emailAddress,
          PAN,
          GST,
          IEC,
          creditdays,
          orgname,
          orgcode,
          branchName,
          username,
          "OrgButton",
          createdon,
          checkedBoxOptions,
          orgganizationTypeOptions,
          contactDetails,
          showClientCode,
          followup2,
          followup3,
        ]
      );

      const insertedId = rows.insertId;

      // Continue with the rest of your logic for notifications and approvers...
      const [approverrows] = await connection.execute(
        `SELECT * FROM approvername WHERE orgname = ? AND orgcode = ?`,
        [orgname, orgcode]
      );
      const orgrows = approverrows.filter(
        (item) =>
          Array.isArray(item.uniquevalue) && item.uniquevalue[0] === "OrgButton"
      );

      const valuesArray = [];
      const readingarray = [];
      const timeofreading = [];

      orgrows.forEach((item) => {
        const employeename = item.employeename;
        valuesArray.push({ employeename: employeename });
        readingarray.push({ employeename: employeename, read: 0, approved: 0 });
        timeofreading.push({ employeename: employeename, time: null });
      });

      await connection.execute(
        `
                INSERT INTO crm_db.notifications (clientname, alias, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, orgname, orgcode, branchname, username, uniquevalue, approvername, reading, timeofreading, approvalid, createdat , followup2, followup3)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

            `,
        [
          clientname,
          aliasisthis,
          address,
          country,
          state,
          city,
          postalCode,
          phoneNumber,
          emailAddress,
          PAN,
          GST,
          IEC,
          creditdays,
          orgname,
          orgcode,
          branchName,
          username,
          "OrgButton",
          valuesArray,
          readingarray,
          timeofreading,
          insertedId,
          createdon,
          followup2,
          followup3,
        ]
      );

      const [rowWithAutoGeneratedId] = await connection.execute(
        "SELECT LAST_INSERT_ID() as id"
      );
      const autoGeneratedId = rowWithAutoGeneratedId[0].id;
      // console.log("Inserted into notifications with ID:", autoGeneratedId);

      return autoGeneratedId;
    }
  } catch (error) {
    console.error("Error inserting organization data:", error.message);
    throw error;
  }
};

// RENDER ON ORGANIZATION PAGE
// export const OrgRender = async (orgname, orgcode) => {
//     try {
//         const connection = await connectMySQL();

//         const [row] = await connection.execute(`
//             SELECT clientname, alias, branchname FROM organizations WHERE orgname = ? AND orgcode = ?
//         `, [orgname, orgcode]);

//         return row;
//     } catch (error) {
//         console.error('Error fetching organization data:', error.message);
//         throw error;
//     }
// }

// export const OrgRender = async (orgname, orgcode) => {
//     try {
//         const connection = await connectMySQL();

//         const [rows] = await connection.execute(`
//             SELECT clientname, alias, branchname
//             FROM organizations
//             WHERE orgname = ? AND orgcode = ?
//         `, [orgname, orgcode]);
//         console.log(rows);
//         if (rows.length > 0) {
//             const branchNames = rows.map(row => row.branchname); // Use map instead of forEach
//             const organizationData = {
//                 clientname: rows[0].clientname,
//                 alias: rows[0].alias,
//                 allbranchesofclient: branchNames
//             };

//             return organizationData;
//         } else {
//             return null; // Handle case where organization not found
//         }
//     } catch (error) {
//         console.error('Error fetching organization data:', error.message);
//         throw error;
//     }
// }

export const OrgRender = async (orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      `
            SELECT clientname, alias, branchname, orgganizationTypeOptions, checkedBoxOptions, id , isDeleted
            FROM organizations
            WHERE orgname = ? AND orgcode = ?
        `,
      [orgname, orgcode]
    );

    if (rows.length > 0) {
      const clientsMap = new Map(); // Map to store clients and their branches
      rows.forEach((row) => {
        const {
          clientname,
          alias,
          branchname,
          id,
          orgganizationTypeOptions,
          checkedBoxOptions,
          isDeleted,
        } = row;
        if (clientsMap.has(alias)) {
          clientsMap.get(alias).branches.push({ branchname, id });
        } else {
          clientsMap.set(alias, {
            clientname,
            alias,
            branches: [{ branchname, id }],
            orgganizationTypeOptions, // Include this field
            checkedBoxOptions, // Include this field
            isDeleted,
          });
        }
      });

      const organizationData = Array.from(clientsMap.values());
      return organizationData; // No need to flatten the array
    } else {
      return null; // Handle case where organization not found
    }
  } catch (error) {
    console.error("Error fetching organization data:", error.message);
    throw error;
  }
};

export const OrgRenderAll = async (orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      `
            SELECT  *
            FROM organizations
            WHERE orgname = ? AND orgcode = ? 
        `,
      [orgname, orgcode]
    );

    return rows;
  } catch (error) {
    console.error("Error fetching organization data:", error.message);
    throw error;
  }
};

export const addDepartment = async (orgname, orgcode, category) => {
  try {
    const response = await connection.execute(
      "INSERT INTO departments (orgname, orgcode, departmentname) VALUES (?, ?, ?)",
      [orgname, orgcode, category]
    );
    return response;
  } catch (error) {
    console.error("Error adding department:", error.message);
    throw error;
  }
};

export const getDepartment = async (orgname, orgcode, category) => {
  try {
    const response = await connection.execute(
      "SELECT departmentname FROM departments WHERE orgname = ? AND orgcode = ?",
      [orgname, orgcode]
    );
    return response;
  } catch (error) {
    console.error("Error adding department:", error.message);
    throw error;
  }
};

export const OrgDelete = async (orgname, clientname, orgcode, employeename) => {
  try {
    const timestamp = new Date();
    const [rows] = await connection.execute(
      "UPDATE organizations SET IsDeleted = 1 , deletedAt = ? WHERE orgname = ? AND clientname = ? AND orgcode = ?",
      [timestamp, orgname, clientname, orgcode]
    );
    const [approvlogSoftDelete] = await connection.execute(
      "UPDATE approvalorg SET IsDeleted = 1 , deletedby = ? , deletedAt = ? WHERE orgname = ? AND clientname = ? AND orgcode = ?",
      [employeename, timestamp, orgname, clientname, orgcode]
    );

    const [deltedbranches] = await connection.execute(
      "UPDATE branches SET isDeleted = 1 , deletedAt = ? WHERE clientname = ? AND orgcode = ?",
      [timestamp, clientname, orgcode]
    );
    // const [contactreltedtothat] = await connection.execute('DELETE FROM contacts WHERE clientname = ? AND orgcode = ? AND orgname = ?', [clientname, orgcode, orgname]);
    return { rows, approvlogSoftDelete };
  } catch (error) {
    console.error("Error fetching organization data:", error.message);
    throw error;
  }
};

export const StoreRemarkOfOrg = async (
  orgname,
  orgcode,
  clientname,
  remark
) => {
  const [row] = await connection.execute(
    `UPDATE approvalorg SET remark = ? WHERE orgname = ? AND orgcode = ?  AND clientname = ?`,
    [remark, orgname, orgcode, clientname]
  );
};

export const renderAllbrenches = async (orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      `
         select branchname from branches where clientname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching organization data:", error.message);
    throw error;
  }
};

// ADD USER VIA ADMIN API
export const insertEmployees = async (
  username,
  password,
  orgcode,
  orgname,
  fullname,
  role,
  createdby
) => {
  try {
    // Check if the organization exists in the users table
    const [rows] = await connection.execute(
      `
            SELECT * FROM users WHERE orgcode = ? AND orgname = ?
        `,
      [orgcode, orgname]
    );

    // If the organization doesn't exist, throw an error
    if (rows.length === 0) {
      throw new Error("Organization does not exist");
    }

    const usernameofuser = username + "@" + role;
    // Insert employee data into the userkyctable table
    await connection.execute(
      `
        INSERT INTO userkyctable (username, password, orgcode, orgname, fullname, role, createdby, createdAt) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `,
      [usernameofuser, password, orgcode, orgname, fullname, role, createdby]
    );

    return rows;
  } catch (error) {
    console.error("Error inserting employee data:", error.message);
    throw error;
  }
};

export const deleteEmployee = async (
  username,
  orgcode,
  orgname,
  remark,
  deletedby
) => {
  try {
    // Check if the organization exists in the users table
    const [rows] = await connection.execute(
      `
            SELECT * FROM users WHERE orgcode = ? AND orgname = ?
        `,
      [orgcode, orgname]
    );

    // If the organization doesn't exist, throw an error
    if (rows.length === 0) {
      throw new Error("Organization does not exist");
    }

    // Check if the employee exists in the userkyctable table
    const [employee] = await connection.execute(
      `
            SELECT * FROM userkyctable WHERE username = ? AND orgcode = ? AND orgname = ? And IsDeleted = 0
        `,
      [username, orgcode, orgname]
    );

    // If the employee doesn't exist, throw an error
    if (employee.length === 0) {
      throw new Error("Employee does not exist");
    }

    // Delete the employee from the userkyctable table
    await connection.execute(
      `
            UPDATE userkyctable SET IsDeleted = 1 , deletedAt = NOW() , deletedby = ? , DeleteRemark = ? WHERE username = ? AND orgcode = ? AND orgname = ?
        `,
      [deletedby, remark, username, orgcode, orgname]
    );

    return { message: "Employee deleted successfully" };
  } catch (error) {
    console.error("Error deleting employee:", error.message);
    throw error;
  }
};
export const getBranches = async (alias) => {
  try {
    if (!alias) {
      throw new Error("Alias is required");
    }

    const [rows] = await connection.execute(
      `SELECT id, branchname 
       FROM organizations 
       WHERE alias = ? 
       AND IsDeleted = 0
       ORDER BY branchname;`, // Order by branchname
      [alias]
    );

    return rows; // ✅ Returns an array of objects: [{ id: 1, branchname: "Branch A" }, { id: 2, branchname: "Branch B" }]
  } catch (error) {
    console.error("Error fetching branches:", error.message);
    throw error;
  }
};

export const fetchBranchData = async (alias, branchname, id) => {
  console.log(alias, branchname, id);
  try {
    if ((alias, branchname, id)) {
      const [row] = await connection.execute(
        `SELECT * FROM organizations WHERE alias = ? AND branchname = ? AND id = ?`,
        [alias, branchname, id]
      );
      return row[0];
    }
  } catch (error) {
    console.error("Error inserting employee data:", error.message);
    throw error;
  }
};

export const updateRow = async (
  orgcode,
  orgname,
  branchnameofemp,
  branchcodeofemp,
  username,
  clientname,
  alias,
  branchname,
  id,
  address,
  country,
  state,
  city,
  postalcode,
  phone,
  email,
  PAN,
  GST,
  IEC,
  creditdays,
  showClientCode,
  checkedBoxOptions,
  orgganizationTypeOptions,
  contactDetails,
  followup2,
  followup3,
  section
) => {
  try {
    const [oldRows] = await connection.execute(
      `SELECT * FROM organizations 
       WHERE orgcode = ? AND orgname = ? AND branchname = ? AND clientname = ? AND alias = ? AND id = ?`,
      [orgcode, orgname, branchname, clientname, alias, id]
    );
    if (oldRows.length === 0) {
      throw new Error("Record not found for update.");
    }
    const oldRecord = oldRows[0];

    console.log("username", username);
    console.log("bn", branchnameofemp);
    console.log("bc", branchcodeofemp);
    const [row] = await connection.execute(
      `   
            UPDATE organizations
            SET 
                address = ?,
                country = ?,
                state = ?,
                city = ?,
                postalcode = ?,
                phone = ?,
                email = ?,
                PAN = ?,
                GST = ?,
                IEC = ?,
                creditdays = ?,
                showClientCode = ?,
                checkedBoxOptions = ?,
                orgganizationTypeOptions = ?,
                contactDetails = ?,
                followup2 = ?,
                followup3 = ?
            WHERE 
                orgcode = ? AND
                orgname = ? AND
                branchname = ? AND
                clientname = ? AND
                alias = ? AND
                id = ?
      `,
      [
        address,
        country,
        state,
        city,
        postalcode,
        phone,
        email,
        PAN,
        GST,
        IEC,
        creditdays,
        showClientCode,
        checkedBoxOptions,
        orgganizationTypeOptions,
        contactDetails,
        followup2,
        followup3,
        orgcode,
        orgname,
        branchname,
        clientname,
        alias,
        id,
      ]
    );

    const [updatedRowinapproval] = await connection.execute(
      `
            UPDATE approvalorg
            SET 
                address = ?,
                country = ?,
                state = ?,
                city = ?,
                postalcode = ?,
                phone = ?,
                email = ?,
                PAN = ?,
                GST = ?,
                IEC = ?,
                creditdays = ?,
                checkedBoxOptions = ?,
                orgganizationTypeOptions = ?,
                contactDetails = ?
            WHERE 
                orgcode = ? AND
                orgname = ? AND
                branchname = ? AND
                clientname = ? AND
                alias = ? AND
                id = ?
        `,
      [
        address,
        country,
        state,
        city,
        postalcode,
        phone,
        email,
        PAN,
        GST,
        IEC,
        creditdays,
        checkedBoxOptions,
        orgganizationTypeOptions,
        contactDetails,
        orgcode,
        orgname,
        branchname,
        clientname,
        alias,
        id,
      ]
    );

    const fieldsToCheck = [
      { key: "address", label: "Address", newValue: address },
      { key: "country", label: "Country", newValue: country },
      { key: "state", label: "State", newValue: state },
      { key: "city", label: "City", newValue: city },
      { key: "postalcode", label: "Postal Code", newValue: postalcode },
      { key: "phone", label: "Phone", newValue: phone },
      { key: "email", label: "Email", newValue: email },
      { key: "PAN", label: "PAN", newValue: PAN },
      { key: "GST", label: "GST", newValue: GST },
      { key: "IEC", label: "IEC", newValue: IEC },
      { key: "creditdays", label: "Credit Days", newValue: creditdays },
      {
        key: "showClientCode",
        label: "Show Client Code",
        newValue: showClientCode,
      },
      {
        key: "checkedBoxOptions",
        label: "Entity Type",
        newValue: checkedBoxOptions,
      },
      {
        key: "orgganizationTypeOptions",
        label: "Organization Type",
        newValue: orgganizationTypeOptions,
      },
      {
        key: "contactDetails",
        label: "Contact Details",
        newValue: contactDetails,
      },
      { key: "followup2", label: "Followup 2", newValue: followup2 },
      { key: "followup3", label: "Followup 3", newValue: followup3 },
    ];

    // Iterate over each field; if the value has changed, log an individual entry
    for (const field of fieldsToCheck) {
      const oldValue = oldRecord[field.key];
      const newValue = field.newValue;
      const stringifyValue = (val) =>
        val && typeof val === "object" ? JSON.stringify(val) : val;

      const oldValStr = stringifyValue(oldValue);
      const newValStr = stringifyValue(newValue);

      // Only log if the stringified values are different
      if (oldValStr !== newValStr) {
        let changeMessage = "";

        if (field.label === "Contact Details") {
          const oldContacts = JSON.parse(oldValStr || "[]");
          const newContacts = JSON.parse(newValStr || "[]");
          const changes = [];

          const createKey = (contact) =>
            `${contact.email || ""}-${contact.mobile || ""}`;

          const oldMap = new Map(
            oldContacts.map((c, i) => [createKey(c), { data: c, index: i }])
          );
          const newMap = new Map(
            newContacts.map((c, i) => [createKey(c), { data: c, index: i }])
          );

          // Detect deleted contacts
          for (const [key, { data, index }] of oldMap.entries()) {
            if (!newMap.has(key)) {
              const contactLabel = data.contactName
                ? ` (${data.contactName})`
                : "";
              changes.push(`Contact ${contactLabel} deleted`);
            }
          }

          // Detect added contacts
          for (const [key, { data, index }] of newMap.entries()) {
            if (!oldMap.has(key)) {
              const contactLabel = data.contactName
                ? ` (${data.contactName})`
                : "";
              changes.push(`New contact detail added: Contact ${contactLabel}`);
            }
          }

          // Detect modified contacts
          for (const [key, { data: newC, index }] of newMap.entries()) {
            if (oldMap.has(key)) {
              const oldC = oldMap.get(key).data;
              const diffFields = [];

              for (const fieldKey of new Set([
                ...Object.keys(oldC),
                ...Object.keys(newC),
              ])) {
                if ((oldC[fieldKey] || "") !== (newC[fieldKey] || "")) {
                  diffFields.push(
                    `${fieldKey} changed from "${oldC[fieldKey] || "-"}" to "${newC[fieldKey] || "-"}"`
                  );
                }
              }

              if (diffFields.length) {
                const contactLabel = newC.contactName
                  ? ` (${newC.contactName})`
                  : "";
                changes.push(
                  `Contact ${index + 1}${contactLabel}:\n  ${diffFields.join("\n\n\n")}`
                );
              }
            }
          }

          if (changes.length > 0) {
            changeMessage = changes.join("\n");
          } else {
            continue; // skip if nothing changed
          }
        } else {
          changeMessage = `${field.label} changed from "${oldValStr}" to "${newValStr}" in branch (${branchname})`;
        }

        await connection.execute(
          "INSERT INTO editlogs (orgname, orgcode, branchname, branchcode, editedon, editin, clientname, editedby, changesDetails) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?)",
          [
            orgname,
            orgcode,
            branchnameofemp,
            branchcodeofemp,
            section,
            clientname,
            username,
            changeMessage,
          ]
        );
      }
    }
    return row;
  } catch (error) {
    console.error("Error updating row:", error.message);
    throw error;
  }
};

// STORE CONTACTS
// export const insertContact = async (contactName, designation, department, mobile, email, branchname, orgname, orgcode, id, clientname) => {
//     try {
//         const row = await connection.execute(`INSERT INTO contacts
//         (contactName, designation, department, mobile, email, branchname, orgname, orgcode, clientname, bid)
//         VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `, [contactName, designation, department, mobile, email, branchname, orgname, orgcode, clientname, id]);
//         return row;
//     } catch (error) {
//         console.error('Error updating row:', error.message);
//         throw error;
//     }
// }

// export const fetchAllContacts = async (branchname, clientname, id, orgname, orgcode) => {
//     try {

//         const [rows] = await connection.execute(`SELECT * FROM contacts WHERE branchname = ? AND orgname = ? AND orgcode = ? AND clientname = ? AND bid = ?`, [branchname, orgname, orgcode, clientname, id]);
//         return rows;
//     } catch (error) {
//         console.error('Error updating row:', error.message);
//         throw error;
//     }
// }

// export const fetchAllContactsofNew = async (branchname, clientname, orgname, orgcode) => {
//     try {

//         const [rows] = await connection.execute(`SELECT * FROM contacts WHERE branchname = ? AND orgname = ? AND orgcode = ? AND clientname = ? AND bid IS NULL`, [branchname, orgname, orgcode, clientname]);
//         return rows;
//     } catch (error) {
//         console.error('Error updating row:', error.message);
//         throw error;
//     }
// }

// export const updateContactduringNew = async (contactName, designation, department, mobile, email, branchname, orgname, orgcode, clientname) => {
//     try {

//         const row = await connection.execute(`UPDATE contacts SET contactName = ?, designation = ?, department = ?, mobile = ?, email = ? WHERE branchname = ? AND orgname = ? AND orgcode = ? AND clientname = ? AND mobile = ?`,
//             [contactName, designation, department, mobile, email, branchname, orgname, orgcode, clientname, mobile]);
//         return row;
//     } catch (error) {
//         console.error('Error updating row:', error.message);
//         throw error;
//     }
// }

// export const deleteContact = async (email, mobile, contactName, designation, department) => {
//     try {

//         const row = await connection.execute(`DELETE FROM contacts WHERE email = ? AND mobile = ? AND contactName = ? AND designation = ? AND department = ?`, [email, mobile, contactName, designation, department]);
//         return row;
//     } catch (error) {
//         console.error('Error updating row:', error.message);
//         throw error;
//     }
// }

// export const updateContact = async (contactName, designation, department, mobile, email, branchname, clientname, id, orgname, orgcode) => {
//     try {

//         const row = await connection.execute(
//             `UPDATE contacts SET contactName = ?, designation = ?, department = ?, mobile = ?, email = ? WHERE branchname = ? AND orgname = ? AND orgcode = ? AND clientname = ? AND bid = ? AND mobile = ?`,
//             [contactName, designation, department, mobile, email, branchname, orgname, orgcode, clientname, id, mobile]
//         );
//         return row;
//     } catch (error) {
//         console.error('Error updating row:', error.message);
//         throw error;
//     }
// }

export const saveBranchinTable = async (
  clientname,
  orgcode,
  branchname,
  id
) => {
  try {
    // First get a new unique ID for the branch record
    const [newIdResult] = await connection.execute(
      "SELECT MAX(id) + 1 AS newId FROM organizations"
    );
    const newId = newIdResult[0].newId || id + 1; // Fallback if MAX returns NULL
    const [row] = await connection.execute(
      `INSERT INTO branches (clientname, orgcode, branchname , bid) VALUES (?, ?, ?, ?)`,
      [clientname, orgcode, branchname, newId]
    );

    const [row2] = await connection.execute(
      `INSERT INTO organizations (
        username,
        uniquevalue,
        state,
        showClientCode,
        postalcode,
        phone,
        PAN,
        orgname,
        orgganizationTypeOptions,
        orgcode,
        IsDeleted,
        IEC,
        id,
        GST,
        followup3,
        followup2,
        email,
        deletedAt,
        creditdays,
        createdon,
        country,
        contactDetails,
        clientname,
        clientCode,
        city,
        checkedBoxOptions,
        branchname,
        alias,
        address
      )
      SELECT
        username,
        uniquevalue,
        '',
        showClientCode,
        '',
        '',
        PAN,
        orgname,
        orgganizationTypeOptions,
        orgcode,
        IsDeleted,
        IEC,
        ?,
        GST,
        followup3,
        followup2,
        '',
        deletedAt,
        creditdays,
        createdon,
        '',
        contactDetails,
        clientname,
        clientCode,
        '',
        checkedBoxOptions,
        ?,
        alias,
        ''
      FROM organizations
      WHERE clientname = ? AND id = ?`,
      [newId, branchname, clientname, id]
    );

    let row3;
    if (row2.affectedRows > 0) {
      [row3] = await connection.execute(
        "SELECT branchname, id FROM organizations WHERE branchname = ? AND clientname = ? AND id = ?",
        [branchname, clientname, newId]
      );
    }

    return {
      row,
      row2,
      row3,
      branchname,
    };
  } catch (error) {
    console.error("Error saving branch:", error);
    throw error;
  }
};

export const updateBID = async (BID, clientname, orgcode, branchname) => {
  try {
    const [row] = await connection.execute(
      `
            UPDATE branches 
            SET bid = ? 
            WHERE clientname = ? AND orgcode = ? AND branchname = ? AND bid IS NULL
        `,
      [BID, clientname, orgcode, branchname]
    );

    if (row.affectedRows === 0) {
      throw new Error("Branch not found or BID was not updated");
    }

    return { success: true, message: "BID updated successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error updating BID" };
  }
};

// export const updateBIDContact = async (BID, clientname, orgcode, orgname, branchname) => {
//     try {

//         const [row] = await connection.execute(`
//             UPDATE contacts
//             SET bid = ?
//             WHERE clientname = ? AND orgcode = ? AND orgname = ? AND branchname = ? AND bid IS NULL
//         `, [BID, clientname, orgcode, orgname, branchname]);
//         return row;
//     } catch (error) {
//         console.log(error);
//         return { success: false, message: 'Error updating BID' };
//     }
// }

export const deleteBranch = async (
  id,
  branchname,
  orgcode,
  orgname,
  clientname,
  deletedat
) => {
  console.log(
    "props reached in deletebranch ->",
    id,
    branchname,
    orgcode,
    orgname,
    clientname,
    deletedat
  );
  try {
    // Delete branch from organizations table
    const [orgRow] = await connection.execute(
      `
            UPDATE organizations  SET IsDeleted = 1 ,deletedAt = ?
            WHERE id = ? AND branchname = ? AND orgcode = ? AND orgname = ? AND clientname = ? 
        `,
      [deletedat, id, branchname, orgcode, orgname, clientname]
    );

    const [approvallog] = await connection.execute(
      `
            SELECT * FROM approvalorg 
            WHERE branchname = ? AND orgcode = ? AND orgname = ? AND clientname = ? 
        `,
      [branchname, orgcode, orgname, clientname]
    );

    if (approvallog && approvallog.length > 0) {
      await connection.execute(
        `
                UPDATE approvalorg  SET IsDeleted = 1 
                WHERE branchname = ? AND orgcode = ? AND orgname = ? AND clientname = ?
            `,
        [branchname, orgcode, orgname, clientname]
      );
    }
    // Delete branch from branches table
    const [branchRow] = await connection.execute(
      `
            UPDATE branches  SET isDeleted = 1
            WHERE bid = ? AND orgcode = ? AND clientname = ? AND branchname = ?
        `,
      [id, orgcode, clientname, branchname]
    );

    // Delete contacts from contacts table
    // const [deletedContacts] = await connection.execute(`DELETE FROM contacts
    //     WHERE branchname = ? AND bid = ? AND orgcode = ? AND orgname = ? AND clientname = ?
    // `, [branchname, id, orgcode, orgname, clientname]);

    return { branchRow, orgRow };
  } catch (error) {
    console.log(error);
  }
};

export const getOrgsforfiltering = async (orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      `SELECT clientname FROM organizations WHERE orgname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const getOrgEdits = async (alias) => {
  try {
    const [clientNameResult] = await connection.execute(
      `SELECT clientname FROM organizations WHERE alias = ?`,
      [alias]
    );

    if (clientNameResult.length === 0) {
      return []; // Return empty array if no matching organization
    }

    const clientName = clientNameResult[0].clientname; // Extract clientname correctly
    console.log(clientName);
    const [editdata] = await connection.execute(
      `SELECT * FROM editlogs Where clientname = ? ORDER BY editedon DESC`,
      [`${clientName}`]
    );
    console.log(editdata);
    return editdata;
  } catch (error) {
    console.log(error);
  }
};
