import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaCalendar,
  FaArrowLeft,
  FaShoppingCart,
  FaUser,
  FaCreditCard,
  FaCode,
} from "react-icons/fa";
import Link from "next/link";

interface Owner {
  name: string;
  email: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string;
  thumbnail: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  createdAt: string;
  updatedAt: string;
  owner: Owner;
}

interface ProjectResponse {
  success: boolean;
  data: Project;
}

// ISR: This page will be regenerated every 2 minutes
export const revalidate = 120;

async function getProject(id: string): Promise<ProjectResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error("Failed to fetch project");
  }

  return res.json();
}

// Generate static paths for projects
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    const response = await res.json();
    const projects: Project[] = response.data || [];

    return projects.map((project) => ({
      id: project.id,
    }));
  } catch (error) {
    return [];
  }
}

export const dynamicParams = true;

// Format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Get feature icon based on feature type
function getFeatureIcon(feature: string) {
  if (feature.toLowerCase().includes("cart"))
    return <FaShoppingCart className="text-green-500" size={16} />;
  if (feature.toLowerCase().includes("payment"))
    return <FaCreditCard className="text-blue-500" size={16} />;
  if (
    feature.toLowerCase().includes("auth") ||
    feature.toLowerCase().includes("user")
  )
    return <FaUser className="text-purple-500" size={16} />;
  return <FaCode className="text-gray-500" size={16} />;
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  let projectData: ProjectResponse;

  try {
    projectData = await getProject(params.id);
  } catch (error) {
    notFound();
  }

  const { data: project } = projectData;
  const features = project.features.split(",").map((feature) => feature.trim());

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Back Navigation */}
        <nav className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-gray-600 hover:text-primary transition-colors duration-300 font-semibold group"
          >
            <FaArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            Back to All Projects
          </Link>
        </nav>

        {/* Project Content */}
        <article className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <header className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-8">
            <div className="text-center">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mb-6 leading-tight">
                {project.title}
              </h1>

              {/* Divider */}
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>

              {/* Description */}
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                {project.description}
              </p>

              {/* Project Links */}
              <div className="flex flex-wrap gap-4 justify-center mb-6">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    <FaExternalLinkAlt size={16} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <FaGithub size={16} />
                    View Code
                  </a>
                )}
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
                  <FaCalendar className="text-secondary" size={14} />
                  <time dateTime={project.createdAt} className="font-medium">
                    {formatDate(project.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          </header>

          {/* Project Thumbnail */}
          {project.thumbnail && (
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Content Section */}
          <div className="p-8">
            {/* Features Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-shrink-0">
                      {getFeatureIcon(feature)}
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Project Overview
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  This project demonstrates my skills in full-stack development
                  and problem-solving. Built with modern technologies and best
                  practices.
                </p>
                <p>
                  The application includes comprehensive functionality and
                  provides a seamless user experience.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <footer className="border-t border-gray-100 bg-gray-50 px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-gray-600 text-sm">
                  Created by{" "}
                  <span className="font-semibold text-primary">
                    {project.owner.name}
                  </span>
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Last updated: {formatDate(project.updatedAt)}
                </p>
              </div>

              <div className="flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
                  >
                    <FaExternalLinkAlt size={14} />
                    Visit Live Site
                  </a>
                )}
              </div>
            </div>
          </footer>
        </article>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Interested in this project?
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Check out more of my projects or get in touch to discuss
              collaboration opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                View All Projects
              </Link>
              <Link
                href="/contact"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
