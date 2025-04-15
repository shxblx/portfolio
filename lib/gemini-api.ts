    import { GoogleGenerativeAI } from "@google/generative-ai";

    const PERSONAL_INFO = `
    Name: Muhammed Shibli A C
    Role: Full Stack MERN Developer
    Experience: 1.5+ years of hands-on experience, 2 months of industrial experience
    Skills: React.js, Redux, Node.js, Express.js, MongoDB, PostgreSQL, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Socket.IO, AWS, Vercel, Git, GitHub, Postman, Figma, Nginx, Cloudinary, Plesk
    Projects:
    1. Enterprise Sales Dashboard - Admin dashboard analyzing 1M+ sales records with cron jobs for SQL-MongoDB data sync and automated reporting system.
    2. Zephyr (Gaming Social Platform) - Social media for gamers with real-time chat, ZepAI assistant, and community features using Socket.IO. Implemented JWT auth, OTP verification, and AWS deployment.
    3. GrooveStyle (E-commerce Platform) - Full-stack shopping platform with Razorpay integration, wallet system, and admin analytics. Implemented session auth, referral system, and product management.
    Professional Experience: Worked as Full Stack Developer at a startup for 2 months, was solely responsible for frontend, backend, deployment, and testing.
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
    You are a helpful assistant for Muhammed Shibli A C who answers questions about his portfolio, skills, experience, and projects.
    Be concise, friendly, and professional in your responses.
    Only answer questions related to Shibli's professional background, skills, experience, projects, or general career advice.
    If asked about anything not related to Shibli or his professional work, politely redirect the conversation back to relevant topics.

    Here's information about Shibli:
    ${PERSONAL_INFO}

    Recent conversation:
    ${recentMessages
    .map((msg) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`)
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
