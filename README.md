# Professional Developer Portfolio

A high-end, modern developer portfolio built with Next.js, TypeScript, and cutting-edge web technologies. Features stunning animations, 3D elements, dark/light themes, and a comprehensive showcase of projects and skills.

## ✨ Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Stunning Animations**: Framer Motion + GSAP for smooth, professional animations
- **3D Elements**: Three.js integration for immersive visual experiences
- **Theme Support**: Dark/light mode with smooth transitions
- **Responsive Design**: Mobile-first approach, works on all devices
- **SEO Optimized**: Meta tags, Open Graph, structured data
- **PWA Ready**: Progressive Web App with offline support
- **Performance**: Optimized for Core Web Vitals and fast loading
- **Analytics**: Google Analytics and Plausible integration ready
- **Contact Form**: Functional contact form with validation
- **Blog Section**: Markdown-based blog with syntax highlighting
- **Project Filtering**: Dynamic project categorization and filtering
- **Testimonials**: Interactive testimonial carousel
- **Skills Visualization**: Animated skill progress indicators

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-site.git
   cd portfolio-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/           # Layout components (nav, footer)
│   ├── sections/         # Page sections (hero, about, etc.)
│   └── providers/        # Context providers
├── data/                 # Static data and content
├── lib/                  # Utility functions
└── types/                # TypeScript type definitions
```

## 🎨 Customization

### Personal Information
Update your personal details in `src/data/content.ts`:

```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  // ... other details
};
```

### Projects
Add your projects to the `projects` array in `src/data/content.ts`:

```typescript
export const projects: Project[] = [
  {
    id: "your-project",
    title: "Project Title",
    description: "Project description",
    // ... other project details
  },
];
```

### Skills
Update your skills in the `skills` array:

```typescript
export const skills: Skill[] = [
  {
    name: "React",
    category: "frontend",
    level: "expert",
    yearsOfExperience: 3,
  },
];
```

### Colors and Theming
Customize the color scheme in `src/app/globals.css`:

```css
:root {
  --primary: 262.1 83.3% 57.8%;
  --secondary: 210 40% 96%;
  /* ... other colors */
}
```

## 🖼️ Adding Images

1. **Profile Image**: Add your photo as `public/profile-image.jpg`
2. **Project Images**: Add project screenshots to `public/projects/`
3. **Blog Images**: Add blog post images to `public/blog/`
4. **Testimonial Images**: Add client photos to `public/testimonials/`

## 📧 Contact Form Setup

The contact form is ready to use. To enable email sending:

1. Choose an email service (SendGrid, Resend, etc.)
2. Add your API keys to environment variables
3. Update the contact API route in `src/app/api/contact/route.ts`

Example with SendGrid:
```typescript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
```

## 📊 Analytics Setup

### Google Analytics
1. Get your GA4 measurement ID
2. Add to environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Plausible Analytics
1. Add your domain to Plausible
2. Update the script in `src/app/layout.tsx`

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify

### Custom Server
1. Build: `npm run build`
2. Start: `npm start`

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your_domain.com

# Email Service (example with SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key

# Database (if using)
DATABASE_URL=your_database_url
```

## 📱 PWA Configuration

The portfolio is PWA-ready. To customize:

1. Update `public/manifest.json` with your app details
2. Replace icons in `public/icons/` with your own
3. Customize caching strategies in `next.config.ts`

## 🎯 Performance Optimization

- **Images**: Use WebP format and optimize with `next/image`
- **Fonts**: Self-host fonts for better performance
- **Code Splitting**: Automatic with Next.js
- **Caching**: Configured for optimal caching strategies

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Three.js](https://threejs.org/) - 3D graphics
- [Lucide React](https://lucide.dev/) - Icons
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/portfolio-site/issues).

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out:

- Email: your.email@example.com
- Twitter: [@yourusername](https://twitter.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)

---

⭐ If you found this portfolio template helpful, please give it a star on GitHub!
