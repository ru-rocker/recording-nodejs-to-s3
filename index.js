const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const uploadRouter = require('./routes/upload');

app.use(express.static('public/assets'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.use('/record', uploadRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
