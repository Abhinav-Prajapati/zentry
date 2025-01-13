import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useState } from "react";

export const About = () => {

  const { scrollY } = useScroll();

  const x4 = useTransform(scrollY, [1400, 2350], [30, 0]);
  const y4 = useTransform(scrollY, [1400, 2350], [30, 100]);

  const x3 = useTransform(scrollY, [1400, 2350], [70, 100]);
  const y3 = useTransform(scrollY, [1400, 2350], [30, 100]);

  //const scaleImage = useTransform(scrollY, [950, 1900], [0.9, 1.2])

  const [clipPathValue, setClipPathValue] = useState("polygon(30% 0%, 70% 0%, 70% 30%, 30% 30%)");

  useMotionValueEvent(scrollY, "change", () => {

    const currentX3 = x3.get();
    const currentY3 = y3.get();

    const currentX4 = x4.get();
    const currentY4 = y4.get();


    const newClipPath = `polygon(
                         ${currentX4}% 0%,
                         ${currentX3}% 0%,
                         ${currentX3}% ${currentY3}%,
                         ${currentX4}% ${currentY4}%)`;
    setClipPathValue(newClipPath);
  });

  return (
    <div className="flex flex-col ">
      <div className=" bg-blue-50 relative">

        <p className="font-general text-sm uppercase md:text-[15px] text-center mt-36 mb-8">
          Welcome to Zentry
        </p>
        <p className='text-center text-8xl special-font font-zentry mb-8   '>
          Discover the worlds <br /> largest shared dventure
        </p>
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className=" font-semibold text-lg">
            The Game of Games begins -- your life, now an epic MMORPG
          </p>
          <p className="text-gray-500 text-lg">
            Zentry unites every player from countless games and platforms, <br />
            both digital and physical, into a unified Play Economy
          </p>
        </div>
        <motion.div
          style={{
            clipPath: clipPathValue,
          }}
          className="w-screen min-h-screen overflow-hidden sticky top-0 bg-blue-50 "
        >
          <img
            src="img/about.webp"
            alt="Background"
            className="object-cover min-h-screen"
          />

        </motion.div>

        <div className="w-screen min-h-screen"></div>
      </div>
    </div>
  );
};
