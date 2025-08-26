import { motion } from 'framer-motion';

const Header = () => (
    <motion.header
        className="bg-gray-900 text-white py-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
    >
        <div className="container mx-auto px-4 flex justify-between items-center">
            <motion.h1
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Portfolio
            </motion.h1>
            <nav className="space-x-4">
                {['Home', 'About', 'Projects', 'Blog', 'Contact', 'Admin'].map((item, index) => (
                    <motion.a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="hover:text-gray-300"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.1, color: '#d1d5db' }}
                    >
                        {item}
                    </motion.a>
                ))}
            </nav>
        </div>
    </motion.header>
);

export default Header;