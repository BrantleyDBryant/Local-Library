function findAuthorById(authors, id) { 
  // use find method to find author,id that matches parameter id and return that author object 
  return authors.find(authors => authors.id === id);
}

function findBookById(books, id) {
  // use find method to find book, id that matches parameter id and return book object 
  return books.find(books => books.id === id);
}


function partitionBooksByBorrowedStatus(books) { 
  //filter books to find !book.borrows.returned
  const borrowedBooks = books.filter((book) => !book.borrows[0].returned); 
  // filter books to find books.borrows.returned 
  const booksReturned = books.filter((book) => book.borrows[0].returned); 
 // create an array containing both arrays 
 const bookByBorrowed = [borrowedBooks, booksReturned]; 
 return bookByBorrowed
}

function getBorrowersForBook(book, accounts) {
  // get borrow history for book 
  const borrowHistory = book.borrows; 
  // map accounts object to find accounts.id that match borrowHistory.id 
  const transactions = borrowHistory.map((borrow) => {
    // find account.id that matched borrow.id 
    const account = accounts.find((user) => user.id === borrow.id); 
    return {
      ...borrow, 
      ...account
    };
  });
  return transactions.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
