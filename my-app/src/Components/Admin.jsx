import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    video: "",
    link: "",
    tags: ""
  });
  const [tab, setTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Check for existing valid token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token is still valid by making a test request
      axios.get("http://localhost:5000/projects", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        setIsLoggedIn(true);
        fetchProjects();
        fetchBlogs();
      })
      .catch(() => {
        // Token is invalid, remove it
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      });
    }
  }, []);

  // Fetch existing data when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchProjects();
      fetchBlogs();
    }
  }, [isLoggedIn]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.username || !loginForm.password) {
      setLoginError("Please enter both username and password");
      return;
    }

    setLoading(true);
    setLoginError("");
    
    try {
      const res = await axios.post("http://localhost:5000/auth/login", loginForm);
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      setLoginForm({ username: "", password: "" });
    } catch (err) {
      setLoginError(err.response?.data?.error || "Login failed. Please check your credentials.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate('/');
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

    setLoading(true);
    try {
      const endpoint = tab === "projects" ? "/projects" : "/blogs";
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      await axios.post(`http://localhost:5000${endpoint}`, form, config);
      
      // Refresh the lists
      if (tab === "projects") {
        fetchProjects();
      } else {
        fetchBlogs();
      }

      setForm({ title: "", description: "", image: "", video: "", link: "", tags: "" });
      alert(`${tab === "projects" ? "Project" : "Blog"} added successfully`);
    } catch (err) {
      alert("Failed to add: " + (err.response?.data?.error || "Server error"));
    }
    setLoading(false);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      const endpoint = type === "project" ? "/projects" : "/blogs";
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      await axios.delete(`http://localhost:5000${endpoint}/${id}`, config);
      
      if (type === "project") {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        setBlogs(blogs.filter(b => b.id !== id));
      }
      
      alert(`${type} deleted successfully`);
    } catch (err) {
      alert("Failed to delete: " + (err.response?.data?.error || "Server error"));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter your credentials to access the admin panel</p>
          </div>

          {loginError && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {loginError}
              </div>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition duration-200 flex items-center justify-center"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ x: -5 }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center mx-auto"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Portfolio
            </motion.button>
          </div>

          {/* <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              Default credentials: admin / admin123
            </p>
          </div> */}
        </motion.div>
      </div>
    );
  }

  const currentItems = tab === "projects" ? projects : blogs;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                View Portfolio
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setTab("projects")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  tab === "projects"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Projects ({projects.length})
              </button>
              <button
                onClick={() => setTab("blogs")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  tab === "blogs"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Blogs ({blogs.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Add New Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow mb-8"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Add New {tab === "projects" ? "Project" : "Blog"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              
              {tab === "projects" && (
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="Tags (comma separated)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            </div>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              <input
                type="url"
                name="video"
                value={form.video}
                onChange={handleChange}
                placeholder="Video URL"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {tab === "projects" && (
              <input
                type="url"
                name="link"
                value={form.link}
                onChange={handleChange}
                placeholder="Project Link"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
            >
              {loading ? "Adding..." : `Add ${tab === "projects" ? "Project" : "Blog"}`}
            </button>
          </form>
        </motion.div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                {item.image && (
                  <img
                    src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>

                  {tab === "projects" && item.tags && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.split(',').map((tag, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm mb-2 block"
                    >
                      View Project →
                    </a>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id, tab === "projects" ? "project" : "blog")}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {currentItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No {tab} found. Add your first {tab === "projects" ? "project" : "blog post"} above!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;