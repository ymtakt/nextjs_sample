"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextBox from "@/components/general/FormParts/TextBox";
import DropDown from "@/components/general/FormParts/DropDown";
import {
  genderOptions,
  UserRankOptions,
  mailAllowedOptions,
} from "@/mocks/userOptions";
import { ROUTES } from "@/constants/routes";

export type UserSearchParams = {
  id: string;
  nameKanji: string;
  nameKana: string;
  gender: string;
  membership: string;
  appId: string;
  referralCode: string;
  mailAllowed: string;
};

type Props = {
  onSearch: (params: UserSearchParams) => void;
  onReset: () => void;
};

export default function UserSearchForm({ onSearch, onReset }: Props) {
  const [form, setForm] = useState<UserSearchParams>({
    id: "",
    nameKanji: "",
    nameKana: "",
    gender: "",
    membership: "",
    appId: "",
    referralCode: "",
    mailAllowed: "",
  });

  const handleChange = (key: keyof UserSearchParams, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const router = useRouter();

  const handleSearch = () => {
    const query = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });

    router.push(`/${ROUTES.USER_MANAGEMENT}?${query.toString()}`);
    onSearch(form);
  };

  const handleReset = () => {
    setForm({
      id: "",
      nameKanji: "",
      nameKana: "",
      gender: "",
      membership: "",
      appId: "",
      referralCode: "",
      mailAllowed: "",
    });
    onReset();
  };

  return (
    <div className="p-5 overflow-x-scroll bg-cp-white text-sm">
      <div className="w-full min-w-[1160px] rounded ">
        <div className="p-4 grid grid-cols-5 gap-4">
          <div>
            <TextBox
              label="ミラレルID"
              placeholder=""
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              value={form.id}
              onChange={(e) => handleChange("id", e.target.value)}
              size="small"
            />
          </div>
          <div>
            <TextBox
              label="氏名漢字"
              placeholder=""
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              value={form.nameKanji}
              onChange={(e) => handleChange("nameKanji", e.target.value)}
              size="small"
            />
          </div>
          <div>
            <TextBox
              label="氏名かな"
              placeholder=""
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              value={form.nameKana}
              onChange={(e) => handleChange("nameKana", e.target.value)}
              size="small"
            />
          </div>
          <div>
            <DropDown
              label="性別"
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              options={genderOptions}
              value={form.gender}
              size={"small"}
              isRounded={false}
              onChange={(value) => handleChange("gender", value)}
            />
          </div>
          <div>
            <DropDown
              label="会員ランク"
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              options={UserRankOptions}
              value={form.membership}
              size={"small"}
              isRounded={false}
              onChange={(value) => handleChange("membership", value)}
            />
          </div>
          <div>
            <TextBox
              label="KYB-ID"
              placeholder=""
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              value={form.appId}
              onChange={(e) => handleChange("appId", e.target.value)}
              size="small"
            />
          </div>
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
            <DropDown
              label="メルマガ配信許可"
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              options={mailAllowedOptions}
              value={form.mailAllowed}
              size={"small"}
              isRounded={false}
              onChange={(value) => handleChange("mailAllowed", value)}
            />
          </div>
        </div>
        {/* --- 検索／リセット --- */}
        <div className="border-cp-soft-gray border-b mx-4" />
        <div className="py-4 flex justify-center gap-4">
          <button
            className="text-cp-sky-blue underline"
            onClick={handleReset}
            type="button"
          >
            リセット
          </button>
          <button
            className="bg-cp-sky-blue text-white px-4 py-1 rounded"
            onClick={handleSearch}
            type="button"
          >
            検索
          </button>
        </div>
      </div>
    </div>
  );
}
