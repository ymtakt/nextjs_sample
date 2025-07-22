"use client";

import { useState } from "react";
import DropDown from "@/components/general/FormParts/DropDown";

export default function Home() {
  const [category, setCategory] = useState("");
  const options = [
    { label: "メディカルレポート", value: "medical_report" },
    { label: "栄養レポート", value: "nutrition_report" },
    { label: "食事レポート", value: "diet_report" },
    { label: "病態健康相談レポート", value: "consultation_report" },
    { label: "短鎖脂肪酸検査結果", value: "short_chain_fatty_acids" },
    { label: "リーキーガット検査結果", value: "leaky_gut_result" },
    { label: "その他", value: "other" },
  ];

  return (
    <div className="ml-5 my-6 text-black">
      <h2 className="text-xl font-bold mb-4">📌 ドロップダウン テスト</h2>

      <div className="flex flex-col space-y-4">
        <DropDown
          label="ドロップダウン S"
          options={options}
          value={category}
          size={"small"}
          isRounded={false}
          onChange={(val) => setCategory(val)}
        />
        <DropDown
          label="ドロップダウン S"
          options={options}
          value={category}
          bgColor="bg-cp-slate-gray"
          size={"small"}
          isRounded={false}
          onChange={(val) => setCategory(val)}
        />
        <DropDown
          label="ドロップダウン S 角丸"
          options={options}
          value={category}
          size={"small"}
          onChange={(val) => setCategory(val)}
        />
        <DropDown
          label="ドロップダウン M"
          options={options}
          value={category}
          size={"medium"}
          isRounded={false}
          onChange={(val) => setCategory(val)}
        />
        <DropDown
          label="ドロップダウン M 角丸"
          options={options}
          value={category}
          size={"medium"}
          onChange={(val) => setCategory(val)}
        />
      </div>
    </div>
  );
}
