const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('*', function(req, res) {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});