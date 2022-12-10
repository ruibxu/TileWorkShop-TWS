require('dotenv').config();
const cloudinary = require('cloudinary');
//const { raw } = require('body-parser');
//const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET   
});

// const TileSet_Editing_Storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req, file) => {
//         return {
//             public_id: req._id,
//             upload_preset: 'TileSet_Editor_Upload'
//         }
//     }
// })

// const TileMap_Using_Storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req, file) => {
//         return {
//             public_id: req._id,
//             upload_preset: 'TileMap_Uses_Upload'
//         }
//     }
// })

module.exports = { cloudinary };

