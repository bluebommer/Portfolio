import Project from "../models/Project.js";

export const getProjects = (req, res) => {
  Project.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
};

export const addProject = (req, res) => {
  const { title, description, link, tags } = req.body;
  const image = req.files?.image ? `/uploads/${req.files.image[0].filename}` : null;
  const video = req.files?.video ? `/uploads/${req.files.video[0].filename}` : null;

  Project.create({ title, description, image, video, link, tags }, (err) => {
    if (err) return res.status(500).json({ error: "Insert failed" });
    res.json({ success: true, message: "Project added!" });
  });
};

export const deleteProject = (req, res) => {
  const { id } = req.params;
  
  Project.delete(id, (err) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    res.json({ success: true, message: "Project deleted!" });
  });
};
