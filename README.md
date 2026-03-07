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

## Architecture

```mermaid
flowchart TD
    backend_controllers_Pdf_Pdf_js["Pdf/Pdf.js"]
    backend_controllers_Users_user_js["Users/user.js"]
    backend_models_Post_js["models/Post.js"]
    backend_models_employee_js["models/employee.js"]
    backend_models_pdf_js["models/pdf.js"]
    backend_utils_generateAuthTokenAndSetCookie_js["utils/generateAuthTokenAndSetCookie.js"]
    backend_utils_sendOTP_js["utils/sendOTP.js"]
    frontend_Context_AuthContext_jsx["Context/AuthContext.jsx"]
    frontend_src_App_jsx["src/App.jsx"]
    frontend_src_components_navbar_Navbar_jsx["navbar/Navbar.jsx"]
    frontend_src_components_userprofile_UserProfile_jsx["userprofile/UserProfile.jsx"]
    frontend_src_main_jsx["src/main.jsx"]
    frontend_src_pages_searchpage_SearchPage_jsx["searchpage/SearchPage.jsx"]

    frontend_src_App_jsx --> frontend_src_pages_searchpage_SearchPage_jsx
    frontend_src_App_jsx --> frontend_Context_AuthContext_jsx
    frontend_src_components_navbar_Navbar_jsx --> frontend_Context_AuthContext_jsx
    backend_controllers_Pdf_Pdf_js --> backend_models_pdf_js
    backend_controllers_Users_user_js --> backend_utils_sendOTP_js
    backend_controllers_Users_user_js --> backend_models_employee_js
    frontend_src_components_userprofile_UserProfile_jsx --> frontend_Context_AuthContext_jsx
    frontend_src_main_jsx --> frontend_src_App_jsx
    frontend_src_main_jsx --> frontend_Context_AuthContext_jsx

    classDef backend fill:#1a1a2e,stroke:#7c6cf8,color:#e8eaf6
    classDef frontend fill:#0d1b2a,stroke:#00e8a2,color:#e8eaf6
    classDef config fill:#1a0a0a,stroke:#f5a623,color:#e8eaf6
    class backend_controllers_Pdf_Pdf_js backend
    class backend_controllers_Users_user_js backend
    class backend_models_Post_js backend
    class backend_models_employee_js backend
    class backend_models_pdf_js backend
    class backend_utils_generateAuthTokenAndSetCookie_js backend
    class backend_utils_sendOTP_js backend
    class frontend_Context_AuthContext_jsx frontend
    class frontend_src_App_jsx frontend
    class frontend_src_components_navbar_Navbar_jsx frontend
    class frontend_src_components_userprofile_UserProfile_jsx frontend
    class frontend_src_main_jsx frontend
    class frontend_src_pages_searchpage_SearchPage_jsx frontend


---
> 🤖 *Last automated update: 2026-03-08 02:11:14*