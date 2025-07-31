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
  InspectionReservation,
  mockInspectionReservations,
} from "@/features/inspection-management/inspection-reservation/mocks/inspectionReservation";
import InspectionReservationSearchForm, {
  InspectionReservationSearchParams,
} from "@/features/inspection-management/inspection-reservation/components/InspectionsReservationSearch";
import InspectionReservationTable from "@/features/inspection-management/inspection-reservation/components/InspectionsReservationTable";

export default function InspectionReservationManagement() {
  // インスタンス化
  const router = useRouter();
  const searchParams = useSearchParams();

  // フィルターしたテーブル要素のステート
  const [filteredTableItems, setFilteredTableItems] = useState<
    InspectionReservation[]
  >(mockInspectionReservations);

  // 検索時の処理
  const handleSearch = useCallback(
    (params: InspectionReservationSearchParams) => {
      const filtered = mockInspectionReservations.filter((item) => {
        const CheckDate = dayjs(item.inspectionDate);
        // 開始日チェック
        if (params.inspectionStartDate) {
          const startDate = dayjs(params.inspectionStartDate);
          if (CheckDate.isBefore(startDate, "day")) return false;
        }
        // 終了日チェック
        if (params.inspectionEndDate) {
          const endDate = dayjs(params.inspectionEndDate);
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
    },
    []
  );

  // リセット時の処理
  const handleReset = () => {
    setFilteredTableItems(mockInspectionReservations);
  };

  // URLの操作でも検索を反映させる
  useEffect(() => {
    const queryParams: InspectionReservationSearchParams = {
      reservationId: searchParams.get("reservationId") || "",
      inspectionStartDate: searchParams.get("inspectionStartDate") || "",
      inspectionEndDate: searchParams.get("inspectionEndDate") || "",
      mirallelId: searchParams.get("mirallelId") || "",
      reservationName: searchParams.get("reservationName") || "",
      inspectionItem: searchParams.get("inspectionItem") || "",
      referralCode: searchParams.get("referralCode") || "",
      reservationStatus: searchParams.get("reservationStatus") || "",
    };
    handleSearch(queryParams);
  }, [handleSearch, searchParams]);

  // TODO: CSVアップロード処理を書く
  const csvUpload = () => {
    console.log("CSVアップロード");
    router.push(
      `/${ROUTES.INSPECTION_MANAGEMENT}/${ROUTES.INSPECTION_RESERVATIONS}/${ROUTES.MAKE_INSPECTION_RESERVATION}`
    );
  };

  return (
    <div>
      {/* タイトル */}
      <div className="px-5 flex justify-between">
        <p className="flex items-center title-cp-medium text-cp-slate-gray">
          検査予約管理
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
        <InspectionReservationSearchForm
          onSearch={handleSearch}
          onReset={handleReset}
        />
      </div>

      {/* 件数表示 */}
      <div className="body-cp-small text-cp-slate-gray text-left pl-5 pt-5 pb-2">
        合計 {filteredTableItems.length}件
      </div>

      {/* テーブル */}
      <div className="px-5 ">
        <InspectionReservationTable
          inspectionReservations={filteredTableItems}
        />
      </div>
    </div>
  );
}
