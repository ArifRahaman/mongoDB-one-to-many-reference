# PDF_POST_AI_CHATBOT - Full-Stack Application with React

This project is a full-stack application built with React, Node.js, Express, and MongoDB. It enables users to upload, manage, and interact with PDFs through AI-powered chat functionality.

## Features

- User authentication and registration
- Upload and manage PDF files
- AI chatbot for PDF interactions
- User profile management
- Search functionality
- Speech-to-text and text-to-speech support

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Other Libraries**: Axios, js-cookie, react-toastify

## Installation

### Prerequisites

- Node.js (version 14 or higher recommended)
- npm or Yarn

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/ArifRahaman/mongoDB-one-to-many-reference.git
    ```

2. Navigate to the frontend directory:
    ```bash
    cd frontend/
    ```

3. Install the necessary dependencies:
    ```bash
    npm install
    ```

4. Run the React application:
    ```bash
    npm run dev
    ```

### Backend Setup

5. Navigate to the backend directory:
    ```bash
    cd backend/
    ```

6. Install the necessary dependencies:
    ```bash
    npm install
    ```

7. Run the backend application:
    ```bash
    npm start
    ```

## Usage

### Example Usage

- **User Registration**: Access the registration page to create a new user account.
- **Login**: Navigate to the login page and enter your credentials.
- **Upload PDF**: After logging in, use the upload feature to add PDFs.
- **Interact with Chatbot**: Use the chatbot to interact with your uploaded PDFs.

## Environment Variables

Ensure you set up the following environment variables:

- `MONGO_URI`: MongoDB connection string

## API Reference

### Endpoints

- **POST /register**: Register a new user
- **POST /login**: Login an existing user
- **POST /upload-pdf**: Upload a new PDF
- **GET /pdfs/:pdfId**: Retrieve a specific PDF
- **DELETE /delete-pdf/:id**: Delete a PDF
- **POST /upload-profile-image**: Upload a profile image
- **GET /search**: Search functionality

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---
> 🤖 *Last automated update: 2026-03-05 20:47:13*