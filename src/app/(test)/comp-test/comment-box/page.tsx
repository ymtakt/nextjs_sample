"use client";

import { useState } from "react";
import CommentBox from "@/components/general/FormParts/CommentBox";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="ml-5 my-6 text-black">
      <h2 className="text-xl font-bold mb-4">📌 コメントボックス テスト</h2>

      <div className="flex flex-col space-y-4">
        <CommentBox
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
}
