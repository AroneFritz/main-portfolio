import { Project, Skill, Experience, Education, Testimonial, SocialLink } from "@/types";

export const personalInfo = {
  name: "Arone Fritz",
  title: "Web Stack Developer",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "Philippines, Negros Occidental",
  bio: "Passionate web stack developer with over 3 years of experience creating digital solutions that make a real impact. I specialize in modern web technologies and believe in writing clean, maintainable code while creating user experiences that are both beautiful and functional.",
  resumeUrl: "/resume.pdf",
  calendlyUrl: "https://calendly.com/yourusername",
};

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/yourusername",
    icon: "Github",
    username: "yourusername",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: "Linkedin",
    username: "yourusername",
  },
  {
    platform: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: "Twitter",
    username: "@yourusername",
  },
  {
    platform: "Email",
    url: "mailto:your.email@example.com",
    icon: "Mail",
  },
];

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "A modern, full-featured e-commerce platform built with Next.js and Stripe integration",
    longDescription: "Complete e-commerce solution featuring user authentication, payment processing, inventory management, order tracking, and an admin dashboard. Built with performance and scalability in mind.",
    image: "/projects/ecommerce.jpg",
    images: [
      "/projects/ecommerce.jpg",
      "/projects/ecommerce-dashboard.jpg",
      "/projects/ecommerce-mobile.jpg",
      "/projects/ecommerce-checkout.jpg",
    ],
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL", "Tailwind CSS"],
    category: "web-app",
    featured: true,
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    liveUrl: "https://your-ecommerce.vercel.app",
    status: "completed",
    startDate: "2023-01-01",
    endDate: "2023-03-01",
    challenges: [
      "Implementing secure payment processing with Stripe webhooks and handling edge cases",
      "Building a scalable inventory management system with real-time stock updates",
      "Optimizing database queries for large product catalogs with advanced caching",
      "Creating a responsive design that works seamlessly across all devices and screen sizes",
    ],
    learnings: [
      "Advanced Next.js patterns including SSR, ISR, and API route optimization",
      "Payment gateway integration best practices and PCI compliance requirements",
      "Database design and optimization techniques for high-traffic e-commerce applications",
      "Modern authentication flows with NextAuth.js and social login providers",
    ],
    metrics: [
      { label: "Performance Score", value: "95/100", description: "Lighthouse performance score" },
      { label: "Load Time", value: "< 2s", description: "Average page load time" },
      { label: "Conversion Rate", value: "+25%", description: "Improvement over previous version" },
    ],
  },
  {
    id: "task-management-app",
    title: "Collaborative Task Manager",
    description: "Real-time collaborative task management application with team features",
    longDescription: "A comprehensive task management solution with real-time collaboration, project organization, team management, and progress tracking. Features include drag-and-drop interfaces, real-time updates, and detailed analytics.",
    image: "/projects/taskapp.jpg",
     images: [
      "/projects/taskapp.jpg",
      "/projects/taskapp-dashboard.jpg",
      "/projects/taskapp-kanban.jpg",
      "/projects/taskapp-team.jpg",
    ],
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "Material-UI"],
    category: "web-app",
    featured: true,
    githubUrl: "https://github.com/yourusername/task-manager",
    liveUrl: "https://your-taskapp.vercel.app",
    status: "completed",
    startDate: "2023-04-01",
    endDate: "2023-06-01",
  },
  {
    id: "weather-api",
    title: "Weather Data API",
    description: "RESTful API for weather data with caching, rate limiting, and comprehensive documentation",
    image: "/projects/weather-api.jpg",
     images: [
      "/projects/weather-api.jpg",
      "/projects/weather-docs.jpg",
      "/projects/weather-dashboard.jpg",
    ],
    technologies: ["Node.js", "Express", "Redis", "OpenWeather API", "Swagger"],
    category: "api",
    featured: false,
    githubUrl: "https://github.com/yourusername/weather-api",
    status: "completed",
    startDate: "2023-07-01",
    endDate: "2023-08-01",
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", level: "expert", yearsOfExperience: 3 },
  { name: "Next.js", category: "frontend", level: "expert", yearsOfExperience: 2 },
  { name: "TypeScript", category: "frontend", level: "advanced", yearsOfExperience: 2 },
  { name: "JavaScript", category: "frontend", level: "expert", yearsOfExperience: 4 },
  { name: "HTML5", category: "frontend", level: "expert", yearsOfExperience: 5 },
  { name: "CSS3", category: "frontend", level: "expert", yearsOfExperience: 5 },
  { name: "Tailwind CSS", category: "frontend", level: "expert", yearsOfExperience: 2 },
  { name: "Sass/SCSS", category: "frontend", level: "advanced", yearsOfExperience: 3 },
  { name: "Framer Motion", category: "frontend", level: "advanced", yearsOfExperience: 1 },
  { name: "Three.js", category: "frontend", level: "intermediate", yearsOfExperience: 1 },
  { name: "Vue.js", category: "frontend", level: "intermediate", yearsOfExperience: 1 },

  // Backend
  { name: "Node.js", category: "backend", level: "advanced", yearsOfExperience: 3 },
  { name: "Express.js", category: "backend", level: "advanced", yearsOfExperience: 3 },
  { name: "Python", category: "backend", level: "intermediate", yearsOfExperience: 2 },
  { name: "Django", category: "backend", level: "intermediate", yearsOfExperience: 1 },
  { name: "GraphQL", category: "backend", level: "intermediate", yearsOfExperience: 1 },
  { name: "REST APIs", category: "backend", level: "advanced", yearsOfExperience: 3 },

  // Database
  { name: "PostgreSQL", category: "database", level: "advanced", yearsOfExperience: 2 },
  { name: "MongoDB", category: "database", level: "advanced", yearsOfExperience: 2 },
  { name: "Redis", category: "database", level: "intermediate", yearsOfExperience: 1 },
  { name: "Prisma", category: "database", level: "advanced", yearsOfExperience: 1 },
  { name: "MySQL", category: "database", level: "intermediate", yearsOfExperience: 2 },

  // DevOps & Tools
  { name: "Git", category: "devops", level: "expert", yearsOfExperience: 4 },
  { name: "Docker", category: "devops", level: "intermediate", yearsOfExperience: 1 },
  { name: "AWS", category: "devops", level: "intermediate", yearsOfExperience: 1 },
  { name: "Vercel", category: "devops", level: "advanced", yearsOfExperience: 2 },
  { name: "Netlify", category: "devops", level: "advanced", yearsOfExperience: 2 },
  { name: "GitHub Actions", category: "devops", level: "intermediate", yearsOfExperience: 1 },

  // Design
  { name: "Figma", category: "design", level: "intermediate", yearsOfExperience: 2 },
  { name: "Adobe XD", category: "design", level: "beginner", yearsOfExperience: 1 },
  { name: "Photoshop", category: "design", level: "intermediate", yearsOfExperience: 3 },
];

export const experiences: Experience[] = [
  {
    id: "senior-fullstack-dev",
    company: "Tech Startup Inc.",
    position: "Senior Full Stack Developer",
    startDate: "2022-01-01",
    description: "Leading development of scalable web applications and mentoring junior developers in a fast-paced startup environment.",
    achievements: [
      "Architected and built a microservices platform serving 100k+ users",
      "Reduced application load time by 40% through optimization techniques",
      "Led a team of 4 developers on multiple high-impact projects",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Introduced code review processes improving code quality by 30%",
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Docker", "TypeScript"],
    location: "Philippines, Negros Occidental",
    type: "full-time",
  },
  {
    id: "freelance-dev",
    company: "Freelance",
    position: "Web Developer",
    startDate: "2020-06-01",
    endDate: "2021-02-28",
    description: "Provided web development services to small businesses and startups, focusing on modern, responsive websites and web applications.",
    achievements: [
      "Completed 20+ projects for diverse clients",
      "Maintained 5-star rating across all platforms",
      "Developed e-commerce solutions generating $500k+ in sales",
      "Built long-term relationships with repeat clients",
      "Specialized in React and modern JavaScript frameworks",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "PHP","Laravel"],
    location: "Remote",
    type: "freelance",
  },
];

export const education: Education[] = [
  {
    id: "bsit-degree",
    institution: "BSIT",
    degree: "Bachelor of Science in Information Technology",
    field: "Computer Science",
    startDate: "2016-09-01",
    endDate: "2020-05-31",
    gpa: "3.8",
    achievements: [
      "Graduated Bachelor of Science in Information Technology",
      "President of Computer Science Club",
    ],
    location: "Boston, MA",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    position: "Product Manager",
    company: "Tech Startup Inc.",
    content: "Working with [Your Name] has been an absolute pleasure. Their technical expertise and attention to detail are exceptional. They delivered our project ahead of schedule and exceeded all expectations. The code quality is outstanding and the user experience is seamless.",
    image: "/testimonials/sarah.jpg",
    rating: 5,
    date: "2023-06-15",
    projectId: "ecommerce-platform",
  },
  {
    id: "michael-chen",
    name: "Michael Chen",
    position: "CEO",
    company: "Digital Solutions Co.",
    content: "An outstanding developer who brings both technical skills and creative problem-solving to every project. The e-commerce platform they built for us has increased our sales by 150%. Their communication throughout the project was excellent.",
    image: "/testimonials/michael.jpg",
    rating: 5,
    date: "2023-05-20",
    projectId: "task-management-app",
  },
  {
    id: "emily-rodriguez",
    name: "Emily Rodriguez",
    position: "Marketing Director",
    company: "Creative Agency",
    content: "Professional, reliable, and incredibly talented. They transformed our outdated website into a modern, responsive platform that our customers love. The attention to detail and user experience is remarkable. Highly recommended!",
    image: "/testimonials/emily.jpg",
    rating: 5,
    date: "2023-04-10",
  },
  {
    id: "david-thompson",
    name: "David Thompson",
    position: "Founder",
    company: "StartupXYZ",
    content: "Their full-stack development skills are top-notch. They built our MVP from scratch and helped us secure our first round of funding. The scalable architecture they implemented has served us well as we've grown. A true professional.",
    image: "/testimonials/david.jpg",
    rating: 5,
    date: "2023-03-05",
  },
  {
    id: "lisa-wang",
    name: "Lisa Wang",
    position: "CTO",
    company: "InnovateTech",
    content: "Exceptional code quality and great communication throughout the project. They understood our requirements perfectly and delivered exactly what we needed. The performance optimizations they implemented were impressive.",
    image: "/testimonials/lisa.jpg",
    rating: 5,
    date: "2023-02-18",
  },
];


