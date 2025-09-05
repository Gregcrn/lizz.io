import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Eye, MousePointer } from "lucide-react";

const problems = [
  {
    title: "Misleading Metrics",
    description:
      "Page views and click-through rates don't tell you what users actually pay attention to. You're optimizing for the wrong metrics.",
    icon: BarChart,
  },
  {
    title: "Invisible Content",
    description:
      "Your best content might be completely ignored. Users scroll past important sections without you knowing where attention drops off.",
    icon: Eye,
  },
  {
    title: "Guessing Game",
    description:
      "Without attention data, you're making design decisions based on assumptions rather than real user behavior patterns.",
    icon: MousePointer,
  },
];

export default function Component() {
  return (
    <Section
      title="The Problem"
      subtitle="Traditional analytics miss what users actually pay attention to."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
