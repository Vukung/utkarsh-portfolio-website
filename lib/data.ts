export const personalInfo = {
  name: "Utkarsh Shirbhate",
  role: "Full Stack Developer",
  bio: "Building scalable web applications with React, Node.js, and cloud technologies. Passionate about open-source and creating impactful solutions.",
  location: "Pune, India",
  timezone: "Asia/Kolkata",
  email: "UtkarshShirbhate1311@gmail.com",
  phone: "+91 7820874588",
  dateOfBirth: "November 13, 2004",

  social: {
    github: "https://github.com/Vukung",
    linkedin: "https://www.linkedin.com/in/UtkarshShirbhate",
    resume: "/Utkarsh_Shirbhate_Resume.pdf", // RESUME PDF to public folder
  },

  coordinates: {
    lat: 18.5053,
    lng: 73.8682,

    // 18°30'19.1"N 73°52'05.4"E

  }
};

export const education = [
  {
    year: "2026",
    degree: "B.Tech",
    institute: "MIT Academy of Engineering, Pune",
    score: "8.88 CGPA",
    remark: "Pursuing",
  },
  {
    year: "2022",
    degree: "12th (Maharashtra State Board)",
    institute: "Bhartiya Mahavidyalaya, Amravati",
    score: "81%",
    remark: "Distinction",
  },
  {
    year: "2020",
    degree: "10th (Maharashtra State Board)",
    institute: "Golden Kids English School, Amravati",
    score: "85%",
    remark: "Distinction",
  },
];

export const skills = {
  languages: ["Python", "C++", "SQL", "JavaScript"],
  frameworks: ["React.js", "Express.js", "Node.js", "Vercel AI SDK"],
  backend: [
    "RESTful API Design",
    "JWT Authentication",
    "OAuth 2.0",
    "Role-Based Access Control (RBAC)",
    "Firebase Authentication",
    "Google Maps API",
    "Razorpay Payment Gateway",
    "Express Middleware",
    "Render Cloud Deployment",
    "AWS"
  ],
  databases: [
    "MySQL",
    "MongoDB",
    "Database Schema Design",
    "Indexing & Foreign Keys",
    "Normalization",
    "Soft Delete Patterns"
  ],
  practices: [
    "Git & GitHub",
    "Code Reviews & Pull Requests",
    "API Security & Token Handling",
    "Query Optimization",
    "Performance Optimization",
    "Modular Architecture",
    "Reusable Component Design",
    "Real-time Data Handling",
    "CRUD Operations",
    "Data Validation",
    "System Design Thinking",
    "Open-Source Collaboration",
    "Agile Team Collaboration",
    "Machine Learning Pipelines",
    "Model Evaluation & Hyperparameter Tuning",
    "Data Cleaning & Feature Engineering",
    "Visualization & Reporting"
  ]
};

export const experience = [
  {
    company: "PulseOn-EV",
    role: "Technical Intern – Web & Mobile Development",
    duration: "Jun 2025 - Aug 2025",
    period: "2 MONTHS",
    current: false,
    description: "Built backend APIs and screens for a cross-platform app letting EV users request charging and vanity vans.",
    highlights: [
      "Developed a secure OAuth & phone-based OTP login improving usability for older audiences",
      "Designed and deployed a real-time driver assignment & tracking system using Google Maps API",
      "Revamped booking UI, reducing user errors by ~30% through improved accessibility design",
      "Compared multiple payment gateways; led end-to-end Razorpay integration",
      "Created 12+ REST APIs and optimized MongoDB queries for faster data access",
      "Used GitHub in a 3-member team for code reviews, PRs, and conflict resolution",
    ],
    skills: ["React Native", "Node.js", "MongoDB", "Firebase", "Git", "OAuth", "Google Maps API", "REST APIs"],
  },
  {
    company: "Campus Credentials",
    role: "Full Stack Development Intern",
    duration: "Jun 2024 - Aug 2024",
    period: "2 MONTHS",
    current: false,
    description: "Engineered a full-stack blog platform using React, Node.js and Express.js.",
    highlights: [
      "Architected a MySQL database with foreign keys and indexing for data integrity",
      "Designed a secure RESTful API featuring JWT and Bcrypt for user authentication",
      "Built an Admin Dashboard with Role-Based Access Control (RBAC) for content moderation",
      "Implemented state management for real-time upvote/downvote UI updates",
      "Developed admin features to disable users and manage post lifecycles",
      "Integrated custom Express middleware to secure sensitive API endpoints",
    ],
    skills: ["React", "Node.js", "Express.js", "MySQL", "JWT", "Bcrypt", "RBAC"],
  },
];

export const openSource = [
  {
    title: "Calendar Wallpaper Generator",
    description: "Production open-source project for generating customizable calendar wallpapers",
    contributions: [
      "Engineered a scalable canvas-based text overlay system with multi-line rendering and unified scaling",
      "Implemented 9-position layout logic for flexible text placement across the canvas",
      "Architected a shared FontPicker component to centralize font selection and reuse",
      "Eliminated 150+ lines of duplicated font logic, improving maintainability and readability",
      "Integrated Groq AI via Vercel AI SDK for real-time streaming text updates",
      "Collaborated in a production open-source environment through PR reviews, issues and maintainer feedback",
    ],
    stats: {
      downloads: "300+",
      contributors: 6,
      stars: 17,
    },
    duration: "Dec 2025 - Present",
    links: {
      live: "#",
      github: "#",
    },
    skills: ["React", "Next.js", "Canvas API", "Vercel AI SDK", "TypeScript"],
  },
];

export const projects = [
  {
    title: "Resume Builder Web Application",
    description: "Full-stack application for creating professional resumes with real-time validation and secure file handling",
    duration: "May 2025 - Jul 2025",
    highlights: [
      "Engineered secure REST APIs with JWT-based authentication",
      "Modelled normalized MySQL database with 8+ interconnected tables supporting resume content",
      "Implemented CRUD operations with soft-delete patterns and data validation",
      "Handled secure file uploads using Multer with type/size restrictions and automatic cleanup mechanisms",
      "Achieved sub-second response times for form submissions and data fetching",
      "Secured 15+ API endpoints with proper token handling and protected route access",
      "Built real-time validation for 20+ form fields with tooltips and user-friendly feedback",
      "Achieved 95%+ code reusability with modular, maintainable architecture",
      "Reduced user resume creation time by 80% through intuitive backend logic and dynamic data structure",
    ],
    skills: ["React.js", "Node.js", "Express.js", "MySQL", "JWT", "Multer"],
    links: {
      live: "#",
      github: "#",
    },
    stats: {
      impact: "80% reduction in resume creation time",
    },
  },
  {
    title: "Pune House Price Prediction Model",
    description: "End-to-end ML pipeline for real estate valuations in Pune",
    duration: "Sept 2024 - Oct 2024",
    highlights: [
      "Engineered an end-to-end ML pipeline in Python for Pune real estate valuations",
      "Achieved an R² score of 0.55 using real-world, non-linear property datasets",
      "Architected custom cleaning logic to standardize total square feet and complex size strings",
      "Improved training data quality by resolving inconsistent range-based and multi-format inputs",
      "Optimized accuracy using GridSearchCV for hyperparameter tuning across 6+ models",
      "Evaluated performance of XGBoost, Random Forest and KNN regression algorithms",
      "Streamlined deployment by serializing production weights via Pickle",
      "Deployed a responsive web-based prediction interface on the Render cloud platform",
    ],
    skills: ["Python", "Machine Learning", "XGBoost", "Random Forest", "GridSearchCV", "Pickle", "Render"],
    links: {
      live: "#",
      github: "#",
    },
    stats: {
      accuracy: "R² score: 0.55",
    },
  },
];

export const leadership = [
  {
    title: "Co-founder, NPC Podcast Community",
    year: "2023",
    description: "Spearheaded multiple teams totaling 15+ members, fostering a collaborative and creative environment.",
    type: "Leadership",
  },
  {
    title: "IPL-Style Auction Auctioneer",
    year: "2023",
    description: "Managed as an auctioneer in an IPL-style auction organized by E-CELL MITAOE. Successfully auctioned for 8 teams in front of a 150+ audience. Demonstrated strong communication, negotiation, and public speaking skills.",
    type: "Event Management",
  },
];

export const achievements = [
  {
    title: "17th Rank - State-Level Coding Wars",
    organization: "PCCOE Spectrum",
    year: "2023",
    description: "Attained 17th rank in the State-Level Coding Wars, showcasing exceptional problem-solving and coding skills in a competitive environment.",
    type: "Competition",
  },
  {
    title: "Paper Presentation - Millet Production Management",
    organization: "Sinhgad College of Engineering",
    year: "2024",
    description: "Presented a paper on 'Millet Production Management Using Cloud Computing for Farmers' during NCPC, contributing to research.",
    type: "Academic",
  },
  {
    title: "AWS Academy Graduate – Cloud Foundation",
    organization: "AWS Academy",
    year: "2024",
    description: "Completed AWS Academy Cloud Foundation certification",
    type: "Certification",
  },
  {
    title: "AWS Academy Graduate – Data Engineering",
    organization: "AWS Academy",
    year: "2024",
    description: "Completed AWS Academy Data Engineering certification",
    type: "Certification",
  },
];

export const hobbies = ["Gardening", "Basketball", "Photography", "Listening to music"];
