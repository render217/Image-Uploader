// const Image = require("../api/image.model");
const cloudinary = require("../middlewares/cloudinary");

exports.uploadImage = async (req, res, next) => {
  try {
    let image = req.file
    if(!image){
     return res.status(500).send({message:"Invalid type format"});
    }
    const result = await cloudinary.uploader.upload(req.file.path,{use_filename:true,folder:'image_uploader'});
    // const newImage = await Image.create({
    //   image: result.secure_url,
    //   cloudinaryId: result.public_id,
    // });
    res.send({imageUrl:result.secure_url});
  } catch (error) {
    console.log(error)
  }
};

exports.index = async (req, res, next) => {
  res.send('image route working');
};

