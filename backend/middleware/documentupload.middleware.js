import multer from "multer";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let jobFolder = "";

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let { jobnumber, type } = req.query;

        // Validate and sanitize query parameters
        if (!type) {
            console.error("Missing 'Import' parameter in the request.");
            return cb(new Error("'Import' is required."));
        }
        if (!jobnumber) {
            console.error("Missing 'jobnumber' parameter in the request.");
            return cb(new Error("'Jobnumber' is required."));
        }

        type = type.replace(/[<>:"|?*]/g, ""); // Remove invalid folder characters
        jobnumber = jobnumber.replace(/[<>:"|?*]/g, "").replace(/\//g, "-"); // Sanitize and replace slashes

        const uploadFolder = path.join(__dirname, "..", "uploads", type);

        // Ensure the base 'Imports' folder exists
        if (!fs.existsSync(uploadFolder)) {
            console.log("Base upload folder does not exist. Creating folder...");
            try {
                fs.mkdirSync(uploadFolder, { recursive: true });
                console.log("Base upload folder created successfully.");
            } catch (err) {
                console.error("Error creating base upload folder:", err);
                return cb(err);
            }
        }

        // Create the jobnumber-specific folder inside 'Imports'
         jobFolder = path.join(uploadFolder, jobnumber);

        if (!fs.existsSync(jobFolder)) {
            console.log(`Job folder for ${jobnumber} does not exist. Creating folder...`);
            try {
                fs.mkdirSync(jobFolder, { recursive: true });
                console.log(`Job folder for ${jobnumber} created successfully.`);
            } catch (err) {
                console.error("Error creating job folder:", err);
                return cb(err);
            }
        }
        cb(null, jobFolder); // Save files inside the jobnumber-specific folder
    },
});

const ALLOWED_MIME_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "image/jpeg",
    "image/jpg",
    "image/png",
];

export const upload_middleware = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB per file
    fileFilter: (req, file, cb) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            return cb(new Error(`File type '${file.mimetype}' is not allowed. Only PDF, Word, Excel, and image files are accepted.`), false);
        }
        cb(null, true);
    },
});

export {jobFolder};