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
      className="max-w-3xl mx-auto space-y-6"
    >
      <h2 className="text-3xl font-bold text-center">Experience</h2>

      <Card className="bg-card/50 backdrop-blur-sm border-muted">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <BriefcaseIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>MERN Full Stack Developer</CardTitle>
            <p className="text-sm text-muted-foreground">
              CS Tech Info Solutions (Client: Meena Bazaar) • Feb 2024 - Apr
              2024
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              • Developed admin dashboard analyzing lakhs+ sales records with
              category/branch/supplier/article filters
            </li>
            <li>
              • Implemented automatic SQL to MongoDB data migration using cron
              jobs (3-hour intervals)
            </li>
            <li>
              • Designed RBAC system with granular controls for data access
              (cost/gp/markup visibility)
            </li>
            <li>
              • Integrated NodeCache for API response caching, reducing load
              times by 40%
            </li>
            <li>
              • Built user management system with JWT authentication and
              nodemailer credentials delivery
            </li>
            <li>
              • Added manual data migration option with temporary table
              validation for data integrity
            </li>
            <li>
              • Implemented Winston rotating logs and Helmet.js for security
              hardening
            </li>
            <li>
              • Configured nightly cron jobs for data validation and historical
              reporting
            </li>
            <li>
              • Deployed full-stack solution on Plesk with optimized
              React/Node.js configurations
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
