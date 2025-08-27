import { motion } from 'framer-motion';
import Project from '../assets/skils.jpg';
import Edu from '../assets/education.jpg';
import Exp from '../assets/exp.jpg';

const About = () => (
    <motion.section
        id="about"
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
                About Me
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                    { title: 'Education', desc: "Bachelor's in Computer Science from Olusegun Agagu University with honors and multiple academic achievements.", img: Edu },
                    { title: 'Experience', desc: '2+ years of professional experience working with different clients and teams', img: Exp },
                    { title: 'Skills', desc: 'Front End development with expertise in React, Node.js, JavaScript, Tailwind and other technologies .', img: Project }
                ].map(({ title, desc, img }, index) => (
                    <motion.div
                        key={title}
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 * index, duration: 0.5, type: "spring" }}
                    >
                        <img src={img} alt={title} className="mx-auto mb-4 w-90 h-64 object-cover rounded" />
                        <h3 className="text-xl font-semibold">{title}</h3>
                        <p>{desc}</p>
                    </motion.div>
                ))}
            </div>
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
            >
                <h3 className="text-2xl font-semibold mb-4">My Story</h3>
                <p className="max-w-2xl mx-auto">
                    I've been passionate about technology since childhood, building my first website at age 18. This passion led me to pursue computer science and eventually turn my hobby into a career. When I'm not coding, you can find me playing chess, playing keyboard, reading sci-fi or psychological novels.
                </p>
            </motion.div>
            <div>
                <motion.h3
                    className="text-2xl font-semibold text-center mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    Technical Skills
                </motion.h3>
                <div className="space-y-4 max-w-2xl mx-auto">
                    {[
                        { skill: 'JavaScript/TypeScript', percent: 95 },
                        { skill: 'React/Next.js', percent: 90 },
                        { skill: 'Node.js', percent: 85 },
                        { skill: 'Tailwind', percent: 90 }
                    ].map(({ skill, percent }, index) => (
                        <motion.div
                            key={skill}
                            initial={{ opacity: 0, width: 0 }}
                            whileInView={{ opacity: 1, width: '100%' }}
                            transition={{ delay: 0.2 * index + 0.8, duration: 0.8 }}
                        >
                            <p>{skill}</p>
                            <div className="w-full bg-gray-200 rounded h-2">
                                <motion.div
                                    className="bg-blue-600 h-2 rounded"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${percent}%` }}
                                    transition={{ delay: 0.2 * index + 1.0, duration: 1 }}
                                ></motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </motion.section>
);

export default About;