// src/app/dashboard/blogs/page.tsx
import { DeleteButton } from "@/components/modules/Blogs/DeleteButton";
import { TogglePublishButton } from "@/components/modules/Blogs/TogglePublishButton";
import { cookies } from "next/headers";
import Link from "next/link";
// import { DeleteButton } from "./DeleteButton";
// import { TogglePublishButton } from "./TogglePublishButton";

export default async function DashboardBlogsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <section className="p-6">
        <p className="text-red-600 font-medium">
          You are not authorized. Please log in.
        </p>
      </section>
    );
  }

  const res = await fetch("http://localhost:5000/api/blogs/admin/all", {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <section className="p-6">
        <p className="text-red-600 font-medium">
          Failed to fetch blogs ({res.status}) – Not authorized
        </p>
      </section>
    );
  }

  const blogsData = await res.json();
  const blogs = blogsData.data || [];

  return (
    <section className="py-12 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-gray-600 mt-1">Manage your blog posts</p>
            <p className="text-sm text-gray-500 mt-2">
              Total: {blogs.length} blog{blogs.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/dashboard/blogs/new"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            + New Blog
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Created
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {blogs.map((blog: any) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{blog.title}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        /{blog.slug}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {blog.author?.name}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {blog.published ? (
                      <span className="px-2 py-1 rounded bg-green-100 text-green-800 font-medium">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-medium">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/dashboard/blogs/${blog.slug}`}
                        className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/blogs/${blog.slug}/edit`}
                        className="px-3 py-1 text-sm text-green-600 border border-green-600 rounded hover:bg-green-50"
                      >
                        Edit
                      </Link>
                      <DeleteButton blogId={blog.id} token={token} />
                      <TogglePublishButton
                        blogId={blog.id}
                        token={token}
                        isPublished={blog.published}
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {blogs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-12 h-12 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        No blogs yet
                      </p>
                      <p className="text-gray-500 mb-4">
                        Get started by creating your first blog post.
                      </p>
                      <Link
                        href="/dashboard/blogs/new"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
                      >
                        Create Your First Blog
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
