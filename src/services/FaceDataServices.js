import http from "../http-common";

class FaceDataService {
  getAll() {
    return http.get('/face-peoples');
  }

  get(id) {
    return http.get('/face-peoples/${id}');
  }

  create(data) {
    return http.post("/face-peoples", data);
  }

  update(id, data) {
    return http.put('/face-peoples/${id}', data);
  }

  delete(id) {
    return http.delete("/face-peoples/${id}");
  }

  deleteAll() {
    return http.delete('/face-peoples');
  }

  findByName(name) {
    return http.get('/face-peoples?name=${name}');
  }
}

export default new FaceDataService();