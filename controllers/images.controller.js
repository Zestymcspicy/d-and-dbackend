const Image = require('../models/images.model');

exports.image_upload =  function(req, res, next) {
  if(req.file.size>2000000){
    return res.status(502).send({message: "Image is too large"})
  }
  if(req.file.mimetype !== "image/png"  && req.file.mimetype !== "image/jpeg") {
    return res.status(503).send({message: "file must be a .png/.jpg/.jpeg"})
  }
  console.log(req.file)

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
    return res.send({message: 'upload received'})
  })
}
