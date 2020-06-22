import express from 'express';
import path from 'path';
import formidable from 'formidable';
import fs from 'fs';
import mv from 'mv';
import board from './data/board.json';

const app = express();

// set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// set middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

const sortByPoints = (property) => {  
    return (a,b) => {  
       if(a[property] < b[property])  
          return 1;  
       else if(a[property] > b[property])  
          return -1;  
   
       return 0;  
    }  
 }

 const sortedBoard = board.sort(sortByPoints("points"));

app.get('/', (req, res) => {
    res.send('HNGi7 Central Leaderboard App Working!!!');
});

// loads the leader board
app.get('/getboard', (req, res) => {
    res.render('index', {
        title: 'HNGi7 Central Leaderboard (Sorted)',
        boards: sortedBoard
    });
});

// loads upload page
app.get('/upload', (req, res) => {
    res.render('upload');
})

// upload file
app.post('/fileupload', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) return err;
        const oldpath = files.filetoupload.path;
        const newpath = path.join(__dirname, './data/') + files.filetoupload.name;
        mv(oldpath, newpath, (err) => {
            if (err) throw err;
            res.redirect('/getboard');
        });
    })
})

// app.get('/delete', (req, res) => {
//     fs.unlink(path.join(__dirname, './data/board.json'), (err) => {
//         if (err) {
//             res.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">');
//             res.write('<div style="padding: 10px"></div>');
//             res.write('<div class="container alert alert-danger" role="alert">File already cleared | <a href="/upload">click to upload</a></div>');
//         } else {
//             res.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">');
//             res.write('<div style="padding: 10px"></div>');
//             res.write('<div class="container alert alert-success" role="alert">Successful Operation | <a href="/upload">click to upload</a></div>');
//         }
//     });
// })

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('server running on port 5000');
});

