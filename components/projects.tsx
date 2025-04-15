"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiTypescript,
  SiSocketdotio,
  SiVercel,
  SiRazorpay,
  SiJavascript,
  SiPlesk,
  SiRender,
  SiRedux,
  SiExpress,
  SiNginx,
  SiCloudinary,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const projects = [
  {
    title: "Enterprise Sales Dashboard",
    description:
      "Developed admin dashboard analyzing 1M+ sales records with cron jobs for SQL-MongoDB data sync and automated reporting system",
    technologies: [
      "React",
      "Redux",
      "Express.js",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "Plesk",
      "JWT",
      "Nginx",
    ],
    duration: "Client: Meena Bazaar via CS Tech • 2 Months",
  },
  {
    title: "Zephyr | Gaming Social Platform",
    description:
      "Built social media for gamers with real-time chat, ZepAI assistant, and community features using Socket.IO. Implemented JWT auth, OTP verification, and AWS deployment",
    technologies: [
      "React",
      "Redux",
      "TypeScript",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Socket.IO",
      "AWS",
      "Vercel",
      "JWT",
      "Cloudinary",
      "Nginx",
    ],
  },
  {
    title: "GrooveStyle | E-commerce Platform",
    description:
      "Full-stack shopping platform with Razorpay integration, wallet system, and admin analytics. Implemented session auth, referral system, and product management",
    technologies: [
      "Express.js",
      "Node.js",
      "MongoDB",
      "Razorpay",
      "JWT",
      "Render",
    ],
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
    else controls.start("hidden");
  }, [isInView, controls]);

  const getTechIcon = (tech: string) => {
    switch (tech) {
      case "React":
        return <SiReact className="text-blue-400" />;
      case "Redux":
        return <SiRedux className="text-purple-500" />;
      case "Node.js":
        return <SiNodedotjs className="text-green-600" />;
      case "Express.js":
        return <SiExpress className="text-gray-400" />;
      case "MongoDB":
        return <SiMongodb className="text-green-500" />;
      case "PostgreSQL":
        return <SiPostgresql className="text-blue-600" />;
      case "TypeScript":
        return <SiTypescript className="text-blue-600" />;
      case "Socket.IO":
        return <SiSocketdotio className="text-foreground" />;
      case "AWS":
        return <FaAws className="text-orange-500" />;
      case "Vercel":
        return <SiVercel className="text-foreground" />;
      case "Razorpay":
        return <SiRazorpay className="text-blue-500" />;
      case "JWT":
        return <SiJavascript className="text-yellow-400" />;
      case "Plesk":
        return <SiPlesk className="text-orange-600" />;
      case "Render":
        return <SiRender className="text-green-500" />;
      case "Nginx":
        return <SiNginx className="text-green-500" />;
      case "Cloudinary":
        return <SiCloudinary className="text-blue-400" />;
      default:
        return <SiReact className="text-blue-400" />;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } },
      }}
      className="max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-muted hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div>
                  <CardTitle>{project.title}</CardTitle>
                  {project.duration && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {project.duration}
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center space-x-1 text-xs bg-muted px-2 py-1 rounded"
                    >
                      {getTechIcon(tech)}
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
