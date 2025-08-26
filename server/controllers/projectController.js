import Project from "../models/Project.js";

export const getProjects = (req, res) => {
  Project.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(rows);
  });
};

export const addProject = (req, res) => {
  const { title, description, link } = req.body;
  const image = req.files?.image ? `/uploads/${req.files.image[0].filename}` : null;
  const video = req.files?.video ? `/uploads/${req.files.video[0].filename}` : null;

  Project.create({ title, description, image, video, link }, (err) => {
    if (err) return res.status(500).json({ error: "Insert failed" });
    res.json({ success: true, message: "Project added!" });
  });
};