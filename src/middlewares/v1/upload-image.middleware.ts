import multer from "multer";
import { v4 } from "uuid";

const uploadImage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "../../")
  },
  filename(req, file, callback) {
    callback(null, `${v4()}_${file.originalname}`)
  },
})

export const uploadOneImageMiddleware = multer({ storage: uploadImage }).single('image');
export const uploadImagesMiddleware = multer({ storage: uploadImage }).array('images', 10);
