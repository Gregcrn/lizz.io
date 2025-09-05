import Features from "@/components/features-horizontal";
import Section from "@/components/section";
import { Eye, Github, Shield, Zap } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Attention-First Analytics",
    content: "Track real user attention patterns, not just clicks and views. See what users actually read and engage with.",
    image: "/dashboard.png",
    icon: <Eye className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "Open-Source SDK",
    content: "Free, transparent, and trustworthy. Our SDK is open-source for complete visibility into how we track attention.",
    image: "/dashboard.png",
    icon: <Github className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Privacy-First Design",
    content: "No cookies, no personal data collection, fully GDPR compliant. Track attention while respecting user privacy.",
    image: "/dashboard.png",
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Actionable Insights",
    content: "Get clear Attention Quality Scores, drop-off analysis, and recommendations to optimize content placement.",
    image: "/dashboard.png",
    icon: <Zap className="h-6 w-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="Features" subtitle="Analytics redefined: from visits to attention">
      <Features collapseDelay={5000} linePosition="bottom" data={data} />
    </Section>
  );
}
