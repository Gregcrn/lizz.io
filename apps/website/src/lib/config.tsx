import { Icons } from "@/components/icons";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Lizz.io",
  description: "Measure attention, not just visits",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["Analytics", "Attention Tracking", "Web Analytics", "User Experience", "UX"],
  links: {
    email: "hello@lizz.io",
    twitter: "https://twitter.com/lizzio",
    discord: "",
    github: "",
    instagram: "",
  },
  header: [
    {
      trigger: "Features",
      content: {
        main: {
          icon: <Icons.logo className="h-6 w-6" />,
          title: "Attention Analytics",
          description: "See where users actually focus their attention.",
          href: "#",
        },
        items: [
          {
            href: "#",
            title: "Section Active Time",
            description: "How long users actively look at each section.",
          },
          {
            href: "#",
            title: "Completion Rate",
            description: "How much of your content is actually viewed.",
          },
          {
            href: "#",
            title: "Attention Quality Score",
            description: "0-100 index of section attention quality.",
          },
        ],
      },
    },
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "Web Agencies",
            href: "#",
            description: "Prove your design and UX decisions work.",
          },
          {
            title: "SaaS Startups",
            href: "#",
            description: "Understand onboarding drop-offs and optimize conversion.",
          },
          {
            title: "Content Creators",
            href: "#",
            description: "See what readers actually read on your blog.",
          },
          {
            title: "E-commerce",
            href: "#",
            description: "Identify if product info and CTAs are seen.",
          },
        ],
      },
    },
    {
      href: "/demo",
      label: "Live Demo",
    },
    {
      href: "/blog",
      label: "Blog",
    },
  ],
  pricing: [
    {
      name: "STARTER",
      href: "#",
      price: "$9",
      period: "month",
      yearlyPrice: "$7",
      features: [
        "1 Website",
        "10K Page Views",
        "Basic Attention Analytics",
        "Section Active Time",
        "Email Support",
      ],
      description: "Perfect for small websites and blogs",
      buttonText: "Start measuring attention",
      isPopular: false,
    },
    {
      name: "GROWTH",
      href: "#",
      price: "$29",
      period: "month",
      yearlyPrice: "$24",
      features: [
        "5 Websites",
        "100K Page Views",
        "Full Analytics Suite",
        "Attention Quality Score",
        "Priority Support",
      ],
      description: "Ideal for agencies and growing businesses",
      buttonText: "Start measuring attention",
      isPopular: true,
    },
    {
      name: "SCALE",
      href: "#",
      price: "$99",
      period: "month",
      yearlyPrice: "$82",
      features: [
        "Unlimited Websites",
        "1M+ Page Views",
        "Advanced Analytics",
        "Custom Integrations",
        "Dedicated Support",
      ],
      description: "For enterprise and high-traffic websites",
      buttonText: "Start measuring attention",
      isPopular: false,
    },
  ],
  faqs: [
    {
      question: "What is Lizz?",
      answer: (
        <span>
          Lizz is an attention analytics tool that measures where users actually focus
          their attention on your website. Unlike traditional analytics that count
          visits and clicks, Lizz tracks real attention patterns.
        </span>
      ),
    },
    {
      question: "How does attention tracking work?",
      answer: (
        <span>
          Lizz uses a simple code snippet to track user attention patterns on your
          website. It measures Section Active Time, Completion Rates, and generates
          an Attention Quality Score for each section of your pages.
        </span>
      ),
    },
    {
      question: "Is Lizz privacy-compliant?",
      answer: (
        <span>
          Yes, Lizz is built privacy-first. We don't use cookies, don't collect
          personal data, and are fully GDPR compliant. We only track anonymous
          attention patterns to help improve your content.
        </span>
      ),
    },
    {
      question: "How is Lizz different from Google Analytics?",
      answer: (
        <span>
          Google Analytics tells you who visited your site and what they clicked.
          Lizz shows you where they actually focused their attention, helping you
          understand what content truly engages your users.
        </span>
      ),
    },
    {
      question: "Who should use Lizz?",
      answer: (
        <span>
          Lizz is perfect for web agencies proving UX decisions, SaaS startups
          optimizing onboarding, content creators understanding reader engagement,
          and e-commerce sites ensuring product info is seen.
        </span>
      ),
    },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { href: "#", text: "Features", icon: null },
        { href: "#", text: "Pricing", icon: null },
        { href: "#", text: "Documentation", icon: null },
        { href: "#", text: "API", icon: null },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "#", text: "About", icon: null },
        { href: "#", text: "Blog", icon: null },
        { href: "#", text: "Privacy", icon: null },
        { href: "#", text: "Terms", icon: null },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "#", text: "Help Center", icon: null },
        { href: "#", text: "Contact", icon: null },
        { href: "#", text: "Status", icon: null },
      ],
    },
    {
      title: "Social",
      links: [
        {
          href: "#",
          text: "Twitter",
          icon: <FaTwitter />,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
