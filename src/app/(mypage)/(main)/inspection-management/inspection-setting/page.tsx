"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import BaseButton from "@/components/general/Button/BaseButton";
import {
  InspectionSetting,
  mockInspectionSettings,
} from "@/mocks/inspectionSetting";
import InspectionSettingSearchForm, {
  InspectionSettingSearchParams,
} from "@/features/inspection-management/inspections-setting/components/InspectionsSettingSearch";
import InspectionSettingTable from "@/features/inspection-management/inspections-setting/components/InspectionsSettingTable";

export default function InspectionReservationManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredTableItems, setFilteredTableItems] = useState<
    InspectionSetting[]
  >(mockInspectionSettings);

  const handleSearch = useCallback((params: InspectionSettingSearchParams) => {
    const filtered = mockInspectionSettings.filter((item) => {
      return Object.entries(params).every(([key, value]) => {
        if (!value) return true;
        const consultationValue = item[key as keyof typeof item];
        return consultationValue?.toString().includes(value.toString());
      });
    });
    setFilteredTableItems(filtered);
  }, []);

  const handleReset = () => {
    setFilteredTableItems(mockInspectionSettings);
  };

  // URLの操作でも検索を反映させる
  useEffect(() => {
    const queryParams: InspectionSettingSearchParams = {
      id: searchParams.get("id") || "",
      publishSetting: searchParams.get("publishSetting") || "",
    };
    handleSearch(queryParams);
  }, [handleSearch, searchParams]);

  const makeNewItem = () => {
    // TODO: 新規作成処理を書く
    console.log("新規作成");
    router.push(
      `/${ROUTES.INSPECTION_MANAGEMENT}/${ROUTES.INSPECTION_SETTING}/${ROUTES.MAKE_INSPECTION_SETTING}`
    );
  };

  return (
    <div className="">
      <div className="px-5 flex justify-between">
        <p className="flex items-center title-cp-medium text-cp-slate-gray">
          検査項目管理
        </p>
        <div className="py-2.5">
          <BaseButton
            onClick={makeNewItem}
            text={"新規作成"}
            color={"cp-white"}
            size={"small"}
          />
        </div>
      </div>
      <div className="px-5">
        <InspectionSettingSearchForm
          onSearch={handleSearch}
          onReset={handleReset}
        />
      </div>

      {/* 件数表示 */}
      <div className="body-cp-small text-cp-slate-gray text-left pl-5 pt-5 pb-2">
        合計 {filteredTableItems.length}件
      </div>
      <div className="px-5 ">
        <InspectionSettingTable inspectionSettings={filteredTableItems} />
      </div>
    </div>
  );
}
