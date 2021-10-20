<template>
  <div>
    <h1 style="text-align: center">{{ title }}</h1>
    <div class="search">
      <input type="text" placeholder="Search by Title" v-model="title" />
      <button @click="searchTitle">Search</button>
    </div>
    <table>
      <tr>
        <th>User Id</th>
        <th>ID</th>
        <th>Tieu de</th>
        <th>Noi dung</th>
        <th>Thao tac</th>
      </tr>
      <tr v-for="item in getDisplayPost" v-bind:key="item.id">
        <td>{{ item.userId }}</td>
        <td>{{ item.id }}</td>
        <td>{{ item.title}}</td>
        <td>{{ item.body }}</td>
        <td class="icon">
          <span
            ><font-awesome-icon icon="trash" @click="deletePost(posts.id)"
          /></span>

          <span> <font-awesome-icon icon="pen" /></span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import PostDataService from "./services/PostDataService";

export default {
  data() {
    return {
      title: "Danh sach Posts",
      posts: [],
    };
  },
  methods: {
    retrievePosts() {
      PostDataService.getAll()
        .then((response) => {
          this.posts = response.data.map(this.getDisplayPost);
          console.log(response.data);
        })
        .catch((e) => {
          console.log("Error is " + e);
        });
    },
    refreshList() {
      this.retrievePost();
    },
    searchTitle() {
      PostDataService.findByTitle(this.title)
        .then((response) => {
          this.posts = response.data.map(this.getDisplayPost);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deletePost(id) {
      PostDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayPost(post) {
      return {
        userId: post.userId,
        id: post.id,
        title: post.title,
       body: post.body,
      };
    },
    mounted() {
      this.retrievePost();
    },
  },
};
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
.icon {
  text-align: center;
}
.icon span {
  margin: 10px;
}
.search {
  margin-bottom: 20px;
}
</style>