import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "../hooks/useClickOutside";
import { FaBars, FaXmark } from "react-icons/fa6";

import Logo from "./Logo";
import MobileAction from "./MobileAction";
import ToggleTheme from "./ToggleTheme";

function MobileNav() {
  const [show, setShow] = useState(false);
  const ref = useClickOutside(close);

  function close() {
    setShow(false);
  }

  return (
    <div
      className={`${show && "fixed inset-0 z-30 backdrop-blur-sm"} text-end`}
    >
      <button className="h-16 text-2xl" onClick={() => setShow(true)}>
        <FaBars />
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            ref={ref}
            className="fixed bottom-0 right-0 top-0 z-40 max-h-[90%] w-[350px] overflow-y-auto rounded-lg bg-white text-lg leading-6 shadow shadow-black/60 dark:bg-dark dark:text-white md:max-h-full"
            initial={{ x: "350px" }}
            animate={{ x: "0px" }}
            transition={{ duration: 0.25 }}
            exit={{ x: "380px" }}
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-black/20 py-4 pl-4 dark:border-white/20">
              <Logo />

              <span className="-mr-11 mt-1">
                <ToggleTheme />
              </span>
              <button className="mr-2 h-16 text-2xl" onClick={close}>
                <FaXmark />
              </button>
            </div>
            <MobileAction onClose={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileNav;
