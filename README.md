# **URL Shortener**

A **URL Shortener** web application built with **Express.js**, **EJS**, and **MongoDB**, featuring user authentication via **JWT tokens** and a simple yet powerful admin panel for managing shortened URLs. This app allows users to shorten URLs, store them securely, and retrieve the shortened links with ease.

## **Features**

- 🌐 **URL Shortening**: Generates a unique short URL for each long URL.
- 🔒 **Authentication**:
  - **Admin**: Manage and view all shortened URLs.
  - **User**: Access personal shortened URLs via JWT token.
- 💾 **Database Integration**: MongoDB to store URL mappings.
- 📜 **EJS Templates**: Dynamic rendering of pages.
- 🔑 **Token-based Security**: JWT for user sessions.
- 🎨 **Responsive Design**: HTML & CSS for a seamless user experience.

## **Tech Stack**

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, HTML, CSS
- **Database**: MongoDB (via `mongoose`)
- **Authentication**: JWT (JSON Web Tokens)
- **Unique ID Generation**: `shortid`, `nanoid`

## **Getting Started**

### **Prerequisites**

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=8001
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:

   ```bash
   npm start
   ```

## **Usage**

### **Endpoints**

#### **Public Routes**

1. **GET `/`**: Homepage of the application.
2. **POST `/shorten`**: Accepts a long URL and returns a shortened URL.

#### **Protected Routes**

1. **GET `/admin`**: Admin panel (requires admin authorization).
2. **GET `/user/urls`**: User's list of shortened URLs (requires JWT token).

#### **Shortened URL Access**

- Visit a shortened URL at `/url/:id` to get redirected to the original URL.

### **How to Use**

1. **Shorten a URL**:

   - Access the homepage and paste your long URL.
   - Submit the form to get a shortened URL.
2. **Admin Access**:

   - Log in as an admin to view and manage all shortened URLs.
3. **User Access**:

   - Authenticate using your JWT token to view your own shortened URLs.

## **Folder Structure**

```plaintext
url-shortener/
├── controllers/       # Handles logic for each route
├── middlewares/       # Custom middlewares for authentication and validation
├── models/            # Mongoose schemas and database models
├── routes/            # Defines application routes and endpoints
├── service/           # Business logic and reusable service functions
├── views/             # EJS templates for rendering dynamic HTML
├── .env               # Environment variables (excluded from version control)
├── .gitignore         # Specifies files and folders to ignore in Git
├── connection.js      # Database connection setup
├── index.js           # Main application entry point
├── package.json       # Project metadata and dependencies
├── package-lock.json  # Dependency lock file

```

## **Future Enhancements**

- 📊 **Analytics**: Track clicks and performance of shortened URLs.
- 🌍 **Custom Domains**: Allow users to use custom domains for their shortened links.
- 🔗 **Expiration**: Add expiration dates to links.
- 🔐 **OAuth**: Enable login via Google or GitHub.

---

## **Contributing**

Contributions are welcome! Here's how you can help:

1. Fork the repository.
2. Create a new branch for your feature/bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to the branch:
   ```bash
   git push origin feature-name
   ```
4. Open a pull request.

## **License**

This project is licensed under the [MIT License](LICENSE).

## **Author**

Developed by Lakshya Kesarwani

Feel free to reach out for any queries or suggestions! 🚀

---
