const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const folder = req.params.userId ? "users" : "pets";    
    const publicId = "pet_app/" + folder + file.filename;
    return {folder, allowedFormats: ["jpg", "png"], public_id: publicId}
  }
});

const upload = multer({ storage });

module.exports = upload;
