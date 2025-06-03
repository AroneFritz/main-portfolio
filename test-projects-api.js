const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testProjectsAPI() {
  try {
    console.log('🔍 Testing projects API...');
    
    // Test database connection
    console.log('📊 Checking database connection...');
    const projects = await prisma.project.findMany();
    console.log(`✅ Found ${projects.length} projects in database`);
    
    if (projects.length > 0) {
      console.log('📋 Projects in database:');
      projects.forEach((project, index) => {
        console.log(`${index + 1}. ${project.title} (${project.category}) - Published: ${project.published}`);
      });
      
      // Test the transformation logic
      console.log('\n🔄 Testing transformation logic...');
      const transformedProjects = projects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        longDescription: project.longDescription,
        image: project.image,
        images: project.images ? JSON.parse(project.images) : [project.image],
        technologies: JSON.parse(project.technologies),
        category: project.category.toLowerCase().replace('_', '-'),
        featured: project.featured,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        status: project.status.toLowerCase().replace('_', '-'),
        startDate: project.startDate,
        endDate: project.endDate,
        challenges: project.challenges ? JSON.parse(project.challenges) : [],
        learnings: project.learnings ? JSON.parse(project.learnings) : [],
        metrics: project.metrics ? JSON.parse(project.metrics) : []
      }));
      
      console.log('✅ Transformation successful');
      console.log('📄 Sample transformed project:');
      console.log(JSON.stringify(transformedProjects[0], null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error testing projects API:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testProjectsAPI();
