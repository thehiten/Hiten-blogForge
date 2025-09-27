import React from "react";
import { motion } from "framer-motion";
import { 
  IoCodeSlashOutline, 
  IoServerOutline, 
  IoGlobeOutline, 
  IoRocketOutline,
  IoCheckmarkCircleOutline,
  IoStarOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoTrophyOutline,
  IoSparklesOutline
} from "react-icons/io5";

function About() {
  const skills = [
    {
      name: "MongoDB",
      description: "NoSQL database with flexible schema design",
      features: ["Database schemas", "CRUD operations", "Mongoose ODM", "Data modeling"],
      icon: IoServerOutline,
      color: "green"
    },
    {
      name: "Express.js",
      description: "Fast web framework for Node.js applications",
      features: ["RESTful APIs", "Middleware handling", "Authentication", "Server routing"],
      icon: IoCodeSlashOutline,
      color: "blue"
    },
    {
      name: "React.js",
      description: "Powerful frontend library for dynamic UIs",
      features: ["Component architecture", "React hooks", "State management", "Responsive design"],
      icon: IoGlobeOutline,
      color: "purple"
    },
    {
      name: "Node.js",
      description: "Server-side JavaScript runtime platform",
      features: ["Async programming", "Concurrent requests", "Scalable backends", "Performance optimization"],
      icon: IoRocketOutline,
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <IoSparklesOutline className="w-8 h-8 text-blue-500" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              About The Developer
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Hiten</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            A passionate Computer Science student at Chandigarh University, building amazing web experiences with the MERN stack.
          </p>
        </motion.div>

        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-neutral-800 rounded-3xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-8 md:p-12 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Passionate Developer & Student
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                As a <span className="font-semibold text-blue-600">Computer Science student</span> at 
                <span className="font-semibold text-blue-600"> Chandigarh University</span>, I've built a strong foundation in 
                both theoretical and practical aspects of the field. My journey in web development has led me to master the MERN stack and create meaningful digital experiences.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <IoSchoolOutline className="w-5 h-5 text-purple-500" />
                  <span className="text-neutral-600 dark:text-neutral-400">Chandigarh University</span>
                </div>
                <div className="flex items-center gap-2">
                  <IoCodeSlashOutline className="w-5 h-5 text-blue-500" />
                  <span className="text-neutral-600 dark:text-neutral-400">MERN Developer</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                <div className="w-full h-full rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                  <IoPersonOutline className="w-32 h-32 text-neutral-400" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <IoTrophyOutline className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              MERN Stack Expertise
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Comprehensive knowledge and hands-on experience with modern web development technologies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${skill.color}-500 to-${skill.color}-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                        {skill.name}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                        {skill.description}
                      </p>
                      <ul className="space-y-2">
                        {skill.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <IoCheckmarkCircleOutline className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              {feature}
                            </span>
        </li>
                        ))}
          </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-neutral-800 rounded-3xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-8 md:p-12 mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Projects & Practical Experience
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Real-world applications of my MERN stack knowledge through coursework and personal projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IoCodeSlashOutline className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Web Applications
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Developed a range of full-stack web applications using modern technologies and best practices
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IoStarOutline className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Collaboration
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Worked with teams to solve real-world problems and deliver high-quality solutions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IoRocketOutline className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Full Lifecycle
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Managed complete application lifecycle from development to deployment and maintenance
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <div className="max-w-3xl mx-auto">
            <IoTrophyOutline className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's collaborate on exciting projects and bring your ideas to life with modern web technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://the-hiten-portfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <IoGlobeOutline className="w-5 h-5" />
                View Portfolio
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-200"
              >
                <IoStarOutline className="w-5 h-5" />
                Get In Touch
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
