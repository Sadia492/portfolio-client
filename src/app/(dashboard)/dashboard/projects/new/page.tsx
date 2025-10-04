// src/app/dashboard/projects/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import Head from "next/head";

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: "",
    thumbnail: "",
    githubUrl: "",
    liveUrl: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    features: "",
    thumbnail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      title: "",
      description: "",
      features: "",
      thumbnail: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description =
        "Description should be at least 20 characters long";
    }

    if (!formData.features.trim()) {
      newErrors.features = "Features are required";
    } else if (
      formData.features.split(",").filter((f) => f.trim()).length < 2
    ) {
      newErrors.features = "Please add at least 2 features (comma separated)";
    }

    if (!formData.thumbnail.trim()) {
      newErrors.thumbnail = "Thumbnail URL is required";
    }

    setErrors(newErrors);
    return (
      !newErrors.title &&
      !newErrors.description &&
      !newErrors.features &&
      !newErrors.thumbnail
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send the data exactly as it is, without processing features
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData), // Send formData directly like the blog
        }
      );

      if (response.ok) {
        await Swal.fire({
          title: "Success!",
          text: "Project created successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

        // Redirect to projects list
        router.push("/dashboard/projects");
        router.refresh();
      } else {
        const errorData = await response.json();
        await Swal.fire({
          title: "Error!",
          text: errorData.message || "Failed to create project",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error creating project:", error);
      await Swal.fire({
        title: "Error!",
        text: "Failed to create project. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const featureCount = formData.features
    .split(",")
    .filter((f) => f.trim()).length;

  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <Head>
        <title>Add Project | My Portfolio</title>
      </Head>
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/dashboard/projects"
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              ← Back to Projects
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Project
          </h1>
          <p className="text-gray-600 mt-2">
            Add a new project to your portfolio
          </p>
        </div>

        {/* Project Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title (e.g., E-Commerce Platform)"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Project Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your project and its purpose..."
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                {formData.description.length} characters
                {formData.description.length < 20 &&
                  " (minimum 20 characters required)"}
              </p>
            </div>

            {/* Features Field */}
            <div>
              <label
                htmlFor="features"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Features *
              </label>
              <textarea
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                rows={3}
                placeholder="Enter features separated by commas (e.g., Shopping cart, Payment integration, User authentication)"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical ${
                  errors.features ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.features && (
                <p className="mt-1 text-sm text-red-600">{errors.features}</p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                {featureCount} {featureCount === 1 ? "feature" : "features"}{" "}
                added
                {featureCount < 2 && " (minimum 2 features required)"}
              </p>
            </div>

            {/* Thumbnail URL Field */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Thumbnail URL *
              </label>
              <input
                type="url"
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="Enter image URL (e.g., /images/project.jpg or https://example.com/image.jpg)"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.thumbnail ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.thumbnail && (
                <p className="mt-1 text-sm text-red-600">{errors.thumbnail}</p>
              )}

              {/* Thumbnail Preview */}
              {formData.thumbnail && (
                <div className="mt-3">
                  <p className="text-sm text-gray-700 mb-2">
                    Thumbnail Preview:
                  </p>
                  <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02NCA0MEM2OC40MTgzIDQwIDcyIDQzLjU4MTcgNzIgNDhDNzIgNTIuNDE4MyA2OC40MTgzIDU2IDY0IDU2QzU5LjU4MTcgNTYgNTYgNTIuNDE4MyA1NiA0OEM1NiA0My41ODE3IDU5LjU4MTcgNDAgNjQgNDBaTTc4LjY2NjcgODhINDkuMzMzM1Y3OS45OTk5QzQ5LjMzMzMgNzIuNjY2NiA1NiA2Ni42NjY2IDY0IDY2LjY2NjZDNzIgNjYuNjY2NiA3OC42NjY3IDcyLjY2NjYgNzguNjY2NyA3OS45OTk5Vjg4WiIgZmlsbD0iIzlDQTBCMSIvPgo8L3N2Zz4K";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* GitHub URL Field */}
            <div>
              <label
                htmlFor="githubUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                GitHub Repository URL
              </label>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username/repository"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                disabled={isSubmitting}
              />
              <p className="mt-2 text-sm text-gray-500">
                Optional: Link to your project's GitHub repository
              </p>
            </div>

            {/* Live Demo URL Field */}
            <div>
              <label
                htmlFor="liveUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Live Demo URL
              </label>
              <input
                type="url"
                id="liveUrl"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://your-project-demo.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                disabled={isSubmitting}
              />
              <p className="mt-2 text-sm text-gray-500">
                Optional: Link to your live project demo
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Project...
                  </>
                ) : (
                  "Create Project"
                )}
              </button>

              <Link
                href="/dashboard/projects"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            💡 Project Creation Tips
          </h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>
              • <strong>Title:</strong> Make it clear and descriptive
            </li>
            <li>
              • <strong>Description:</strong> Explain what the project does and
              its purpose
            </li>
            <li>
              • <strong>Features:</strong> List key functionalities separated by
              commas
            </li>
            <li>
              • <strong>Thumbnail:</strong> Use a high-quality image that
              represents your project
            </li>
            <li>
              • <strong>GitHub URL:</strong> Include if you want to showcase
              your code
            </li>
            <li>
              • <strong>Live Demo:</strong> Add if your project is deployed and
              accessible
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
