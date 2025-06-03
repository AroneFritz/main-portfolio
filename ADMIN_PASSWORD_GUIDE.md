# Admin Password Management Guide

## 🔐 How to Change Admin Password

There are several ways to change your admin password. Choose the method that works best for you:

## Method 1: Using Environment Variable (Recommended)

### Step 1: Update .env File
Edit your `.env` file and change the password:

```env
# Admin credentials (for initial setup)
ADMIN_EMAIL="admin@aronefritz.com"
ADMIN_PASSWORD="your-new-secure-password"
ADMIN_NAME="Arone Fritz"
```

### Step 2: Reset Password in Database
Run the reset script to update the database:

```bash
npm run admin:reset-password
```

This will:
- ✅ Read the password from your .env file
- ✅ Hash it securely with bcrypt
- ✅ Update the database
- ✅ Confirm the change

## Method 2: Interactive Password Update

Use the interactive script to change password with prompts:

```bash
npm run admin:update-password
```

This will:
- 📧 Ask for admin email (default: admin@aronefritz.com)
- 🔑 Prompt for new password
- ✅ Ask for password confirmation
- 🔒 Hash and update in database

## Method 3: Manual Database Update

If you prefer to do it manually:

### Step 1: Generate Password Hash
Create a simple script to hash your password:

```javascript
// hash-password.js
const bcrypt = require('bcryptjs');
const password = 'your-new-password';
const hash = bcrypt.hashSync(password, 12);
console.log('Hashed password:', hash);
```

### Step 2: Update Database Directly
```bash
npx prisma studio
```

Then update the admin record with the new hashed password.

## Method 4: Re-seed Database

If you want to completely reset:

```bash
npm run db:reset
```

This will:
- 🗑️ Clear all data
- 🌱 Re-seed with fresh data
- 👤 Create admin with password from .env

## 🔒 Security Best Practices

### Strong Password Requirements:
- ✅ At least 8 characters long
- ✅ Mix of uppercase and lowercase letters
- ✅ Include numbers and special characters
- ✅ Avoid common words or patterns

### Example Strong Passwords:
- `MyPortfolio2024!`
- `Secure#Admin$Pass`
- `WebDev@2024#Strong`

### Environment Security:
- 🚫 Never commit .env files to version control
- 🔄 Change default passwords immediately
- 🔐 Use different passwords for different environments
- 📝 Store production passwords securely

## 🛠️ Available Commands

```bash
# Reset password using .env file
npm run admin:reset-password

# Interactive password update
npm run admin:update-password

# Reset entire database (includes admin)
npm run db:reset

# Seed database only
npm run db:seed

# Open database browser
npx prisma studio
```

## 🔍 Troubleshooting

### "Admin not found" Error:
- Check the email in your .env file
- Verify admin exists in database
- Run `npx prisma studio` to check admin table

### "Password too short" Error:
- Ensure password is at least 6 characters
- Use a stronger password for security

### Database Connection Error:
- Check DATABASE_URL in .env
- Ensure database file exists
- Run `npx prisma db push` if needed

### Login Still Fails:
- Clear browser cache/cookies
- Check if JWT_SECRET changed
- Verify password was actually updated

## 📋 Quick Reference

### Current Admin Credentials:
- **Email**: `admin@aronefritz.com`
- **Password**: Check your `.env` file

### Login URL:
- **Local**: `http://localhost:3000/admin/login`
- **Production**: `https://yoursite.com/admin/login`

### Dashboard URL:
- **Local**: `http://localhost:3000/admin/dashboard`
- **Production**: `https://yoursite.com/admin/dashboard`

## 🚀 Production Deployment

### Before Deploying:
1. **Change Default Password**: Never use default passwords in production
2. **Strong JWT Secret**: Update JWT_SECRET in .env
3. **Secure Environment**: Use platform environment variables
4. **Backup Strategy**: Implement database backups

### Environment Variables for Production:
```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="super-secure-random-string-for-production"
ADMIN_EMAIL="your-real-email@domain.com"
ADMIN_PASSWORD="very-secure-production-password"
ADMIN_NAME="Your Real Name"
```

## ✅ Success Checklist

After changing password:
- [ ] Password updated in .env file
- [ ] Database updated with new hash
- [ ] Can login with new credentials
- [ ] Old password no longer works
- [ ] JWT_SECRET is secure
- [ ] .env file not in version control

## 🆘 Emergency Access

If you're locked out:
1. **Reset via .env**: Update .env and run reset script
2. **Database Access**: Use Prisma Studio to view/edit
3. **Complete Reset**: Run `npm run db:reset`
4. **Manual Recovery**: Create new admin via seed script

Remember: Always keep your admin credentials secure and use strong passwords!
