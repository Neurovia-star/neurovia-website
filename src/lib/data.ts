import type { LucideIcon } from "lucide-react";
import {
  Bug,
  Cloud,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

export type Course = {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  level: string;
  tags: string[];
};

export const courses: Course[] = [
  {
    title: "Cybersecurity Mastery",
    description:
      "Learn ethical hacking, network defense, SOC operations, and penetration testing with practical labs.",
    icon: ShieldCheck,
    gradient: "from-cyan-400 to-sky-600",
    level: "Beginner → Advanced",
    tags: ["SOC", "Network Defense", "Pentesting"],
  },
  {
    title: "Ethical Hacking & Bug Bounty",
    description:
      "Build real-world hacking skills, web app testing, vulnerability scanning, and responsible disclosure techniques.",
    icon: Bug,
    gradient: "from-violet-400 to-purple-600",
    level: "Intermediate",
    tags: ["Web App Testing", "Recon", "Disclosure"],
  },
  {
    title: "Cloud Engineering",
    description:
      "Master AWS, Azure, networking, deployment, and infrastructure automation for modern tech careers.",
    icon: Cloud,
    gradient: "from-sky-400 to-blue-600",
    level: "Beginner → Advanced",
    tags: ["AWS", "Azure", "IaC"],
  },
  {
    title: "AI Automation",
    description:
      "Explore AI workflows, automation tools, and business-ready systems to boost productivity and accuracy.",
    icon: Workflow,
    gradient: "from-fuchsia-400 to-pink-600",
    level: "All levels",
    tags: ["Workflows", "Agents", "Integrations"],
  },
  {
    title: "AI Content Creation",
    description:
      "Create intelligent content, cinematic media, and digital campaigns using modern AI tools.",
    icon: Sparkles,
    gradient: "from-amber-300 to-orange-500",
    level: "All levels",
    tags: ["Generative Media", "Campaigns", "Branding"],
  },
  {
    title: "Digital Skills & Career Growth",
    description:
      "Strengthen your communication, productivity, and tech confidence with practical learning paths.",
    icon: Rocket,
    gradient: "from-emerald-400 to-teal-600",
    level: "Beginner friendly",
    tags: ["Productivity", "Communication", "Career"],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "NEUROVIA helped me understand cybersecurity in a practical way. I finally got confidence in IT.",
    name: "James A.",
    role: "Cybersecurity track",
  },
  {
    quote:
      "The cloud training was very clear. I was able to understand AWS basics easily.",
    name: "Sarah K.",
    role: "Cloud engineering track",
  },
  {
    quote:
      "The AI automation course changed how I think about tech. Very practical and powerful.",
    name: "David O.",
    role: "AI automation track",
  },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Do I need experience to start?",
    answer:
      "No. NEUROVIA is designed for beginners and advanced learners alike — every track starts from fundamentals and ramps up to real-world scenarios.",
  },
  {
    question: "Are the courses practical?",
    answer:
      "Yes. Every course is focused on real-world projects and hands-on learning, not just theory. You build as you learn.",
  },
  {
    question: "Will I get a certificate?",
    answer:
      "Yes. You will receive a certificate after completing each course that you can share with employers and on your profiles.",
  },
  {
    question: "Can I access the courses anytime?",
    answer:
      "Yes. Courses are available online and accessible 24/7, from any device, at your own pace.",
  },
];

export const contact = {
  email: "abrahambreezy81@gmail.com",
  whatsapp: "https://wa.me/2349155928051",
  telegram: "https://t.me/yourtelegramhandle",
  instagram: "https://www.instagram.com/yourinstagramhandle/",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const marqueeItems = [
  "Cybersecurity",
  "Ethical Hacking",
  "Cloud Engineering",
  "AI Automation",
  "Content Creation",
  "Career Growth",
  "Hands-on Labs",
  "24/7 Access",
];
