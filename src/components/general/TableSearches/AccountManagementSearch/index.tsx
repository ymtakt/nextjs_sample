"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextBox from "@/components/general/FormParts/TextBox";
import DropDown from "@/components/general/FormParts/DropDown";
import BaseButton from "@/components/general/Button/BaseButton";
import { ROUTES } from "@/constants/routes";
import {
  AccountAuthorityOptions,
  AccountLicenseOptions,
} from "@/mocks/accountOptions";

export type AccountSearchParams = {
  accountId: string;
  accountName: string;
  displayName: string;
  accountAuthority: string;
  accountLicense: string;
  mail: string;
};

type Props = {
  onSearch: (params: AccountSearchParams) => void;
  onReset: () => void;
};

export default function AccountSearchForm({ onSearch, onReset }: Props) {
  const [form, setForm] = useState<AccountSearchParams>({
    accountId: "",
    accountName: "",
    displayName: "",
    accountAuthority: "",
    accountLicense: "",
    mail: "",
  });

  const handleChange = (key: keyof AccountSearchParams, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const router = useRouter();

  const handleSearch = () => {
    const query = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });

    router.push(`/${ROUTES.ACCOUNT_MANAGEMENT}?${query.toString()}`);
    onSearch(form);
  };

  const handleReset = () => {
    setForm({
      accountId: "",
      accountName: "",
      displayName: "",
      accountAuthority: "",
      accountLicense: "",
      mail: "",
    });
    onReset();
  };

  return (
    <div className="p-5 overflow-x-scroll bg-cp-white text-sm rounded">
      <div className="w-full min-w-[1160px]  ">
        <div className="p-4 grid grid-cols-5 gap-4">
          <div>
            <TextBox
              label="アカウント名"
              placeholder=""
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              value={form.accountName}
              onChange={(e) => handleChange("accountName", e.target.value)}
              size="small"
            />
          </div>
          <div>
            <DropDown
              label="アカウント権限"
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              options={AccountAuthorityOptions}
              value={form.accountAuthority}
              size={"small"}
              isRounded={false}
              onChange={(value) => handleChange("accountAuthority", value)}
            />
          </div>
          <div>
            <DropDown
              label="資格"
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              options={AccountLicenseOptions}
              value={form.accountLicense}
              size={"small"}
              isRounded={false}
              onChange={(value) => handleChange("accountLicense", value)}
            />
          </div>
        </div>
        {/* --- 検索／リセット --- */}
        <div className="border-cp-soft-gray border-b mx-4" />
        <div className="pt-4 flex justify-center gap-4">
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
  );
}
