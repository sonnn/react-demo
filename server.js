const path = require('path');
const express = require('express');
const app = express();

const indexPath = path.join(__dirname, './public/index.html');
const publicPath = express.static(path.join(__dirname, './public/dist'));

app.use('/assets/', publicPath);
app.get('/profile/*', (req, res) => { res.sendFile(indexPath) });
app.get('/*', (req, res) => { res.sendFile(indexPath) });

app.listen(process.env.PORT || '3000', () => {
  console.log('Example app listening on port 3000!')
});
