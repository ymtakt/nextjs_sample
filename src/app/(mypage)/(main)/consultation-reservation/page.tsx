"use client";

// ネイティブライブラリ
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// 外部ライブラリ
import dayjs from "dayjs";
// 共通コンポーネント
import { ROUTES } from "@/constants/routes";
import BaseButton from "@/components/general/Button/BaseButton";
// featureコンポーネント
import {
  Consultation,
  mockConsultationReservations,
} from "@/features/consultation-reservation/mocks/consultations";
import ConsultationSearchForm, {
  ConsultationSearchParams,
} from "@/features/consultation-reservation/components/ConsultationSearch";
import ConsultationTable from "@/features/consultation-reservation/components/ConsultationTable";

export default function ConsultationManagement() {
  // インスタンス化
  const router = useRouter();
  const searchParams = useSearchParams();

  // フィルターしたテーブル要素のステート
  const [filteredTableItems, setFilteredTableItems] = useState<Consultation[]>(
    mockConsultationReservations
  );

  // 検索時の処理
  const handleSearch = useCallback((params: ConsultationSearchParams) => {
    const filtered = mockConsultationReservations.filter((item) => {
      const CheckDate = dayjs(item.reservationDate);
      // 開始日チェック
      if (params.reservationStartDate) {
        const startDate = dayjs(params.reservationStartDate);
        if (CheckDate.isBefore(startDate, "day")) return false;
      }
      // 終了日チェック
      if (params.reservationEndDate) {
        const endDate = dayjs(params.reservationEndDate);
        if (CheckDate.isAfter(endDate, "day")) return false;
      }
      // 他の項目は部分一致で検索
      return Object.entries(params).every(([key, value]) => {
        if (!value) return true;
        if (key === "reservationStartDate" || key === "reservationEndDate")
          return true;
        const itemValue = item[key as keyof typeof item];
        return itemValue?.toString().includes(value.toString());
      });
    });
    setFilteredTableItems(filtered);
  }, []);

  // リセット時の処理
  const handleReset = () => {
    setFilteredTableItems(mockConsultationReservations);
  };

  // URLの操作でも検索を反映させる
  useEffect(() => {
    const queryParams: ConsultationSearchParams = {
      reservationStartDate: searchParams.get("reservationStartDate") || "",
      reservationEndDate: searchParams.get("reservationEndDate") || "",
      reservationName: searchParams.get("reservationName") || "",
      mirallelId: searchParams.get("mirallelId") || "",
      staffAssigned: searchParams.get("staffAssigned") || "",
      consultationType: searchParams.get("consultationType") || "",
      referralCode: searchParams.get("referralCode") || "",
      reservationStatus: searchParams.get("reservationStatus") || "",
    };
    handleSearch(queryParams);
  }, [handleSearch, searchParams]);

  // TODO: CSVアップロード処理を書く
  const csvUpload = () => {
    console.log("CSVアップロード処理");
    router.push(`${ROUTES.CONSULTATION_RESERVATION}`);
  };

  return (
    <div>
      {/* タイトル */}
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

      {/* 検索フォーム */}
      <div className="px-5">
        <ConsultationSearchForm onSearch={handleSearch} onReset={handleReset} />
      </div>

      {/* 件数表示 */}
      <div className="body-cp-small text-cp-slate-gray text-left pl-5 pt-5 pb-2">
        合計 {filteredTableItems.length}件
      </div>

      {/* テーブル */}
      <div className="px-5 ">
        <ConsultationTable consultations={filteredTableItems} />
      </div>
    </div>
  );
}
