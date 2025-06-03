import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function updateAdminPassword() {
  try {
    console.log('🔐 Admin Password Update Tool\n');

    // Get admin email
    const email = await askQuestion('Enter admin email (default: admin@aronefritz.com): ');
    const adminEmail = email.trim() || 'admin@aronefritz.com';

    // Check if admin exists
    const admin = await prisma.admin.findUnique({
      where: { email: adminEmail }
    });

    if (!admin) {
      console.log(`❌ Admin with email ${adminEmail} not found.`);
      process.exit(1);
    }

    // Get new password
    const newPassword = await askQuestion('Enter new password: ');
    
    if (newPassword.length < 6) {
      console.log('❌ Password must be at least 6 characters long.');
      process.exit(1);
    }

    // Confirm password
    const confirmPassword = await askQuestion('Confirm new password: ');
    
    if (newPassword !== confirmPassword) {
      console.log('❌ Passwords do not match.');
      process.exit(1);
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the password in database
    await prisma.admin.update({
      where: { email: adminEmail },
      data: { password: hashedPassword }
    });

    console.log('✅ Password updated successfully!');
    console.log(`📧 Admin email: ${adminEmail}`);
    console.log('🔑 You can now login with your new password.');

  } catch (error) {
    console.error('❌ Error updating password:', error);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

updateAdminPassword();
