import { useEffect, useRef } from "react";

export const ParallexBg = ({ imgSrc }: { imgSrc: string }) => {
  const parallaxRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <img
      ref={parallaxRef}
      src={imgSrc}
      alt="Background"
      className="parallax-img"
    />
  );
};
