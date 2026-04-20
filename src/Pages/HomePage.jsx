import Hero from "../Components/Hero";
import Footer from "../Components/Footer";
import { useRef } from "react";

const HomePage = () => {
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Hero />
      <Footer ref={footerRef} />
    </>
  );
};

export default HomePage;
