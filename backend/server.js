import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import { Resend } from "resend";

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());

// Render's free tier blocks outbound SMTP ports, so raw SMTP (Nodemailer)
// can't connect at all. Resend sends over HTTPS instead, which isn't blocked.
const resend = new Resend(process.env.RESEND_API_KEY);

// Gemini, through its OpenAI-compatible endpoint (note the trailing slash!)
const ai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const PROFILE = `
Tin Dinh — Full-Stack Developer, CS student at University of Texas at Dallas (B.S. Computer Science, GPA 3.5/4.0, Data Science Certificate, 2023-2027).

Projects:
- JustMath: Full-Stack Learning Platform (.NET, C#, TypeScript, PostgreSQL) — .NET REST API backend, TypeScript frontend, normalized PostgreSQL schema serving 1000+ concurrent users, user analytics pipeline powering personalized recommendations via collaborative filtering, secured with OAuth 2.0.
- Weather App (React, Vite, Node.js, Express) — city search, 7-day forecast, automatic local weather via geolocation, Open-Meteo integration, live conditions with "feels like" temperature, humidity, wind.
- Expression Evaluator and Differentiator (Java) — symbolic differentiation using recursive expression trees, 45% reduction in computational overhead, 99.9% accuracy across 500+ test cases, extensible OOP class hierarchy.

Experience:
- Vice-President, VINCEF UTD (2025-2026) — led a 50+ member organization, analyzed engagement/attendance data to optimize programming, increased participation by 25%.
- Barista, Starbucks (2024-Present) — processed 200+ transactions per shift, data-driven inventory decisions, reduced waste by 15%.

Skills: JavaScript, TypeScript, C#, Java, Python, SQL, HTML/CSS, React, Vite, .NET, Node.js, Express, PostgreSQL, Git, Docker, Postman, Data Structures & Algorithms, OOP, Database Design, OAuth 2.0, Unit Testing, Agile/Scrum.

Contact: trungtin30072005@gmail.com, GitHub: github.com/trungtin3007, LinkedIn: linkedin.com/in/tin-dinh-995233352.
`.trim();

const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

app.post("/api/chat", async (req, res) => {
  try {
    if (isRateLimited(req.ip)) {
      return res.status(429).json({ error: "Too many messages — try again later." });
    }

    const { message, history = [] } = req.body;
    if (!message) return res.status(400).json({ error: "No message provided" });

    const system =
      "You are a friendly assistant embedded in Tin Dinh's personal portfolio website. " +
      "Answer visitor questions about Tin using the background info below. " +
      "Keep answers brief and conversational (2-4 sentences). " +
      "If asked something unrelated to Tin or not covered by the info below, say you can only answer questions about Tin's background.\n\n" +
      PROFILE;

    const completion = await ai.chat.completions.create({
      model: "gemini-2.5-flash",
      max_tokens: 300,
      messages: [
        { role: "system", content: system },
        ...history,
        { role: "user", content: message },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("chat error:", err);
    res.status(500).json({ error: "The assistant is unavailable right now" });
  }
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const stripHeaderInjection = (str) => str.replace(/[\r\n]+/g, " ").trim();

app.post("/api/contact", async (req, res) => {
  try {
    if (isRateLimited(req.ip)) {
      return res.status(429).json({ error: "Too many messages — try again later." });
    }

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const safeName = stripHeaderInjection(String(name)).slice(0, 200);
    const safeEmail = stripHeaderInjection(String(email)).slice(0, 200);

    const { error: sendError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.EMAIL_USER,
      replyTo: safeEmail,
      subject: `Portfolio contact from ${safeName}`,
      text: `${message}\n\n— ${safeName} (${safeEmail})`,
    });
    if (sendError) throw sendError;

    res.json({ ok: true });
  } catch (err) {
    console.error("contact error:", err);
    res.status(500).json({ error: "Couldn't send your message right now — try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
