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


// Mockowane dane ogłoszeń
let advertisements = [
  {
    id: 1,
    title: 'Ogłoszenie wyróżnione',
    description: 'Opis ogłoszenia 1...',
    date: '2024-01-25',
    image: 'http://localhost:3001/assets/1705524885623.jpg', // Zaktualizowano link do obrazu
    important: true,
  },
  {
    id: 2,
    title: 'Ogłoszenie zwykłe',
    description: 'Opis ogłoszenia 2...',
    date: '2024-01-26',
    image: 'http://localhost:3001/assets/image-1706280014273.jpg', // Zaktualizowano link do obrazu
    important: false,
  },
  {
    id: 3,
    title: 'Ogłoszenie z bardzo długim opisem i obrazkiem',
    description:
      'Moim zdaniem to nie ma tak, że dobrze albo że nie dobrze. Gdybym miał powiedzieć, co cenię w życiu najbardziej, powiedziałbym, że ludzi. Ekhm... Ludzi, którzy podali mi pomocną dłoń, kiedy sobie nie radziłem, kiedy byłem sam. I co ciekawe, to właśnie przypadkowe spotkania wpływają na nasze życie.',
    date: '2024-01-28',
    image:
    'https://code.oursky.com/wp-content/uploads/2015/11/full-text-message-ios.gif', // Zaktualizowano link do obrazu
    important: false,
  },
];

// Mockowane dane użytkowników
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

// Obsługa wysyłania listy użytkowników
app.get('/users', (req, res) => {
  res.json(users);
});

// Obsługa wysyłania listy ogłoszeń
app.get('/advertisements', (req, res) => {
  res.json(advertisements);
});

// Definiowanie endpointu do obsługi żądań GET /assets/:imageName
app.get('/assets/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, 'assets', imageName);

  // Wysyłanie pliku obrazu w odpowiedzi
  res.sendFile(imagePath);
});

// Obsługa dodawania nowego ogłoszenia
app.post('/advertisements', upload.single('image'), (req, res) => {
  const newAdvertisement = req.body;
  newAdvertisement.id = advertisements.length + 1;

  // Usuń tę linię, ponieważ już nie używamy req.file.filename
  // newAdvertisement.image = req.file.filename;

  // Zamiast tego, ustaw image jako link do pliku, który został przesłany
  newAdvertisement.image = `http://localhost:3001/assets/${req.file.filename}`;

  advertisements.push(newAdvertisement);
  res.json(newAdvertisement);
app.get('/advertisements', async (req, res) => {
  try {
    const advertisements = await Advertisement.find();
    res.json(advertisements);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
