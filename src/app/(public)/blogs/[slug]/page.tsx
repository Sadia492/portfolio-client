import React from "react";
import { notFound } from "next/navigation";
import { FaCalendar, FaUser, FaArrowLeft, FaClock } from "react-icons/fa";
import Link from "next/link";

interface Author {
  id: string;
  name: string;
  email: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: Author;
}

interface BlogResponse {
  success: boolean;
  data: Blog;
}

// ISR: This page will be regenerated every 2 minutes
export const revalidate = 120;

async function getBlog(slug: string): Promise<BlogResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`, {
    cache: "no-store", // Ensure fresh data
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error("Failed to fetch blog");
  }

  return res.json();
}

// ✅ Generate static paths for blogs at build time
export async function generateStaticParams() {
  try {
    // For ISR, we can pre-generate the most popular pages
    // or return an empty array to rely on on-demand generation
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      next: { revalidate: 3600 }, // Cache for 1 hour for build
    });

    if (!res.ok) {
      return [];
    }

    const response = await res.json();
    const blogs: Blog[] = response.data || [];

    // Pre-generate only published blogs
    return blogs
      .filter((blog) => blog.published)
      .slice(0, 10) // Limit to first 10 to avoid build time issues
      .map((blog) => ({
        slug: blog.slug,
      }));
  } catch (error) {
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const blogData = await getBlog(params.slug);
    const blog = blogData.data;

    return {
      title: `${blog.title} | My Portfolio`,
      description: blog.content.substring(0, 160),
      openGraph: {
        title: blog.title,
        description: blog.content.substring(0, 160),
        type: "article",
        publishedTime: blog.createdAt,
        authors: [blog.author.name],
      },
    };
  } catch (error) {
    return {
      title: "Blog Not Found",
      description: "The blog post you are looking for does not exist.",
    };
  }
}

// Dynamic params for on-demand ISR
export const dynamicParams = true; // Allow on-demand generation for non-pre-generated pages

// Calculate reading time
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  let blogData: BlogResponse;

  try {
    blogData = await getBlog(params.slug);
  } catch (error) {
    notFound();
  }

  const { data: blog } = blogData;
  const readingTime = calculateReadingTime(blog.content);

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Back Navigation */}
        <nav className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-3 text-gray-600 hover:text-primary transition-colors duration-300 font-semibold group"
          >
            <FaArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            Back to All Blogs
          </Link>
        </nav>

        {/* Blog Article */}
        <article className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <header className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-8">
            <div className="text-center">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Divider */}
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>

              {/* Meta Information */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <FaUser className="text-primary" size={12} />
                  <span className="font-medium">{blog.author.name}</span>
                </div>

                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <FaCalendar className="text-secondary" size={12} />
                  <time dateTime={blog.createdAt} className="font-medium">
                    {formatDate(blog.createdAt)}
                  </time>
                </div>

                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <FaClock className="text-blue-500" size={12} />
                  <span className="font-medium">{readingTime}</span>
                </div>
              </div>

              {/* Published Status */}
              {blog.published && (
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Published
                </div>
              )}
            </div>
          </header>

          {/* Content Section */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              {/* Render content with proper formatting */}
              {blog.content.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed mb-6 text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <footer className="border-t border-gray-100 bg-gray-50 px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-gray-600 text-sm">
                  Written by{" "}
                  <span className="font-semibold text-primary">
                    {blog.author.name}
                  </span>
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Last updated: {formatDate(blog.updatedAt)}
                </p>
              </div>

              <Link
                href="/blogs"
                className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 group"
              >
                <FaArrowLeft
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Explore More Blogs
              </Link>
            </div>
          </footer>
        </article>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Enjoyed this article?
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Check out more of my thoughts and experiences in web development
              and design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blogs"
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Read More Blogs
              </Link>
              <Link
                href="/"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
