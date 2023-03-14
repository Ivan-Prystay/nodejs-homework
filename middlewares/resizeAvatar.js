const jimp = require("jimp");

async function resizeAvatar(req, res, next) {
  const { path: tmpUpload } = req.file;
  try {
    const image = await jimp.read(tmpUpload);
    await image.resize(250, 250);
    await image.writeAsync(tmpUpload);
    next();
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = resizeAvatar;
