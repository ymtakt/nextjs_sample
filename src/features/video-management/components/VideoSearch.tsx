"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextBox from "@/components/general/FormParts/TextBox";
import DropDown from "@/components/general/FormParts/DropDown";
import BaseButton from "@/components/general/Button/BaseButton";
import { ROUTES } from "@/constants/routes";
import {
  publishStatuses,
  videoCategories,
  videoKeywords,
  viewingRestrictions,
} from "@/features/video-management/mocks/videoOptions";

export type VideoSearchParams = {
  id: string;
  title: string;
  category: string;
  keyword: string;
  viewingRestriction: string;
  displayIsPublishStatus: string;
};

type Props = {
  onSearch: (params: VideoSearchParams) => void;
  onReset: () => void;
};

export default function VideoSearchForm({ onSearch, onReset }: Props) {
  const [form, setForm] = useState<VideoSearchParams>({
    id: "",
    title: "",
    category: "",
    keyword: "",
    viewingRestriction: "",
    displayIsPublishStatus: "",
  });

  const handleChange = (key: keyof VideoSearchParams, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const router = useRouter();

  const handleSearch = () => {
    const query = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });

    router.push(`/${ROUTES.VIDEO_MANAGEMENT}?${query.toString()}`);
    onSearch(form);
  };

  const handleReset = () => {
    setForm({
      id: "",
      title: "",
      category: "",
      keyword: "",
      viewingRestriction: "",
      displayIsPublishStatus: "",
    });
    onReset();
  };

  return (
    <div className="px-5 pb-5">
      <div className="p-5 overflow-x-scroll bg-cp-white text-sm rounded">
        <div className="w-full min-w-[1160px] ">
          <div className="p-4 grid grid-cols-5 gap-4">
            <div>
              <TextBox
                label="タイトル"
                placeholder=""
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                size="small"
              />
            </div>
            <div>
              <DropDown
                label="カテゴリ"
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                options={videoCategories}
                value={form.category}
                size={"small"}
                isRounded={false}
                onChange={(value) => handleChange("category", value)}
              />
            </div>
            <div>
              <DropDown
                label="キーワード"
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                options={videoKeywords}
                value={form.keyword}
                size={"small"}
                isRounded={false}
                onChange={(value) => handleChange("keyword", value)}
              />
            </div>
            <div>
              <DropDown
                label="公開範囲"
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                options={viewingRestrictions}
                value={form.viewingRestriction}
                size={"small"}
                isRounded={false}
                onChange={(value) => handleChange("viewingRestriction", value)}
              />
            </div>
            <div>
              <DropDown
                label="公開ステータス"
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                options={publishStatuses}
                value={form.displayIsPublishStatus}
                size={"small"}
                isRounded={false}
                onChange={(value) =>
                  handleChange("displayIsPublishStatus", value)
                }
              />
            </div>
          </div>
          {/* --- 検索／リセット --- */}
          <div className="border-cp-soft-gray border-b mx-4" />
          <div className="pt-5 flex justify-center gap-4">
            <button
              className="text-cp-sky-blue underline cursor-pointer"
              onClick={handleReset}
              type="button"
            >
              リセット
            </button>
            <div>
              <BaseButton
                onClick={handleSearch}
                text={"検索"}
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
