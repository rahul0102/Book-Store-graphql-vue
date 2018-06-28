<template>
  <div id="book-details">
    <h3 v-if="Object.keys(book).length < 1"> No Book Selected</h3>
    <div v-else>
        <h2>{{ book.name }}</h2>
        <p>Genre- {{ book.genre }}</p>
        <p>By- {{ book.author.name }}</p>
        <p>All Books By Author</p>
        <ul class="authors-books">
          <li v-for="a_book in book.author.books">{{ a_book.name }}</li>
        </ul>
    </div>
  </div>
</template>

<script>
import { getBookQuery } from "../graphql.js"
import { bus } from "../main.js";

export default {
    data(){
        return{
            book: {},
            selected: null
        }
    },
    // apollo: {
    //     book: {
    //         query: getBookQuery,
    //         variables: {
    //             id: this.selected
    //         }
    //     }
    // },
    created(){
        bus.$on("book-selected", (bookId) => {
            console.log("id:", bookId);
            this.selected = bookId;
            this.$apollo.query({
                query: getBookQuery,
                variables: {
                    id: this.selected
                }
            })
            .then((res) => {
              const { book } = res.data;
              this.book = book;
            });
        });
    }
}
</script>

<style scoped>
#book-details{
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background: #AD1457;
  padding: 30px;
  overflow: auto;
  box-shadow: -2px -3px 5px rgba(0,0,0,0.3);
  box-sizing: border-box;
  color: white;
}
</style>
