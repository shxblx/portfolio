"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  MailIcon,
  PhoneIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="max-w-4xl mx-auto py-4 px-4">
      <h2 className="text-3xl font-bold mb-4 text-center">Contact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-muted">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <MailIcon className="h-5 w-5 text-primary" />
                  <a
                    href="mailto:shiblibasheer27@gmail.com"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    shiblibasheer27@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <PhoneIcon className="h-5 w-5 text-primary" />
                  <a
                    href="tel:+917902882660"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    +91 7902882660
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <GithubIcon className="h-5 w-5 text-foreground" />
                  <a
                    href="https://github.com/shxblx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    github.com/shxblx
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <LinkedinIcon className="h-5 w-5 text-foreground" />
                  <a
                    href="https://www.linkedin.com/in/muhammedshibliac/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    linkedin.com/in/muhammedshibliac
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <InstagramIcon className="h-5 w-5 text-foreground" />
                  <a
                    href="https://www.instagram.com/shx.blx/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    instagram.com/shx.blx
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-muted">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="from_name"
                    placeholder="Your Name"
                    required
                    className="bg-background/50 border-muted focus:border-primary transition-all duration-300"
                  />
                </div>
                <div>
                  <Input
                    name="from_email"
                    type="email"
                    placeholder="Your Email"
                    required
                    className="bg-background/50 border-muted focus:border-primary transition-all duration-300"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    className="bg-background/50 border-muted focus:border-primary transition-all duration-300 min-h-[120px]"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && (
                  <p className="text-green-500 text-sm">
                    Message sent successfully!
                  </p>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form> 
            </CardContent> 
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
