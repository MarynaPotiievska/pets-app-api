const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");

if (
  !process.env.CLOUDINARY_NAME ||
  !process.env.CLOUDINARY_KEY ||
  !process.env.CLOUDINARY_SECRET
) {
  throw new Error("Cloudinary configuration variables are missing.");
}

try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
} catch (error) {
  console.error("Cloudinary configuration error:", error);
  throw new Error("Cloudinary configuration failed.");
}

const folderNames = {
  users: "pet_app/users",
  pets: "pet_app/pets",
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const folder = req.params.userId ? folderNames.users : folderNames.pets;
    const { _id } = req.user;
    const fileName = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    const publicId = folder + _id + fileName;
    return { folder, allowedFormats: ["jpg", "png"], public_id: publicId };
  },
});

const fileFilter = (req, file, cb) => {
  if (file.size > 25165824) {
    cb(new Error("File size exceeds the limit of 3MB."));
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, limits: { fileSize: 25165824 }, fileFilter });

module.exports = upload;
