import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function resetAdminPassword() {
  try {
    console.log('🔐 Resetting admin password from environment variables...\n');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@aronefritz.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if admin exists
    const admin = await prisma.admin.findUnique({
      where: { email: adminEmail }
    });

    if (!admin) {
      console.log(`❌ Admin with email ${adminEmail} not found.`);
      process.exit(1);
    }

    // Hash the password from environment variable
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Update the password in database
    await prisma.admin.update({
      where: { email: adminEmail },
      data: { password: hashedPassword }
    });

    console.log('✅ Admin password reset successfully!');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
    console.log('\n💡 You can now login with these credentials.');
    console.log('🔒 Remember to change ADMIN_PASSWORD in your .env file for security.');

  } catch (error) {
    console.error('❌ Error resetting password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword();
