// src/components/modules/Projects/DeleteButton.tsx
"use client";

import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

interface DeleteButtonProps {
  projectId: string;
  // Remove token prop completely
}

export function DeleteButton({ projectId }: DeleteButtonProps) {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This project will be permanently deleted!",
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}`,
          {
            method: "DELETE",
            credentials: "include", // ✅ Browser sends cookies automatically
            // Remove all headers - no manual token needed
          }
        );

        if (response.ok) {
          await Swal.fire({
            title: "Deleted!",
            text: "Your project has been deleted.",
            icon: "success",
          });
          window.location.reload();
        } else {
          const error = await response.json();
          await Swal.fire({
            title: "Error!",
            text: error.message || "Failed to delete project",
            icon: "error",
          });
        }
      } catch (err) {
        console.error("Delete error:", err);
        await Swal.fire({
          title: "Error!",
          text: "Failed to delete project",
          icon: "error",
        });
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-gray-100 rounded-lg hover:bg-red-50"
      title="Delete Project"
    >
      <FaTrashAlt size={14} />
    </button>
  );
}
