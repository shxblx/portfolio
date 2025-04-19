import { GoogleGenerativeAI } from "@google/generative-ai";

const PERSONAL_INFO = `
    Name: Muhammed Shibli A C
Role: Full Stack MERN Developer
Experience: 1.5+ years of hands-on experience, 2 months of industrial experience
Skills: React.js, Redux, Node.js, Express.js, MongoDB, PostgreSQL, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Socket.IO, AWS, Vercel, Git, GitHub, Postman, Figma, Nginx, Cloudinary, Plesk
Projects:
1. Enterprise Sales Dashboard:
   - Project Overview: A platform to display sales data categorized by specific category, branch, supplier, and article.
   - Data Fields: amount, cost, quantity, GP, markup.
   - Data Flow: Sales data is stored in an SQL database. A cron job (every three hours) automatically migrates the data to a MongoDB database. For performance, NodeCache is used.
   - Admin Features: The main role admin can create users (with the ability to block, unblock, edit, and delete users) and assign a specific combination of data based on category, branch, or other criteria. The admin also controls access levels (online, cost, supplier access) to tailor the data visibility.
   - Additional Features: Manual data migration option, JWT authentication for user logins, unified login for all users based on credentials, Redux/Tailwind/React.js for the frontend, Nodemailer for sending cron job update emails, and security enhancements using Helmet.
   - Data Consistency: A midnight cron job deletes and re-imports the previous day's data to ensure validity. During migration, data is temporarily stored before replacing the main schema data. Winston Rotate File is used for logging.
   - Deployment: Both frontend and backend are hosted on Plesk.
   - Work Period: February 7th to April 7th.
   - Company Details: Hired by CS Tech Infosolution; the offer letter was provided by the client company Meenabazaar (live link is confidential).
2. Zephyr | Social Media Platform for Gamers Live | Frontend | Backend:
   - Developed a feature-rich social platform using React.js, Node.js, Express.js, and MongoDB, enabling users to create profiles, make friends, join communities, and engage in real-time conversations.
   - Implemented ZepAI, a gaming-focused chatbot assistant that helps users with gaming-related queries and provides game recommendations.
   - Integrated Socket.IO for real-time messaging, notifications, and media sharing features for images, videos, and game clips.
   - Utilized clean architecture principles and TypeScript to create a scalable and maintainable codebase.
   - Built a comprehensive admin panel with user management, community moderation, and support ticket system.
   - Implemented secure authentication using JWT and enhanced security with OTP verification via Nodemailer.
   - Optimized performance by deploying the backend on AWS and the frontend on Vercel.
   - GitHub Frontend: https://github.com/shxblx/Zephyr_frontend
   - GitHub Backend: https://github.com/shxblx/zephyr_backend
   - Live Link: https://www.zephyrforgamer.xyz/ or this https://zephyrforgamer.vercel.app/
3. GrooveStyle | E-commerce Application Live | GitHub:
   - Built a full-featured e-commerce platform using Express.js, Node.js, and MongoDB with MVC architecture.
   - Implemented session authentication, OTP verification with Nodemailer, and functionality for password recovery.
   - Integrated multiple payment options including COD, Razorpay for online transactions, and wallet system.
   - Developed a comprehensive admin panel for product, category, and order management with analytics.
   - Created features for product filtering, search functionality, and user wishlist management.
   - Implemented product return system with wallet refund capability and referral program.
   - GitHub: https://github.com/shxblx/Project1: groovestyle
   - Live Link: https://groovestyle.onrender.com/
Professional Experience: Worked as a Full Stack Developer at a startup for 2 months, solely responsible for frontend, backend, deployment, and testing.
Education: Self-taught developer
Contact: shiblibasheer27@gmail.com, +91 7902882660
LinkedIn: linkedin.com/in/muhammedshibliac
GitHub: github.com/shxblx
Instagram: instagram.com/shx.blx
    `;

export async function getGeminiResponse(
  userMessage: string,
  chatHistory: any[]
) {
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!API_KEY) {
    console.error("Gemini API key is missing");
    return {
      text: "Sorry, I'm not properly configured yet. Please contact the site owner.",
    };
  }
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-001" });
    const recentMessages = chatHistory.slice(-3);
    const contextPrompt = `
    Your name is Buddy,You are a helpful assistant for Muhammed Shibli A C who answers questions about his portfolio, skills, experience, and projects.
    Be concise, friendly, and professional in your responses.
    Only answer questions related to Shibli's professional background, skills, experience, projects, or general career advice.
    If asked about anything not related to Shibli or his professional work, politely redirect the conversation back to relevant topics.

    Here's information about Shibli:
    ${PERSONAL_INFO}

    Recent conversation:
    ${recentMessages
      .map(
        (msg) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`
      )
      .join("\n")}

    User's latest question: ${userMessage}

    Your response (staying focused on Shibli's professional information):`;
    const result = await model.generateContent(contextPrompt);
    const response = result.response;
    const text = response.text();
    return { text };
  } catch (error) {
    console.error("Error using Gemini SDK:", error);
    return {
      text: "Sorry, I encountered an error communicating with my AI backend. Please try again later.",
    };
  }
}
