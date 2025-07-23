"use client";

import Pagination from "@/components/general/Pagination";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <div className="ml-5 mt-6 text-black">
      <h2 className="text-xl font-bold mb-4">📌 ページネーションの確認</h2>

      <div className="flex flex-col space-y-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
