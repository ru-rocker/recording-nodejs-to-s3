const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

const uploadRouter = require('./routes/upload');

app.use(express.static('public/assets'));

app.get('/audio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.use('/record', uploadRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening at http://localhost:${port}`);
});
