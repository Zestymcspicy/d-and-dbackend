const aws = require('aws-sdk');
const secret = require('../secret.js')

aws.config.region = 'us-east-1';
aws.config.credentials = ({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
  // accessKeyId: secret.AWSKey,
  // secretAccessKey: secret.AWSSecret
})

exports.get_signature = function(req, res) {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: 'dandd-uploads',
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://dandd-uploads.s3.amazonaws.com/${fileName}`
    };
    res.json(returnData);
    res.send();
  })
}
