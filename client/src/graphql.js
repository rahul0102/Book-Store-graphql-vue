import gql from 'graphql-tag'

// create all queries here

// fetch books
export const BooksQuery = gql`
   {
      books{
          id,
          name,
      }
    }
`;

export const AuthorsQuery = gql`
    {
        authors{
            id,
            name
        }
    }
`;

export const AddBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name:$name, genre:$genre, authorId:$authorId){
            id,
            name
        }
    }
`;

export const getBookQuery = gql`
    query BookQuery($id: ID!){
        book(id:$id){
            name,
            genre,
            id,
            author{
              id,
              name,
              age,
              books{
                name,
                id
              }
            }
        }
    }
`;
