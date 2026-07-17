import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6cboWYPJTGTjCLCuUbyRosGlPQqKsCq4",
  authDomain: "neurovia-6e0e9.firebaseapp.com",
  projectId: "neurovia-6e0e9",
  storageBucket: "neurovia-6e0e9.firebasestorage.app",
  messagingSenderId: "176594969816",
  appId: "1:176594969816:web:9763debd05fcd79051e3ad",
  measurementId: "G-YD1KLNVVGD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const sitePrograms = [
    {
        name: "Cybersecurity Mastery",
        slug: "cybersecurity",
        keywords: ["cyber", "security", "defense", "soc", "ethical", "hacking", "threat"],
        description: "Protect systems, networks, and data with hands-on security labs and real-world defense skills.",
        duration: "2 Months",
        price: "₦150,000",
        bestFor: "people who want to secure systems and work in cyber defense."
    },
    {
        name: "Ethical Hacking & Bug Bounty",
        slug: "ethical-hacking",
        keywords: ["hacking", "bug", "bounty", "web", "penetration", "test", "vulnerability"],
        description: "Learn how to test applications responsibly, uncover weaknesses, and report them professionally.",
        duration: "2.5 Months",
        price: "₦180,000",
        bestFor: "people who want practical offensive security and bug bounty skills."
    },
    {
        name: "Cloud Engineering",
        slug: "cloud-engineering",
        keywords: ["cloud", "aws", "azure", "deployment", "infrastructure", "devops"],
        description: "Build scalable cloud systems with deployment, networking, automation, and modern infrastructure skills.",
        duration: "2 Months",
        price: "₦170,000",
        bestFor: "people who want modern cloud and infrastructure careers."
    },
    {
        name: "Network Engineering",
        slug: "network-engineering",
        keywords: ["network", "routing", "switching", "lan", "wireless", "connectivity", "infrastructure"],
        description: "Learn to design, troubleshoot, and secure modern networks for homes, businesses, and enterprise environments.",
        duration: "2 Months",
        price: "₦150,000",
        bestFor: "people who want careers in networking and infrastructure support."
    },
    {
        name: "AI Automation",
        slug: "ai-automation",
        keywords: ["ai", "automation", "robot", "workflow", "prompt", "agent"],
        description: "Create smarter workflows and AI-powered systems that save time and increase productivity.",
        duration: "2 Months",
        price: "₦165,000",
        bestFor: "people who want to build automation and intelligent tools."
    },
    {
        name: "AI Content Creation",
        slug: "ai-content-creation",
        keywords: ["content", "marketing", "design", "video", "social", "creative"],
        description: "Generate content, visuals, and campaigns faster with modern AI tools and creative strategy.",
        duration: "1.5 Months",
        price: "₦140,000",
        bestFor: "people who want to create media and digital campaigns."
    },
    {
        name: "Digital Skills & Career Growth",
        slug: "digital-skills",
        keywords: ["digital", "beginner", "career", "remote", "productivity", "portfolio"],
        description: "Build confidence with practical digital tools, communication, and career-ready growth skills.",
        duration: "1.5 Months",
        price: "₦120,000",
        bestFor: "beginners who want a strong and practical first step into tech."
    }
];

const siteHighlights = [
    "NEUROVIA is an AI-driven learning hub for cybersecurity, cloud, AI, automation, and digital growth.",
    "The site focuses on hands-on labs, mentorship, and real-world projects.",
    "Courses are available online and designed to help learners move from curiosity to career-ready confidence."
];

const contactInfo = {
    whatsapp: "https://wa.me/2349155928051",
    telegram: "https://t.me/yourtelegramhandle"
};

const showMessage = (message, isError = false) => {
  const messageBox = document.getElementById("authMessage");
  if (!messageBox) return;
  messageBox.textContent = message;
  messageBox.style.color = isError ? "#ff7b7b" : "#7bffcc";
};

const updateEnrollMessage = (message, isError = false) => {
  const box = document.getElementById("enrollMessage");
  if (!box) return;
  box.textContent = message;
  box.style.color = isError ? "#ffb3b3" : "#b9f7e6";
};

const signUp = async () => {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value;

  if (!email || !password) {
    showMessage("Please enter both email and password.", true);
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    showMessage(`Account created for ${userCredential.user.email}`);
  } catch (error) {
    showMessage(error.message, true);
  }
};

const login = async () => {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value;

  if (!email || !password) {
    showMessage("Please enter both email and password.", true);
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    showMessage(`Welcome back, ${userCredential.user.email}`);
  } catch (error) {
    showMessage(error.message, true);
  }
};

const scrollToAuth = () => {
  const authSection = document.getElementById("authSection");
  if (authSection) {
    authSection.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    showMessage("You have been signed out.");
  } catch (error) {
    showMessage(error.message, true);
  }
};

document.addEventListener("DOMContentLoaded", () => {
    const chatToggle = document.getElementById("chatToggle");
    const chatPanel = document.querySelector(".chat-panel");
    const assistantInput = document.getElementById("assistantInput");
    const assistantSendBtn = document.getElementById("assistantSendBtn");
    const assistantChat = document.querySelector(".assistant-chat");

    const signUpBtn = document.getElementById("signUpBtn");
    const loginBtn = document.getElementById("loginBtn");
    const signOutBtn = document.getElementById("signOutBtn");
    const enrollButtons = document.querySelectorAll(".course-card button");
    const programButtons = document.querySelectorAll(".btn");

    if (signUpBtn) signUpBtn.addEventListener("click", signUp);
    if (loginBtn) loginBtn.addEventListener("click", login);
    if (signOutBtn) signOutBtn.addEventListener("click", logout);

    enrollButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (auth.currentUser) {
                updateEnrollMessage("You are signed in and ready to enroll.");
            } else {
                updateEnrollMessage("Please sign in or sign up before enrolling.");
                scrollToAuth();
            }
        });
    });

    if (chatToggle && chatPanel) {
        chatToggle.addEventListener("click", (event) => {
            event.preventDefault();
            chatPanel.classList.toggle("open");
        });
    }

    const navToggle = document.getElementById("navToggle");
    const navElement = document.querySelector("nav");

    if (navToggle && navElement) {
        navToggle.addEventListener("click", () => {
            const isOpen = navElement.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    const closeMobileNav = () => {
        if (navElement && navElement.classList.contains("open")) {
            navElement.classList.remove("open");
            if (navToggle) navToggle.setAttribute("aria-expanded", "false");
        }
    };

    document.querySelectorAll("nav ul li a, .nav-actions a").forEach((link) => {
        link.addEventListener("click", closeMobileNav);
    });

    document.addEventListener("click", (event) => {
        if (!navElement || !navElement.classList.contains("open")) return;
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (!navElement.contains(target) && target !== navToggle) {
            closeMobileNav();
        }
    });

    const addAssistantMessage = (text, sender = "ai") => {
        if (!assistantChat) return;
        const message = document.createElement("div");
        message.className = `assistant-message ${sender}`;
        message.textContent = text;
        assistantChat.appendChild(message);
        assistantChat.scrollTop = assistantChat.scrollHeight;
    };

    const getAssistantReply = (question) => {
        const q = question.toLowerCase().trim();

        if (!q) {
            return "Ask me about a course, price, duration, or what NEUROVIA offers.";
        }

        const matchingPrograms = sitePrograms.filter((program) =>
            program.keywords.some((keyword) => q.includes(keyword))
        );

        if (q.includes("what is neurovia") || q.includes("about neurovia") || q.includes("who is neurovia")) {
            return `${siteHighlights[0]} ${siteHighlights[1]} ${siteHighlights[2]}`;
        }

        if (q.includes("course") && (q.includes("offer") || q.includes("available") || q.includes("list"))) {
            return `NEUROVIA currently offers ${sitePrograms.map((program) => program.name).join(", ")}.`;
        }

        if (q.includes("contact") || q.includes("reach") || q.includes("support")) {
            return `You can reach NEUROVIA through WhatsApp: ${contactInfo.whatsapp} or Telegram: ${contactInfo.telegram}.`;
        }

        if (q.includes("price") || q.includes("cost") || q.includes("fee") || q.includes("payment")) {
            if (matchingPrograms.length) {
                const program = matchingPrograms[0];
                return `${program.name} costs ${program.price} and runs for ${program.duration}.`;
            }
            return `Prices vary by program. For example, Digital Skills & Career Growth is ₦120,000, AI Content Creation is ₦140,000, and Cybersecurity Mastery is ₦150,000.`;
        }

        if (q.includes("duration") || q.includes("how long") || q.includes("length")) {
            if (matchingPrograms.length) {
                const program = matchingPrograms[0];
                return `${program.name} runs for ${program.duration}.`;
            }
            return `Most programs run between 1.5 and 2.5 months, depending on the track.`;
        }

        if (q.includes("beginner") || q.includes("start") || q.includes("first") || q.includes("easy")) {
            return "For a beginner, Digital Skills & Career Growth is the smoothest first step. If you want a more technical path, AI Automation is another strong option.";
        }

        if (q.includes("career") || q.includes("job") || q.includes("future")) {
            return "NEUROVIA is built around hands-on labs, mentorship, and real-world projects so learners can build practical skills for career growth.";
        }

        if (matchingPrograms.length) {
            const topProgram = matchingPrograms[0];
            return `${topProgram.name} is a strong match for that goal. It is ${topProgram.duration} and costs ${topProgram.price}. ${topProgram.description} It is best for ${topProgram.bestFor}`;
        }

        return `You can explore Cybersecurity Mastery, Ethical Hacking & Bug Bounty, Cloud Engineering, Network Engineering, AI Automation, AI Content Creation, or Digital Skills & Career Growth. Tell me your goal and I’ll point you to the best fit.`;
    };

    const sendAssistantMessage = () => {
        if (!assistantInput || !assistantSendBtn || !assistantChat) return;
        const value = assistantInput.value.trim();
        if (!value) return;

        addAssistantMessage(value, "user");
        assistantInput.value = "";
        assistantSendBtn.disabled = true;

        setTimeout(() => {
            addAssistantMessage(getAssistantReply(value));
            assistantSendBtn.disabled = false;
            assistantInput.focus();
        }, 500);
    };

    if (assistantSendBtn && assistantInput) {
        assistantSendBtn.addEventListener("click", sendAssistantMessage);
        assistantInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                sendAssistantMessage();
            }
        });
    }

    if (programButtons.length) {
        setInterval(() => {
            programButtons.forEach((button) => {
                button.classList.remove("pulse-btn");
                void button.offsetWidth;
                button.classList.add("pulse-btn");
            });
        }, 600000);
    }

    document.body.addEventListener("click", (event) => {
        const clickedElement = event.target;

        if (!(clickedElement instanceof Element)) return;

        const interactive = clickedElement.closest(
            "a, button, li, .course-card, .testimonial-card, .faq-item, .logo, section, nav"
        );

        if (!interactive || interactive === document.body) return;

        interactive.classList.remove("clicked-bounce");
        void interactive.offsetWidth;
        interactive.classList.add("clicked-bounce");
    });

    onAuthStateChanged(auth, (user) => {
        const signOutBtn = document.getElementById("signOutBtn");
        if (signOutBtn) {
            signOutBtn.style.display = user ? "inline-block" : "none";
        }

        if (user) {
            showMessage(`Signed in as ${user.email}`);
            updateEnrollMessage(`Welcome back, ${user.email}! You can enroll now.`);
        } else {
            showMessage("Please sign in or sign up to continue.");
            updateEnrollMessage("Sign in or sign up to unlock enrollment.");
        }
    });

    const bgVideo = document.querySelector(".video-bg");
    if (bgVideo) {
        bgVideo.muted = true;
        bgVideo.loop = true;
        bgVideo.playsInline = true;
        try { bgVideo.load(); bgVideo.play().catch(() => {}); } catch(e) {}
    }
});