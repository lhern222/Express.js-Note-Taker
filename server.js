//dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

//creating port 
const PORT = process.env.port || 3000;

//creating express server
const app = express();

//Middleware for passing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//Get Route for homepage
app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//display notes
app.get('api/notes', function(req, res) {
    fs.readFile('db/db.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        res.json(notes);
    });
});

//listening to server
app.listen(PORT, function() {
    console.log('Listen to PORT' + PORT);
});

//creating new post
app.post('/api/notes)', function (req, res) {
    let randLetter = String.fromCharCode(65+Math.floor(Math.random()*26));
    let id = randLetter + Date.now();
    let newNote = {
        id: id,
        title: req.body.title,
        text: req.body.text,
    };

    console.log(typeof notes);
    notes.push(newNote);
    const stringifyNote = JSON.stringify(notes);
    res.json(notes);
    fs.writeFile('db/db.json', stringifyNote, (err) => {
        if (err) console.log(err);
        else {
            console.log('Note has been successfully saved!')
        }
    });
});

//deleted notes for extra credit
