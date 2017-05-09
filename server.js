const path = require('path');
const express = require('express');
const app = express();

const indexPath = path.join(__dirname, './public/index.html')
const publicPath = express.static(path.join(__dirname, './public/dist'))

app.use('/assets/', publicPath);
app.get('/', (req, res) => { res.sendFile(indexPath) });

app.listen(process.env.PORT || '80', () => {
  console.log('Example app listening on port 80!')
});
