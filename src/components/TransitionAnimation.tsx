import React from "react";
import { motion } from "framer-motion"

const variants = {
    hidden: { opacity: 0, x: 0, y: -50 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -50 },
};

const TransitionAnimation: React.FC = ({ children}) => {
    return <motion.div
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit" // Exit state (used later) to variants.exit
        transition={{ type: "easeIn", duration: 1, velocity: 70   }} // Set the transition to linear
        className=""
    >
        {children}
    </motion.div>;
};

export default TransitionAnimation;
