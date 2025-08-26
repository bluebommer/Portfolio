import { motion } from 'framer-motion';
import DefaultProject from '../assets/type.jpg';

const BlogPostCard = ({ date, readTime, title, description, image }) => (
    <motion.div
        className="border rounded-lg p-6 shadow"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
    >
        <img
            src={image ? `http://localhost:5000${image}` : DefaultProject}
            alt={title}
            className="w-full h-48 object-cover mb-4 rounded"
        />
        <p className="text-gray-500 mb-2">{date} • {readTime}</p>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <motion.a
            href="#"
            className="text-blue-600 hover:underline"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
        >
            Read More →
        </motion.a>
    </motion.div>
);

export default BlogPostCard;