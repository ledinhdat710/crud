<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="face.face_images"
          label="Hinh anh"
          required
        ></v-text-field>

        <v-text-field
          v-model="face.name"
          label="Ho ten"
          required
        ></v-text-field>
        <v-text-field
          v-model="face.card_id"
          label="Ma so"
          required
        ></v-text-field>
        <v-text-field
          v-model="face.person_group_name"
          label="Nhom"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveFace">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Submitted successfully! </v-card-title>

        <v-card-subtitle>
          Click the button to add 
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newFace">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import FaceDataService from "../services/FaceDataService";

export default {
  name: "AddFace",
  data() {
    return {
      face: {
        id: null,
        face_images: "",
        name: "",
        card_id:"",
        person_group_name:"",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveFace() {
      var data = {
        face_images: this.face.face_images,
        name: this.face.name,
        card_id: this.face.card_id,
        person_group_name: this.face.person_group_name,
      };

      FaceDataService.create(data)
        .then((response) => {
          this.face.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newFace() {
      this.submitted = false;
      this.face = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>