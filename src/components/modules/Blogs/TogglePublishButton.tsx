// src/app/dashboard/blogs/TogglePublishButton.tsx
"use client";

import Swal from "sweetalert2";

interface TogglePublishButtonProps {
  blogId: string;
  token: string;
  isPublished: boolean;
}

export function TogglePublishButton({
  blogId,
  token,
  isPublished,
}: TogglePublishButtonProps) {
  const handleTogglePublish = async () => {
    const action = isPublished ? "unpublish" : "publish";
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${action} this blog?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogId}/publish`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Cookie: `token=${token}`,
            },
            credentials: "include",
            body: JSON.stringify({
              published: !isPublished,
            }),
          }
        );

        if (response.ok) {
          await Swal.fire({
            title: "Success!",
            text: `Blog ${action}ed successfully.`,
            icon: "success",
          });
          // Refresh the page
          window.location.reload();
        } else {
          const error = await response.json();
          await Swal.fire({
            title: "Error!",
            text: error.message || `Failed to ${action} blog`,
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Toggle publish error:", error);
        await Swal.fire({
          title: "Error!",
          text: `Failed to ${action} blog`,
          icon: "error",
        });
      }
    }
  };

  return (
    <button
      onClick={handleTogglePublish}
      className={`px-3 py-1 text-sm border rounded ${
        isPublished
          ? "text-yellow-700 border-yellow-700 hover:bg-yellow-50"
          : "text-green-700 border-green-700 hover:bg-green-50"
      }`}
    >
      {isPublished ? "Unpublish" : "Publish"}
    </button>
  );
}
