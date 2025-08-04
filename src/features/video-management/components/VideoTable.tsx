"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import Pagination from "@/components/general/Pagination";
import { MIrallelVideo } from "@/features/video-management/mocks/videos";

type Props = {
  videos: MIrallelVideo[];
};

const PER_PAGE = 5;

export default function VideoTable({ videos }: Props) {
  const router = useRouter();
  // ページネーションの計算
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(videos.length / PER_PAGE);
  const paginatedUsers = videos.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const handleRowClick = (id: number) => {
    router.push(`${ROUTES.VIDEO_MANAGEMENT}/${id}`);
  };

  const columns = [
    { label: "動画タイトル", key: "title", className: "w-[150px]" },
    { label: "サムネイル", key: "urlThumbnail", className: "w-[150px]" },
    { label: "カテゴリー", key: "category", className: "w-[150px]" },
    { label: "キーワード", key: "keyword", className: "w-[150px]" },
    { label: "公開範囲", key: "viewingRestriction", className: "w-[150px]" },
    {
      label: "公開ステータス",
      key: "displayIsPublishStatus",
      className: "w-[150px]",
    },
  ];

  return (
    <div className="px-5 pb-5">
      <div className="p-4 w-full overflow-x-scroll bg-cp-white rounded">
        {/* --- テーブル部分 --- */}

        <table className="min-w-[1160px]">
          <thead>
            <tr className="h-[40px] text-left title-cp-small px-2.5 text-cp-sky-blue bg-cp-white border-cp-soft-gray border-b">
              {columns.map((col) => (
                <th key={col.key} className={`${col.className} pl-2.5`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((item) => (
              <tr
                onClick={() => handleRowClick(item.id)}
                key={item.id}
                className="h-[100px] text-left border-cp-soft-gray border-b"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-2 py-1 text-cp-black body-cp-small"
                  >
                    {col.key === "registerDate"
                      ? (item[col.key as keyof MIrallelVideo] as string)
                          ?.toString()
                          .padStart(6, "0")
                      : item[col.key as keyof MIrallelVideo]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- ページネーション --- */}
      <div className="pb-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
