"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextBox from "@/components/general/FormParts/TextBox";
import DropDown from "@/components/general/FormParts/DropDown";
import BaseButton from "@/components/general/Button/BaseButton";
import { ROUTES } from "@/constants/routes";
import { supplementBrands } from "@/features/supplement-management/mocks/supplementOptions";

export type SupplementSearchParams = {
  id: string;
  registerDate: string;
  supplementName: string;
  supplementBrand: string;
};

type Props = {
  onSearch: (params: SupplementSearchParams) => void;
  onReset: () => void;
};

export default function SupplementSearchForm({ onSearch, onReset }: Props) {
  const [form, setForm] = useState<SupplementSearchParams>({
    id: "",
    registerDate: "",
    supplementName: "",
    supplementBrand: "",
  });

  const handleChange = (key: keyof SupplementSearchParams, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const router = useRouter();

  const handleSearch = () => {
    const query = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });

    router.push(`/${ROUTES.SUPPLEMENT_MANAGEMENT}?${query.toString()}`);
    onSearch(form);
  };

  const handleReset = () => {
    setForm({
      id: "",
      registerDate: "",
      supplementName: "",
      supplementBrand: "",
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
                label="サプリメント名"
                placeholder=""
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                value={form.supplementName}
                onChange={(e) => handleChange("supplementName", e.target.value)}
                size="small"
              />
            </div>

            <div>
              <DropDown
                label="ブランド名"
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                options={supplementBrands}
                value={form.supplementBrand}
                size={"small"}
                isRounded={false}
                onChange={(value) => handleChange("supplementBrand", value)}
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
