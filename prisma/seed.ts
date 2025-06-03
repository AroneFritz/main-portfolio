import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@aronefritz.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'adminaronefritz';
  const adminName = process.env.ADMIN_NAME || 'Arone Fritz';

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail }
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists');
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    
    const admin = await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
        role: 'SUPER_ADMIN'
      }
    });

    console.log('✅ Created admin user:', admin.email);
  }

  // Create some sample testimonials for testing
  const sampleTestimonials = [
    {
      name: 'Sarah Johnson',
      email: 'sarah@techstartup.com',
      position: 'Product Manager',
      company: 'Tech Startup Inc.',
      content: 'Working with Arone has been an absolute pleasure. Their technical expertise and attention to detail are exceptional. They delivered our project ahead of schedule and exceeded all expectations.',
      rating: 5,
      projectWorkedOn: 'E-commerce Platform',
      status: 'APPROVED' as const,
      featured: true,
      approvalDate: new Date()
    },
    {
      name: 'Michael Chen',
      email: 'michael@digitalsolutions.com',
      position: 'CEO',
      company: 'Digital Solutions Co.',
      content: 'An outstanding developer who brings both technical skills and creative problem-solving to every project. The platform they built for us has increased our sales by 150%.',
      rating: 5,
      projectWorkedOn: 'Task Management App',
      status: 'APPROVED' as const,
      featured: true,
      approvalDate: new Date()
    },
    {
      name: 'Emily Rodriguez',
      email: 'emily@creativeagency.com',
      position: 'Marketing Director',
      company: 'Creative Agency',
      content: 'Professional, reliable, and incredibly talented. They transformed our outdated website into a modern, responsive platform that our customers love.',
      rating: 5,
      status: 'PENDING' as const
    }
  ];

  for (const testimonial of sampleTestimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { email: testimonial.email }
    });

    if (!existing) {
      await prisma.testimonial.create({
        data: testimonial
      });
      console.log(`✅ Created testimonial from ${testimonial.name}`);
    }
  }

  // Create sample projects
  const sampleProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'A modern, full-featured e-commerce platform built with Next.js and Stripe integration',
      longDescription: 'Complete e-commerce solution featuring user authentication, payment processing, inventory management, order tracking, and an admin dashboard. Built with performance and scalability in mind.',
      image: '/projects/ecommerce.jpg',
      images: JSON.stringify(['/projects/ecommerce.jpg', '/projects/ecommerce-dashboard.jpg']),
      technologies: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Prisma', 'PostgreSQL']),
      category: 'WEB_APP' as const,
      featured: true,
      githubUrl: 'https://github.com/aronefritz/ecommerce-platform',
      liveUrl: 'https://ecommerce-demo.aronefritz.com',
      status: 'COMPLETED' as const,
      startDate: '2024-01-15',
      endDate: '2024-03-20',
      challenges: JSON.stringify(['Payment integration complexity', 'Inventory management', 'Performance optimization']),
      learnings: JSON.stringify(['Advanced Next.js patterns', 'Payment processing', 'Database optimization']),
      metrics: JSON.stringify([
        { label: 'Performance Score', value: '98/100', description: 'Lighthouse performance score' },
        { label: 'Load Time', value: '1.2s', description: 'Average page load time' }
      ]),
      order: 1,
      published: true
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and team features',
      longDescription: 'A comprehensive task management solution with real-time collaboration, project organization, deadline tracking, and team communication features.',
      image: '/projects/task-manager.jpg',
      images: JSON.stringify(['/projects/task-manager.jpg', '/projects/task-manager-board.jpg']),
      technologies: JSON.stringify(['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express']),
      category: 'WEB_APP' as const,
      featured: true,
      githubUrl: 'https://github.com/aronefritz/task-manager',
      liveUrl: 'https://tasks.aronefritz.com',
      status: 'COMPLETED' as const,
      startDate: '2023-10-01',
      endDate: '2023-12-15',
      challenges: JSON.stringify(['Real-time synchronization', 'Complex state management', 'User permissions']),
      learnings: JSON.stringify(['WebSocket implementation', 'Real-time data handling', 'Team collaboration features']),
      metrics: JSON.stringify([
        { label: 'Active Users', value: '500+', description: 'Monthly active users' },
        { label: 'Uptime', value: '99.9%', description: 'Service availability' }
      ]),
      order: 2,
      published: true
    },
    {
      title: 'Weather Data API',
      description: 'RESTful API service providing comprehensive weather data with caching and analytics',
      longDescription: 'High-performance weather API with data aggregation from multiple sources, intelligent caching, rate limiting, and detailed analytics dashboard.',
      image: '/projects/weather-api.jpg',
      images: JSON.stringify(['/projects/weather-api.jpg', '/projects/weather-dashboard.jpg']),
      technologies: JSON.stringify(['Node.js', 'Express', 'Redis', 'PostgreSQL', 'Docker']),
      category: 'API' as const,
      featured: false,
      githubUrl: 'https://github.com/aronefritz/weather-api',
      liveUrl: 'https://api.weather.aronefritz.com',
      status: 'COMPLETED' as const,
      startDate: '2023-08-01',
      endDate: '2023-09-30',
      challenges: JSON.stringify(['Data source integration', 'Caching strategy', 'Rate limiting']),
      learnings: JSON.stringify(['API design patterns', 'Caching strategies', 'Performance optimization']),
      metrics: JSON.stringify([
        { label: 'API Calls', value: '1M+', description: 'Monthly API requests' },
        { label: 'Response Time', value: '150ms', description: 'Average response time' }
      ]),
      order: 3,
      published: true
    }
  ];

  for (const project of sampleProjects) {
    const existing = await prisma.project.findFirst({
      where: { title: project.title }
    });

    if (!existing) {
      await prisma.project.create({
        data: project
      });
      console.log(`✅ Created project: ${project.title}`);
    } else {
      console.log(`⚠️ Project already exists: ${project.title}`);
    }
  }

  // Check total projects in database
  const totalProjects = await prisma.project.count();
  const publishedProjects = await prisma.project.count({
    where: { published: true }
  });
  console.log(`📊 Total projects in database: ${totalProjects}`);
  console.log(`📊 Published projects: ${publishedProjects}`);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
