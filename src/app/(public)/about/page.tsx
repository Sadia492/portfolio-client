import React from "react";
import Image from "next/image";
import { FaBook, FaChess, FaMusic, FaSun } from "react-icons/fa";
import Link from "next/link";
export const metadata = {
  title: "About Me | My Portfolio",
};

export default function About() {
  return (
    <section id="about" className=" py-20 bg-gray-50 mt-6">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          {/* Left Column - Image & Hobbies */}
          <div className="flex-1 flex flex-col lg:flex-row gap-8">
            {/* Image Container */}
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/pixelcut-export.png" // Make sure to place your image in public folder
                  width={400}
                  height={500}
                  alt="Sadia Afrin Snigdha - Web Developer"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-transparent mix-blend-overlay"></div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full opacity-60 animate-pulse delay-1000"></div>
            </div>

            {/* Hobbies Section */}
            <div className="space-y-6 lg:pt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                My Interests
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaChess className="text-blue-600 text-lg" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    Play Online Chess at leisure
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaBook className="text-green-600 text-lg" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    Read books on tech
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FaMusic className="text-purple-600 text-lg" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    Explore new music genres
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FaSun className="text-orange-600 text-lg" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    Traveling new places
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Bio */}
          <div className="flex-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Passionate Web Developer
              </h3>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Hi, I'm{" "}
                  <span className="font-semibold text-primary">Snigdha</span>, a
                  passionate web developer focused on creating visually
                  appealing and intuitive websites. With experience in front-end
                  development, I strive to craft seamless user experiences that
                  engage and inspire. Whether it's through responsive design or
                  smooth interactions, I ensure every detail is thoughtfully
                  executed.
                </p>

                <p>
                  I'm driven by a love for problem-solving and the joy of
                  transforming ideas into functional, accessible digital
                  products. I have worked on various projects, including
                  responsive websites, e-commerce platforms, and interactive
                  apps, and I am always eager to collaborate on exciting new
                  ventures.
                </p>
              </div>

              {/* Stats or Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">50+</div>
                  <div className="text-sm text-gray-600">
                    Projects Completed
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex gap-4">
              <Link
                href="https://drive.google.com/file/d/1B5Octi2DKgoUQ2VR7znym4HX5MFtlKEf/view?usp=drive_link"
                className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Download Resume
              </Link>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
