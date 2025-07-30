"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextBox from "@/components/general/FormParts/TextBox";
import BaseButton from "@/components/general/Button/BaseButton";
import { ROUTES } from "@/constants/routes";

export type HealthInformationSearchParams = {
  title: string;
  registerDate: string;
  displayStartDate: string;
  displayEndDate: string;
};

type Props = {
  onSearch: (params: HealthInformationSearchParams) => void;
  onReset: () => void;
};

export default function HealthInformationSearchForm({
  onSearch,
  onReset,
}: Props) {
  const router = useRouter();
  const [form, setForm] = useState<HealthInformationSearchParams>({
    title: "",
    registerDate: "",
    displayStartDate: "",
    displayEndDate: "",
  });

  const handleChange = (
    key: keyof HealthInformationSearchParams,
    value: string
  ) => {
    setForm({ ...form, [key]: value });
  };

  const handleSearch = () => {
    const query = new URLSearchParams();
    Object.entries(form).forEach(([key, value]) => {
      if (!value) return;
      // 日付項目は `/` を `-` に置き換え処理
      if (key === "displayStartDate" || key === "displayEndDate") {
        query.append(key, value.replaceAll("/", "-"));
      } else {
        query.append(key, value);
      }
    });
    router.push(
      `/${ROUTES.NOTIFICATION_MANAGEMENT}/${
        ROUTES.HEALTH_INFORMATION
      }?${query.toString()}`
    );
    onSearch(form);
  };

  const handleReset = () => {
    setForm({
      title: "",
      registerDate: "",
      displayStartDate: "",
      displayEndDate: "",
    });
    router.push(
      `/${ROUTES.NOTIFICATION_MANAGEMENT}/${ROUTES.HEALTH_INFORMATION}`
    );
    onReset();
  };

  return (
    <div className="">
      <div className="p-5 bg-cp-white text-sm">
        <div className="w-full rounded ">
          <div className="p-4 flex gap-10">
            <div>
              <TextBox
                label="タイトル"
                placeholder=""
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                size="manual"
                manualSize="h-7.5 w-[415px]"
              />
            </div>
            <div className="flex">
              <TextBox
                label="表示期間（開始）"
                placeholder="0000/00"
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                value={form.displayStartDate}
                onChange={(e) =>
                  handleChange("displayStartDate", e.target.value)
                }
                size="small"
              />
              <div className="flex flex-col justify-end pb-1 px-2">
                <p className="text-black text-cp-large">〜</p>
              </div>
              <TextBox
                label="表示期間（終了）"
                placeholder="0000/00"
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                value={form.displayEndDate}
                onChange={(e) => handleChange("displayEndDate", e.target.value)}
                size="small"
              />
            </div>
          </div>
          {/* --- 検索／リセット --- */}
          <div className="border-cp-soft-gray border-b mx-4" />
          <div className="pt-5 flex justify-center gap-4">
            <button
              className="text-cp-sky-blue underline"
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
