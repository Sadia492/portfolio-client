// src/app/dashboard/blogs/DeleteButton.tsx
"use client";

import Swal from "sweetalert2";

interface DeleteButtonProps {
  blogId: string;
  token: string;
}

export function DeleteButton({ blogId, token }: DeleteButtonProps) {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogId}`,
          {
            method: "DELETE",
            headers: {
              Cookie: `token=${token}`,
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          await Swal.fire({
            title: "Deleted!",
            text: "Your blog has been deleted.",
            icon: "success",
          });
          // Refresh the page
          window.location.reload();
        } else {
          const error = await response.json();
          await Swal.fire({
            title: "Error!",
            text: error.message || "Failed to delete blog",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Delete error:", error);
        await Swal.fire({
          title: "Error!",
          text: "Failed to delete blog",
          icon: "error",
        });
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
    >
      Delete
    </button>
  );
}
