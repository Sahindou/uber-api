import multer from "multer";
import { v4 } from "uuid";

const uploadImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${v4()}_${file.originalname.replace(/ /g, "_")}`);
  }
});

const uploadImagesMiddleware = multer({ storage: uploadImage }).array("images", 10);
const uploadImageMiddleware = multer({ storage: uploadImage }).single("image");

export { uploadImagesMiddleware, uploadImageMiddleware };