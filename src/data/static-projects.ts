// Static fallback data for GitHub Pages deployment
export const staticProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB",
    longDescription: "A comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Built with modern technologies and best practices.",
    image: "/projects/ecommerce-hero.jpg",
    images: JSON.stringify([
      "/projects/ecommerce-hero.jpg",
      "/projects/ecommerce-dashboard.jpg",
      "/projects/ecommerce-cart.jpg"
    ]),
    technologies: JSON.stringify([
      "React", "Node.js", "MongoDB", "Express", "Stripe", "JWT", "Tailwind CSS"
    ]),
    category: "FULLSTACK",
    featured: true,
    githubUrl: "https://github.com/AroneFritz/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.aronefritz.com",
    status: "COMPLETED",
    startDate: "2023-01-15",
    endDate: "2023-04-20",
    challenges: JSON.stringify([
      "Implementing secure payment processing",
      "Optimizing database queries for large product catalogs",
      "Creating responsive design for all device sizes"
    ]),
    learnings: JSON.stringify([
      "Advanced React patterns and state management",
      "Payment gateway integration best practices",
      "Database optimization techniques"
    ]),
    metrics: JSON.stringify([
      "99.9% uptime",
      "< 2s page load time",
      "500+ products supported"
    ]),
    order: 1,
    published: true,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-04-20")
  },
  {
    id: "2",
    title: "Weather Data API",
    description: "RESTful API for weather data with real-time updates and forecasting",
    longDescription: "A robust weather API that aggregates data from multiple sources, provides real-time weather updates, and offers accurate forecasting. Features include location-based queries, historical data, and weather alerts.",
    image: "/projects/weather-api-hero.jpg",
    images: JSON.stringify([
      "/projects/weather-api-hero.jpg",
      "/projects/weather-dashboard.jpg",
      "/projects/weather-mobile.jpg"
    ]),
    technologies: JSON.stringify([
      "Node.js", "Express", "PostgreSQL", "Redis", "Docker", "AWS", "OpenWeatherMap API"
    ]),
    category: "BACKEND",
    featured: true,
    githubUrl: "https://github.com/AroneFritz/weather-api",
    liveUrl: "https://weather-api.aronefritz.com",
    status: "COMPLETED",
    startDate: "2023-05-01",
    endDate: "2023-07-15",
    challenges: JSON.stringify([
      "Handling high-frequency API requests",
      "Data aggregation from multiple sources",
      "Implementing efficient caching strategies"
    ]),
    learnings: JSON.stringify([
      "API rate limiting and optimization",
      "Redis caching implementation",
      "Microservices architecture"
    ]),
    metrics: JSON.stringify([
      "1M+ API calls/month",
      "99.95% uptime",
      "< 100ms response time"
    ]),
    order: 2,
    published: true,
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-07-15")
  },
  {
    id: "3",
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates",
    longDescription: "A modern task management application that enables teams to collaborate effectively. Features include real-time updates, drag-and-drop functionality, file attachments, and comprehensive reporting.",
    image: "/projects/taskapp-hero.jpg",
    images: JSON.stringify([
      "/projects/taskapp-hero.jpg",
      "/projects/taskapp-board.jpg",
      "/projects/taskapp-analytics.jpg"
    ]),
    technologies: JSON.stringify([
      "React", "TypeScript", "Socket.io", "Node.js", "MongoDB", "Material-UI"
    ]),
    category: "FRONTEND",
    featured: false,
    githubUrl: "https://github.com/AroneFritz/task-manager",
    liveUrl: "https://tasks.aronefritz.com",
    status: "COMPLETED",
    startDate: "2023-08-01",
    endDate: "2023-10-30",
    challenges: JSON.stringify([
      "Real-time synchronization across multiple users",
      "Complex drag-and-drop interactions",
      "Performance optimization for large datasets"
    ]),
    learnings: JSON.stringify([
      "WebSocket implementation with Socket.io",
      "Advanced TypeScript patterns",
      "Performance optimization techniques"
    ]),
    metrics: JSON.stringify([
      "50+ active users",
      "Real-time sync < 50ms",
      "Mobile responsive design"
    ]),
    order: 3,
    published: true,
    createdAt: new Date("2023-08-01"),
    updatedAt: new Date("2023-10-30")
  }
];
