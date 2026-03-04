# PDF_POST_AI_CHATBOT - Full-Stack Application with React

This full-stack application leverages the power of React for frontend and Node.js with Express for the backend, offering functionalities for PDF management, user authentication, and AI chatbot interaction.

## Features

- User registration and login with OTP verification.
- Upload, view, and delete PDFs.
- Profile image upload functionality.
- AI chatbot integration for interactive communication.
- CRUD operations for posts.
- Search functionality for users and PDFs.

## Tech Stack

**Frontend:**
- React
- Vite
- Tailwind CSS

**Backend:**
- Node.js
- Express
- MongoDB
- Mongoose
- Multer
- Bcrypt
- Nodemailer

## Installation Instructions

### Prerequisites

- Node.js installed (version 14 or higher recommended)
- npm or Yarn installed

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend/
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. Run the React application:
    ```bash
    npm run dev
    ```

### Backend

1. Navigate to the backend directory:
    ```bash
    cd backend/
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. Run the backend application:
    ```bash
    npm start
    ```

## Usage Guide

### User Registration and Login

- Navigate to `/signup` to register a new user.
- Navigate to `/login` to sign in.
- Use `/otp-verification` for OTP verification.

### PDF Management

- Upload PDFs via `/upload` once logged in.
- View uploaded PDFs on `/dashboard`.
- Delete PDFs using the relevant functionality on the dashboard.

### AI Chatbot Interaction

- Access the chatbot via `/chatbot` for interactive sessions.

## Environment Variables

Ensure the following environment variables are set up in your `.env` file:

- `MONGO_URI` - MongoDB connection string.
- `JWT_SECRET` - Secret key for JWT.
- `EMAIL_SERVICE` - Email service name (e.g., Gmail).
- `EMAIL_USERNAME` - Username for the email service.
- `EMAIL_PASSWORD` - Password for the email service.

## API Reference

### User Routes

- `POST /register` - Register a new user.
- `POST /login` - User login.
- `POST /verify-otp` - OTP verification.

### PDF Routes

- `POST /upload-pdf` - Upload a PDF.
- `GET /user-pdfs/:userId` - Get PDFs for a specific user.
- `DELETE /delete-pdf/:id` - Delete a specific PDF.

### Profile Image Route

- `POST /upload-profile-image` - Upload a profile image.

### Search Route

- `GET /search` - Search users or PDFs.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
> 🤖 *Last automated update: 2026-03-05 01:17:59*