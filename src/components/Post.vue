<template>
  <div v-if="currentPost" class="edit-form py-3">
    <p class="headline">Edit</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentPost.userId"
        label="userId"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentPost.name"
        label="Ten"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentPost.body"
        label="Noi dug"
        required
      ></v-text-field>

      <label><strong>Status:</strong></label>
      {{ currentPost.published ? "Published" : "Pending" }}

      <v-divider class="my-5"></v-divider>

      <v-btn
        v-if="currentPost.published"
        @click="updatePublished(false)"
        color="primary"
        small
        class="mr-2"
      >
        UnPublish
      </v-btn>

      <v-btn
        v-else
        @click="updatePublished(true)"
        color="primary"
        small
        class="mr-2"
      >
        Publish
      </v-btn>

      <v-btn color="error" small class="mr-2" @click="deletePost">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updatePost"> Update </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a post</p>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "Post",
  data() {
    return {
      currentPost: null,
      message: "",
    };
  },
  methods: {
    getPost(id) {
      PostDataService.get(id)
        .then((response) => {
          this.currentPost = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentPost.id,
        userId: this.currentPost.userId,
        name: this.currentPost.name,
        body: this.currentPost.body,
        published: status,
      };

      PostDataService.update(this.currentPost.id, data)
        .then((response) => {
          this.currentPost.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePost() {
      PostDataService.update(this.currentPost.id, this.currentPost)
        .then((response) => {
          console.log(response.data);
          this.message = "Update thanh cong";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deletePost() {
      PostDataService.delete(this.currentPost.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getPost(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
