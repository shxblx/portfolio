"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

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
      </motion.div>
    </section>
  );
}
