"use client";

import Link from "next/link";
import { use } from "react";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { mockUserDetails } from "@/mocks/userDetails";
import { ROUTES } from "@/constants/routes";

export default function UserLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const userId = parseInt(id, 10);
  const user = mockUserDetails.find((u) => u.id === userId);

  const pathname = usePathname();
  const tabs = [
    { href: ROUTES.USER_INFO, label: "ユーザー基本情報" },
    { href: ROUTES.BODY_INFO, label: "身体情報" },
    { href: ROUTES.SUPPLEMENT_LOG, label: "サプリメント摂取記録" },
    { href: ROUTES.MEAL_RECORD, label: "食事記録" },
    { href: ROUTES.CONDITION_RECORD, label: "体調記録" },
    { href: ROUTES.RESERVATION_HISTORY, label: "予約履歴" },
  ];

  return (
    <div>
      <p className="p-4 title-cp-medium text-cp-slate-gray">ユーザー詳細</p>
      <div className="flex">
        <p className="p-4 title-cp-medium text-cp-slate-gray">
          ミラレルID : {user?.id.toString().padStart(6, "0")}
        </p>
        <p className="p-4 title-cp-medium text-cp-slate-gray">
          氏名 : {user?.nameKanji}
        </p>
      </div>
      <div className="p-4">
        {/* タブ */}
        <div className="flex gap-1 text-cp-black">
          {tabs.map((tab) => {
            const tabPath = `/${ROUTES.USER_MANAGEMENT}/${id}/${tab.href}`;
            const isActive = pathname === tabPath;

            return (
              <Link
                key={tab.href}
                href={tabPath}
                className={`px-4 py-2 text-sm rounded-t-md text-cp-black ${
                  isActive
                    ? "bg-cp-white "
                    : "bg-cp-soft-gray hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* コンテンツ */}
        <div>{children}</div>
      </div>
    </div>
  );
}
