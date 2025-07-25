"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextBox from "@/components/general/FormParts/TextBox";
import DropDown from "@/components/general/FormParts/DropDown";
import BaseButton from "@/components/general/Button/BaseButton";
import { referralCodeSections } from "@/mocks/referralCodeSections";

import { ROUTES } from "@/constants/routes";

export type ReferralCodeSearchParams = {
  id: string;
  referralCode: string;
  referredName: string;
  section: string;
};

type Props = {
  onSearch: (params: ReferralCodeSearchParams) => void;
  onReset: () => void;
};

export default function ReferralCodeSearchForm({ onSearch, onReset }: Props) {
  const [form, setForm] = useState<ReferralCodeSearchParams>({
    id: "",
    referralCode: "",
    referredName: "",
    section: "",
  });

  const handleChange = (key: keyof ReferralCodeSearchParams, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const router = useRouter();

  const handleSearch = () => {
    const query = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });

    router.push(`/${ROUTES.REFERRAL_CODE_MANAGEMENT}?${query.toString()}`);
    onSearch(form);
  };

  const handleReset = () => {
    setForm({
      id: "",
      referralCode: "",
      referredName: "",
      section: "",
    });
    onReset();
  };

  return (
    <div className="px-5 pb-5">
      <div className="p-5 overflow-x-scroll bg-cp-white text-sm">
        <div className="w-full min-w-[1160px] rounded ">
          <div className="p-4 grid grid-cols-5 gap-4">
            <div>
              <TextBox
                label="紹介コード"
                placeholder=""
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                value={form.referralCode}
                onChange={(e) => handleChange("referralCode", e.target.value)}
                size="small"
              />
            </div>
            <div>
              <TextBox
                label="紹介者名"
                placeholder=""
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                value={form.referredName}
                onChange={(e) => handleChange("referredName", e.target.value)}
                size="small"
              />
            </div>

            <div>
              <DropDown
                label="区分"
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                options={referralCodeSections}
                value={form.section}
                size={"small"}
                isRounded={false}
                onChange={(value) => handleChange("section", value)}
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
