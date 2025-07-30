"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DropDown from "@/components/general/FormParts/DropDown";
import BaseButton from "@/components/general/Button/BaseButton";
import { ROUTES } from "@/constants/routes";
import { PublishSettingOptions } from "@/features/inspection-management/inspections-setting/mocks/inspectionSettingOptions";

export type InspectionSettingSearchParams = {
  id: string;
  publishSetting: string;
};

type Props = {
  onSearch: (params: InspectionSettingSearchParams) => void;
  onReset: () => void;
};

export default function InspectionSettingSearchForm({
  onSearch,
  onReset,
}: Props) {
  const router = useRouter();
  const [form, setForm] = useState<InspectionSettingSearchParams>({
    id: "",
    publishSetting: "",
  });

  const handleChange = (
    key: keyof InspectionSettingSearchParams,
    value: string
  ) => {
    setForm({ ...form, [key]: value });
  };

  const handleSearch = () => {
    const query = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });
    router.push(
      `/${ROUTES.INSPECTION_MANAGEMENT}/${
        ROUTES.INSPECTION_SETTING
      }?${query.toString()}`
    );
    onSearch(form);
  };

  const handleReset = () => {
    setForm({
      id: "",
      publishSetting: "",
    });
    router.push(
      `/${ROUTES.INSPECTION_MANAGEMENT}/${ROUTES.INSPECTION_SETTING}`
    );
    onReset();
  };

  return (
    <div className="p-5 overflow-x-scroll bg-cp-white text-sm rounded">
      <div className="w-full min-w-[500px] rounded ">
        <div className="p-4 grid grid-cols-4 gap-10">
          <div>
            <DropDown
              label="公開設定"
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              options={PublishSettingOptions}
              value={form.publishSetting}
              size={"small"}
              isRounded={false}
              onChange={(value) => handleChange("publishSetting", value)}
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
  );
}
