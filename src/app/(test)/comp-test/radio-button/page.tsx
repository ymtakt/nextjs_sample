"use client";

import { useState, useEffect } from "react";
import RadioButton from "@/components/general/FormParts/RadioButton";

export default function Home() {
  const [form, setForm] = useState({
    targetAudience: "",
    userId: "",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    if (key === "userId") {
      setForm((prev) => ({
        ...prev,
        userId: value,
        targetAudience: "user",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [key]: value,
        ...(key === "targetAudience" && value !== "user" ? { userId: "" } : {}),
      }));
    }
  };

  // 状態の変更を監視してログ出力
  useEffect(() => {
    console.log("現在のformの状態:", form);
  }, [form]);

  return (
    <div className="ml-5 mt-5">
      <p className="text-black font-bold mb-4">ラジオボタンの確認</p>
      <div className="flex flex-col space-y-4">
        <RadioButton
          label={`配信対象者: ${form.targetAudience} ${
            form.userId ? `(${form.userId})` : ""
          }`}
          options={[
            { label: "全員", value: "all" },
            { label: "有料会員", value: "paid" },
            { label: "無料会員", value: "free" },
            {
              label: "ユーザーID",
              value: "user",
              isInput: true,
              inputPlaceholder: "ユーザーIDを入力",
            },
          ]}
          value={form.targetAudience}
          inputValue={form.userId}
          onChange={(value) => handleChange("targetAudience", value)}
          onInputChange={(value) => handleChange("userId", value)}
        />
      </div>
    </div>
  );
}
