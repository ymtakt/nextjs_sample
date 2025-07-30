"use client";

import React, { useEffect } from "react";
import { mockInspectionSettings } from "@/features/inspection-management/inspections-setting/mocks/inspectionSetting";

export default function HealthInfoPage() {
  useEffect(() => {
    console.log("📝 mockInspectionSettings:", mockInspectionSettings);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold">
        健康情報をコンソールに表示しました
      </h1>
      <p className="text-sm text-gray-600">
        開発者ツールの console をご確認ください。
      </p>
    </div>
  );
}
