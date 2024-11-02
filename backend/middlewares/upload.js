import multer from 'multer';
import path from 'path';

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the folder where images will be stored
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using Date and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Export the `upload` middleware
export default upload;
