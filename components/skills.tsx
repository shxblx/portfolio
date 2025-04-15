"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  SiReact,
  SiRedux,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiBootstrap,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiVercel,
  SiPostman,
  SiGit,
  SiGithub,
  SiFigma,
  SiSocketdotio,
  SiNginx,
  SiCloudinary,
  SiPlesk,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { DiVisualstudio, DiNodejs } from "react-icons/di";

const skills = [
  { name: "React.js", icon: SiReact, color: "text-blue-400" },
  { name: "Redux", icon: SiRedux, color: "text-purple-500" },
  { name: "HTML5", icon: SiHtml5, color: "text-orange-500" },
  { name: "CSS3", icon: SiCss3, color: "text-blue-500" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
  { name: "Bootstrap", icon: SiBootstrap, color: "text-purple-500" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
  { name: "Express.js", icon: SiExpress, color: "text-gray-400" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
  { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
  { name: "AWS", icon: FaAws, color: "text-orange-500" },
  { name: "Vercel", icon: SiVercel, color: "text-foreground" },
  { name: "Postman", icon: SiPostman, color: "text-orange-500" },
  { name: "Git", icon: SiGit, color: "text-orange-600" },
  { name: "GitHub", icon: SiGithub, color: "text-foreground" },
  { name: "Figma", icon: SiFigma, color: "text-pink-500" },
  { name: "VS Code", icon: DiVisualstudio, color: "text-blue-500" },
  { name: "Socket.IO", icon: SiSocketdotio, color: "text-foreground" },
  { name: "Nginx", icon: SiNginx, color: "text-green-500" },
  { name: "Cloudinary", icon: SiCloudinary, color: "text-blue-400" },
  { name: "Plesk", icon: SiPlesk, color: "text-orange-600" },
  { name: "Node.js", icon: DiNodejs, color: "text-green-600" },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } },
      }}
      className="max-w-5xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Skills</h2>
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-20" />
        <motion.div
          className="flex space-x-8 py-4"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center w-20"
              whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
            >
              <skill.icon className={`text-4xl ${skill.color} mb-2`} />
              <span className="text-xs text-muted-foreground">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
