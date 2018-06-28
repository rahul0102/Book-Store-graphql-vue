const Book = require("../models/book.js");

const createBook = async (bookData) => {
    let book = new Book({
        name: bookData.name,
        genre: bookData.genre,
        authorId: bookData.authorId
    });

    return book.save();
};

const getBooks = async (bookId = null) => {
    if(bookId){
        return Book.findById(bookId).exec();
    }else {
        return Book.find().exec();
    }

};

const getBooksByAuthorId = async (authorId) => {
    return Book.find({ authorId: authorId });
};
exports.createBook = createBook;
exports.getBooks = getBooks
exports.getBooksByAuthorId = getBooksByAuthorId;
