// --- 区分オプション ---
export type InspectionSectionOption = {
  label: string;
  value: "区分A" | "区分B" | "区分C" | "区分D";
};

export const InspectionSectionOptions: InspectionSectionOption[] = [
  { label: "区分A", value: "区分A" },
  { label: "区分B", value: "区分B" },
  { label: "区分C", value: "区分C" },
  { label: "区分D", value: "区分D" },
];

// --- 検査名オプション ---
export type InspectionNameOption = {
  label: string;
  value: "検査A" | "検査B" | "検査C" | "検査D";
};

export const InspectionNameOptions: InspectionNameOption[] = [
  { label: "検査A", value: "検査A" },
  { label: "検査B", value: "検査B" },
  { label: "検査C", value: "検査C" },
  { label: "検査D", value: "検査D" },
];

// --- 検査項目オプション ---
export type InspectionItemOption = {
  label: string;
  value: "項目A" | "項目B" | "項目C" | "項目D";
};

export const InspectionItemOptions: InspectionItemOption[] = [
  { label: "項目A", value: "項目A" },
  { label: "項目B", value: "項目B" },
  { label: "項目C", value: "項目C" },
  { label: "項目D", value: "項目D" },
];

// --- 公開設定オプション ---
export type PublishSettingOption = {
  label: string;
  value: "ON" | "OFF";
};

export const PublishSettingOptions: PublishSettingOption[] = [
  { label: "ON", value: "ON" },
  { label: "OFF", value: "OFF" },
];
