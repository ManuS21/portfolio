import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';



function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [vantaEffect, setVantaEffect] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // First, let's create a dedicated function to add the NET effect script
    const addNetScript = () => {
      return new Promise((resolve) => {
        // Create script element for the NET effect
        const netScript = document.createElement('script');
        // Use minified version directly from CDN to avoid issues
        netScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js";
        netScript.async = true;
        netScript.onload = () => resolve();
        document.head.appendChild(netScript);
      });
    };
    
    // Function to initialize Three.js
    const loadThreeJs = () => {
      return new Promise((resolve) => {
        const threeScript = document.createElement('script');
        threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
        threeScript.async = true;
        threeScript.onload = () => resolve();
        document.head.appendChild(threeScript);
      });
    };
    
    // Main initialization function
    const initializeVanta = async () => {
      if (vantaEffect) return;
      
      // First load Three.js
      await loadThreeJs();
      
      // Then load the NET effect
      await addNetScript();
      
      // Now initialize the effect
      if (window.VANTA && window.VANTA.NET) {
        const effect = window.VANTA.NET({
          el: heroRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0x121212,
          color: 0x6d28d9, // Purple color matching your theme
          points: 12,
          maxDistance: 25,
          spacing: 18,
          showDots: true
        });
        
        setVantaEffect(effect);
      }
    };
    
    // Start initialization
    initializeVanta();

    // Scroll event handler
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = 'home';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => {
      if (vantaEffect) vantaEffect.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [vantaEffect]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const popIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 20px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 }
    }
  };

  const navVariants = {
    closed: { x: '100%' },
    open: { 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <div className="app">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          MS
        </motion.div>
        <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <div className="hamburger"></div>
        </div>
        <motion.nav 
          className={isMenuOpen ? 'active' : ''}
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={navVariants}
        >
          <motion.ul variants={staggerContainer} initial="hidden" animate="visible">
            {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
              <motion.li key={section} variants={fadeIn}>
                <a 
                  href={`#${section}`} 
                  className={activeSection === section ? 'active' : ''} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>
      </motion.header>

      <section id="home" className="hero" ref={heroRef}>
        {/* The Vanta.js effect will be applied to this section */}
        <div className="vanta-background"></div>
        
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeIn}>Manu Shukla</motion.h1>
          <motion.h2 variants={fadeIn}>Computer Science </motion.h2>
          <motion.p variants={fadeIn}>Building innovative solutions and experiences with code.</motion.p>
          <motion.div className="cta-buttons" variants={staggerContainer}>
            <motion.a 
              href="#projects" 
              className="cta-primary"
              variants={popIn}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a 
              href="#contact" 
              className="cta-secondary"
              variants={popIn}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div 
          className="social-links"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {[
            { href: "https://github.com/ManuS21", icon: "fab fa-github", label: "GitHub" },
            { href: "https://linkedin.com/in/manu-shukla-4a9707271", icon: "fab fa-linkedin", label: "LinkedIn" },
            { href: "mailto:mshukla@uoregon.edu", icon: "fas fa-envelope", label: "Email" },
            { href: `${process.env.PUBLIC_URL}/Resume-Manu.pdf`, icon: "fas fa-file-alt", label: "Resume" }
          ].map((social, index) => (
            <motion.a 
              key={index}
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={social.label}
              whileHover={{ y: -5, color: "#6d28d9" }}
              whileTap={{ scale: 0.9 }}
            >
              <i className={social.icon}></i>
            </motion.a>
          ))}
        </motion.div>
      </section>

      <section id="about" className="about">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2>About Me</h2>
          <div className="underline"></div>
        </motion.div>
        <motion.div 
          className="about-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div className="about-photo" variants={slideInRight}>
        <motion.img 
            src={`${process.env.PUBLIC_URL}/manu-photo.jpg`} 
            alt="Manu Shukla" 
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />
          </motion.div>
          <motion.div className="about-text" variants={slideInLeft}>
            <p>I'm a Computer Science student at the University of Oregon with a minor in Mathematics, graduating in June 2025. My passion lies in developing innovative software solutions and working with cutting-edge technologies.</p>
            <p>With experience in full-stack development, AI implementation, and database optimization, I aim to create impactful applications that solve real-world problems.</p>
            <motion.div 
              className="education"
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              <h3>Education</h3>
              <div className="education-item">
                <h4>Bachelor of Science in Computer Science</h4>
                <p>University of Oregon • Eugene, OR</p>
                <p>Minor in Mathematics • Graduation: June 2025</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section id="experience" className="experience">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2>Experience</h2>
          <div className="underline"></div>
        </motion.div>
        <div className="timeline">
          {[
            {
              date: "June 2024 - September 2024",
              title: "Software Engineer Intern",
              company: "Humboldt • Eugene, OR",
              details: [
                "Engineered an anti-phishing system with advanced AI algorithms and secure tokenization",
                "Developed a prototype leveraging trackable input tokens, achieving a 90% reduction in phishing-related incidents",
                "Designed AI agents to generate dynamic credentials for phishing websites, simulating target-specific attacks"
              ]
            },
            {
              date: "June 2023 - September 2023",
              title: "Software Engineer Intern",
              company: "GEODIS • Brentwood, TN",
              details: [
                "Engineered SQL queries, reducing database execution time by 35%, improving operational efficiency",
                "Automated data synchronization using Apache NiFi, resolving 60,000+ inconsistencies",
                "Streamlined data collection and categorization processes using RPA, increasing operational throughput by 40%",
                "Built REST API integrations within ERP systems, automating daily exchange rate updates"
              ]
            },
            {
              date: "June 2023 - September 2023",
              title: "Private Programming Tutor",
              company: "Nashville, TN",
              details: [
                "Designed and delivered a personalized Python curriculum to 20+ students",
                "Assisted students in developing problem-solving skills, improving debugging efficiency",
                "Performed preliminary and final tests, resulting in technical skill improvements of 40%"
              ]
            }
          ].map((experience, index) => (
            <motion.div 
              className="timeline-item" 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
              custom={index}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div 
                className="timeline-dot"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
              ></motion.div>
              <motion.div 
                className="timeline-content"
                variants={slideInRight}
                transition={{ delay: index * 0.2 + 0.2 }}
              >
                <div className="timeline-date">{experience.date}</div>
                <h3>{experience.title}</h3>
                <h4>{experience.company}</h4>
                <ul>
                  {experience.details.map((detail, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.4 + (i * 0.1) }}
                    >
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="projects">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2>Projects</h2>
          <div className="underline"></div>
        </motion.div>
        <motion.div 
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {/* Added 'link' property to each project */}
          {[
            {
              title: "NutrifyAI",
              date: "February 2025 - March 2025",
              role: "Full Stack Developer",
              tech: ["Node.js","React", "Flask", "OpenAI API", "Kroger API"],
              link: "https://github.com/ManuS21/Nutrify",
              details: [
                "Created a high-performance recipe generation system with Flask and OpenAI API, delivering complete structured recipes in under 5 seconds while maintaining a 97% success rate in parsing ingredient lists accurately",
                "Optimized Kroger API integration to handle over 10,000 unique food items with automatic UPC code matching, reducing manual ingredient selection time by 85% compared to traditional grocery shopping",
                "Engineered a responsive frontend with React that achieved 99.8% uptime and sub-300ms response times even under peak loads of 500+ concurrent users during meal planning periods"
              ]
            },
            {
              title: "Pattern Auth",
              date: "January 2025 - March 2025",
              role: "Full Stack Developer",
              tech: ["Next.js", "Node.js", "Render", "SQLite","Swift"],
              link: "https://github.com/ManuS21/Better-2FA",
              details: [
                "Created a full-stack authentication system with a RESTful API, web interface, and mobile application that processed over 10,000 successful logins with zero security breaches during initial deployment",
                "Developed a pattern-based verification system that reduced password reset requests by 75% while increasing overall authentication success rates by 23% compared to traditional 2FA methods",
                "Built a responsive authentication platform handling concurrent user loads of 500+ simultaneous authentications with average response times under 300ms, improving overall system throughput by 40%"
              ]
            },
            {
              title: "Grade-Visualizer",
                date: "January 2024 - March 2024",
                role: "Full Stack Developer",
                tech: ["Tkinter", "Python", "MongoDB","Beautiful Soup"],
                link: "https://github.com/ManuS21/Grade-Visualizer",
                details: [
                  "Created a grade visualizer application enabling users to filter courses by name or instructor and instantly see the percentage of A’s awarded",
                  "Implemented a GUI-centric workflow throun tkinter separating core user interactions from admin-level tasks for clearer functionality and maintenance",
                  "Built robust data pipelines using scripts to ensure efficient data ingestion, error resolution, and streamlined MongoDB operations"
                ]
            },
            {
              title: "Constella Mobile",
              date: "June 2024 - July 2024",
              role: "Full Stack Developer",
              tech: ["Swift", "Flask", "Firebase", "Heroku"],
              link: "https://github.com/ManuS21/Constella",
              details: [
                "Launched a scalable iOS app that surpassed 100 users in its first month, generated $2,400 in revenue, and earned a 5-star rating—achieving first-time App Store approval and reducing release cycles by 74% through automated CI/CD",
                "Engineered a microservices architecture with Flask and Firebase Realtime Database, processing over 12,000 API requests daily at 99.95% uptime. Implemented role-based access control, JWT authentication, and 28 documented RESTful endpoints",
                "Developed a responsive Swift framework with 87% code reusability across Apple devices, improving cold starts by 42% and memory usage by 35%. Deployed on Heroku with auto-scaling to handle up to 500 concurrent users"
              ]
            },
            {
                title: "Meal Tracker",
                date: "January 2024 - March 2024",
                role: "Full Stack Developer",
                tech: ["Swift", "SQLite", "BiteAI","Flask"],
                link: "https://github.com/ManuS21/Food-Tracker",
                details: [
                  "Created a phone-based frontend that quickly snaps photos of your meals, which are then forwarded to BiteAI’s advanced image recognition engine. Leveraging a reference library of over 100,000 images, it identifies each food item with more than 90% accuracy, ensuring precise, automated meal logging",
                  "Recognized, the system estimates portion sizes within a ±10% margin and calculates calories along with key macronutrients (protein, carbohydrates, and fats) to within ±5% deviation, referencing a 25,000-item nutritional database grounded in USDA standards",
                  "Analyzed meals are automatically logged and stored, enabling users to review past entries, monitor daily nutrient intake, and set personalized goals—turning real-time nutritional insights into actionable habits for better health"
                ]
            },
            {
                title: "Portfolio",
                date: "March 2025 - Current",
                role: "Full Stack Developer",
                tech: ["Node.JS", "GH-Pages", "React","Framer Motion"],
                link: "https://github.com/ManuS21/portfolio",
                details: [
                  "Developed a dynamic, responsive portfolio website using React, Framer Motion, and Vanta.js to deliver an engaging, animated user experience",
	                "Designed a modern, dark-themed UI with custom CSS and a mobile-first layout, featuring smooth scroll navigation and a fixed header",
	                "Implemented interactive animations and intuitive UI elements that enhance usability across desktop and mobile devices",
	                "Streamlined deployment with GitHub Pages and automated build scripts, ensuring efficient continuous integration and delivery"
                ]
              }
            
          ].map((project, index) => (
            <motion.div 
              className="project-card" 
              key={index}
              variants={popIn}
              whileHover="hover"
              custom={index}
              // ---- Added onClick to open link in a new tab
              onClick={() => window.open(project.link, "_blank")} 
            >
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className="project-date">{project.date}</span>
              </div>
              <p className="project-role">{project.role}</p>
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <motion.span 
                    key={i}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(109, 40, 217, 0.3)" }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              <ul className="project-details">
                {project.details.map((detail, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                  >
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="skills" className="skills">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2>Technical Skills</h2>
          <div className="underline"></div>
        </motion.div>
        
        <motion.div 
          className="skills-categories"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {[
            {
              title: "Programming Languages",
              skills: [
                { name: "Python", icon: "fab fa-python", color: "python" },
                { name: "C", icon: "fab fa-cuttlefish", color: "c" },
                { name: "C++", icon: "fas fa-code", color: "cpp" },
                { name: "C#", icon: "fas fa-hashtag", color: "csharp" },
                { name: "JavaScript", icon: "fab fa-js", color: "js" },
                { name: "HTML", icon: "fab fa-html5", color: "html" },
                { name: "CSS", icon: "fab fa-css3-alt", color: "css" },
                { name: "Bash/Unix", icon: "fas fa-terminal", color: "bash" },
                { name: "UIPath", icon: "fas fa-robot", color: "git" }
              ]
            },
            {
              title: "Web Development",
              skills: [
                { name: "React", icon: "fab fa-react", color: "react" },
                { name: "Node.js", icon: "fab fa-node-js", color: "node" },
                { name: "SQL", icon: "fas fa-database", color: "sql" },
                { name: "Next.js", icon: "fas fa-n", color: "next" },
                { name: "Flask", icon: "fas fa-flask", color: "flask" }
              ]
            },
            {
              title: "Machine Learning & AI",
              skills: [
                { name: "TensorFlow", icon: "fas fa-brain", color: "tensorflow" },
                { name: "PyTorch", icon: "fas fa-fire", color: "pytorch" },
                { name: "NumPy", icon: "fas fa-calculator", color: "numpy" },
                { name: "Pandas", icon: "fas fa-table", color: "pandas" }
              ]
            },
            {
              title: "Developer Tools & Technologies",
              skills: [
                { name: "Git", icon: "fab fa-git-alt", color: "git" },
                { name: "Docker", icon: "fab fa-docker", color: "docker" },
                { name: "Kubernetes", icon: "fas fa-dharmachakra", color: "kubernetes" },
                { name: "AWS", icon: "fab fa-aws", color: "aws" },
                { name: "Google Cloud", icon: "fab fa-google", color: "gcp" },
                { name: "Linux", icon: "fab fa-linux", color: "linux" },
                { name: "MongoDB", icon: "fas fa-leaf", color: "mongodb" },
                { name: "Apache NiFi", icon: "fas fa-droplet", color: "aws" }
              ]
            },
            {
              title: "Game Development & Simulation",
              skills: [
                { name: "Unity", icon: "fab fa-unity", color: "unity" },
                { name: "Unreal Engine", icon: "fas fa-gamepad", color: "unreal" }
              ]
            }
          ].map((category, categoryIndex) => (
            <motion.div 
              className="skills-category" 
              key={categoryIndex}
              variants={slideInLeft}
              custom={categoryIndex}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3>{category.title}</h3>
              <div className="skills-grid">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    className="skill-item" 
                    key={skillIndex}
                    whileHover={{ 
                      y: -5, 
                      backgroundColor: "rgba(109, 40, 217, 0.15)",
                      boxShadow: "0 10px 25px rgba(109, 40, 217, 0.2)" 
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (skillIndex * 0.05) }}
                  >
                    <motion.div 
                      className={`skill-icon ${skill.color}`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <i className={skill.icon}></i>
                    </motion.div>
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="contact" className="contact">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2>Get In Touch</h2>
          <div className="underline"></div>
        </motion.div>
        <motion.div 
          className="contact-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <motion.div 
            className="contact-social-links"
            variants={fadeIn}
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '2rem', 
              margin: '3rem auto',
              maxWidth: '800px',
              width: '100%'
            }}
          >
            {[
              { href: "mailto:mshukla@uoregon.edu", icon: "fas fa-envelope", label: "Email", text: "Email Me" },
              { href: "https://github.com/ManuS21", icon: "fab fa-github", label: "GitHub", text: "GitHub" },
              { href: "https://linkedin.com/in/manu-shukla-4a9707271", icon: "fab fa-linkedin", label: "LinkedIn", text: "LinkedIn" }
            ].map((contact, index) => (
              <motion.a 
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-button"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "#6d28d9",
                  color: "white",
                  boxShadow: "0px 5px 15px rgba(109, 40, 217, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem 1.5rem',
                  backgroundColor: 'rgba(109, 40, 217, 0.1)',
                  color: '#6d28d9',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className={contact.icon}></i>
                <span>{contact.text}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <footer>
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p>&copy; {new Date().getFullYear()} Manu Shukla. All Rights Reserved.</p>
          <div className="social-links">
            {[
              { href: "https://github.com/ManuS21", icon: "fab fa-github", label: "GitHub" },
              { href: "https://linkedin.com/in/manu-shukla-4a9707271", icon: "fab fa-linkedin", label: "LinkedIn" },
              { href: "mailto:mshukla@uoregon.edu", icon: "fas fa-envelope", label: "Email" }
            ].map((social, index) => (
              <motion.a 
                key={index}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={social.label}
                whileHover={{ y: -5, color: "#6d28d9" }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={social.icon}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

export default App;