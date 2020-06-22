const getRows = document.getElementsByTagName('tr');
getRows[1].classList.add('top3');
getRows[2].classList.add('top3');
getRows[3].classList.add('top3');

for (let i = 4; i < getRows.length; i++) {
  getRows[i].classList.add('otherRows');
}