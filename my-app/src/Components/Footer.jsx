import { motion } from 'framer-motion';

const Footer = () => (
    <motion.footer
        className="bg-gray-900 text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
    >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h3 className="text-xl font-semibold mb-4">Portfolio</h3>
                <p>Creating digital experiences that inspire and deliver results.</p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                    {['Home', 'About', 'Projects', 'Blog', 'Contact'].map((item, index) => (
                        <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 * index, duration: 0.5 }}
                        >
                            <a
                                href={`#${item.toLowerCase()}`}
                                className="hover:text-gray-300"
                                style={{ transition: 'color 0.3s ease' }}
                            >
                                {item}
                            </a>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                <h3 className="text-xl font-semibold mb-4">Services</h3>
                <ul className="space-y-2">
                    {['Web Development', 'UI/UX Design', 'Consulting'].map((service, index) => (
                        <motion.li
                            key={service}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 * index, duration: 0.5 }}
                        >
                            {service}
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
            >
                <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
                <p className="mb-4">Subscribe to my newsletter for the latest updates and articles.</p>
                <motion.input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded mb-2 text-gray-900"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                />
                <motion.button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Subscribe
                </motion.button>
            </motion.div>
        </div>
        <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
        >
            <p>© 2025 My Portfolio. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4">
                {['WhatsApp', 'Twitter', 'Linkedin', 'Github'].map((platform, index) => (
                    <motion.a
                        key={platform}
                        href="#"
                        className="text-gray-400"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 * index + 0.2, duration: 0.5, type: "spring" }}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/></svg>
                    </motion.a>
                ))}
            </div>
        </motion.div>
    </motion.footer>
);

export default Footer;