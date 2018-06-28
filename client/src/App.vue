<template>
      <div id="main-container">
          <h1>My Reading List</h1>
          <book-list></book-list>
          <book-details></book-details>
          <add-book></add-book>
      </div>
</template>

<script>
import BookList from "./components/bookList.vue";
import AddBook from "./components/addBook.vue";
import BookDetails from "./components/bookDetails.vue";

// console.log(this.$apollo.provider);
export default {
  components: {
    "book-list": BookList,
    "add-book": AddBook,
    "book-details": BookDetails,
  },
  data () {
    // console.log(this.$apollo.queries);
    return {
    }
  }
}
</script>

<style>
body{
    background: #eee;
    font-family: 'Nunito SemiBold';
}
#main-container{
  padding: 0px;
  box-sizing: border-box;
  width: 60%;
  height: 100%;
}
#main-container h1{
  color: #444;
  text-align: center;
}
</style>
