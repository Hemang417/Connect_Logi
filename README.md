# Connect_Logi

A full-stack freight-forwarding and logistics CRM built for **Seawave Forwarding Logistics**. It manages the complete lifecycle of import/export jobs, client organizations, employees, finances, workflow automation, and real-time team collaboration.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend runtime | Node.js (ES Modules) |
| Backend framework | Express.js 4.21.2 |
| Database | MySQL 8 · mysql2/promise connection pool |
| Authentication | JWT (jsonwebtoken 9.0.2) |
| Real-time | Socket.IO 4.8.1 (port 8081) |
| File uploads | Multer 1.4.5-lts.1 |
| Email | Nodemailer 6.9.12 (Gmail SMTP) |
| SMS / Voice | Twilio 5.0.0 |
| Task scheduling | node-cron 3.0.3, Bree 9.2.2 |
| Frontend framework | React 18.2.0 (HashRouter SPA) |
| UI library | CoreUI React 4.9.0 |
| State management | Redux 4.2.1 + React-Redux 8.1.3 |
| Charts | Recharts 2.15.2, Chart.js 3.9.1 |
| Spreadsheet grid | Handsontable 15.3.0 |
| PDF generation | jsPDF 2.5.2 + autotable, React-PDF 3.4.2 |
| Excel export | ExcelJS 4.4.0, XLSX 0.18.5 |
| HTTP client | Axios 1.7.2 |
| Styling | SCSS + CoreUI CSS 4.2.6 |

---

## Features

- Multi-tenant authentication (admin + employee accounts, single-session enforcement, JWT)
- Import job full lifecycle — create → approval → milestone tracking → document upload → reporting
- Export job full lifecycle — same structure as import
- Dynamic job-number generation (fiscal year, transport mode, branch, sequence)
- Milestone-based TAT tracking with planned vs. actual dates
- Workflow builder (Line of Business → milestones → auto-assignment → reminders)
- Organization/client management with branch hierarchy
- Employee onboarding with KYC document upload
- Role-based and feature-level access control (section + control per user per branch)
- Accounts module — credits, debits, collections, bank details
- Sales pipeline — prospects, enquiries, quotations
- Transportation/fleet management with expense tracking
- Real-time team chat (ConnectSpace via Socket.IO)
- Approval workflows — jobs, organization creation, password changes
- Edit audit logs across all modules
- Soft delete + recycle bin + permanent deletion
- Email notifications via Nodemailer (configurable schedule per organization)
- Dashboard KPIs — import/export counts, on-time vs. delayed, TAT analysis
- PDF and Excel export from all major tables
- Dark mode toggle

---

## Project Structure

```
Connect_Logi/
├── backend/
│   ├── app.js                          # Express entry point; mounts all routes; starts 15-min login-cleanup cron
│   ├── websocketServer.js              # Socket.IO server (port 8081) — chat + push notifications
│   ├── package.json
│   ├── .env.development                # JWT_SECRET, FRONTEND_ORIGIN
│   ├── config/
│   │   └── sqlconfigremote.js          # MySQL connection pool (host 127.0.0.1, db crm_db)
│   ├── middleware/
│   │   ├── logCheck.middleware.js      # JWT validation; extracts user context; auto-logout on expiry
│   │   ├── documentupload.middleware.js# Multer — import/export job docs (1 MB/file limit)
│   │   ├── clientRegistration.middleware.js  # Multer — client onboarding docs (5 MB, many fields)
│   │   └── uploadKYC.middleware.js     # Multer — KYC profile photo + ID proof
│   ├── routes/                         # 17 route files mapping HTTP verbs to API functions
│   │   ├── AuthRoutes.js
│   │   ├── UserManagementRoutes.js
│   │   ├── OrganizationRoutes.js
│   │   ├── DashboardRoutes.js
│   │   ├── ImportRoutes.js
│   │   ├── ExportRoutes.js
│   │   ├── AccountRoutes.js
│   │   ├── SalesRoutes.js
│   │   ├── WorkFlowRoutes.js
│   │   ├── NotificationAndReminderRoutes.js
│   │   ├── ConnectSpaceRoutes.js
│   │   ├── DelegationRoutes.js
│   │   ├── EditLogRoutes.js
│   │   ├── ImpApprovalLogRoutes.js
│   │   ├── ExpApprovalLogRoutes.js
│   │   ├── OrgApprovalLogRoutes.js
│   │   └── PermanentDeleteRoutes.js
│   ├── api/                            # ~35 business-logic files
│   │   ├── user.js                     # Auth, login, password management
│   │   ├── userlist.js                 # User access controls, branch assignments
│   │   ├── organization.js             # Organization CRUD
│   │   ├── import.js                   # Import job CRUD, document uploads, tracking
│   │   ├── export.js                   # Export job CRUD, container details
│   │   ├── kyc.js                      # KYC data and image handling
│   │   ├── workflow.js                 # Workflow definitions
│   │   ├── lineofbusiness.js           # Line of Business (air/sea freight)
│   │   ├── milestone.js                # Milestone tracking
│   │   ├── arrangement.js              # Freight arrangements
│   │   ├── dashboard.js                # Stats and KPI calculations
│   │   ├── bankdetails.js              # Bank account management
│   │   ├── credit.js / debit.js        # Financial transactions
│   │   ├── collection.js               # Payment collections
│   │   ├── sales.js                    # Sales pipeline
│   │   ├── mail.js                     # Email config and Nodemailer sending
│   │   ├── notifications.js            # Notification management
│   │   ├── reminder.js                 # Reminder scheduling
│   │   ├── connectSpace.js             # Chat room logic
│   │   └── [other domain files]
│   └── sqlbackupDB/                    # MySQL dump backups (multiple dates)
│
├── frontend/
│   ├── package.json
│   ├── .env.development                # REACT_APP_API_URL=http://localhost:5000
│   ├── public/manifest.json            # PWA manifest
│   ├── src/
│   │   ├── App.js                      # Root component, React Router setup
│   │   ├── routes.js                   # 50+ lazy-loaded route definitions
│   │   ├── index.js                    # ReactDOM render, Redux Provider, Toast setup
│   │   ├── store.js                    # Redux store
│   │   ├── config/config.js            # API_BASE_URL
│   │   ├── layout/
│   │   │   ├── DefaultLayout.js        # Sidebar + Header + Content wrapper
│   │   │   └── Pagination.js
│   │   ├── components/
│   │   │   ├── AppHeader.js            # Top nav (user menu, notifications, theme toggle)
│   │   │   ├── AppSidebar.js           # Collapsible left sidebar
│   │   │   ├── AppContent.js           # Page content wrapper
│   │   │   ├── AppFooter.js
│   │   │   ├── inputPopup/             # Reusable modal components
│   │   │   ├── newTable/               # Custom data table
│   │   │   └── FileUploadButton/
│   │   └── views/                      # 50+ page components
│   │       ├── dashboard/
│   │       ├── import/                 # Create, edit, detail, on-time/delayed reports
│   │       ├── export/                 # Create, edit, detail, on-time/delayed reports
│   │       ├── organization/
│   │       ├── accounts/               # Credits, debits, bank details, collections
│   │       ├── sales/                  # Prospects, enquiries, quotations
│   │       ├── transportation/         # Fleet, expenses, TAT planning
│   │       ├── userlist/               # User management, KYC, roles
│   │       ├── workflow/               # LOB setup, milestones, workflow builder
│   │       ├── tat/
│   │       ├── approverlog/
│   │       ├── EditLogs/
│   │       ├── connectSpace/           # Real-time team chat
│   │       ├── roles/
│   │       ├── recyclebin/
│   │       └── pages/login/ + register/
│   └── build/                          # Production build output
│
├── package.json                        # Root monorepo scripts
└── README.md
```

---

## Database Schema (`crm_db`)

| Table | Purpose |
|---|---|
| `users` | Admin accounts — username, password, orgcode, loggedin, tokenIssuedAt |
| `userkyctable` | Employee accounts with KYC — role, profilephoto, idproof, IsDeleted |
| `organizations` | Client organizations — name, alias, orgcode, GST, IEC, PAN, creditdays |
| `branches` | Branch master — branchname, branchcode, BID, orgcode |
| `branchaccess` | User ↔ branch permission mapping |
| `accesscontrol` | Feature-level permissions per user (section + control) |
| `approvalimpjob` | Import job records — lifecycle: draft → approved → tracking |
| `approvalexpjob` | Export job records |
| `allimportdelete` / `allexportdeletedjob` | Soft-deleted jobs with audit trail |
| `tracking_details` / `tracking_detailsexp` | Milestone completions per job |
| `workflow_setup` | Workflow definitions — milestones, TAT, reminders, assigned employees |
| `bankdetails` | Company bank accounts |
| `credit_table` / `debit_table` | Financial transactions |
| `collections` | Payment collections per job |
| `adminchangeapproval` | Password-change approval queue |
| `maildata` | Per-organization SMTP config and reminder schedule |
| `connectspace` / `messages` | Chat rooms and messages |

---

## Authentication

1. `POST /auth/login` — checks `users` (admin) or `userkyctable` (employees); enforces single active session via a `loggedin` flag; issues a JWT that expires at whichever comes first — 10 hours from issue or midnight.
2. All protected routes pass through `logCheck.middleware.js` — reads the `userauthtoken: Bearer <token>` header, verifies the JWT, and automatically clears the session on expiry.
3. `POST /auth/logout` — resets `loggedin = 0` and clears `tokenIssuedAt`.
4. A background cron job (every 15 minutes) sweeps both user tables and clears stale sessions.
5. Password changes are queued in `adminchangeapproval` and require explicit admin approval/rejection.

---

## API Overview

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Login with username, password, orgcode |
| POST | `/auth/logout` | End session |
| POST | `/auth/forgotpassword` | Submit password reset request |
| GET | `/auth/userreq` | List pending password change requests |
| POST | `/auth/userreq/approve` | Approve a password change |
| POST | `/auth/userreq/reject` | Reject a password change |

### Import Jobs
| Method | Endpoint | Description |
|---|---|---|
| POST | `/storeJob` | Create import job |
| PUT | `/updateId` | Update job number/details |
| GET | `/allimpjobs` | List all import jobs |
| PUT | `/updateGeneral` | Update job general details |
| POST | `/saveExcelData` | Save milestone tracking data |
| POST | `/upload` | Upload job documents (Multer, 1 MB/file) |
| POST | `/insertCompletedRow` | Mark a milestone complete |
| PUT | `/deleteCompletedRow` | Remove milestone completion |

### Export Jobs
Mirror of Import Jobs endpoints (prefix `exp` on most route names).

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| GET | `/getallstats` | Overall job statistics |
| GET | `/getimpstats` | Import metrics for a date range |
| GET | `/getexpstats` | Export metrics for a date range |
| GET | `/getAllBranches` | Branches accessible to the current user |

### Organization
| Method | Endpoint | Description |
|---|---|---|
| POST | `/orgStore` | Create organization |
| GET | `/getOrg` | Get organization details |
| PUT | `/updateData` | Update organization |
| DELETE | `/deleteorg` | Soft-delete organization |
| POST | `/emp/store` | Add employee |
| POST | `/addDepartment` | Add department |

### User Management
| Method | Endpoint | Description |
|---|---|---|
| POST | `/insertBranchaccess` | Grant branch access to user |
| POST | `/storeuserrole` | Create user role |
| POST | `/uploadKYCData` | Upload KYC documents |
| GET | `/fetchaccesscontrols` | Get feature-level permissions |

### Accounts
| Method | Endpoint | Description |
|---|---|---|
| POST | `/addbankdetails` | Add bank account |
| POST | `/addCredit` | Record credit transaction |
| POST | `/addDebit` | Record debit transaction |
| GET | `/getAllCollection` | List payment collections |

### Workflow
| Method | Endpoint | Description |
|---|---|---|
| POST | `/storelob` | Create Line of Business |
| POST | `/addmilestone` | Create milestone |
| POST | `/createworkflow` | Define a workflow |
| GET | `/readsetworkflow` | Get workflow for a job type |

### Notifications & Reminders
| Method | Endpoint | Description |
|---|---|---|
| GET | `/fetchnotifications` | Get organization notifications |
| POST | `/settimeandmail` | Configure reminder email schedule |

---

## Real-Time Architecture (Socket.IO — port 8081)

The WebSocket server (`websocketServer.js`) runs independently of Express on port 8081.

- On connect, users join named rooms.
- `chatMessage` event → broadcast to room → `receiveMessage` on all clients in that room.
- `deleteMessage` event synced across all room members.
- Targeted notification push to individual users by username.
- Configuration: ping interval 25 s, ping timeout 60 s, max HTTP buffer 100 MB.

---

## File Storage

All uploads are stored locally under `backend/uploads/`. There is no cloud storage integration.

| Upload type | Path pattern |
|---|---|
| Import/export documents | `uploads/<jobno>/` |
| Employee KYC | `uploads/kyc/<username>/` |
| Client registration docs | `uploads/ctclients/<clientname>/` |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL 8 running locally on port 3306
- Database `crm_db` created and schema imported from `backend/sqlbackupDB/`

### 1. Install dependencies

```bash
# From repo root
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment

**Backend** — create `backend/.env.development`:
```
JWT_SECRET=your_secret_here
FRONTEND_ORIGIN=http://localhost:3000
```

**Backend database** — edit `backend/config/sqlconfigremote.js` with your MySQL credentials (host, user, password, database).

**Frontend** — `frontend/.env.development` is pre-configured:
```
REACT_APP_API_URL=http://localhost:5000
```

### 3. Import the database

```bash
mysql -u root -p crm_db < backend/sqlbackupDB/<latest-dump>.sql
```

### 4. Run the backend

```bash
cd backend
node app.js          # Express API on port 5000
node websocketServer.js  # Socket.IO on port 8081
```

### 5. Run the frontend

```bash
cd frontend
npm start            # React dev server on port 3000
```

Open `http://localhost:3000` in your browser.

---

## Environment Variables

| Variable | File | Description |
|---|---|---|
| `JWT_SECRET` | `backend/.env.development` | Secret used to sign and verify JWTs |
| `FRONTEND_ORIGIN` | `backend/.env.development` | CORS allowed origin (e.g. `http://localhost:3000`) |
| `REACT_APP_API_URL` | `frontend/.env.development` | Backend API base URL |
| MySQL credentials | `backend/config/sqlconfigremote.js` | host, port, user, password, database |

---

## Known Issues & Security Notes

- **Plain-text passwords** — passwords are stored unhashed in both `users` and `userkyctable`. Hashing with bcrypt is strongly recommended before any production deployment.
- **Hardcoded email credentials** — a Gmail address and app-specific password are embedded in `backend/api/mail.js`. These should be moved to environment variables.
- **No HTTPS** — the server is HTTP-only. A reverse proxy (Nginx/Caddy) with TLS should front the app in production.
- **No rate limiting** — the login endpoint has no brute-force protection. Consider `express-rate-limit`.
- **Local file storage** — uploaded documents are stored on disk. A network outage or server move will lose files unless the `backend/uploads/` directory is backed up separately.
- **Missing `sqlconfig.js`** — the file imported by API modules as `../config/sqlconfig.js` is gitignored. The committed file is `sqlconfigremote.js`. Ensure the correct config file is present on every deployment target.
