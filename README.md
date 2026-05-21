# Mallick Jewellers Website

This project is a jewellery store website with a frontend landing page and a Node.js backend for order requests.

## Features

- Aesthetic homepage with gold and silver jewellery styling
- Contact form that submits to a backend `/order` endpoint
- Instagram link: https://www.instagram.com/mallickjewellers_designers/
- Mobile-friendly navigation and gallery section

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

## Notes

- The backend currently logs order requests to the console.
- For email notifications or database storage, additional backend setup is needed.
