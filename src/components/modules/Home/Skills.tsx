"use client";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiPrisma,
  SiGit,
} from "react-icons/si";

export default function Skills() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const skills = [
    {
      icon: SiHtml5,
      name: "HTML5",
      description:
        "Skilled in crafting well-structured, semantic HTML to create accessible and SEO-friendly web pages.",
      color: "text-orange-500",
    },
    {
      icon: SiCss3,
      name: "CSS3",
      description:
        "Creating visually appealing, responsive, and user-friendly designs with modern styling techniques.",
      color: "text-blue-500",
    },
    {
      icon: SiJavascript,
      name: "JavaScript",
      description:
        "Proficient in building dynamic, interactive, and efficient web applications with modern ES6+ features.",
      color: "text-yellow-400",
    },
    {
      icon: SiTypescript,
      name: "TypeScript",
      description:
        "Building type-safe applications with better developer experience and fewer runtime errors.",
      color: "text-blue-600",
    },
    {
      icon: SiReact,
      name: "React",
      description:
        "Expert in building component-based UIs with hooks, context, and modern React patterns.",
      color: "text-cyan-400",
    },
    {
      icon: SiNextdotjs,
      name: "Next.js",
      description:
        "Full-stack React framework for production-grade applications with SSR, SSG, and API routes.",
      color: "text-white",
    },
    {
      icon: SiTailwindcss,
      name: "Tailwind CSS",
      description:
        "Utility-first CSS framework for rapidly building custom designs with responsive layouts.",
      color: "text-cyan-500",
    },
    {
      icon: SiNodedotjs,
      name: "Node.js",
      description:
        "Building scalable server-side applications and APIs with JavaScript runtime environment.",
      color: "text-green-500",
    },
    {
      icon: SiExpress,
      name: "Express.js",
      description:
        "Minimal and flexible Node.js web application framework for building robust APIs.",
      color: "text-gray-400",
    },
    {
      icon: SiMongodb,
      name: "MongoDB",
      description:
        "NoSQL database for modern applications with flexible document-based data modeling.",
      color: "text-green-600",
    },
    {
      icon: SiPostgresql,
      name: "PostgreSQL",
      description:
        "Powerful, open-source object-relational database system with SQL compliance.",
      color: "text-blue-700",
    },
    {
      icon: SiPrisma,
      name: "Prisma",
      description:
        "Modern database toolkit with type-safe database access and migrations.",
      color: "text-blue-900",
    },
    {
      icon: SiGit,
      name: "Git",
      description:
        "Version control system for tracking changes and collaborating on codebases.",
      color: "text-orange-600",
    },
  ];

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === skills.length - 4 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? skills.length - 4 : prevIndex - 1
    );
  };

  // Auto slide effect
  React.useEffect(() => {
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Skills & Technologies
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl">
              These include, but are not limited to, the technologies I use for
              building modern web applications
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
              onClick={goToPrev}
              aria-label="Previous skills"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
              onClick={goToNext}
              aria-label="Next skills"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Skills Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2"
              >
                <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl hover:border-transparent transition-all duration-300 h-72 flex flex-col group">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="bg-gradient-to-tr from-secondary to-primary w-16 h-16 rounded-xl flex items-center justify-center">
                      <skill.icon
                        className={`text-3xl ${skill.color} group-hover:scale-110 transition-transform duration-200`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-xl text-gray-800 mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    {skill.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(skills.length / 4) }).map(
            (_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === Math.floor(currentIndex / 4)
                    ? "bg-primary"
                    : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index * 4)}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
