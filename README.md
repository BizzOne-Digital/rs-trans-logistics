# RS Trans Logistics — Full-Stack Trucking Website

A complete, premium, cinematic trucking company website with full admin panel. Built with Next.js 16, MongoDB, Framer Motion, and Tailwind CSS.

---

## 🚀 Quick Start

### 1. Install MongoDB
Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas) (free cloud tier).

### 2. Configure Environment Variables
Edit `.env.local` with your values:

```env
MONGODB_URI=mongodb://localhost:27017/rs-trans-logistics

JWT_SECRET=your-super-secret-key-change-this

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=RS Trans Logistics <your-email@gmail.com>
ADMIN_NOTIFICATION_EMAIL=rajneelsampat00@gmail.com

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Seed the Database
Visit: `http://localhost:3000/api/seed`

This will create:
- Default admin account
- Default site settings
- All 6 services with full content

### 5. Login to Admin Panel
Visit: `http://localhost:3000/admin/login`

```
Email:    admin@rstranslogistics.com
Password: Admin123!
```

⚠️ **CHANGE THESE CREDENTIALS BEFORE GOING TO PRODUCTION!**

---

## 🌐 Website Pages

| Page | URL |
|------|-----|
| Home | `/` |
| About | `/about` |
| Services | `/services` |
| Service Detail | `/services/[slug]` |
| Request Quote | `/quote` |
| Contact | `/contact` |
| Privacy Policy | `/privacy-policy` |
| Terms & Conditions | `/terms` |

## 🔐 Admin Panel Pages

| Page | URL |
|------|-----|
| Login | `/admin/login` |
| Dashboard | `/admin/dashboard` |
| Website Content | `/admin/content` |
| Services | `/admin/services` |
| Quote Requests | `/admin/quotes` |
| Contact Messages | `/admin/messages` |
| Testimonials | `/admin/testimonials` |
| FAQs | `/admin/faqs` |
| Media | `/admin/media` |
| Company Settings | `/admin/settings` |
| SEO Settings | `/admin/seo` |
| My Profile | `/admin/profile` |

---

## 📧 Email Setup (Gmail)

1. Go to your Google Account → Security → 2-Step Verification → App passwords
2. Create an app password for "Mail"
3. Use that 16-character password as `EMAIL_PASS` in `.env.local`

---

## 🗄️ Database Models

- **AdminUser** — Secure admin authentication
- **SiteSettings** — Company info, brand colors, contact details
- **Service** — All 6 service types with full content
- **QuoteRequest** — Customer freight quote requests
- **ContactMessage** — Website contact form submissions
- **Testimonial** — Client testimonials
- **FAQ** — Frequently asked questions
- **PageContent** — Editable website page content

---

## 🎨 Tech Stack

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (httpOnly cookies)
- **Email**: Nodemailer
- **Forms**: React Hook Form + Zod validation

---

## 🔧 Service Slugs

| Service | Slug |
|---------|------|
| Dry Vans | `dry-vans` |
| Reefer Service | `reefer-service` |
| Flatbed Tarp, Curtain Vans & Roll Tite | `flatbed-curtain-roll-tite` |
| Step Deck | `step-deck` |
| Container Service | `container-service` |
| Intermodal | `intermodal` |

---

## 🚢 Production Deployment

1. Change admin credentials in admin profile
2. Set `NODE_ENV=production`
3. Update `NEXT_PUBLIC_APP_URL` to your domain
4. Use a strong random `JWT_SECRET`
5. Configure MongoDB Atlas for cloud database
6. Set up Cloudinary for production image uploads (optional)

```bash
npm run build
npm start
```

---

## 📞 Business Info

- **Company**: RS Trans Logistics
- **Contact**: Rajneel Sampat
- **Phone**: +1 236 514 6876
- **Email**: rajneelsampat00@gmail.com
- **Address**: 12542 Grove Crescent, Surrey, BC V3V 2L7, Canada
- **Service Area**: Canada & USA
