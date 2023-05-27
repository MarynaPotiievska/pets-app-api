const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const folder = req.params.userId ? "pet_app/users" : "pet_app/pets";
    const { _id } = req.user;
    const fileName = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    const publicId = folder + _id + fileName;
    return { folder, allowedFormats: ["jpg", "png"], public_id: publicId };
  },
});

const upload = multer({ storage, limits: { fileSize: 300000 } });

module.exports = upload;
