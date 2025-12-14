const axios = require("axios");
const sharp = require("sharp");
const heicConvert = require("heic-convert");

const convertHeicFromUrl = async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "Missing image url or token" });
    }
    // 1️⃣ Fetch ảnh HEIC từ URL
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 15000,
    });

    const buffer = Buffer.from(response.data);

    // HEIC → JPEG
    const outputBuffer = await heicConvert({
      buffer: buffer,
      format: "JPEG",
      quality: 1,
    });

    // 3️⃣ Trả ảnh JPG
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=86400"); // cache 1 ngày
    res.send(outputBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Convert failed" });
  }
};

module.exports = {
  convertHeicFromUrl,
};
