const express = require('express');

const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const adminRoute = require('./routes/admin');

const shopRoute = require('./routes/shop');

app.use('/admin', adminRoute);

app.use('/shop', shopRoute);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'pageNotFound.html'));
})

let port = 3000;

app.listen(port, (err) => {
    if (err) {
        console.log('Listening error : ' + err);
    }
    console.log(`Listening port:${port}...`);
})