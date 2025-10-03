import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  author: {
    name: string;
    email: string;
  };
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function BlogViewPage({ params }: PageProps) {
  const { id } = params;
  console.log(id);
  // Fetch single blog from API
  const res = await fetch(`http://localhost:5000/api/blogs/by-id/${id}`, {
    cache: "no-store",
  });
  //   console.log(res);

  if (!res.ok) {
    return (
      <section className="p-6">
        <p className="text-red-600 font-medium">
          Failed to load blog ({res.status})
        </p>
      </section>
    );
  }

  const data = await res.json();
  console.log(data);
  const blog: Blog = data.data;

  if (!blog) {
    return (
      <section className="p-6">
        <p className="text-gray-500">Blog not found.</p>
      </section>
    );
  }

  return (
    <section className="py-12 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="text-sm text-gray-500 mb-6">
          <span>By {blog.author?.name}</span> |{" "}
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span> |{" "}
          <span>{blog.published ? "Published" : "Draft"}</span>
        </div>
        <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>
        <div className="mt-6">
          <Link
            href="/dashboard/blogs"
            className="text-blue-600 hover:underline"
          >
            ← Back to Blog Management
          </Link>
        </div>
      </div>
    </section>
  );
}
