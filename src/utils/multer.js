// utils/multer.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Fayl yo'lini aniqlash (ESM uchun)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Storage sozlamasi
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // uploads papkasi project rootda
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

export default upload;
