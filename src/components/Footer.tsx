import React, { useRef } from "react";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  explore: [
    { name: "Home", href: "#home" },
    { name: "Prologue", href: "#prologue" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ],
  products: [
    { name: "Radiant", href: "#radiant" },
    { name: "Nexus ↗", href: "#nexus" },
    { name: "Zigma", href: "#zigma" },
    { name: "Azul", href: "#azul" }
  ],
  followUs: [
    { name: "Discord", href: "https://discord.com" },
    { name: "X", href: "https://twitter.com" },
    { name: "Youtube", href: "https://youtube.com" },
    { name: "Medium", href: "https://medium.com" }
  ],
  resources: [
    { name: "Media Kit", href: "#media-kit" }
  ]
};

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const zentryTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 3D text animation on scroll
    gsap.fromTo(zentryTextRef.current, 
      {
        rotateX: 45,
        rotateY: -15,
        z: -200,
        opacity: 0.7
      },
      {
        rotateX: 25,
        rotateY: -5,
        z: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        }
      }
    );

    // Hover animation for the 3D text
    if (zentryTextRef.current) {
      zentryTextRef.current.addEventListener('mouseenter', () => {
        gsap.to(zentryTextRef.current, {
          rotateX: 20,
          rotateY: 0,
          scale: 1.02,
          duration: 0.5,
          ease: "power2.out"
        });
      });

      zentryTextRef.current.addEventListener('mouseleave', () => {
        gsap.to(zentryTextRef.current, {
          rotateX: 25,
          rotateY: -5,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative w-screen bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 text-white overflow-hidden"
    >
      {/* Large 3D ZENTRY Text */}
      <div className="relative h-96 flex items-center justify-center" style={{ perspective: '1000px' }}>
        <h1 
          ref={zentryTextRef}
          className="special-font font-zentry font-black text-[12rem] md:text-[16rem] lg:text-[20rem] text-black cursor-pointer select-none"
          style={{
            transformStyle: 'preserve-3d',
            textShadow: '0 20px 50px rgba(0,0,0,0.3)',
          }}
        >
          Z<b>E</b>NTRY
        </h1>
        
        {/* Gradient overlay for depth effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Footer Links Section */}
      <div className="relative bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Explore Column */}
            <div>
              <h3 className="text-xs font-general uppercase tracking-wider text-gray-300 mb-4">
                Explore
              </h3>
              <ul className="space-y-3">
                {footerLinks.explore.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-white hover:text-blue-300 transition-colors duration-300 font-circular-web text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products Column */}
            <div>
              <h3 className="text-xs font-general uppercase tracking-wider text-gray-300 mb-4">
                Products
              </h3>
              <ul className="space-y-3">
                {footerLinks.products.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-white hover:text-blue-300 transition-colors duration-300 font-circular-web text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us Column */}
            <div>
              <h3 className="text-xs font-general uppercase tracking-wider text-gray-300 mb-4">
                Follow Us
              </h3>
              <ul className="space-y-3">
                {footerLinks.followUs.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-300 transition-colors duration-300 font-circular-web text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-xs font-general uppercase tracking-wider text-gray-300 mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-white hover:text-blue-300 transition-colors duration-300 font-circular-web text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Section */}
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-circular-web">
              Zentry 2024. All rights reserved
            </p>
            <a 
              href="#privacy-policy"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-circular-web mt-4 md:mt-0"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;