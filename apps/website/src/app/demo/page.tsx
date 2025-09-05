"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Eye, Activity, Target, Play } from "lucide-react";
import { initLizz, type SectionSnapshot } from "lizz-sdk";

// Interface pour les métriques d'attention
type AttentionMetrics = SectionSnapshot;

// Composant d'indicateur de section instrumentée
function InstrumentedBadge({ sectionId }: { sectionId: string }) {
  return (
    <div className="absolute top-4 right-4 z-10">
      <Badge variant="outline" className="bg-background/95 backdrop-blur border-primary/30">
        <Eye className="w-3 h-3 mr-1" />
        Tracked: {sectionId}
      </Badge>
    </div>
  );
}

// Composant Hero instrumenté
function DemoHero() {
  return (
    <section data-lizz-section="hero" className="py-20 px-4 relative">
      <InstrumentedBadge sectionId="hero" />
      <div className="container mx-auto text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-6">
            <Play className="w-4 h-4 mr-2" />
            Live Demo
          </Badge>
          <h1 className="text-5xl font-bold mb-6">
            See Your Attention{" "}
            <span className="text-primary">In Real-Time</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            This page is instrumented with Lizz. As you scroll and interact with each section,
            watch the metrics panel on the right update with your actual attention patterns.
            This is exactly what you'll see when you integrate Lizz into your website.
          </p>
          <Button size="lg" className="text-lg px-8 py-4">
            <Icons.logo className="w-5 h-5 mr-2" />
            Start Your Trial
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// Composant Features instrumenté
function DemoFeatures() {
  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Section Active Time",
      description: "Measure how long users actually look at each section of your content."
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Completion Rate", 
      description: "Track how much of your content users actually scroll through and view."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Attention Quality Score",
      description: "Get a 0-100 score showing the quality of attention each section receives."
    }
  ];

  return (
    <section data-lizz-section="features" className="py-20 px-4 bg-muted/30 relative">
      <InstrumentedBadge sectionId="features" />
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Three Key Metrics That Matter
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            While you read this section, Lizz is measuring exactly how much attention
            you're giving to each part. Look at the panel on the right to see your metrics!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Composant Benefits instrumenté
function DemoBenefits() {
  const benefits = [
    {
      title: "No Cookies, No Tracking",
      description: "Privacy-first analytics that respects user privacy and GDPR compliance.",
      icon: "🛡️"
    },
    {
      title: "Real User Insights",
      description: "See where users actually focus, not just where they click or visit.",
      icon: "👁️"
    },
    {
      title: "Easy Integration",
      description: "3 lines of code and you're tracking attention across your entire site.",
      icon: "⚡"
    },
    {
      title: "Performance Focused",
      description: "Lightweight SDK that won't slow down your website or impact user experience.",
      icon: "🚀"
    }
  ];

  return (
    <section data-lizz-section="benefits" className="py-20 px-4 bg-muted/30 relative">
      <InstrumentedBadge sectionId="benefits" />
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Why Choose Lizz?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take some time to read through these benefits. Notice how your attention time
            increases as you spend more time on content that interests you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="p-6 bg-background rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Composant Testimonials instrumenté
function DemoTestimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "UX Designer at TechCorp",
      quote: "Lizz showed us that our hero section wasn't getting the attention we thought. We moved our CTA and saw 40% increase in conversions.",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez", 
      role: "Marketing Director",
      quote: "Finally, analytics that show what users actually read, not just what they click. Game-changer for content strategy.",
      avatar: "MR"
    },
    {
      name: "Emily Watson",
      role: "Product Manager",
      quote: "The attention heatmaps revealed that our pricing table was completely ignored. After restructuring, sales increased 25%.",
      avatar: "EW"
    }
  ];

  return (
    <section data-lizz-section="testimonials" className="py-20 px-4 relative">
      <InstrumentedBadge sectionId="testimonials" />
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Read these testimonials slowly. Your attention metrics will reflect 
            how engaged you are with each story.
          </p>
        </motion.div>

        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="bg-background p-6 rounded-lg border shadow-sm"
            >
              <blockquote className="text-lg mb-4 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Composant FAQ instrumenté  
function DemoFAQ() {
  const faqs = [
    {
      question: "How accurate is attention tracking?",
      answer: "Our algorithm combines visibility detection, scroll behavior, and user activity to provide 95%+ accuracy in attention measurement."
    },
    {
      question: "Does it slow down my website?",
      answer: "No. Lizz adds less than 15KB to your page and uses efficient observers that don't impact performance or user experience."
    },
    {
      question: "Is it GDPR compliant?",
      answer: "Yes. We don't collect personal data, use cookies, or track individuals. Only anonymous attention patterns are measured."
    },
    {
      question: "How is this different from heatmaps?",
      answer: "Heatmaps show where users click. Lizz shows where they actually look and focus their attention, giving deeper insights into engagement."
    }
  ];

  return (
    <section data-lizz-section="faq" className="py-20 px-4 bg-muted/30 relative">
      <InstrumentedBadge sectionId="faq" />
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Spend time reading the questions that interest you most. 
            Your attention patterns will show which topics engage you.
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-background p-6 rounded-lg border shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Composant Pricing instrumenté
function DemoPricing() {
  const plans = [
    {
      name: "Starter",
      price: "$9",
      period: "month",
      features: ["1 Website", "10K Page Views", "Basic Analytics", "Email Support"],
      isPopular: false
    },
    {
      name: "Growth", 
      price: "$29",
      period: "month",
      features: ["5 Websites", "100K Page Views", "Full Analytics", "Priority Support"],
      isPopular: true
    },
    {
      name: "Scale",
      price: "$99", 
      period: "month",
      features: ["Unlimited Sites", "1M+ Page Views", "Advanced Analytics", "Dedicated Support"],
      isPopular: false
    }
  ];

  return (
    <section data-lizz-section="pricing" className="py-20 px-4 relative">
      <InstrumentedBadge sectionId="pricing" />
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Spend some time reading through these pricing plans. Notice how your
            attention metrics change as you focus on different pricing options.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className={`h-full relative ${plan.isPopular ? 'ring-2 ring-primary' : ''}`}>
                {plan.isPopular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    {plan.price}<span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <Icons.logo className="w-4 h-4 mr-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.isPopular ? "default" : "outline"}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Composant Live Metrics Panel
function LiveMetricsPanel() {
  const [metrics, setMetrics] = useState<AttentionMetrics[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [lizz, setLizz] = useState<any>(null);

  // Initialisation du SDK Lizz
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialiser Lizz SDK
    const lizzInstance = initLizz({
      siteId: 'demo-site-id', // ID de demo
      debug: true, // Mode debug pour voir les logs
      snapshotIntervalMs: 1000, // Mise à jour plus fréquente pour la demo
      activityWindowMs: 500, // Fenêtre d'activité plus courte
      endpoint: 'demo://localhost' // Endpoint factice pour la demo
    });

    setLizz(lizzInstance);
    setIsActive(true);

    // Démarrer le tracking de la page
    lizzInstance.trackPage({
      pageId: 'demo-page',
      sectionsSelector: '[data-lizz-section]' // Sélecteur pour nos sections instrumentées
    }).then(() => {
      console.log('🎯 Lizz demo tracking started!');
    });

    // Mise à jour périodique des métriques - VRAIES DONNÉES du SDK
    const updateMetrics = () => {
      if (lizzInstance.isTracking()) {
        const realMetrics = lizzInstance.getAttentionData(); // 🎯 VRAIES DONNÉES
        console.log('📊 Real metrics from SDK:', realMetrics);
        console.log('📊 Number of sections tracked:', realMetrics.length);
        
        // Debug: Log each section's SAT to see if it's incrementing
        realMetrics.forEach(metric => {
          console.log(`🔍 ${metric.section_id}: ${metric.sat_seconds.toFixed(2)}s`);
        });
        
        setMetrics(realMetrics);
      } else {
        console.log('❌ Lizz is not tracking yet');
      }
    };

    // Mise à jour très fréquente pour un effet real-time
    updateMetrics();
    const interval = setInterval(updateMetrics, 250); // Toutes les 250ms pour plus de réactivité

    return () => {
      clearInterval(interval);
      lizzInstance.stop();
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 w-80 z-50">
      <Card className="shadow-xl border-2 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Live Attention Metrics</CardTitle>
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          </div>
          <CardDescription>
            Real-time data as you scroll and interact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {metrics.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              <div className="animate-pulse">
                Initializing attention tracking...
              </div>
              <div className="text-xs mt-2">
                Start scrolling to see metrics!
              </div>
            </div>
          ) : (
            metrics.map((metric) => (
              <motion.div
                key={metric.section_id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-muted/50 rounded-lg space-y-3 border border-primary/10"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold capitalize text-sm flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      metric.sat_seconds > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
                    }`} />
                    {metric.section_id}
                  </h4>
                  <Badge variant="outline" className={`text-xs ${
                    metric.attention_score >= 70 ? 'border-green-500 text-green-600' :
                    metric.attention_score >= 40 ? 'border-yellow-500 text-yellow-600' :
                    'border-red-500 text-red-600'
                  }`}>
                    AQS: {metric.attention_score}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">Section Active Time</div>
                    <motion.div 
                      className="font-mono font-bold text-3xl text-primary"
                      key={metric.sat_seconds} // Force re-render for animation
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.2 }}
                    >
                      {metric.sat_seconds.toFixed(2)}s
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center text-xs">
                    <div>
                      <span className="text-muted-foreground block mb-1">Completion</span>
                      <div className="font-mono font-semibold text-sm">
                        {(metric.completion_rate * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-1">Quality Score</span>
                      <div className="font-mono font-semibold text-sm">
                        {metric.attention_score}/100
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
          
          <div className="pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground mb-2">
              This is what you'll see in your dashboard
            </p>
            <Button size="sm" className="w-full">
              <Icons.logo className="w-4 h-4 mr-2" />
              Get Your Own Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      {/* Header avec retour */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lizz.io
          </Link>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Lizz Live Demo</h1>
          <p className="text-muted-foreground">
            Scroll through the sections below. Watch the metrics panel on the right 
            update with your real attention data in real-time.
          </p>
        </div>
      </div>

      {/* Sections instrumentées */}
      <main>
        <DemoHero />
        <DemoFeatures />
        <DemoBenefits />
        <DemoTestimonials />
        <DemoFAQ />
        <DemoPricing />
      </main>

      {/* Panel de métriques live */}
      <LiveMetricsPanel />

      {/* CTA final */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to See Your Users' Attention?
          </h2>
          <p className="text-muted-foreground mb-8">
            You've just experienced what Lizz can show you about user attention.
            Get your own site ID and start measuring attention on your website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">
                <Icons.logo className="w-5 h-5 mr-2" />
                Start Free Trial
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}