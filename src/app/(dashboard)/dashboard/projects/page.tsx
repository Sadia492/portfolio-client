import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaCalendar,
  FaCode,
  FaShoppingCart,
  FaUser,
  FaCreditCard,
  FaMobile,
  FaDatabase,
  FaCloud,
  FaTrashAlt,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/modules/Projects/DeleteButton";

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
  data: Project[];
}

// ISR: This page will be regenerated every 60 seconds
export const revalidate = 60;

async function getProjects(): Promise<ProjectResponse> {
  const res = await fetch(`http://localhost:5000/api/projects`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}

// Format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

// Get feature icon based on feature type
function getFeatureIcon(feature: string) {
  const lowerFeature = feature.toLowerCase();
  if (lowerFeature.includes("cart") || lowerFeature.includes("ecommerce"))
    return <FaShoppingCart className="text-green-500" size={12} />;
  if (lowerFeature.includes("payment") || lowerFeature.includes("stripe"))
    return <FaCreditCard className="text-blue-500" size={12} />;
  if (
    lowerFeature.includes("auth") ||
    lowerFeature.includes("user") ||
    lowerFeature.includes("login")
  )
    return <FaUser className="text-purple-500" size={12} />;
  if (lowerFeature.includes("mobile") || lowerFeature.includes("responsive"))
    return <FaMobile className="text-orange-500" size={12} />;
  if (lowerFeature.includes("database") || lowerFeature.includes("db"))
    return <FaDatabase className="text-red-500" size={12} />;
  if (lowerFeature.includes("cloud") || lowerFeature.includes("deploy"))
    return <FaCloud className="text-sky-500" size={12} />;
  return <FaCode className="text-gray-500" size={12} />;
}

export default async function ProjectsPage() {
  let projectsData: ProjectResponse;

  try {
    projectsData = await getProjects();
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mb-4">
              Projects
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full"></div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCode className="text-red-500 text-2xl" />
              </div>
              <p className="text-gray-600 text-lg mb-4">
                Failed to load projects.
              </p>
              <p className="text-gray-400 text-sm">Please try again later.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const projects = projectsData.data;

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            My Projects
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A collection of projects I've built to solve real-world problems and
            learn new technologies
          </p>
          <Link href={"/dashboard/projects/new"}>
            <Button className="mt-3">Add New Project</Button>
          </Link>
        </div>

        {/* Projects Grid */}
        {!projects || projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCode className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No projects yet
              </h3>
              <p className="text-gray-500 mb-4">
                Check back soon for exciting projects!
              </p>
              <div className="w-24 h-1 bg-gray-200 mx-auto rounded-full"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Stats Section */}
        {projects && projects.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Project Portfolio
              </h3>
              <p className="text-gray-600">
                {projects.length}{" "}
                {projects.length === 1 ? "project" : "projects"} completed
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Built with passion and modern technologies
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project }: { project: Project }) {
  const features = project.features.split(",").map((feature) => feature.trim());

  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Project Thumbnail */}
      {project.thumbnail ? (
        <div className="relative h-48 w-full">
          <Image
            // width={200}
            // height={200}
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ) : (
        <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <FaCode className="text-gray-400 text-4xl" />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Features */}
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Key Features
            </h4>
            <div className="space-y-2">
              {features.slice(0, 3).map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg"
                >
                  {getFeatureIcon(feature)}
                  <span className="flex-1 font-medium">{feature}</span>
                </div>
              ))}
              {features.length > 3 && (
                <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg text-center">
                  +{features.length - 3} more features
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Links and Meta */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              <FaCalendar className="text-secondary" size={10} />
              <time dateTime={project.createdAt}>
                {formatDate(project.createdAt)}
              </time>
            </div>

            <div className="flex gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-green-600 transition-colors bg-gray-100 rounded-lg hover:bg-green-50"
                  title="Live Demo"
                >
                  <FaExternalLinkAlt size={14} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                  title="View Code"
                >
                  <FaGithub size={14} />
                </a>
              )}
              <DeleteButton projectId={project.id} />
              {/* <Button
                onClick={() => handleDelete(project?.id)}
                className="p-2 text-gray-400 hover:text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <FaTrashAlt></FaTrashAlt>
              </Button> */}
            </div>
          </div>

          <Link
            href={`/projects/${project.id}`}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm flex items-center justify-center gap-2 group/link"
          >
            View Project Details
            <span className="group-hover/link:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
