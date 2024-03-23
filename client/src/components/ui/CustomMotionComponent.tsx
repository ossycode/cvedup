import { AnimatePresence, motion, Variants } from "framer-motion";

interface CustomMotionProps {
  children: JSX.Element;
  stepKeys: string[];
  currentStepIndex: number;
  variants: Variants;
}

const CustomMotionComponent: React.FC<CustomMotionProps> = ({
  children,
  stepKeys,
  currentStepIndex,
  variants,
}) => {
  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      {children && (
        <motion.div
          key={stepKeys[currentStepIndex]}
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: "linear" }}
          className="flex flex-col flex-grow h-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomMotionComponent;
