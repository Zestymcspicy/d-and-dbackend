const Image = require('../models/images.model');

exports.image_upload =  function(req, res, next) {
  console.log(req.file)

  if(req.file.size>2000000){
    return res.status(502).send({message: "Image is too large"})
  }
  if(req.file.mimetype !== "image/png"  && req.file.mimetype !== "image/jpeg") {
    return res.status(503).send({message: "file must be a .png/.jpg/.jpeg"})
  }

  let image = new Image(
    {
      name: req.file.originalname,
      img: req.file.buffer,
    }
  )

  image.save(function(err){
    if (err) {
      console.log(err);
      return next(err);
    }

    return res.send({image: image, message: 'upload received'})
  })
};

exports.image_get_all = function(req, res, next) {
  Image.find().then(x=> res.send({body:x}))
  .catch(err=> console.log(err))
};

exports.image_get = function(req, res, next) {
  console.log("Hey")
  Image.find({_id: req.params.id}).then(image => {
    res.send({body: image})
  })
}
