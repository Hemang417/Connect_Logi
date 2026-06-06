import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// ✅ Load environment variables from correct .env file

// Load environment variables from correct .env file
const envFilePath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || "development"}`);
const result = dotenv.config({ path: envFilePath });
if (result.error) {
  throw new Error(`Failed to load .env file at ${envFilePath}`);
}

// Optional: Warn if JWT_SECRET is not set
if (!process.env.JWT_SECRET) {
  console.warn("⚠️  JWT_SECRET is not defined. Make sure it's set in your .env file.");
}

// Optional: Warn if JWT_SECRET is not set
if (!process.env.JWT_SECRET) {
  console.warn("⚠️  JWT_SECRET is not defined. Make sure it's set in your .env file.");
}

// Import routes
import AuthRoutes from "./routes/AuthRoutes.js";
import OrgganizationRoutes from "./routes/OrganizationRoutes.js";
import UserManagementRoutes from "./routes/UserManagementRoutes.js";
import ImportRoutes from "./routes/ImportRoutes.js";
import ExportRoutes from "./routes/ExportRoutes.js";
import ImpApprovalLogRoutes from "./routes/ImpApprovalLogRoutes.js";
import ExpApprovalLogRoutes from "./routes/ExpApprovalLogRoutes.js";
import AccountRoutes from "./routes/AccountRoutes.js";
import SalesRoutes from "./routes/SalesRoutes.js";
import WorkFlowRoutes from "./routes/WorkFlowRoutes.js";
import orgApprovalLogRoutes from "./routes/OrgApprovalLogRoutes.js";
import DashboardRoutes from "./routes/DashboardRoutes.js";
import NotificationAndReminderRoutes from "./routes/NotificationAndReminderRoutes.js";
import PermanentDeleteRoutes from "./routes/PermanentDeleteRoutes.js";
import EditLogRoutes from "./routes/EditLogRoutes.js";
import DelegationRoutes from "./routes/DelegationRoutes.js";
import ConnectSpaceRoutes from "./routes/ConnectSpaceRoutes.js";
import { cleanupExpiredLogins } from "./utils/loginCleanup.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from uploads
app.use("/uploads", express.static("uploads"));

// Mount all routes
app.use(AuthRoutes);
app.use(OrgganizationRoutes);
app.use(UserManagementRoutes);
app.use(ImportRoutes);
app.use(ExportRoutes);
app.use(ImpApprovalLogRoutes);
app.use(ExpApprovalLogRoutes);
app.use(AccountRoutes);
app.use(SalesRoutes);
app.use(WorkFlowRoutes);
app.use(orgApprovalLogRoutes);
app.use(DashboardRoutes);
app.use(NotificationAndReminderRoutes);
app.use(PermanentDeleteRoutes);
app.use(EditLogRoutes);
app.use(DelegationRoutes);
app.use(ConnectSpaceRoutes);

// Run initial login cleanup
(async () => {
  try {
    console.log("⏳ Initial login cleanup...");
    await cleanupExpiredLogins();
    console.log("✅ Initial cleanup complete.");
  } catch (err) {
    console.error("❌ Initial cleanup failed:", err.message);
  }
})();

// Periodic cleanup every 15 minutes
setInterval(async () => {
  try {
    console.log("⏳ Running scheduled login cleanup...");
    await cleanupExpiredLogins();
    console.log("✅ Scheduled cleanup done.");
  } catch (err) {
    console.error("❌ Scheduled cleanup failed:", err.message);
  }
}, 15 * 60 * 1000);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
});
