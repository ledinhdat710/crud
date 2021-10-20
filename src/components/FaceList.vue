<template>
  <div>
    <h1 style="text-align: center">{{ title }}</h1>
    <v-btn to="/add" text> Add </v-btn>
    <div class="search">
      <input type="text" placeholder="Search by name" v-model="name" />
      <button @click="searchName">Search</button>
    </div>
    <table>
      <tr>
        <th>Hinh anh</th>
        <th>Ho ten</th>
        <th>Ma so</th>
        <th>Nhom</th>
        <th>Thao tac</th>
      </tr>
      <tr v-for="post in getDisplayFace" v-bind:key="post.id">
        <td>{{ post.face_images }}</td>
        <td>{{ post.name }}</td>
        <td>{{ post.card_id }}</td>
        <td>{{ post.person_group_name }}</td>
        <td class="icon">
          <span
            ><font-awesome-icon icon="trash" @click="deleteFace(faces.id)"
          /></span>

          <span> <font-awesome-icon icon="pen" /></span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import AddFace from "./AddFace.vue";
import FaceDataService from "./services/FaceDataService";

export default {
  components: {
    AddFace,
  },
  data() {
    return {
      title: "Danh sach khuon mat",
      faces: [],
    };
  },
  methods: {
    retrieveFaces() {
      FaceDataService.getAll()
        .then((response) => {
          this.faces = response.data.map(this.getDisplayFace);
          console.log(response.data);
        })
        .catch((e) => {
          console.log("Error is " + e);
        });
    },
    refreshList() {
      this.retrieveFaces();
    },
    searchName() {
      FaceDataService.findByName(this.name)
        .then((response) => {
          this.faces = response.data.map(this.getDisplayFace);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteFace(id) {
      FaceDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayFace(face) {
      return {
        face_images: face.face_images,
        name: face.name,
        card_id: face.card_id,
        person_group_name: face.person_group_name,
      };
    },
    mounted() {
      this.retrieveFaces();
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