"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseIcon } from "lucide-react";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
    else controls.start("hidden");
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        },
      }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Experience</h2>
      <Card className="bg-card/50 backdrop-blur-sm border-muted">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <BriefcaseIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Full Stack Developer</CardTitle>
            <p className="text-sm text-muted-foreground">
              Confidential Startup • 2 Months
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              • Sole developer responsible for frontend, backend, deployment,
              and testing.
            </li>
            <li>
              • Gained real-world experience under intense delivery pressure.
            </li>
            <li>
              • Project scrapped after cost-cutting measures, no notice period.
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
