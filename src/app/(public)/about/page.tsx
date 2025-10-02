import React from "react";
import Link from "next/link";
import { FaCalendar, FaUser } from "react-icons/fa";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    email: string;
  };
}

interface BlogResponse {
  success: boolean;
  data: Blog[];
}

async function getBlogs(): Promise<BlogResponse> {
  const res = await fetch(`http://localhost:5000/api/blogs`, {
    next: { revalidate: 60 }, // ISR: regenerate every 60s
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

export default async function BlogsPage() {
  let blogsData: BlogResponse;

  try {
    blogsData = await getBlogs();
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mb-4">
              Blog
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full"></div>
            <p className="text-gray-600 text-lg">
              Failed to load blogs. Please try again later.
            </p>
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
        {blogs.length === 0 ? (
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
            <ul className="space-y-6">
              {blogs.map((blog) => (
                <li key={blog.id} className="group">
                  <article className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="p-8">
                      <Link href={`/blogs/${blog.slug}`}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors duration-300">
                          {blog.title}
                        </h2>
                      </Link>

                      <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                        {blog.content.substring(0, 150)}...
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <FaUser className="text-primary" size={14} />
                            <span>{blog.author.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaCalendar className="text-secondary" size={14} />
                            <time dateTime={blog.createdAt}>
                              {new Date(blog.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </time>
                          </div>
                        </div>

                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
