import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "../hooks/useClickOutside";
import { FaBars, FaXmark } from "react-icons/fa6";
import Action from "./Action";
import Logo from "../ui/Logo";

function MobileHeader() {
  const [show, setShow] = useState(false);
  const ref = useClickOutside(close);

  function close() {
    setShow(false);
  }

  return (
    <div className="sticky left-0 top-0 flex justify-between bg-white px-3.5 text-end text-primary shadow shadow-black/50 dark:bg-dark dark:text-white">
      <div className="flex items-center">
        <Logo />
      </div>

      <button className="h-16 text-3xl" onClick={() => setShow(true)}>
        <FaBars />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            ref={ref}
            className="fixed bottom-0 right-0 top-0 z-40 w-[350px] rounded-lg bg-white text-lg leading-6 shadow shadow-black/60 dark:bg-dark dark:text-white"
            initial={{ x: "350px" }}
            animate={{ x: "0px" }}
            transition={{ duration: 0.25 }}
            exit={{ x: "380px" }}
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-black/20 py-4 pl-4 dark:border-white/20">
              <Logo />
              <button className="mr-2 h-16 text-3xl" onClick={close}>
                <FaXmark />
              </button>
            </div>
            <Action onClose={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileHeader;