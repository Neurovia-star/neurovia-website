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

    const signUpBtn = document.getElementById("signUpBtn");
    const loginBtn = document.getElementById("loginBtn");
    const signOutBtn = document.getElementById("signOutBtn");
    const enrollButtons = document.querySelectorAll(".course-card button");

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