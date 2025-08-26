import { motion } from 'framer-motion';
import DefaultProject from '../assets/type.jpg';

const ProjectCard = ({ title, description, tags, image }) => (
    <motion.div
        className="border rounded-lg p-6 shadow"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
    >
        <img
            src={image ? `http://localhost:5000${image}` : DefaultProject}
            alt={title}
            className="w-full h-48 object-cover mb-4 rounded"
        />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
                <motion.span
                    key={tag}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 * index, duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                >
                    {tag}
                </motion.span>
            ))}
        </div>
    </motion.div>
);

export default ProjectCard;