const mongoose = require('mongoose');
const User = require('../models/User');
const Hero = require('../models/Hero');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Skill = require('../models/Skill');
const Education = require('../models/Education');
const Achievement = require('../models/Achievement');
const Leadership = require('../models/Leadership');
require('dotenv').config();

// Sample data based on Jenish's resume
const sampleData = {
  hero: {
    name: "JENISH KANTILAL PATEL",
    title: "Full-Stack Developer | DevOps Engineer | AI/ML Enthusiast",
    summary: "Final-year BTech CSE student passionate about delivering scalable software solutions through full-stack development, DevOps automation, and emerging tech such as blockchain and AI. Proven success in hackathons, production-ready deployments, and Agile team environments. Strong foundation in DSA, SDLC, fast learner, effective communicator, and eager to contribute structured, impact-driven thinking to dynamic roles.",
    email: "23bce529@nirmauni.ac.in",
    phone: "+91-9979891854",
    location: "C-105, Whitehouse, Ambikanagar, Gandhinagar, Gujarat, India - 382721",
    socialLinks: {
      github: "https://github.com/Jenish-Patel31",
      linkedin: "https://www.linkedin.com/in/Jenish-Patel-31k/",
      leetcode: "https://leetcode.com/Jenish-patel31/",
      portfolio: ""
    }
  },
  
  projects: [
    {
      title: "TrackIT – Full-Stack Asset Tracker with Barcode Scanning",
      description: "Developed a barcode-based asset tracking system with Excel import/export and live analytics dashboard. Integrated JWT auth and DataTables.js for secure and interactive asset filtering. Deployed via CI pipelines using Vercel and Render for seamless updates.",
      summary: "Barcode-based asset tracking system with Excel import/export and live analytics dashboard",
      technologies: ["React.js", "Node.js", "Express", "MongoDB Atlas", "JWT Auth", "Tailwind CSS", "REST API"],
      category: "web",
      featured: true,
      order: 1,
      teamSize: 1,
      duration: "6 days",
      liveUrl: "",
      githubUrl: "https://github.com/Jenish-Patel31/trackIT-asset-tracker",
      achievements: ["Full-stack development", "JWT authentication", "Excel import/export", "Live analytics dashboard"]
    },
    {
      title: "EviVault – Blockchain-Based Digital Evidence Management",
      description: "Built EviVault, a decentralized evidence management system leveraging Web3 architecture to eliminate single-point failures in traditional workflows. Implemented role-based smart contracts (RBAC) using Solidity to enforce secure and controlled access. Integrated IPFS for tamper-proof, immutable file storage with content-addressed hash verification.",
      summary: "Decentralized evidence management system with Web3 architecture and IPFS storage",
      technologies: ["Blockchain", "Solidity", "IPFS", "Smart Contracts", "Node.js", "MongoDB", "Express.js", "Web3.js"],
      category: "blockchain",
      featured: true,
      order: 2,
      teamSize: 1,
      duration: "Ongoing",
      liveUrl: "",
      githubUrl: "https://github.com/Jenish-Patel31/EviVault-DecentralizedEvidence",
      achievements: ["Blockchain development", "Smart contracts", "IPFS integration", "Web3 architecture"]
    },
    {
      title: "StockPro - AI-Powered Stock Analysis",
      description: "Built StockPro, an AI-powered financial tool using Gemini 1.5 Flash and RAG pipelines to extract insights from stock reports. Automated report summarization and insights generation with 99%+ accuracy. Secured 2nd place at MINeD Hackathon 2025 among 250+ teams, winning 47K INR in prizes.",
      summary: "AI-powered financial tool with Gemini 1.5 Flash and RAG pipelines for stock analysis",
      technologies: ["LLMs", "Gemini API", "RAG", "Streamlit", "React.js", "Tailwind CSS", "Firebase", "REST API"],
      category: "ai",
      featured: true,
      order: 3,
      teamSize: 5,
      duration: "Hackathon",
      liveUrl: "",
      githubUrl: "https://github.com/Jenish-Patel31/MinedPro",
      achievements: ["2nd place at MINeD Hackathon 2025", "47K INR prize", "99%+ accuracy", "AI integration"]
    },
    {
      title: "UpNext AI – AI-Powered Financial Intelligence Platform",
      description: "Built UpNext AI, a revolutionary AI-powered financial intelligence platform that combines cutting-edge AI technology with intuitive financial management. Powered by Google's latest Gemini 2.0 Flash model, it delivers personalized financial insights, multilingual voice processing (8+ Indian languages), and intelligent expense categorization with 99.99% accuracy.",
      summary: "AI-powered financial intelligence platform with Gemini 2.0 Flash and multilingual support",
      technologies: ["React 18.3.1", "Vite 6.0.5", "Tailwind CSS 4.0.1", "Framer Motion 12.23.6", "Node.js 18+", "Express.js 5.1.0", "MongoDB 8.16.4", "Firebase Admin 13.4.0", "Google Gemini 2.0 Flash"],
      category: "ai",
      featured: true,
      order: 4,
      teamSize: 1,
      duration: "Ongoing",
      liveUrl: "",
      githubUrl: "https://github.com/Jenish-Patel31/upnext-ai",
      achievements: ["Gemini 2.0 Flash integration", "Multilingual support (8+ languages)", "99.99% accuracy", "Enterprise-grade UI/UX"]
    },
    {
      title: "Automated CI/CD Pipeline for Dockerized Microservices",
      description: "Built a Node.js, Express, and MongoDB-based microservices architecture in a monorepo, containerized with Docker and orchestrated using Docker Compose. Configured a Jenkins (Groovy) pipeline to build, push Docker images, and auto-deploy updated containers. Integrated GitHub Webhooks with Ngrok for real-time CI/CD triggers on code pushes, reducing deployment time from 20+ minutes to under 2 minutes.",
      summary: "Automated CI/CD pipeline for Dockerized microservices with Jenkins and GitHub webhooks",
      technologies: ["Node.js", "Express", "MongoDB", "Docker", "Docker Compose", "Jenkins Groovy", "GitHub Webhooks", "Ngrok"],
      category: "devops",
      featured: true,
      order: 5,
      teamSize: 1,
      duration: "Ongoing",
      liveUrl: "",
      githubUrl: "https://github.com/Jenish-Patel31/ecommerce-microservices",
      achievements: ["90% reduction in deployment time", "Automated CI/CD", "Docker orchestration", "GitHub integration"]
    },
    {
      title: "EcoFeed – Smart Food Redistribution & Waste-to-Farm Platform",
      description: "Built EcoFeed, a smart food redistribution platform connecting donors with NGOs, volunteers, and farmers. Designed role-based dashboards to streamline logistics, distribution, and coordination across all user types. Proposed a biogas slurry module to convert inedible waste for agricultural use, enhancing sustainability.",
      summary: "Smart food redistribution platform connecting donors with NGOs, volunteers, and farmers",
      technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Git & GitHub"],
      category: "web",
      featured: false,
      order: 6,
      teamSize: 2,
      duration: "Academic project",
      liveUrl: "",
      githubUrl: "https://github.com/Jenish-Patel31/EcoFeed",
      achievements: ["Role-based dashboards", "Waste-to-farm module", "Sustainability focus", "Full-stack development"]
    }
  ],
  
  experience: [
    {
      company: "AIVID Techvision Pvt. Ltd.",
      position: "DevOps Engineer Intern",
      startDate: new Date("2025-05-05"),
      endDate: new Date("2025-07-05"),
      current: false,
      description: "Worked on Docker container security, Jenkins CI/CD pipelines, Kubernetes deployment, Python scripting, and IoT configuration. Built MQTT-powered media display tool using Python for real-time updates.",
      achievements: [
        "Automated Docker + Jenkins CI/CD pipelines for full-stack microservices; reduced manual workload by 40%",
        "Hardened container security with base image restrictions and runtime alerts",
        "Built MQTT-powered media display tool using Python for real-time updates",
        "Explored Kubernetes deployment and pod management using Minikube"
      ],
      technologies: ["Docker", "Jenkins", "Kubernetes", "Python", "Bash Scripting", "IoT", "Docker Compose", "MQTT", "Linux"],
      location: "Ahmedabad, India",
      order: 1
    }
  ],
  
  skills: [
    {
      category: "languages",
      skills: [
  { name: "C++", color: "#f97316" },
  { name: "Python", color: "#3b82f6" },
  { name: "Java", color: "#ef4444" },
  { name: "JavaScript", color: "#facc15" },
  { name: "Go", color: "#06b6d4" }
      ],
      order: 1
    },
    {
      category: "frontend",
      skills: [
  { name: "React.js", color: "#3b82f6" },
  { name: "HTML/CSS", color: "#f97316" },
  { name: "Tailwind CSS", color: "#06b6d4" },
  { name: "Framer Motion", color: "#8b5cf6" }
      ],
      order: 2
    },
    {
      category: "backend",
      skills: [
  { name: "Node.js", color: "#10b981" },
  { name: "Express.js", color: "#10b981" },
  { name: "REST API", color: "#3b82f6" },
  { name: "MongoDB", color: "#10b981" },
  { name: "MySQL", color: "#3b82f6" }
      ],
      order: 3
    },
    {
      category: "devops",
      skills: [
  { name: "Docker", color: "#3b82f6" },
  { name: "Jenkins", color: "#f97316" },
  { name: "CI/CD", color: "#10b981" },
        { name: "Linux", proficiency: 85, color: "#facc15" },
        { name: "AWS", proficiency: 80, color: "#f97316" },
        { name: "Kubernetes", proficiency: 75, color: "#3b82f6" }
      ],
      order: 4
    },
    {
      category: "emerging",
      skills: [
        { name: "Blockchain", proficiency: 85, color: "#8b5cf6" },
        { name: "Smart Contracts", proficiency: 80, color: "#f97316" },
        { name: "AI/ML", proficiency: 85, color: "#06b6d4" },
        { name: "LLMs", proficiency: 90, color: "#10b981" },
        { name: "Gemini API", proficiency: 90, color: "#facc15" },
        { name: "RAG", proficiency: 85, color: "#3b82f6" }
      ],
      order: 5
    },
    {
      category: "tools",
      skills: [
        { name: "Git", proficiency: 95, color: "#f97316" },
        { name: "GitHub", proficiency: 95, color: "#000000" },
        { name: "Vercel", proficiency: 90, color: "#000000" },
        { name: "Render", proficiency: 90, color: "#06b6d4" },
        { name: "Firebase", proficiency: 85, color: "#facc15" }
      ],
      order: 6
    }
  ],
  
  education: [
    {
      institution: "Institute of Technology, Nirma University",
      degree: "Bachelor of Technology in Computer Science & Engineering (D2D)",
      field: "Computer Science & Engineering",
      startDate: new Date("2023-06-01"),
      endDate: new Date("2026-05-31"),
      gpa: 8.33,
      percentage: null,
      description: "Specialization in Cyber Security. Merit-based TFWS admission.",
      location: "Ahmedabad, India",
      order: 1
    },
    {
      institution: "Maharaja Sayajirao University of Baroda",
      degree: "Diploma in Computer Engineering",
      field: "Computer Engineering",
      startDate: new Date("2020-06-01"),
      endDate: new Date("2023-05-31"),
      gpa: null,
      percentage: 87.47,
      description: "Ranked 1st in Diploma at MSU Baroda.",
      location: "Vadodara, India",
      order: 2
    },
    {
      institution: "Nutan Vidhyalaya, Vadodara",
      degree: "Secondary Education",
      field: "General",
      startDate: new Date("2018-06-01"),
      endDate: new Date("2020-05-31"),
      gpa: null,
      percentage: 80,
      description: "GSEB Board",
      location: "Vadodara, India",
      order: 3
    }
  ],
  
  achievements: [
    {
      title: "2nd Place at MINeD 2025 Hackathon",
      description: "Secured 2nd place overall among 250+ teams, winning 47K INR in prizes for developing StockPro - an AI-powered stock analysis tool.",
      category: "hackathon",
      date: new Date("2025-01-15"),
      organization: "MINeD 2025",
      participants: 250,
      rank: 2,
      prize: {
        amount: 47000,
        currency: "INR",
        description: "Cash prize for 2nd place"
      },
      order: 1
    },
    {
      title: "Ranked 1st in Diploma at MSU Baroda",
      description: "Achieved highest academic performance in Computer Engineering Diploma program.",
      category: "academic",
      date: new Date("2023-05-31"),
      organization: "Maharaja Sayajirao University of Baroda",
      participants: 100,
      rank: 1,
      order: 2
    },
    {
      title: "Merit-based TFWS Admission to Nirma University",
      description: "Secured admission to prestigious Nirma University through merit-based Tuition Fee Waiver Scheme.",
      category: "academic",
      date: new Date("2023-06-01"),
      organization: "Nirma University",
      order: 3
    },
    {
      title: "AWS Academy Graduate – Cloud Foundations",
      description: "Successfully completed AWS Academy Cloud Foundations program with hands-on knowledge in core AWS services including EC2, S3, IAM, and cloud architecture principles.",
      category: "certification",
      date: new Date("2024-12-01"),
      organization: "Amazon Web Services",
      order: 4
    }
  ],
  
  leadership: [
    {
      role: "Technical Head",
      organization: "Cybersecurity Club, Nirma University",
      startDate: new Date("2024-12-01"),
      current: true,
      description: "Leading the technical initiatives of Nirma University's Cybersecurity Club, organizing workshops and events focused on AI & data security.",
      keyContributions: [
        "Played a key role in launching Nirma University's Cybersecurity Club",
        "Organized workshops on AI & data security with MeitY + DSCI",
        "Led GSoC prep webinar with CSI; managed speaker invites and outreach"
      ],
      teamSize: 15,
      impact: "Successfully launched and established the Cybersecurity Club as a recognized student organization",
      skills: ["Leadership", "Event Organization", "Technical Communication", "Cybersecurity"],
      order: 1
    }
  ]
};

// Seed database function
const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data (optional - comment out if you want to preserve existing data)
    // await Promise.all([
    //   User.deleteMany({}),
    //   Hero.deleteMany({}),
    //   Project.deleteMany({}),
    //   Experience.deleteMany({}),
    //   Skill.deleteMany({}),
    //   Education.deleteMany({}),
    //   Achievement.deleteMany({}),
    //   Leadership.deleteMany({})
    // ]);
    
    // Create admin user
    const existingUser = await User.findOne({ username: 'admin' });
    if (!existingUser) {
      const adminUser = new User({
        username: 'admin',
        email: 'admin@portfolio.com',
        password: 'admin123',
        role: 'admin'
      });
      await adminUser.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
    
    // Create hero section
    const existingHero = await Hero.findOne({ isActive: true });
    if (!existingHero) {
      const hero = new Hero(sampleData.hero);
      await hero.save();
      console.log('Hero section created');
    } else {
      console.log('Hero section already exists');
    }
    
    // Create projects
    for (const projectData of sampleData.projects) {
      const existingProject = await Project.findOne({ title: projectData.title });
      if (!existingProject) {
        const project = new Project(projectData);
        await project.save();
                  console.log(`Project created: ${projectData.title}`);
      } else {
        console.log(`Project already exists: ${projectData.title}`);
      }
    }
    
    // Create experience
    for (const expData of sampleData.experience) {
      const existingExp = await Experience.findOne({ 
        company: expData.company, 
        position: expData.position 
      });
      if (!existingExp) {
        const experience = new Experience(expData);
        await experience.save();
                  console.log(`Experience created: ${expData.position} at ${expData.company}`);
      } else {
        console.log(`Experience already exists: ${expData.position} at ${expData.company}`);
      }
    }
    
    // Create skills
    for (const skillData of sampleData.skills) {
      const existingSkill = await Skill.findOne({ category: skillData.category });
      if (!existingSkill) {
        const skill = new Skill(skillData);
        await skill.save();
                  console.log(`Skills created for category: ${skillData.category}`);
      } else {
        console.log(`Skills already exist for category: ${skillData.category}`);
      }
    }
    
    // Create education
    for (const eduData of sampleData.education) {
      const existingEdu = await Education.findOne({ 
        institution: eduData.institution, 
        degree: eduData.degree 
      });
      if (!existingEdu) {
        const education = new Education(eduData);
        await education.save();
                  console.log(`Education created: ${eduData.degree} at ${eduData.institution}`);
      } else {
        console.log(`Education already exists: ${eduData.degree} at ${eduData.institution}`);
      }
    }
    
    // Create achievements
    for (const achievementData of sampleData.achievements) {
      const existingAchievement = await Achievement.findOne({ title: achievementData.title });
      if (!existingAchievement) {
        const achievement = new Achievement(achievementData);
        await achievement.save();
                  console.log(`Achievement created: ${achievementData.title}`);
      } else {
        console.log(`Achievement already exists: ${achievementData.title}`);
      }
    }
    
    // Create leadership
    for (const leadershipData of sampleData.leadership) {
      const existingLeadership = await Leadership.findOne({ 
        role: leadershipData.role, 
        organization: leadershipData.organization 
      });
      if (!existingLeadership) {
        const leadership = new Leadership(leadershipData);
        await leadership.save();
                  console.log(`Leadership created: ${leadershipData.role} at ${leadershipData.organization}`);
      } else {
        console.log(`Leadership already exists: ${leadershipData.role} at ${leadershipData.organization}`);
      }
    }
    
    console.log('Database seeding completed successfully!');
    console.log('Admin credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    
  } catch (error) {
    console.error('Database seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run seeder if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
