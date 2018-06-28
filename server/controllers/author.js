const Author = require("../models/author.js");

const createAuthor = async (authorData) => {
    let author = new Author({
        name: authorData.name,
        age: authorData.age,
    });

      return author.save();
};

const getAuthors = async (authorId = null) => {
    if (authorId){
        return Author.findById(authorId).exec();
    }else{
        return Author.find().exec();
    }
};

exports.createAuthor = createAuthor;
exports.getAuthors = getAuthors;
