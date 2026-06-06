import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base KYC directory
const kycDir = path.join(__dirname, "..", "uploads", "kyc");
if (!fs.existsSync(kycDir)) fs.mkdirSync(kycDir, { recursive: true });

// Unified Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = file.fieldname === "profilephoto" ? "ProfilePhoto" : "IdProof";
    const folderPath = path.join(kycDir, folderName);
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    // Ensure fullname is sanitized and fallback is safe
    const fullName = req.body.fullname?.trim().replace(/\s+/g, "_") || `unknown_${Date.now()}`;
    const ext = path.extname(file.originalname);
    cb(null, `${fullName}${ext}`);
  },
});

// Combined upload handler for both fields
export const uploadKYCFiles = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter: (req, file, cb) => {
    const profileAllowed = ["image/jpeg", "image/png"];
    const idAllowed = ["image/jpeg", "image/png","image/jpg", "application/pdf"];

    if (file.fieldname === "profilephoto") {
      if (!profileAllowed.includes(file.mimetype)) {
        return cb(new Error("Only JPEG/PNG allowed for Profile Photo"));
      }
    } else if (file.fieldname === "idproof") {
      if (!idAllowed.includes(file.mimetype)) {
        return cb(new Error("Only JPEG/PNG/PDF allowed for ID Proof"));
      }
    }
    cb(null, true);
  },
}).fields([
  { name: "profilephoto", maxCount: 1 },
  { name: "idproof", maxCount: 1 },
]);
