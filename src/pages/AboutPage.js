import React from "react";
import { useSpring, animated } from "@react-spring/web";
import About1 from "../components/about/about1";
import About from "../components/about/about";

const AboutPage = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 250 },
  });
  return (
    <animated.div style={fadeIn} className="min-h-screen bg-white">
      <About />
    </animated.div>
  );
};

export default AboutPage;
