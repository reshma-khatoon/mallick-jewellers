# Mallick Jewellers Website

This project is a jewellery store website with a frontend landing page and a Node.js backend for order requests.

## Features

- Aesthetic homepage with gold and silver jewellery styling
- Contact form that submits to a backend `/order` endpoint
- Instagram link: https://www.instagram.com/mallickjewellers_designers/
- Mobile-friendly navigation and gallery section
- Node.js backend available for order processing and future email/database integrations

## Run locally

1. Open a terminal in the project folder:
   ```bash
   cd c:\Users\Hp\OneDrive\Desktop\mj
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the site:
   ```bash
   npm start
   ```
4. Open in your browser:
   ```bash
   http://localhost:3000
   ```

## Deploy options

### Deploy on Vercel

1. Install the Vercel CLI or use the Vercel website.
2. Run:
   ```bash
   npm install -g vercel
   vercel
   ```
3. Follow the prompts and select the project folder.
4. Vercel will deploy your Node.js site automatically.

### Deploy on Render

1. Create a new Web Service in Render.
2. Connect your GitHub repository or upload the project.
3. Set the build command:
   ```bash
   npm install
   ```
4. Set the start command:
   ```bash
   npm start
   ```
5. Deploy and use the provided URL.

### Deploy on Railway

1. Sign in to Railway and create a new project.
2. Connect the repository or upload files.
3. Set the start command to:
   ```bash
   npm start
   ```
4. Railway will handle the deployment.

## Environment variables

Create a `.env` file in the project root and fill in your SMTP settings using the `.env.example` template.

Email is optional by default:

- `ENABLE_EMAIL=false` disables email delivery and keeps the site working normally
- `ENABLE_EMAIL=true` enables email notifications and requires SMTP settings

Required values when `ENABLE_EMAIL=true`:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_TO`

## Notes

- The backend logs order requests to the console and saves requests to `orders.log`.
- If SMTP is configured, order requests are also sent by email.
