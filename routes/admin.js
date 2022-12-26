const express = require('express');

const path = require('path');

const fs = require('fs');


const router = express.Router();

router.get('/register', (req, res, next) => {
    return res.send("<form action='/admin/register' method='POST'><input type='text' name='username' placeholder='Username'/>" +
        "<input type='text' name='email' placeholder='email'/>" +
        "<input type='password' name='password' placeholder='password'/>" +
        "<button type='submit'>Add  user</button></form>"
    )
});

router.post('/register', (req, res, next) => {
    const data = req.body;
    let salted_data = ` ${data.username},${data.email},${data.password}`;
    fs.appendFile('users.txt', salted_data, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Data:${salted_data} was written successfully`);
        return res.redirect('/admin/users');
    });

});

router.get('/users', (req, res, next) => {
    fs.readFile('users.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        if (data.length > 1) {
            return res.send(data.split(' '))
        } else {
            return res.send(data);
        }
    })
    
})

router.get('/add-product', (req, res, next) => {
   console.log(path.join(__dirname,'./views','add-product.html'));
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
});

router.post('/product', (req, res, next) => {
    const { title } = req.body;

    let salted_data = ` ${title}`;

    fs.appendFile('product.txt', salted_data, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Data:${title} was written successfully`);
        return res.redirect('/admin/product');
    });

});

router.get('/product', (req, res, next) => {
    fs.readFile('product.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        return res.send(data.split('Product'))
    })
})



module.exports = router;