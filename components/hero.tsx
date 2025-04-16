"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DownloadIcon, CheckIcon } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadComplete(false);

    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "/MuhammedShibliAC.pdf";
      link.download = "MuhammedShibliAC-CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
      setDownloadComplete(true);

      setTimeout(() => {
        setDownloadComplete(false);
      }, 1500);
    }, 3000);
  };

  return (
    <section
      ref={ref}
      className="flex flex-col-reverse md:flex-row items-center justify-between min-h-screen pt-16 pb-8 px-4 md:px-8 lg:px-16 gap-4"
    >
      <motion.div
        className="md:w-1/2 flex justify-center order-2 md:order-1"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative w-96 h-[32rem] md:w-[40rem] md:h-[48rem]">
          <Image
            src="/me.png"
            alt="Muhammed Shibli A C"
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      <motion.div
        className="md:w-1/2 space-y-4 order-1 md:order-2"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
          MUHAMMED SHIBLI A C
        </h1>
        <h2 className="text-xl md:text-3xl font-medium text-blue-400">
          Full Stack Developer
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          Crafting fast, responsive, and interactive web experiences.
        </p>

        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleDownload}
            className="w-40 h-10 relative overflow-hidden"
            variant="default"
            disabled={isDownloading || downloadComplete}
          >
            <AnimatePresence mode="wait">
              {downloadComplete ? (
                <motion.div
                  key="complete"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <CheckIcon className="h-5 w-5" />
                </motion.div>
              ) : isDownloading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-1"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1 h-1 bg-current rounded-full"
                      animate={{ opacity: [0.3, 1] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="download"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex items-center gap-2"
                >
                  <DownloadIcon className="h-5 w-5" />
                  <span>Download CV</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
