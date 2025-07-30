"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import BaseButton from "@/components/general/Button/BaseButton";
import {
  Consultation,
  mockConsultationReservations,
} from "@/mocks/consultations";
import dayjs from "dayjs";
import ConsultationSearchForm, {
  ConsultationSearchParams,
} from "@/features/consultation-reservation/components/ConsultationSearch";
import ConsultationTable from "@/features/consultation-reservation/components/ConsultationTable";

export default function ConsultationManagement() {
  const router = useRouter();
  const [filteredConsultations, setFilteredConsultations] = useState<
    Consultation[]
  >(mockConsultationReservations);

  const handleSearch = (params: ConsultationSearchParams) => {
    const filtered = mockConsultationReservations.filter((consultation) => {
      const reservationDate = dayjs(consultation.reservationDate);
      // 開始日チェック
      if (params.reservationStartDate) {
        const startDate = dayjs(params.reservationStartDate);
        if (reservationDate.isBefore(startDate, "day")) return false;
      }
      // 終了日チェック
      if (params.reservationEndDate) {
        const endDate = dayjs(params.reservationEndDate);
        if (reservationDate.isAfter(endDate, "day")) return false;
      }
      // 他の項目は部分一致で検索
      return Object.entries(params).every(([key, value]) => {
        if (!value) return true;
        if (key === "reservationStartDate" || key === "reservationEndDate")
          return true;
        const consultationValue =
          consultation[key as keyof typeof consultation];
        return consultationValue?.toString().includes(value.toString());
      });
    });
    setFilteredConsultations(filtered);
  };

  const handleReset = () => {
    setFilteredConsultations(mockConsultationReservations);
  };

  const csvUpload = () => {
    // TODO: 新規作成処理を書く
    console.log("アカウントの新規作成");
    router.push(`/${ROUTES.CONSULTATION_RESERVATION}`);
  };

  return (
    <div className="">
      <div className="px-5 flex justify-between">
        <p className="flex items-center title-cp-medium text-cp-slate-gray">
          相談予約管理
        </p>
        <div className="py-2.5">
          <BaseButton
            onClick={csvUpload}
            text={"CSVアップロード"}
            color={"cp-white"}
            size={"medium"}
          />
        </div>
      </div>
      <div className="px-5">
        <ConsultationSearchForm onSearch={handleSearch} onReset={handleReset} />
      </div>

      {/* 件数表示 */}
      <div className="body-cp-small text-cp-slate-gray text-left pl-5 pt-5 pb-2">
        合計 {filteredConsultations.length}件
      </div>
      <div className="px-5 ">
        <ConsultationTable consultations={filteredConsultations} />
      </div>
    </div>
  );
}
