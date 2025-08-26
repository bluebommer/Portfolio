import db from "../config/db.js";

const Blog = {
  getAll: (callback) => {
    db.all("SELECT * FROM blogs ORDER BY date DESC", [], callback);
  },
  create: (data, callback) => {
    const { title, description, image, video, link, tags } = data;
    db.run(
      "INSERT INTO blogs (title, description, image, video, link, tags) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, image, video, link, tags],
      callback
    );
  },
};

export default Blog;