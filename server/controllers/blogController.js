import Blog from "../models/Blog.js";

export const getBlogs = (req, res) => {
  Blog.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
};

export const addBlog = (req, res) => {
  const { title, description, link, tags } = req.body;
  const image = req.files?.image ? `/uploads/${req.files.image[0].filename}` : null;
  const video = req.files?.video ? `/uploads/${req.files.video[0].filename}` : null;

  Blog.create({ title, description, image, video, link, tags }, (err) => {
    if (err) return res.status(500).json({ error: "Insert failed" });
    res.json({ success: true, message: "Blog added!" });
  });
};