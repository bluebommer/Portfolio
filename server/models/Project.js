import db from "../config/db.js";

const Project = {
  getAll: (callback) => {
    db.all("SELECT * FROM projects ORDER BY id DESC", [], callback);
  },

  create: (data, callback) => {
    const { title, description, image, video, link, tags } = data;
    db.run(
      "INSERT INTO projects (title, description, image, video, link, tags) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, image, video, link, tags],
      callback
    );
  },

  delete: (id, callback) => {
    db.run("DELETE FROM projects WHERE id = ?", [id], callback);
  },

  findById: (id, callback) => {
    db.get("SELECT * FROM projects WHERE id = ?", [id], callback);
  },
};

export default Project;
