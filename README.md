# 💬 TMchat

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-20.x-green.svg)
![MERN](https://img.shields.io/badge/stack-MERN-blueviolet.svg)

# [🔗 🌐LIVE DEMO](https://chat-with-me-ee1bacf70853.herokuapp.com)
# [🔗 📁DOCUMENTATION](https://drive.google.com/drive/folders/1W7bIllz6eY3xX3O1AblKhml1X5Il_1fl?usp=sharing)

**TMchat** is a modern, real-time messaging application built with the MERN stack (MongoDB, Express, React, Node.js). It features secure authentication, real-time chat capabilities using Socket.io, and a sleek, responsive UI powered by TailwindCSS and DaisyUI.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery and updates using Socket.io.
- **Secure Authentication**: User signup, login, and logout with JWT and secure cookies.
- **Profile Management**: Update user profiles, including avatar uploads via Cloudinary.
- **Online Status**: See who is currently online.
- **Security**: Protected routes, rate limiting, and bot protection using Arcjet.
- **Responsive Design**: A beautiful, dark-themed UI that works seamlessly on desktop and mobile.
- **Email Notifications**: Integrated email handling (Resend/Nodemailer).

## 🛠️ Tech Stack

### Backend

- **Node.js** & **Express.js**: Server-side runtime and framework.
- **MongoDB** & **Mongoose**: Database and object modeling.
- **Socket.io**: Real-time, bidirectional communication.
- **JWT (JSON Web Tokens)**: Secure authentication.
- **Cloudinary**: Cloud storage for image uploads.
- **Arcjet**: Security middleware for rate limiting and bot detection.
- **Resend/Nodemailer**: Email services.

### Frontend

- **React**: UI library.
- **Vite**: Fast build tool and development server.
- **TailwindCSS**: Utility-first CSS framework.
- **DaisyUI**: Component library for TailwindCSS.
- **Zustand**: Lightweight state management.
- **Axios**: HTTP client for API requests.
- **React Hot Toast**: Toast notifications.

## 📂 Project Structure

```
TMchat/
├── backend/                 # Backend server code
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── emails/          # Email templates and handlers
│   │   ├── lib/             # Utility libraries (DB, Cloudinary, Socket, etc.)
│   │   ├── middleware/      # Express middleware (Auth, Arcjet)
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   └── server.js        # Entry point
│   └── package.json
├── frontend/                # Frontend React application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Frontend utilities (Axios)
│   │   ├── pages/           # Application pages
│   │   ├── store/           # Zustand state stores
│   │   └── App.jsx          # Main component
│   └── package.json
├── package.json             # Root configuration
└── README.md                # Project documentation
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v20.x recommended)
- MongoDB installed locally or a MongoDB Atlas URI.
- Cloudinary account for image storage.
- Arcjet account for security features.

### Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ItsME-TM/TMchat.git
    cd TMchat
    ```

2.  **Install dependencies:**

    ```bash
    # Install root dependencies
    npm install

    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the `backend/` directory with the following variables:

    ```env
    PORT=5001
    MONGO_URL=your_mongodb_connection_string
    NODE_ENV=development
    JWT_SECRET=your_jwt_secret_key
    CLIENT_URL=http://localhost:5173

    # Email Configuration
    SMTP_HOST=smtp.example.com
    SMTP_PORT=587
    SMTP_SECURE=false
    SMTP_USER=your_email_user
    SMTP_PASS=your_email_password
    EMAIL_FROM=noreply@example.com
    EMAIL_FROM_NAME="Chat App"

    # Cloudinary Configuration
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

    # Arcjet Configuration
    ARCJET_KEY=your_arcjet_key
    ARCJET_ENV=development
    ```

4.  **Run the Application:**

    You can run the backend and frontend separately or concurrently (if scripts are set up).

    **Backend:**

    ```bash
    cd backend
    npm run dev
    ```

    **Frontend:**

    ```bash
    cd frontend
    npm run dev
    ```

    Access the app at `http://localhost:5173`.

## 🚀 Deployment

The project is configured for deployment on platforms like Heroku.

- **Build Script**: The `heroku-postbuild` script in the root `package.json` handles installing dependencies for both backend and frontend, and building the frontend for production.
- **Static Files**: In production (`NODE_ENV=production`), the backend is set up to serve the static files from the `frontend/dist` directory.

## 📡 API Documentation

### Authentication (`/api/auth`)

| Method | Endpoint          | Description                         | Protected |
| :----- | :---------------- | :---------------------------------- | :-------- |
| POST   | `/signup`         | Register a new user                 | No        |
| POST   | `/login`          | Login an existing user              | No        |
| POST   | `/logout`         | Logout the current user             | No        |
| PUT    | `/update-profile` | Update user profile (avatar, etc.)  | Yes       |
| GET    | `/check`          | Check current authentication status | Yes       |

### Messages (`/api/messages`)

| Method | Endpoint    | Description                         | Protected |
| :----- | :---------- | :---------------------------------- | :-------- |
| GET    | `/contacts` | Get all available contacts          | Yes       |
| GET    | `/chats`    | Get users with active chat history  | Yes       |
| GET    | `/:id`      | Get messages between user and `:id` | Yes       |
| POST   | `/send/:id` | Send a message to user `:id`        | Yes       |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the ISC License.
