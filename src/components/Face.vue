<template>
  <div v-if="currentTutorial" class="edit-form py-3">
    <p class="headline">Edit</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentTutorial.title"
        label="Title"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentTutorial.description"
        label="Description"
        required
      ></v-text-field>

      <label><strong>Status:</strong></label>
      {{ currentTutorial.published ? "Published" : "Pending" }}

      <v-divider class="my-5"></v-divider>

      <v-btn
        v-if="currentTutorial.published"
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

      <v-btn color="error" small class="mr-2" @click="deleteTutorial">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateTutorial"> Update </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import FaceDataService from "../services/FaceDataService";

export default {
  name: "Face",
  data() {
    return {
      currentFace: null,
      message: "",
    };
  },
  methods: {
    getFace(id) {
      FaceDataService.get(id)
        .then((response) => {
          this.currentFace = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentFace.id,
        face_images: this.currentFace.face_images,
        name: this.currentFace.name,
        card_id: this.currentFace.card_id,
        person_group_name: this.currentFace.person_group_name,
        published: status,
      };

      FaceDataService.update(this.currentFace.id, data)
        .then((response) => {
          this.currentFace.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateFace() {
      FaceDataService.update(this.currentFace.id, this.currentFace)
        .then((response) => {
          console.log(response.data);
          this.message = "Update thanh cong";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteFace() {
      FaceDataService.delete(this.currentFace.id)
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
    this.getFace(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>