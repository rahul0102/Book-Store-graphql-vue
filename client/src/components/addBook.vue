<template>
    <div id="add-book">
      <form id="add-book-form" v-on:submit="addBook($event)">
          <div class="field">
              <label>Book name:</label>
              <input type="text" v-model="book.name" required/>
          </div>
          <div class="field">
              <label>Genre:</label>
              <input type="text" v-model="book.genre" required/>
          </div>
          <div class="field">
              <label>Author:</label>
              <select v-model="book.authorId" required>
                  <option value="" disabled>Select author</option>
                  <option v-if="loading > 0" disabled></option>
                  <option v-else v-for="author in authors" v-bind:value="author.id">{{ author.name }}</option>
              </select>
          </div>
          <button type="submit" class="add-book-btn">+</button>
      </form>
    </div>
</template>

<script>
import { AuthorsQuery, AddBookMutation, BooksQuery } from "../graphql.js"

export default {
    data(){
        return{
            authors: [],
            loading: 0,
            book: {
                name: "",
                genre: "",
                authorId: ""
            }
        }
    },
    methods: {
        addBook: function (event) {
            console.log(this.book);
            // call mutation
            this.$apollo.mutate({
                mutation: AddBookMutation,
                variables: {
                        name: this.book.name,
                        genre: this.book.genre,
                        authorId: this.book.authorId
                },
                refetchQueries: [ { query: BooksQuery }],
            })
            // empty the book data
            .then(() => {
                this.book.name = "";
                this.book.authorId = "";
                this.book.genre = "";
            });
            // stop page from reloading
            event.preventDefault();
        }
    },
    apollo: {
        authors: {
            query: AuthorsQuery,
            loadingKey: "loading",
            }
    }
}

</script>

<style scoped>
#add-book{
  background: #fff;
  padding: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 400px;
}

form .field{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}

form label{
  text-align: right;
  padding: 6px;
}

form select, form input{
  margin: 4px;
  padding: 6px;
  box-sizing: border-box;
}

form button{
  color: white;
  font-size: 2em;
  background: #AD1457;
  border:0;
  padding: 0 10px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  left: 10px;
}
</style>
