# Portfolio Backend API

A robust Node.js backend API for Jenish Patel's portfolio website with full CRUD operations, authentication, and AI chatbot integration.

## 🚀 Features

- **Authentication System**: JWT-based authentication with bcrypt password hashing
- **Portfolio Management**: Full CRUD operations for all portfolio sections
- **AI Chatbot**: Gemini AI integration for intelligent portfolio assistance
- **File Upload**: Image upload system with Multer
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Database**: MongoDB with Mongoose ODM
- **API Documentation**: Comprehensive REST API endpoints

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Authentication**: JWT + bcrypt
- **AI Integration**: Google Gemini AI API
- **File Upload**: Multer
- **Validation**: Joi
- **Security**: Helmet, CORS, rate limiting

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/     # Business logic
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   └── config/         # Configuration files
├── uploads/            # File upload directory
├── .env               # Environment variables
├── package.json       # Dependencies
├── server.js          # Main server file
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Google Gemini AI API key

### Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy .env.example to .env and fill in your values
   cp .env.example .env
   ```

4. **Set up environment variables**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🌱 Database Seeding

The backend includes a comprehensive seeder that populates the database with sample data from Jenish's resume:

```bash
npm run seed
```

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Portfolio Data
- `GET /api/portfolio/hero` - Get hero section
- `PUT /api/portfolio/hero` - Update hero section (Admin)
- `GET /api/portfolio/projects` - Get all projects
- `POST /api/portfolio/projects` - Create project (Admin)
- `PUT /api/portfolio/projects/:id` - Update project (Admin)
- `DELETE /api/portfolio/projects/:id` - Delete project (Admin)
- `GET /api/portfolio/experience` - Get experience
- `POST /api/portfolio/experience` - Create experience (Admin)
- `PUT /api/portfolio/experience/:id` - Update experience (Admin)
- `DELETE /api/portfolio/experience/:id` - Delete experience (Admin)
- `GET /api/portfolio/skills` - Get skills
- `PUT /api/portfolio/skills` - Update skills (Admin)
- `GET /api/portfolio/education` - Get education
- `POST /api/portfolio/education` - Create education (Admin)
- `PUT /api/portfolio/education/:id` - Update education (Admin)
- `DELETE /api/portfolio/education/:id` - Delete education (Admin)
- `GET /api/portfolio/achievements` - Get achievements
- `POST /api/portfolio/achievements` - Create achievement (Admin)
- `PUT /api/portfolio/achievements/:id` - Update achievement (Admin)
- `DELETE /api/portfolio/achievements/:id` - Delete achievement (Admin)
- `GET /api/portfolio/leadership` - Get leadership
- `POST /api/portfolio/leadership` - Create leadership (Admin)
- `PUT /api/portfolio/leadership/:id` - Update leadership (Admin)
- `DELETE /api/portfolio/leadership/:id` - Delete leadership (Admin)

### AI Chatbot
- `POST /api/chatbot/query` - Send query to Gemini AI
- `GET /api/chatbot/history` - Get chat history (Authenticated)
- `POST /api/chatbot/feedback` - Submit chat feedback (Authenticated)

### File Upload
- `POST /api/upload/image` - Upload images (Admin)
- `DELETE /api/upload/image/:filename` - Delete image (Admin)
- `GET /api/upload/images` - Get uploaded images list (Admin)

### Health Check
- `GET /api/health` - API health status

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Joi schema validation
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers
- **File Upload Limits**: 5MB max file size, image files only

## 📊 Database Models

- **User**: Authentication and user management
- **Hero**: Portfolio hero section
- **Project**: Portfolio projects
- **Experience**: Work experience
- **Skill**: Technical skills with proficiency levels
- **Education**: Academic background
- **Achievement**: Awards and recognitions
- **Leadership**: Leadership roles and responsibilities

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
GEMINI_API_KEY=your_production_gemini_api_key
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRE=7d
CORS_ORIGIN=https://yourdomain.com
```

### Recommended Hosting Platforms

- **Backend**: Render, Railway, or Heroku
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary or AWS S3 (for production)

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm run test:watch
```

## 📝 API Response Format

All API responses follow a consistent format:

```json
{
  "status": "success|error",
  "message": "Response message",
  "data": {
    // Response data
  }
}
```

## 🔧 Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

### Code Style

- Use ES6+ features
- Follow Express.js best practices
- Implement proper error handling
- Use async/await for database operations
- Validate all inputs

## 📞 Support

For questions or issues:

1. Check the API documentation
2. Review the error logs
3. Test with the health endpoint
4. Verify environment variables

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for Jenish Patel's Portfolio**
