import { AnimatePresence } from "framer-motion";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const Animate = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatePresence initial={false}>
      <motion.div>{children}</motion.div>
    </AnimatePresence>
  );
};

export default Animate;
