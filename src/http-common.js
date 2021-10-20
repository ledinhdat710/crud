import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";
Vue.use(VueAxios, axios);

export default axios.create({
    baseURL: "http://103.31.127.151:9999",
    headers: {
        "Content-type": "application/json",
        "X-Face-Detection-Session-Key": "Eewv_oPnl16IDut_zL7B_Q",
    }
});