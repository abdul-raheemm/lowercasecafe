import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const words = ["Rustic.", "Handcrafted.", "Timeless."];

export default function RotatingHeadline({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={words[index]}
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(8px)" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className={className}
      >
        {words[index]}
      </motion.h1>
    </AnimatePresence>
  );
}
