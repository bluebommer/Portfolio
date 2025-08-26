import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    video: "",
    link: ""
  });
  const [tab, setTab] = useState("projects"); // "projects" or "blogs"
  const [posts, setPosts] = useState([]); // For preview

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", loginForm);
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      alert("Title and description are required");
      return;
    }

    try {
      const endpoint = tab === "projects" ? "/projects" : "/blogs";
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios.post(`http://localhost:5000${endpoint}`, form, config);
      setPosts([{ ...form, id: Date.now() }, ...posts]);
      setForm({ title: "", description: "", image: "", video: "", link: "" });
      alert(`${tab === "projects" ? "Project" : "Blog"} added successfully`);
    } catch (err) {
      alert("Failed to add: " + (err.response?.data?.error || "Server error"));
    }
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-lg space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={loginForm.username}
            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
            className="block w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            className="block w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Login</button>
        </form>
      </div>
    );
  }

  return (
    <motion.section
      id="admin"
      className="py-20 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Admin Panel
        </motion.h2>
        <div className="flex justify-center mb-4 space-x-4">
          <button
            onClick={() => setTab("projects")}
            className={`px-4 py-2 ${tab === "projects" ? "font-bold text-blue-600" : "text-gray-600"}`}
          >
            Projects
          </button>
          <button
            onClick={() => setTab("blogs")}
            className={`px-4 py-2 ${tab === "blogs" ? "font-bold text-blue-600" : "text-gray-600"}`}
          >
            Blogs
          </button>
        </div>
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border rounded p-2"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded p-2"
            rows="3"
            required
          />
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border rounded p-2"
          />
          <input
            type="url"
            name="video"
            value={form.video}
            onChange={handleChange}
            placeholder="Video URL (YouTube, Vimeo, etc.)"
            className="w-full border rounded p-2"
          />
          <input
            type="url"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Project Link"
            className="w-full border rounded p-2"
          />
          <motion.button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            Add {tab === "projects" ? "Project" : "Blog"}
          </motion.button>
        </motion.form>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-lg shadow-md p-4"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ delay: 0.1 * index, type: "spring" }}
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.description}</p>
                {post.video && (
                  <div className="mb-2">
                    <iframe
                      src={post.video}
                      title={post.title}
                      className="w-full h-48 rounded"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline block mb-2"
                  >
                    Visit Project
                  </a>
                )}
                <motion.button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                  whileTap={{ scale: 0.9 }}
                >
                  Delete
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default Admin;