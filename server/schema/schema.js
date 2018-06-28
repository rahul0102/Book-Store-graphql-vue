const graphql = require("graphql");

const authorController = require("../controllers/author.js");
const bookController = require("../controllers/book.js");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList } = graphql;

// Dummy data
// const books = [
//   {id: "1", name: "book1", genre: "A", authorId:"1"},
//   {id: "2", name: "book2", genre: "B", authorId:"2"},
//   {id: "3", name: "book3", genre: "A", authorId:"3"},
//   {id: "4", name: "book4", genre: "A", authorId:"3"},
//
// ];
//
// const authors = [
//   {id: "1", name: "author1", age: 25},
//   {id: "2", name: "author2", age: 60},
//   {id: "3", name: "author3", age: 39},
// ];

// const getAuthor = (id) => {
//   for(let i=0; i< authors.length; i++){
//       if (authors[i].id == id){
//           return authors[i];
//       }
//   }
//   return null;
// };
// const getBook = (id = null, authorId = null) => {
//   if(id){
//     for(let i=0; i< books.length; i++){
//         if (books[i].id == id){
//             return books[i];
//         }
//     }
//     return null;
//   }else if (authorId) {
//       let arr = [];
//       for(let i=0; i< books.length; i++){
//           if (books[i].authorId == authorId){
//               arr.push(books[i]);
//           }
//       }
//       return arr;
//   } else {
//       return null;
//   }
// };

// Book Type Schema ==========
const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                // console.log(parent);
                return authorController
                    .getAuthors(authorId = parent.authorId);

            }
        }
    })
});

// Author Type Schema ==========
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // console.log(parent);
                // let booksArr = [];
                // for( let i = 0; i < parent.books.length; i++ ){
                    // console.log(parent.id);
                    return bookController
                        .getBooksByAuthorId(parent.id);
                // }
                // console.log(booksArr);
                // return booksArr;
            }
        }
    })
});

// Define Root Query ==========
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                // code to fetch data from DB/ Other source
                return bookController
                    .getBooks(bookId = args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID, default:"1" }},
            resolve(parent, args){
                  // console.log(args);
                return authorController
                    .getAuthors(authorId = args.id);
            }
        },
        books: {
          type: new GraphQLList(BookType),
          // args: { limit: { type: GraphQLInt }},
          resolve(parent, args){
            // console.log("inside books");
              return bookController
                  .getBooks();
          }
        },
        authors: {
          type: new GraphQLList(AuthorType),
          // args: { limit: { type: GraphQLInt }},
          resolve(parent, args){
              return authorController
                  .getAuthors();
          }
        }
    }
});

// Create Mutation ==========
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args){
                // function to create author
                return authorController
                    .createAuthor(args);
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args){
                return bookController
                    .createBook(args);
            }
        }
    }
});

// create schema ==========
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

// export Schema
module.exports = schema;
