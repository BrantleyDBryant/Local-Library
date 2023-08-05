function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
 // use filter to get the borrowed books and length to get the number of books borrowed 
 return books.filter((book) => book.borrows && book.borrows.some(borrows => !borrows.returned)).length;
}



function reduceArrayLengths(array) {
  return array.slice(0, 5);
}


function getMostCommonGenres(books) {
  //create blank object to store genre info
  let genreCount = {};
  //count how many times each genre appears in books array
  books.forEach((book) =>{
    const genre = book['genre']; 
    genreCount[genre] = (genreCount[genre] || 0) + 1;
  })
  //create array from genreCount object
  const genreArray = Object.entries(genreCount).map(([name, count]) => ({name, count}));
  //sort genreArray so genres with most entries are sorted first
  const sortedArray = genreArray.sort((genreA, genreB) => (genreB.count - genreA.count));
  //array objects look like this {name: 'genre', count: number} number represents amount of items in that genre
  //returns array with 5 or fewer objects representing most common genres from most common to least
  return reduceArrayLengths(sortedArray);
}

function getMostPopularBooks(books) {
  //create blank object to store borrow count
  let borrowCount = {};
  //count how many times each book has been checked out
  books.forEach((book) => {
    const borrowHistory = book.borrows;
    borrowCount[book.title] = borrowHistory.length; 
  })
  const popularBooksArray = Object.entries(borrowCount).map(([name, count]) => ({name, count}))
  //sort borrowedCount so most popular are sorted first
  const sortedArray = popularBooksArray.sort((bookA, bookB) => (bookB.count - bookA.count));
  //returns array containing 5 or fewer objects representing most popular books
  return reduceArrayLengths(sortedArray);
}

function getMostPopularAuthors(books, authors) {
  //create blank object to store info
  let borrowCount = {};
  // count how many times an authors book has been checked out
  books.forEach((book) => {
    const borrowHistory = book.borrows;
    //find author that matches current book author
    const author = authors.find((author) => author.id === book.authorId)
    const readableAuthorName = `${author.name.first} ${author.name.last}`;
    //add author and length of borrowHistory to borrowCount
    if (borrowCount[readableAuthorName]) {
      borrowCount[readableAuthorName] += borrowHistory.length;
    } else {
      borrowCount[readableAuthorName] = borrowHistory.length;
    }
  })
  const popularAuthorsArray = Object.entries(borrowCount).map(([name, count]) => ({name, count}));
  //sort borrowCount so authors with more counts are sorted first
  const sortedArray = popularAuthorsArray.sort((authorA, authorB) => (authorB.count - authorA.count));
  //return objects look like this: {name: 'author.name', count: number} number represents number of times authors books have been checked out
//return array containing 5 or less objects representing most popular authors
  return reduceArrayLengths(sortedArray);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
