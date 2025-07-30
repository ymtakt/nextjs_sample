export type InspectionSetting = {
  // 番号
  id: number;
  // 区分
  section: "区分A" | "区分B" | "区分C" | "区分D";
  // 検査名
  inspectionName: "検査A" | "検査B" | "検査C" | "検査D";
  // 検査項目
  inspectionItem: "項目A" | "項目B" | "項目C" | "項目D";
  // 公開設定
  publishSetting: "ON" | "OFF";
};

// export const mockInspectionSettings: InspectionSetting[] = Array.from(
//   { length: 30 },
//   (_, i) => {
//     const index = i + 1;

//     const sections: InspectionSetting["section"][] = [
//       "区分A",
//       "区分B",
//       "区分C",
//       "区分D",
//     ];
//     const inspectionNames: InspectionSetting["inspectionName"][] = [
//       "検査A",
//       "検査B",
//       "検査C",
//       "検査D",
//     ];
//     const inspectionItems: InspectionSetting["inspectionItem"][] = [
//       "項目A",
//       "項目B",
//       "項目C",
//       "項目D",
//     ];
//     const publishSettings: InspectionSetting["publishSetting"][] = [
//       "ON",
//       "OFF",
//     ];

//     return {
//       id: index,
//       section: sections[i % sections.length],
//       inspectionName: inspectionNames[i % inspectionNames.length],
//       inspectionItem: inspectionItems[i % inspectionItems.length],
//       publishSetting: publishSettings[i % publishSettings.length],
//     };
//   }
// );

export const mockInspectionSettings: InspectionSetting[] = [
  {
    id: 1,
    section: "区分A",
    inspectionName: "検査A",
    inspectionItem: "項目A",
    publishSetting: "ON",
  },
  {
    id: 2,
    section: "区分B",
    inspectionName: "検査B",
    inspectionItem: "項目B",
    publishSetting: "OFF",
  },
  {
    id: 3,
    section: "区分C",
    inspectionName: "検査C",
    inspectionItem: "項目C",
    publishSetting: "ON",
  },
  {
    id: 4,
    section: "区分D",
    inspectionName: "検査D",
    inspectionItem: "項目D",
    publishSetting: "OFF",
  },
  {
    id: 5,
    section: "区分A",
    inspectionName: "検査A",
    inspectionItem: "項目A",
    publishSetting: "ON",
  },
  {
    id: 6,
    section: "区分B",
    inspectionName: "検査B",
    inspectionItem: "項目B",
    publishSetting: "OFF",
  },
  {
    id: 7,
    section: "区分C",
    inspectionName: "検査C",
    inspectionItem: "項目C",
    publishSetting: "ON",
  },
  {
    id: 8,
    section: "区分D",
    inspectionName: "検査D",
    inspectionItem: "項目D",
    publishSetting: "OFF",
  },
  {
    id: 9,
    section: "区分A",
    inspectionName: "検査A",
    inspectionItem: "項目A",
    publishSetting: "ON",
  },
  {
    id: 10,
    section: "区分B",
    inspectionName: "検査B",
    inspectionItem: "項目B",
    publishSetting: "OFF",
  },
  {
    id: 11,
    section: "区分C",
    inspectionName: "検査C",
    inspectionItem: "項目C",
    publishSetting: "ON",
  },
  {
    id: 12,
    section: "区分D",
    inspectionName: "検査D",
    inspectionItem: "項目D",
    publishSetting: "OFF",
  },
  {
    id: 13,
    section: "区分A",
    inspectionName: "検査A",
    inspectionItem: "項目A",
    publishSetting: "ON",
  },
  {
    id: 14,
    section: "区分B",
    inspectionName: "検査B",
    inspectionItem: "項目B",
    publishSetting: "OFF",
  },
  {
    id: 15,
    section: "区分C",
    inspectionName: "検査C",
    inspectionItem: "項目C",
    publishSetting: "ON",
  },
  {
    id: 16,
    section: "区分D",
    inspectionName: "検査D",
    inspectionItem: "項目D",
    publishSetting: "OFF",
  },
  {
    id: 17,
    section: "区分A",
    inspectionName: "検査A",
    inspectionItem: "項目A",
    publishSetting: "ON",
  },
  {
    id: 18,
    section: "区分B",
    inspectionName: "検査B",
    inspectionItem: "項目B",
    publishSetting: "OFF",
  },
  {
    id: 19,
    section: "区分C",
    inspectionName: "検査C",
    inspectionItem: "項目C",
    publishSetting: "ON",
  },
  {
    id: 20,
    section: "区分D",
    inspectionName: "検査D",
    inspectionItem: "項目D",
    publishSetting: "OFF",
  },
  {
    id: 21,
    section: "区分A",
    inspectionName: "検査A",
    inspectionItem: "項目A",
    publishSetting: "ON",
  },
  {
    id: 22,
    section: "区分B",
    inspectionName: "検査B",
    inspectionItem: "項目B",
    publishSetting: "OFF",
  },
  {
    id: 23,
    section: "区分C",
    inspectionName: "検査C",
    inspectionItem: "項目C",
    publishSetting: "ON",
  },
  {
    id: 24,
    section: "区分D",
    inspectionName: "検査D",
    inspectionItem: "項目D",
    publishSetting: "OFF",
  },
  {
    id: 25,
    section: "区分A",
    inspectionName: "検査A",
    inspectionItem: "項目A",
    publishSetting: "ON",
  },
  {
    id: 26,
    section: "区分B",
    inspectionName: "検査B",
    inspectionItem: "項目B",
    publishSetting: "OFF",
  },
  {
    id: 27,
    section: "区分C",
    inspectionName: "検査C",
    inspectionItem: "項目C",
    publishSetting: "ON",
  },
  {
    id: 28,
    section: "区分D",
    inspectionName: "検査D",
    inspectionItem: "項目D",
    publishSetting: "OFF",
  },
  {
    id: 29,
    section: "区分A",
    inspectionName: "検査A",
    inspectionItem: "項目A",
    publishSetting: "ON",
  },
  {
    id: 30,
    section: "区分B",
    inspectionName: "検査B",
    inspectionItem: "項目B",
    publishSetting: "OFF",
  },
];
