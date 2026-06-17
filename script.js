document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("ctaBtn");
    if (button) {
        button.addEventListener("click", () => {
            const coursesSection = document.querySelector(".courses");
            if (coursesSection) {
                coursesSection.scrollIntoView({ behavior: "smooth" });
            } else {
                alert("Welcome to NEUROVIA 🚀 Your future starts here.");
            }
        });
    }

    const bgVideo = document.querySelector(".video-bg");
    if (bgVideo) {
        bgVideo.muted = true;
        bgVideo.loop = true;
        bgVideo.playsInline = true;
        // ensure browser tries to load/play the video
        try { bgVideo.load(); bgVideo.play().catch(() => {}); } catch(e) {}
    }
});