function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1 : 1);
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((total, book) => {
    const borrowCount = book.borrows.filter((borrow) => borrow.id === account.id).length; 
    return total + borrowCount;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const borrowedBooks = books.filter((book) => {
    const isBorrowed = book.borrows.some((borrow) => borrow.id === accountId && !borrow.returned);
    return isBorrowed;
  });
  const booksWithAuthors = borrowedBooks.map((book) => {
    const authorId = book.authorId; 
    const author = authors.find((author) => author.id === authorId); 
    return {
      ...book,
      author,
    };
  }); 
  return booksWithAuthors;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
