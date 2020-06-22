import express from 'express';
import path from 'path';
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

app.get('/getboard', (req, res) => {
    res.render('index', {
        title: 'HNGi7 Central Leaderboard (Sorted)',
        boards: sortedBoard
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('server running on port 5000');
});

