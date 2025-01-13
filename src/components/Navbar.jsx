import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { useState } from "react";

function Navbar() {
  const { scrollY } = useScroll();
  const [prevScroll, setPrevScroll] = useState(0);
  const [navOpacity, setNavOpacity] = useState(1);
  const [navPosition, setNavPosition] = useState(0);

  useMotionValueEvent(scrollY, "change", (currentYscroll) => {
    if (currentYscroll === 0) {
      // At the top of the page
      setNavOpacity(1);
      setNavPosition(0);
    } else if (currentYscroll < prevScroll) {
      // Scrolling up
      setNavOpacity(1);
      setNavPosition(0);
    } else {
      // Scrolling down
      setNavOpacity(0);
      setNavPosition(-50); // Move navbar upwards
    }
    setPrevScroll(currentYscroll);
  });

  const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: navOpacity,
        y: navPosition,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-x-0 top-6 z-50 h-16 border-none sm:inset-x-6 rounded-md"
    >
      <header className="flex justify-between py-2 px-4 bg-black rounded-md">
        <div className="flex gap-5">
          <img src="/img/logo.png" alt="logo" className="w-10" />
          <Button
            title={"products"}
            containerClass={"flex"}
            rightIcon={<TiLocationArrow />}
          />
        </div>
        <div className="flex gap-8 items-center">
          {navItems.map((item, index) => (
            <a href={`#${item.toLowerCase()}`} key={index}>
              <span className="font-general text-xs uppercase text-blue-50">
                {item}
              </span>
            </a>
          ))}
        </div>
      </header>
    </motion.div>
  );
}

export default Navbar;
