"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextBox from "@/components/general/FormParts/TextBox";
import DropDown from "@/components/general/FormParts/DropDown";
import BaseButton from "@/components/general/Button/BaseButton";
import { ROUTES } from "@/constants/routes";
import {
  ConsultationStatusOptions,
  ConsultationTypeOptions,
} from "@/features/consultation-reservation/mocks/consultationOptions";

export type ConsultationSearchParams = {
  reservationStartDate: string;
  reservationEndDate: string;
  reservationName: string;
  mirallelId: string;
  staffAssigned: string;
  consultationType: string;
  referralCode: string;
  reservationStatus: string;
};

type Props = {
  onSearch: (params: ConsultationSearchParams) => void;
  onReset: () => void;
};

export default function ConsultationSearchForm({ onSearch, onReset }: Props) {
  const [form, setForm] = useState<ConsultationSearchParams>({
    reservationStartDate: "",
    reservationEndDate: "",
    reservationName: "",
    mirallelId: "",
    staffAssigned: "",
    consultationType: "",
    referralCode: "",
    reservationStatus: "",
  });

  const handleChange = (key: keyof ConsultationSearchParams, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const router = useRouter();

  const handleSearch = () => {
    const query = new URLSearchParams();
    Object.entries(form).forEach(([key, value]) => {
      if (!value) return;
      // 日付項目は `/` を `-` に置き換え処理
      if (key === "reservationStartDate" || key === "reservationEndDate") {
        query.append(key, value.replaceAll("/", "-"));
      } else {
        query.append(key, value);
      }
    });

    router.push(`${ROUTES.CONSULTATION_RESERVATION}?${query.toString()}`);
    onSearch(form);
  };

  const handleReset = () => {
    setForm({
      reservationStartDate: "",
      reservationEndDate: "",
      reservationName: "",
      mirallelId: "",
      staffAssigned: "",
      consultationType: "",
      referralCode: "",
      reservationStatus: "",
    });
    onReset();
  };

  return (
    <div className="p-5 overflow-x-scroll bg-cp-white text-sm rounded">
      <div className="w-full min-w-[1160px]  ">
        <div className="p-4 grid grid-cols-4 gap-4">
          <div className="flex">
            <TextBox
              label="予約日（開始）"
              placeholder="0000/00"
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              value={form.reservationStartDate}
              onChange={(e) =>
                handleChange("reservationStartDate", e.target.value)
              }
              size="small"
            />
            <div className="flex flex-col justify-end pb-1 px-2">
              <p className="text-black text-cp-large">〜</p>
            </div>
            <TextBox
              label="予約日（終了）"
              placeholder="0000/00"
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              value={form.reservationEndDate}
              onChange={(e) =>
                handleChange("reservationEndDate", e.target.value)
              }
              size="small"
            />
          </div>
          <div></div>
          <div>
            <TextBox
              label="ミラレルID"
              placeholder=""
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              value={form.mirallelId}
              onChange={(e) => handleChange("mirallelId", e.target.value)}
              size="small"
            />
          </div>
          <div>
            <TextBox
              label="予約者名"
              placeholder=""
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              value={form.reservationName}
              onChange={(e) => handleChange("reservationName", e.target.value)}
              size="small"
            />
          </div>{" "}
          <div>
            <TextBox
              label="担当者名"
              placeholder=""
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              value={form.staffAssigned}
              onChange={(e) => handleChange("staffAssigned", e.target.value)}
              size="small"
            />
          </div>
          <div>
            <DropDown
              label="相談種類"
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              options={ConsultationTypeOptions}
              value={form.consultationType}
              size={"small"}
              isRounded={false}
              onChange={(value) => handleChange("consultationType", value)}
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
              label="予約ステータス"
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              options={ConsultationStatusOptions}
              value={form.reservationStatus}
              size={"small"}
              isRounded={false}
              onChange={(value) => handleChange("reservationStatus", value)}
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
