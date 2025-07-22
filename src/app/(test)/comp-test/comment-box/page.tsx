"use client";

import { useState } from "react";
import CommentBox from "@/components/general/FormParts/CommentBox";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="ml-5 my-6  space-y-2 text-black">
      <h2 className="text-xl font-bold mb-4">📌 コメントボックス テスト</h2>

      <div className="flex flex-col space-y-4">
        <CommentBox
          label="コメント"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <CommentBox
        label="コメント 文字数表示付き"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        isMaxLength={true}
        maxLength={300}
      />
    </div>
  );
}
