import db from "../config/db.js";

const Project = {
  getAll: (callback) => {
    db.all("SELECT * FROM projects", [], callback);
  },
  create: (data, callback) => {
    const { title, description, image, video, link, tags } = data;
    db.run(
      "INSERT INTO projects (title, description, image, video, link, tags) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, image, video, link, tags],
      callback
    );
  },
};

export default Project;