import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const uploadFolder = path.resolve(__dirname, "../tmp");

export default {
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(req, file, callback) {
      const allowedMimes = [
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/gif",
      ];

      const fileName = `${uuidv4()}`;

      if (allowedMimes.includes(file.mimetype)) {
        return callback(null, fileName);
      } else {
        new Error("Invalid file type.");
      }
    },
  }),
};
