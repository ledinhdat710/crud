import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";
Vue.use(VueAxios, axios);

export default axios.create({
    baseURL: "http://jsonplaceholder.typicode.com/",
    headers: {
        "Content-type": "application/json",
    }
});