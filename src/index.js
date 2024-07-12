const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.use(require('./routes'));


app.use(express.static(path.join(__dirname,'public')));

server.listen(3000, () => {
    console.log('Servidor en el Puerto 3000');
});