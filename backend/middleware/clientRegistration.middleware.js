import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directory for ctclients
const ctclientBaseDir = path.join(__dirname, "..", "uploads", "ctclients");
if (!fs.existsSync(ctclientBaseDir)) fs.mkdirSync(ctclientBaseDir, { recursive: true });

// Accepted MIME types
const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];

// Sanitize function
const sanitize = (str) => (str || "").trim().replace(/[<>:"|?*]/g, "").replace(/\s+/g, "_");

// Multer storage config
const storage = multer.diskStorage({
  // In clientRegistration.middleware.js, inside multer.diskStorage
  destination: (req, file, cb) => {
    let legalName = req.body.legalName;

    if (!legalName) {
      console.error("Missing legalName in request body for destination.");
      return cb(new Error("Legal Name is required to determine upload path."), false);
    }

    const sanitizedLegalName = sanitize(legalName); // Sanitize here
    const folderPath = path.join(ctclientBaseDir, sanitizedLegalName); // Use sanitized name

    try {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Created directory: ${folderPath}`);
      }
      console.log("Received upload for field:", file.fieldname);
      console.log("Resolved upload path:", folderPath);
      cb(null, folderPath);
    } catch (err) {
      console.error(`Error creating directory ${folderPath}:`, err);
      cb(err);
    }
  },

  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = sanitize(file.originalname.replace(ext, ""));
    const finalName = `${timestamp}_${file.fieldname}_${name}${ext}`;
    cb(null, finalName);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    console.error(`Rejected ${file.fieldname}: ${file.originalname} — ${file.mimetype}`);
    return cb(new Error("Only JPG, PNG, or PDF files are allowed."), false);
  }
  cb(null, true);
};

// Define all expected fields (static + up to 100 directors)
const staticFields = [
  { name: "panCopy", maxCount: 1 },
  { name: "gstCopy", maxCount: 1 },
  { name: "cinCopy", maxCount: 1 },
  { name: "aeoCertificate", maxCount: 1 },
  { name: "chaDoc", maxCount: 1 },
  { name: "logo", maxCount: 1 },
  { name: "branchHeadPhoto", maxCount: 1 },
  { name: "branchHeadID", maxCount: 1 },
  { name: "moa", maxCount: 1 },
  { name: "mou", maxCount: 1 },
  { name: "nda", maxCount: 1 }
];

const directorFields = Array.from({ length: 100 }, (_, i) => ([
  { name: `director-${i}-photo`, maxCount: 1 },
  { name: `director-${i}-doc`, maxCount: 1 }
])).flat();

const allUploadFields = [...staticFields, ...directorFields];

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).fields(allUploadFields);

// ✅ Define and export this middleware
export const uploadClientFiles = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'One or more files exceed the 5MB limit.' });
      }
      return res.status(400).json({ message: err.message || 'File upload failed.' });
    }
    next();
  });
};
