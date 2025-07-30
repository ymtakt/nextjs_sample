"use client";

import { useState } from "react";
import TextBox from "@/components/general/FormParts/TextBox";
import BaseButton from "@/components/general/Button/BaseButton";

export default function VideoAddKeyword() {
  const [value, setValue] = useState("");

  const addItem = () => {
    // TODO: キーワード追加処理を書く
    console.log("キーワードの新規追加:", value);
  };

  return (
    <div className="px-5 pb-5">
      <div className="p-5 overflow-x-scroll bg-cp-white text-sm rounded">
        <div className="w-full min-w-[600px]">
          <div className="flex items-end gap-4">
            <div className="pb-1">
              <TextBox
                label="キーワード"
                placeholder=""
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="manual"
                manualSize="w-[415px] h-7.5"
              />
            </div>
            <div className="">
              <BaseButton
                onClick={addItem}
                text={"追加"}
                color={"cp-sky-blue"}
                size={"small"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
