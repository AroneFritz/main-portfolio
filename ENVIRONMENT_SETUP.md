# Environment Variables Setup Guide

## 🔧 Local Development Setup

### 1. Create Your Local Environment File
```bash
# Copy the example file
cp .env.example .env
```

### 2. Update Your `.env` File
Edit the `.env` file with your actual values:

```env
# Database Configuration
DATABASE_URL="file:./dev.db"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Admin credentials
ADMIN_EMAIL="admin@aronefritz.com"
ADMIN_PASSWORD="your-secure-admin-password"
ADMIN_NAME="Arone Fritz"
```

## 🚀 Vercel Deployment Setup

### 1. Database Setup
Choose one of these options:

#### Option A: Vercel Postgres (Recommended)
1. Go to Vercel Dashboard → Storage → Create Database → Postgres
2. Copy the connection string
3. Use it as your `DATABASE_URL`

#### Option B: Supabase (Free Alternative)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database → Connection string
4. Use it as your `DATABASE_URL`

### 2. Environment Variables in Vercel
In your Vercel project dashboard:
1. Go to Settings → Environment Variables
2. Add these variables:

```
DATABASE_URL = postgresql://username:password@hostname:port/database
JWT_SECRET = your-super-secret-jwt-key-change-this-in-production
ADMIN_EMAIL = admin@aronefritz.com
ADMIN_PASSWORD = your-secure-admin-password
ADMIN_NAME = Arone Fritz
```

## 🔒 Security Best Practices

### ✅ DO:
- Keep `.env` file local only
- Use `.env.example` for documentation
- Generate strong JWT secrets
- Use secure admin passwords
- Set environment variables in Vercel dashboard

### ❌ DON'T:
- Upload `.env` to GitHub
- Use weak passwords
- Share credentials in code
- Commit secrets to version control

## 🛠️ Generate Secure JWT Secret

Use one of these methods to generate a secure JWT secret:

### Method 1: Node.js
```javascript
require('crypto').randomBytes(64).toString('hex')
```

### Method 2: Online Generator
Visit: https://generate-secret.vercel.app/32

### Method 3: Command Line
```bash
openssl rand -hex 32
```

## 📋 Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `postgresql://...` |
| `JWT_SECRET` | Secret for JWT tokens | `abc123...` |
| `ADMIN_EMAIL` | Admin login email | `admin@aronefritz.com` |
| `ADMIN_PASSWORD` | Admin login password | `SecurePass123!` |
| `ADMIN_NAME` | Admin display name | `Arone Fritz` |

## 🔍 Troubleshooting

### Build Errors
- Ensure all required variables are set
- Check DATABASE_URL format
- Verify JWT_SECRET is set

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check database is accessible
- Ensure database exists

### Admin Login Issues
- Check JWT_SECRET matches
- Verify admin credentials
- Run password reset if needed

## 📚 Additional Resources

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Prisma Environment Variables](https://www.prisma.io/docs/guides/development-environment/environment-variables)
