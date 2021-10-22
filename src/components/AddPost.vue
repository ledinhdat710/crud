<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="post.userId"
          label="userId"
          required
        ></v-text-field>

        <v-text-field
          v-model="post.name"
          label="Ho ten"
          required
        ></v-text-field>
        <v-text-field
          v-model="post.body"
          label="Noi dung"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="savePost">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Submitted successfully! </v-card-title>

        <v-card-subtitle> Click the button to add </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newPost">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "AddPost",
  data() {
    return {
      post: {
        id: null,
        userId: "",
        title: "",
        body: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    savePost() {
      var data = {
        userId: this.post.userId,
        name: this.post.name,
        body: this.post.body,
      };

      PostDataService.create(data)
        .then((response) => {
          this.post.id = response.post.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newPost() {
      this.submitted = false;
      this.post = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
