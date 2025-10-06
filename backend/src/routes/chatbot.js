const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Portfolio context for AI responses
const portfolioContext = `
You are an AI assistant for Jenish Patel's portfolio website. Here's the context about Jenish:

**Personal Information:**
- Full Name: JENISH KANTILAL PATEL
- Current Email: 23bce529@nirmauni.ac.in
- Phone: +91-9979891854
- Location: Gandhinagar, Gujarat, India

**Professional Summary:**
Final-year BTech CSE student passionate about delivering scalable software solutions through full-stack development, DevOps automation, and emerging tech such as blockchain and AI. Proven success in hackathons, production-ready deployments, and Agile team environments.

**Key Skills:**
- Programming: C++, Python, Java, JavaScript, Go
- Web Technologies: Node.js, Express.js, React.js, REST API, MongoDB, MySQL
- DevOps & Cloud: Docker, Jenkins, CI/CD, Linux, AWS, Kubernetes
- Emerging Tech: Blockchain, Smart Contracts, AI/ML, LLMs, Gemini API, RAG

**Notable Projects:**
1. TrackIT – Full-Stack Asset Tracker with Barcode Scanning
2. EviVault – Blockchain-Based Digital Evidence Management
3. StockPro - AI-Powered Stock Analysis (2nd place at MINeD Hackathon 2025, 47K INR prize)
4. UpNext AI – AI-Powered Financial Intelligence Platform
5. Automated CI/CD Pipeline for Dockerized Microservices
6. EcoFeed – Smart Food Redistribution & Waste-to-Farm Platform

**Experience:**
- DevOps Engineer Intern at AIVID Techvision Pvt. Ltd. (May-Jul 2025)
- Technical Head of Cybersecurity Club at Nirma University

**Education:**
- BTech CSE at Nirma University (CGPA: 8.33/10)
- Diploma in Computer Engineering at MSU Baroda (87.47%)
- Minor in Cyber Security

**Achievements:**
- 2nd Place at MINeD 2025 Hackathon among 250+ teams
- Ranked 1st in Diploma at MSU Baroda
- Merit-based TFWS Admission to Nirma University
- AWS Academy Graduate – Cloud Foundations

**Social Links:**
- LinkedIn: https://www.linkedin.com/in/Jenish-Patel-31k/
- GitHub: https://github.com/Jenish-Patel31
- LeetCode: https://leetcode.com/Jenish-patel31/

Always provide helpful, accurate information about Jenish's skills, projects, experience, and achievements. Be conversational but professional. If asked about something not covered in this context, politely redirect to the portfolio sections or suggest contacting Jenish directly.
`;

// @route   POST /api/chatbot/query
// @desc    Send query to Gemini AI
// @access  Public
router.post('/query', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Message is required'
      });
    }

    // Resolve model to use (env override + sensible fallbacks)
    const configuredModel = process.env.GEMINI_MODEL && process.env.GEMINI_MODEL.trim().length > 0
      ? process.env.GEMINI_MODEL.trim()
      : "gemini-1.5-flash";

    // Prefer 2.0 models, then fall back to older widely available IDs
    const candidateModels = [
      configuredModel,
      "gemini-2.0-flash",
      "gemini-1.5-flash-latest",
      "gemini-1.5-pro",
      "gemini-pro" // supported by older SDK versions
      // "gemini-2.0-pro",
    ];

    let aiResponse;
    let lastError;

    // Try models in order until one succeeds
    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(conversationContext);
        const response = await result.response;
        aiResponse = response.text();
        // On success, break out
        break;
      } catch (err) {
        lastError = err;
        // Continue trying the next candidate on 404/unsupported errors
        const msg = (err && err.message) ? err.message.toLowerCase() : "";
        const isModelNotFound = msg.includes("not found") || msg.includes("unsupported") || msg.includes("404");
        if (!isModelNotFound) {
          // If it's not a model-availability issue, rethrow immediately
          throw err;
        }
        // Otherwise, try next model
      }
    }

    if (!aiResponse) {
      // Exhausted all candidates
      throw lastError || new Error("Unable to generate response with available Gemini models");
    }

    // Prepare conversation context
    let conversationContext = portfolioContext;
    
    // Add conversation history if provided
    if (conversationHistory.length > 0) {
      conversationContext += '\n\n**Recent Conversation Context:**\n';
      conversationHistory.slice(-5).forEach((msg, index) => {
        conversationContext += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
    }

    // Add current user message
    conversationContext += `\n\n**Current User Question:** ${message}`;

    // Generate response succeeded above

    res.json({
      status: 'success',
      data: {
        message: aiResponse,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Chatbot query error:', error);
    
    // Handle specific Gemini API errors
    if (error.message.includes('API_KEY')) {
      return res.status(500).json({
        status: 'error',
        message: 'AI service configuration error. Please try again later.'
      });
    }
    
    if (error.message.includes('quota')) {
      return res.status(429).json({
        status: 'error',
        message: 'AI service quota exceeded. Please try again later.'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Unable to process your request at the moment. Please try again later.'
    });
  }
});

// @route   GET /api/chatbot/history
// @desc    Get chat history (authenticated users)
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    // For now, return empty history since we're not storing it
    // In a production app, you might want to store chat history in the database
    res.json({
      status: 'success',
      data: {
        history: [],
        message: 'Chat history feature coming soon'
      }
    });
  } catch (error) {
    console.error('Chat history fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/chatbot/feedback
// @desc    Submit chat feedback (authenticated users)
// @access  Private
router.post('/feedback', auth, async (req, res) => {
  try {
    const { messageId, rating, feedback } = req.body;

    // For now, just acknowledge the feedback
    // In a production app, you might want to store this in the database
    res.json({
      status: 'success',
      message: 'Thank you for your feedback!'
    });
  } catch (error) {
    console.error('Chat feedback error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;
