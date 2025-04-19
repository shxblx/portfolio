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
  SiGithub,
  SiTailwindcss,
  SiBootstrap,
  SiPostman,
  SiFigma,
} from "react-icons/si";
import { FaAws, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "Meena Bazaar Sales Dashboard",
    description:
      "Sole developer for admin dashboard managing 3M+ sales records across 100+ branches. Implemented bi-hourly SQL-MongoDB data sync with NodeCache optimization and midnight data verification cron jobs. Designed RBAC system with JWT authentication for 100+ users with branch/category-level permissions. Created dynamic reporting with MongoDB aggregation pipelines and filters for date ranges/categories/branches. Integrated Winston Rotate File logging, Helmet.js security, and Nodemailer notifications for cron jobs/credentials. Deployed on Plesk with Nginx configuration.",
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
      "NodeCache",
      "Winston",
      "Helmet.js",
      "Nodemailer",
    ],
    duration: "Client: Meena Bazaar via CS Tech • Feb 2024 - Apr 2024",
    links: null,
  },
  {
    title: "Zephyr | Gaming Social Platform",
    description:
      "Feature-rich social platform enabling profiles, friends, communities, and real-time chat. Implemented ZepChat QA system with hashtags and voting, Socket.IO for real-time messaging/notifications, and media sharing. Developed gaming chatbot with NLP, geolocation-based friend finder, and support ticket system. Built admin panel with analytics, using JWT+OTP auth, Redux state management, and Tailwind CSS. Integrated Cloudinary/Multer for file uploads, deployed on AWS EC2 + Vercel.",
    technologies: [
      "React",
      "Redux",
      "TypeScript",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Socket.IO",
      "Tailwind CSS",
      "Multer",
      "Cloudinary",
      "Axios",
      "Nodemailer",
      "AWS",
      "Vercel",
      "JWT",
    ],
    links: {
      frontend: "https://github.com/shxblx/Zephyr_frontend",
      backend: "https://github.com/shxblx/zephyr_backend",
      live: "https://zephyrforgamer.vercel.app/",
    },
  },
  {
    title: "GrooveStyle | E-commerce Platform",
    description:
      "Full-stack fashion platform with session auth, OTP verification, and Razorpay/wallet payments. Implemented referral system, product returns, and admin panel with coupon/product management. Features include advanced search, wishlist, cart management, and Figma-designed UI. Deployed using MVC architecture on AWS EC2 with Postman API testing.",
    technologies: [
      "Express.js",
      "Node.js",
      "MongoDB",
      "Razorpay",
      "Bootstrap",
      "EJS",
      "AWS EC2",
      "Figma",
      "Postman",
      "MVC",
      "Session",
      "GitHub",
      "JWT",
    ],
    links: {
      github: "https://github.com/shxblx/Project1",
      live: "https://groovestyle.onrender.com/",
    },
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
      case "AWS EC2":
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
      case "Tailwind CSS":
        return <SiTailwindcss className="text-cyan-500" />;
      case "Bootstrap":
        return <SiBootstrap className="text-purple-500" />;
      case "Postman":
        return <SiPostman className="text-orange-600" />;
      case "Figma":
        return <SiFigma className="text-pink-500" />;
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
                <div className="w-full space-y-2">
                  {project.links ? (
                    <div className="flex flex-col gap-2 w-full">
                      {project.links.frontend && project.links.backend ? (
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            className="w-full gap-2"
                            asChild
                          >
                            <a
                              href={project.links.frontend}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <SiGithub className="h-4 w-4" />
                              Frontend
                            </a>
                          </Button>
                          <Button
                            variant="secondary"
                            className="w-full gap-2"
                            asChild
                          >
                            <a
                              href={project.links.backend}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <SiGithub className="h-4 w-4" />
                              Backend
                            </a>
                          </Button>
                        </div>
                      ) : (
                        project.links.github && (
                          <Button
                            variant="secondary"
                            className="w-full gap-2"
                            asChild
                          >
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <SiGithub className="h-4 w-4" />
                              Source Code
                            </a>
                          </Button>
                        )
                      )}
                      {project.links.live && (
                        <Button className="w-full gap-2" asChild>
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaExternalLinkAlt className="h-4 w-4" />
                            Live
                          </a>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full text-muted-foreground hover:text-primary"
                      onClick={() =>
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      🔒 Confidential - Contact for Demo
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
