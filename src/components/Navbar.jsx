import { TiLocationArrow } from "react-icons/ti";
import { HiMenu, HiX } from "react-icons/hi";
import Button from "./Button";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { useState } from "react";

function Navbar() {
  const { scrollY } = useScroll();
  const [prevScroll, setPrevScroll] = useState(0);
  const [navOpacity, setNavOpacity] = useState(1);
  const [navPosition, setNavPosition] = useState(0);
  const [navbarColor, setNavbarColor] = useState("bg-transparent");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (currentYscroll) => {
    if (currentYscroll === 0) {
      setNavOpacity(1);
      setNavPosition(0);
      setNavbarColor("bg-transparent");
    } else if (currentYscroll < prevScroll) {
      setNavOpacity(1);
      setNavPosition(0);
      setNavbarColor("bg-black");
    } else {
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
      <header
        className={`${navbarColor} flex justify-between items-center py-2 px-4 rounded-md transition-all duration-300 ease-in-out`}
      >
        {/* Logo and Button */}
        <div className="flex gap-5 items-center">
          <img src="/img/logo.png" alt="logo" className="w-10" />
          <Button
            title={"products"}
            containerClass={"flex"}
            rightIcon={<TiLocationArrow />}
          />
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item, index) => (
            <a href={`#${item.toLowerCase()}`} key={index}>
              <span className="font-general text-xs uppercase text-blue-50">
                {item}
              </span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-blue-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black rounded-md py-2 px-4">
          {navItems.map((item, index) => (
            <a
              href={`#${item.toLowerCase()}`}
              key={index}
              className="block py-2 text-blue-50 text-xs uppercase"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Navbar;
