"use client";

import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="w-full relative">
      {/* Background (Crimson Depth) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #2b0707 100%)",
        }}
      />

      {/* Main Content Container */}
      <section className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between min-h-[calc(100vh-110px)] px-6 py-12 lg:py-0 max-w-7xl mx-auto">
        {/* Left Content - Text Section */}
        <div className="flex-1 flex flex-col justify-center items-start space-y-6 lg:space-y-8 text-white lg:max-w-lg xl:max-w-2xl">
          {/* Greeting */}
          <div className="space-y-2">
            <p className="text-xl md:text-2xl text-accent font-medium">
              Hey, I am
            </p>
            <p className="text-2xl md:text-3xl font-semibold text-white">
              Sadia Afrin Snigdha
            </p>
          </div>

          {/* Typewriter Section */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <Typewriter
                words={[
                  "Frontend Developer",
                  "React Enthusiast",
                  "Problem Solver",
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={130}
                deleteSpeed={100}
                delaySpeed={1000}
                onType={(count: number) => {
                  // This callback runs on each type action
                  const words = [
                    "Frontend Developer",
                    "React Enthusiast",
                    "Problem Solver",
                  ];
                  const currentWord = words[count % words.length];

                  // You can add custom logic here if needed
                }}
              />
            </h1>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">
            I specialize in crafting visually captivating and user-friendly
            websites. With a keen focus on responsive design and smooth
            interactions, I ensure every detail is meticulously crafted. My goal
            is to bring your vision to life, transforming ideas into seamless
            online experiences.
          </p>

          {/* Social Icons */}
          <div className="flex gap-6 text-2xl md:text-3xl">
            <Link
              href="https://www.facebook.com/profile.php?id=100077898306645"
              target="_blank"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              <FaFacebook />
            </Link>
            <Link
              href="https://github.com/Sadia492"
              target="_blank"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://www.linkedin.com/in/sadia-afrin01/"
              target="_blank"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              <FaLinkedin />
            </Link>
          </div>

          {/* Resume Button */}
          <Link
            href="https://drive.google.com/file/d/1B5Octi2DKgoUQ2VR7znym4HX5MFtlKEf/view?usp=drive_link"
            target="_blank"
            className="bg-gradient-to-r from-secondary to-primary text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300 mt-4 shadow-lg"
          >
            Download Resume
          </Link>
        </div>

        {/* Right Side - Image Section */}
        <div className="flex-1 flex justify-center items-center lg:justify-end mt-12 lg:mt-0">
          <div className="relative">
            {/* Optional: Add a decorative background for the image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-xl"></div>

            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <Image
                src="/pixelcut-export.png"
                width={400}
                height={500}
                alt="Sadia Afrin Snigdha - Frontend Developer"
                className="object-cover w-full h-auto"
                priority
                quality={95}
                sizes="(max-width: 768px) 300px, (max-width: 1200px) 400px, 500px"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>

            {/* Optional: Floating elements for visual interest */}
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-primary rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-secondary rounded-full opacity-60 animate-pulse delay-1000"></div>
          </div>
        </div>
      </section>

      {/* Custom CSS for red color on "React Enthusiast" */}
      <style>{`
        /* Target the specific word in the typewriter */
        :global(.Typewriter__wrapper) {
          color: inherit;
        }

        /* Alternative approach using data attributes */
        .red-text {
          color: #ef4444 !important; /* Tailwind red-500 */
        }
      `}</style>
    </div>
  );
}
