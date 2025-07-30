export type InspectionReservationStatus = {
  label: string;
  value: "仮登録" | "本登録" | "却下";
};

export const InspectionReservationStatusOptions: InspectionReservationStatus[] =
  [
    { label: "仮登録", value: "仮登録" },
    { label: "本登録", value: "本登録" },
    { label: "却下", value: "却下" },
  ];

export type InspectionItem = {
  label: string;
  value: "検査A" | "検査B" | "検査C" | "検査D";
};

export const InspectionItemOptions: InspectionItem[] = [
  { label: "検査A", value: "検査A" },
  { label: "検査B", value: "検査B" },
  { label: "検査C", value: "検査C" },
  { label: "検査D", value: "検査D" },
];
