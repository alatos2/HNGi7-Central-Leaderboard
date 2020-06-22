const express = require('express');
const path = require('path');
const board = require('./data/board.json');

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
    res.render('index', {
        title: 'HNGi7 Central Leaderboard (Sorted)',
        boards: sortedBoard
    });
});

// app.get('/all', (req, res) => {
//     res.status(200).json({ sortedBoard });
// })

app.listen(3000, () => {
    console.log('server running on port 3000');
});

