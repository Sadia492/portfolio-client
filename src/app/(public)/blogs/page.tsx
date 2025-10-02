import React from "react";
import Link from "next/link";
import { FaCalendar, FaUser, FaClock } from "react-icons/fa";

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
  data: Blog[];
}

// ISR: This page will be regenerated every 60 seconds
export const revalidate = 60;

async function getBlogs(): Promise<BlogResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
    // Remove next.revalidate since we're using export const revalidate
    cache: "no-store", // Ensure fresh data on each regeneration
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

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

export default async function BlogsPage() {
  let blogsData: BlogResponse;

  try {
    blogsData = await getBlogs();
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mb-4 mt-10">
              Blog
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full"></div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md mx-auto">
              <p className="text-gray-600 text-lg mb-4">
                Failed to load blogs.
              </p>
              <p className="text-gray-400 text-sm">Please try again later.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const blogs = blogsData.data;

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            My Blog
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thoughts, stories, and ideas about web development, design, and
            technology
          </p>
        </div>

        {/* Blogs List */}
        {!blogs || blogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 max-w-md mx-auto">
              <p className="text-gray-500 text-lg mb-4">
                No blogs published yet.
              </p>
              <p className="text-gray-400">Check back soon for new content!</p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {blogs.map((blog) => {
                const readingTime = calculateReadingTime(blog.content);

                return (
                  <article
                    key={blog.id}
                    className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-8">
                      <Link href={`/blogs/${blog.slug}`}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {blog.title}
                        </h2>
                      </Link>

                      <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                        {blog.content.substring(0, 200)}
                        {blog.content.length > 200 && "..."}
                      </p>

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-primary" size={14} />
                          <span className="font-medium">
                            {blog.author.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-secondary" size={14} />
                          <time
                            dateTime={blog.createdAt}
                            className="font-medium"
                          >
                            {formatDate(blog.createdAt)}
                          </time>
                        </div>

                        <div className="flex items-center gap-2">
                          <FaClock className="text-blue-500" size={14} />
                          <span className="font-medium">{readingTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          {blog.published ? (
                            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Published
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              Draft
                            </div>
                          )}
                        </div>

                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm flex items-center gap-2 group"
                        >
                          Read More
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* Stats Section */}
        {blogs && blogs.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Blog Stats
              </h3>
              <p className="text-gray-600">
                {blogs.length} {blogs.length === 1 ? "article" : "articles"}{" "}
                published
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
