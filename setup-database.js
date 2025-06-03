#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up database and admin interface...\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found. Please make sure you have a .env file with the required variables.');
  process.exit(1);
}

try {
  // Step 1: Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated\n');

  // Step 2: Push database schema
  console.log('🗄️  Setting up database schema...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('✅ Database schema created\n');

  // Step 3: Seed database
  console.log('🌱 Seeding database with sample data...');
  execSync('npm run db:seed', { stdio: 'inherit' });
  console.log('✅ Database seeded\n');

  console.log('🎉 Setup complete!\n');
  console.log('📍 Next steps:');
  console.log('1. Start the development server: npm run dev');
  console.log('2. Visit your portfolio: http://localhost:3000');
  console.log('3. Access admin dashboard: http://localhost:3000/admin/login');
  console.log('4. Login with: admin@aronefritz.com / admin123\n');
  
  console.log('🔧 Available commands:');
  console.log('- npm run dev          # Start development server');
  console.log('- npm run db:seed      # Reseed database');
  console.log('- npm run db:reset     # Reset and reseed database');
  console.log('- npx prisma studio    # Open database browser\n');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  console.log('\n🔧 Manual setup:');
  console.log('1. npx prisma generate');
  console.log('2. npx prisma db push');
  console.log('3. npm run db:seed');
  process.exit(1);
}
