# PDF Management and AI Chatbot Application - Full-Stack

This project is a comprehensive full-stack application designed to manage PDFs, authenticate users, and interact with an AI chatbot. The application integrates both frontend and backend technologies to provide a seamless experience.

## Features

- **User Authentication**: Register, login, and OTP verification.
- **PDF Management**: Upload, view, and delete PDFs.
- **Profile Management**: Upload and update profile images.
- **AI Chatbot**: Engage in interactive communication.
- **Post Management**: Create, read, update, and delete posts.
- **Search Functionality**: Search for users and PDFs.

## Tech Stack

**Frontend:**
- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Toastify

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

Create a `.env` file in the backend directory and set the following environment variables:

- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT.
- `EMAIL_SERVICE`: Email service name (e.g., Gmail).
- `EMAIL_USERNAME`: Username for the email service.
- `EMAIL_PASSWORD`: Password for the email service.

## API Reference

### User Routes

- `POST /register`: Register a new user.
- `POST /login`: User login.
- `POST /verify-otp`: OTP verification.

### PDF Routes

- `POST /upload-pdf`: Upload a PDF.
- `GET /user-pdfs/:userId`: Get PDFs for a specific user.
- `DELETE /delete-pdf/:id`: Delete a specific PDF.

### Profile Image Route

- `POST /upload-profile-image`: Upload a profile image.

### Search Route

- `GET /search`: Search for users or PDFs.

## Contributing

Contributions are welcome! Please fork the repository and submit a Pull Request with your changes.

## License

This project is open-source and available under the [MIT License](LICENSE).

---
> 🤖 *Last automated update: 2026-03-05 20:12:07*