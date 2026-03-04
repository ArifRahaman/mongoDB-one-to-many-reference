# MongoDB One-to-Many Reference - Full-Stack Application

This project is a full-stack application utilizing MongoDB for managing one-to-many relationships. The application is structured to handle PDF uploads, user authentication, and more, with a backend built on Node.js, Express, and MongoDB, and a frontend implemented with React and Vite.

## Features

- User registration and login with OTP verification
- PDF upload and management
- User profile management
- Real-time chat functionality with AI chatbot
- Search functionality for users and posts
- Text-to-speech and speech-to-text capabilities

## Tech Stack

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Multer
- bcrypt

### Frontend

- React.js
- Vite
- Axios
- React Router
- Tailwind CSS

## Installation Instructions

### Prerequisites

- Node.js (version 14 or higher recommended)
- npm or Yarn

### Frontend Setup

1. Clone the repository and navigate to the frontend directory:
    ```bash
    cd frontend/
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend/
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    npm start
    ```

## Usage Guide

1. Access the application via `http://localhost:5173`.
2. Register a new user or login if you already have an account.
3. Upload PDFs and manage your profile via the dashboard.
4. Engage with the AI chatbot for real-time interaction.
5. Utilize the search functionality to find users and posts.

## Environment Variables

Ensure you have the following environment variables set up in your `.env` file in the `backend` directory:

- `MONGO_URI`: Connection string for MongoDB.
- `JWT_SECRET`: Secret key for JWT token generation.
- `EMAIL_SERVICE`: Email service provider for sending OTP.
- `EMAIL_USER`: Email account username for sending OTP.
- `EMAIL_PASS`: Email account password for sending OTP.

## API Reference

### User Authentication

- `POST /register`: Register a new user.
- `POST /login`: Log in an existing user.
- `POST /verify-otp`: Verify OTP for user authentication.

### PDF Management

- `POST /upload-pdf`: Upload a new PDF.
- `GET /pdfs/:pdfId`: Retrieve a specific PDF by ID.
- `DELETE /delete-pdf/:id`: Delete a PDF by ID.
- `PUT /edit-pdf-title/:id`: Edit the title of a PDF by ID.

### User Profile

- `POST /upload-profile-image`: Upload a profile image.
- `GET /user-pdfs/:userId`: Get PDFs associated with a user.

### Other Endpoints

- `GET /search`: Search for users or posts.
- `POST /tts`: Text-to-speech conversion.
- `POST /stt`: Speech-to-text conversion.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---
> 🤖 *Last automated update: 2026-03-04 15:58:20*