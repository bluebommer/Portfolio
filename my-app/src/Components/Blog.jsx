import { useEffect, useState } from "react";
import BlogPostCard from "./BlogPostCard";
import { motion } from 'framer-motion';
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/blogs")
      .then(res => setBlogs(res.data))
      .catch(err => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <motion.section
        id="blog"
        className="py-20"
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
                Latest Blog Posts
            </motion.h2>
            <motion.p
                className="text-center mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                I share my thoughts on technology, development best practices, and industry trends.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                        <BlogPostCard
                            key={blog.id}
                            date={blog.date.split(' ')[0]} // Format date
                            readTime="5 min read"
                            title={blog.title}
                            description={blog.description}
                            image={blog.image}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-3">No blog posts available yet.</p>
                )}
            </div>
            <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
            >
                <motion.button
                    className="bg-blue-600 text-white px-6 py-2 rounded"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    View All Posts
                </motion.button>
            </motion.div>
        </div>
    </motion.section>
  );
};

export default Blog;