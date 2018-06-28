<template>
  <div class="" id="book-list">
    <p v-if="loading > 0"> Loading . . </p>

    <ul v-else>
      <li v-for="book in books" v-on:click="selectBook(book.id)">{{ book.name }}</li>
    </ul>
  </div>
</template>

<script>
import { BooksQuery } from "../graphql.js"
import { bus } from "../main.js"

export default {
  data () {
    return {
      books: [],
      loading: 0,
      selected: null,
    }
  },
  methods: {
      selectBook: function (bookId) {
            bus.$emit("book-selected", bookId);
      }
  },
  // Apollo GraphQL
  apollo: {
      // update the books data
      books:{
          // graphql Query
          query: BooksQuery,
          loadingKey: 'loading',
          // update: function (data) {
          //     console.log("Data", data);
          //     return data;
          // }
      }
  },
}
</script>

<style scoped>
#book-list{
  padding: 0px;

}
#book-list li{
  display: inline-block;
  margin: 12px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #880E4F;
  box-shadow: 1px 2px 3px rgba(0,0,0,0.3);
  cursor: pointer;
  color: #880E4F;
}
</style>
