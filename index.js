const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const Detection = mongoose.model('Detection', new mongoose.Schema({
  filename: String,
  result: String,
  confidence: Number,
  detectedAt: { type: Date, default: Date.now }
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.post('/api/detect', upload.single('image'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const imageBuffer = fs.readFileSync(filePath);
    const response = await axios.post('https://api.deepware.ai/detect-image', imageBuffer, {
      headers: {
        'Authorization': `Bearer ${process.env.DEEPWARE_API_KEY}`,
        'Content-Type': 'application/octet-stream'
      }
    });
    fs.unlinkSync(filePath);
    const result = new Detection({
      filename: req.file.originalname,
      result: response.data.label,
      confidence: response.data.confidence
    });
    await result.save();
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Detection failed' });
  }
});

app.get('/api/history', async (req, res) => {
  try {
    const history = await Detection.find().sort({ detectedAt: -1 });
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not retrieve history' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
