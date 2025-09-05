"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { Play, ArrowRight, Eye } from "lucide-react";

export default function DemoCTA() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 border-primary/20">
          <CardContent className="p-12 text-center">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-4 w-8 h-8 bg-primary rounded-full animate-pulse" />
              <div className="absolute top-12 right-8 w-4 h-4 bg-primary/60 rounded-full animate-pulse delay-300" />
              <div className="absolute bottom-8 left-12 w-6 h-6 bg-primary/80 rounded-full animate-pulse delay-700" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <Badge className="mb-6">
                <Play className="w-4 h-4 mr-2" />
                Interactive Demo
              </Badge>
              
              <h2 className="text-4xl font-bold mb-4">
                See Lizz in Action
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Experience attention tracking firsthand. Our live demo shows you 
                exactly how Lizz measures user attention in real-time. No setup required.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" asChild className="text-lg px-8 py-4">
                    <Link href="/demo">
                      <Play className="w-5 h-5 mr-2" />
                      Try Live Demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye className="w-4 h-4 mr-2" />
                  Watch your attention tracked in real-time
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Live metrics</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200" />
                  <span>Real-time tracking</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-500" />
                  <span>No installation</span>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}