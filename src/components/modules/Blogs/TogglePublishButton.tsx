// src/app/dashboard/blogs/TogglePublishButton.tsx
"use client";

import Swal from "sweetalert2";

interface TogglePublishButtonProps {
  blogId: string;
  isPublished: boolean;
  // Remove token from props
}

export function TogglePublishButton({
  blogId,
  isPublished,
}: TogglePublishButtonProps) {
  const handleToggle = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogId}/publish`,
        {
          method: "PATCH",
          credentials: "include", // ✅ Browser sends cookies automatically
        }
      );

      if (response.ok) {
        const result = await response.json();
        await Swal.fire({
          title: "Success!",
          text:
            result.message ||
            `Blog ${isPublished ? "unpublished" : "published"} successfully`,
          icon: "success",
        });
        window.location.reload();
      } else {
        const error = await response.json();
        await Swal.fire({
          title: "Error!",
          text: error.message || "Failed to update blog status",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Toggle publish error:", error);
      await Swal.fire({
        title: "Error!",
        text: "Failed to update blog status",
        icon: "error",
      });
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-3 py-1 text-sm border rounded ${
        isPublished
          ? "text-orange-600 border-orange-600 hover:bg-orange-50"
          : "text-green-600 border-green-600 hover:bg-green-50"
      }`}
    >
      {isPublished ? "Unpublish" : "Publish"}
    </button>
  );
}
