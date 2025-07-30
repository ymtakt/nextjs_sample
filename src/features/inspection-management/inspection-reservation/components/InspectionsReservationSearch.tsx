"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextBox from "@/components/general/FormParts/TextBox";
import DropDown from "@/components/general/FormParts/DropDown";
import BaseButton from "@/components/general/Button/BaseButton";
import { ROUTES } from "@/constants/routes";
import {
  InspectionItemOptions,
  InspectionReservationStatusOptions,
} from "@/features/inspection-management/inspection-reservation/mocks/inspectionReservationOptions";

export type InspectionReservationSearchParams = {
  reservationId: string;
  inspectionStartDate: string;
  inspectionEndDate: string;
  mirallelId: string;
  reservationName: string;
  inspectionItem: string;
  referralCode: string;
  reservationStatus: string;
};

type Props = {
  onSearch: (params: InspectionReservationSearchParams) => void;
  onReset: () => void;
};

export default function InspectionReservationSearchForm({
  onSearch,
  onReset,
}: Props) {
  const router = useRouter();
  const [form, setForm] = useState<InspectionReservationSearchParams>({
    reservationId: "",
    inspectionStartDate: "",
    inspectionEndDate: "",
    mirallelId: "",
    reservationName: "",
    inspectionItem: "",
    referralCode: "",
    reservationStatus: "",
  });

  const handleChange = (
    key: keyof InspectionReservationSearchParams,
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
      `/${ROUTES.INSPECTION_MANAGEMENT}/${ROUTES.INSPECTION_RESERVATIONS}
        ?${query.toString()}`
    );
    onSearch(form);
  };

  const handleReset = () => {
    setForm({
      reservationId: "",
      inspectionStartDate: "",
      inspectionEndDate: "",
      mirallelId: "",
      reservationName: "",
      inspectionItem: "",
      referralCode: "",
      reservationStatus: "",
    });
    router.push(
      `/${ROUTES.INSPECTION_MANAGEMENT}/${ROUTES.INSPECTION_RESERVATIONS}`
    );
    onReset();
  };

  return (
    <div className="p-5 overflow-x-scroll bg-cp-white text-sm rounded">
      <div className="w-full min-w-[1000px] rounded ">
        <div className="p-4 grid grid-cols-4 gap-10">
          <div>
            <TextBox
              label="予約番号"
              placeholder=""
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              value={form.reservationId}
              onChange={(e) => handleChange("reservationId", e.target.value)}
              size="small"
            />
          </div>
          <div className="flex">
            <TextBox
              label="検査日（開始）"
              placeholder="0000/00"
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              value={form.inspectionStartDate}
              onChange={(e) =>
                handleChange("inspectionStartDate", e.target.value)
              }
              size="small"
            />
            <div className="flex flex-col justify-end pb-1 px-2">
              <p className="text-black text-cp-large">〜</p>
            </div>
            <TextBox
              label="検査日（終了）"
              placeholder="0000/00"
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              value={form.inspectionEndDate}
              onChange={(e) =>
                handleChange("inspectionEndDate", e.target.value)
              }
              size="small"
            />
          </div>
          {/* 検査項目の終了日分のグリッド */}
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
          </div>
          <div>
            <DropDown
              label="検査項目"
              labelColor="text-cp-black"
              bgColor="bg-cp-ghost-white"
              options={InspectionItemOptions}
              value={form.inspectionItem}
              size={"small"}
              isRounded={false}
              onChange={(value) => handleChange("inspectionItem", value)}
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
              options={InspectionReservationStatusOptions}
              value={form.reservationStatus}
              size={"small"}
              isRounded={false}
              onChange={(value) => handleChange("reservationStatus", value)}
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
