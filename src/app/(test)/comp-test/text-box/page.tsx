"use client";

import { useState } from "react";
import TextBox from "@/components/general/FormParts/TextBox";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="ml-5 my-6 text-black">
      <h2 className="text-xl font-bold mb-4">📌 テキストボックス テスト</h2>

      <div className="flex flex-col space-y-4">
        <TextBox
          label="テキストボックス S"
          placeholder="テキスト"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size="small"
        />
        <TextBox
          label="テキストボックス S"
          placeholder="テキスト"
          bgColor="bg-cp-ghost-white"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size="small"
        />
        <TextBox
          label="テキストボックス M"
          placeholder="テキスト"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size="medium"
        />
        <TextBox
          label="パスワードボックス M"
          placeholder="パスワードを入力してください"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size="medium"
          type="password"
        />
        <TextBox
          label="テキストボックス L"
          placeholder="テキスト"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size="large"
        />
        <TextBox
          label="バリデーションサンプル S"
          placeholder="テキスト"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size="small"
          error="バリデーション文言"
        />
      </div>
    </div>
  );
}
