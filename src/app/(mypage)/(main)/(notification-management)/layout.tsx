"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const tabs = [
    { href: ROUTES.MIRALLEL_NOTIFICATIONS, label: "お知らせ" },
    { href: ROUTES.HEALTH_INFORMATION, label: "健康情報" },
  ];

  return (
    <div>
      <p className="px-5 pt-4 title-cp-medium text-cp-slate-gray">
        お知らせ一覧
      </p>

      <div className="p-5">
        {/* タブ */}
        <div className="flex gap-1 text-cp-black">
          {tabs.map((tab) => {
            const tabPath = `${ROUTES.NOTIFICATION_MANAGEMENT}${tab.href}`;
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
