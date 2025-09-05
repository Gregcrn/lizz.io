import Features from "@/components/features-vertical";
import Section from "@/components/section";
import { Code, Eye, TrendingUp } from "lucide-react";

const data = [
  {
    id: 1,
    title: "1. Add Our Snippet",
    content:
      "Copy and paste our lightweight tracking code to your website. It's privacy-first, cookieless, and won't slow down your site.",
    image: "/dashboard.png",
    icon: <Code className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. Watch Attention Flow",
    content:
      "See real-time attention patterns as users navigate your site. Our dashboard shows Section Active Time, Completion Rates, and drop-off points.",
    image: "/dashboard.png",
    icon: <Eye className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Optimize for Attention",
    content:
      "Use Attention Quality Scores and insights to move important content where users actually look. Improve engagement based on real attention data.",
    image: "/dashboard.png",
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="How it works" subtitle="Just 3 steps to get started">
      <Features data={data} />
    </Section>
  );
}
