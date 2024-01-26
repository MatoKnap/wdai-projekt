const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/wdai', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const advertisementSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  image: Buffer,
  important: Boolean,
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage });

let users = [
  {
    id: 1,
    login: 'dziekan',
    password: 'supersecret123',
    vip: true,
  },
  {
    id: 2,
    login: 'student',
    password: 'panda3',
    vip: false,
  },
  {
    id: 3,
    login: 'doktor',
    password: 'kochamAGH<3',
    vip: false,
  },
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/advertisements', async (req, res) => {
  try {
    const advertisements = await Advertisement.find();
    res.json(advertisements);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/assets/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, 'assets', imageName);

  res.sendFile(imagePath);
});


app.post('/advertisements', upload.single('image'), async (req, res) => {
  try {
    const newAdvertisement = req.body;
    newAdvertisement.image = req.file.buffer;

    const advertisement = new Advertisement(newAdvertisement);
    await advertisement.save();

    res.json(advertisement);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
