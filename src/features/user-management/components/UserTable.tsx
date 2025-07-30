"use client";

import { useState } from "react";
import { User } from "@/mocks/users";
import Pagination from "@/components/general/Pagination";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

type Props = {
  users: User[];
};

const USERS_PER_PAGE = 10;

export default function UserTable({ users }: Props) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const paginatedUsers = users.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handleRowClick = (id: number) => {
    router.push(`/${ROUTES.USER_MANAGEMENT}/${id}/${ROUTES.USER_INFO}`);
  };

  const columns = [
    { label: "ミラレルID", key: "id", className: "w-[92px]" },
    { label: "氏名漢字", key: "nameKanji", className: "w-[132px]" },
    { label: "氏名かな", key: "nameKana", className: "w-[170px]" },
    { label: "性別", key: "gender", className: "w-[91px]" },
    { label: "会員ランク", key: "membership", className: "w-[108px]" },
    { label: "住所（都道府県）", key: "prefecture", className: "w-[148px]" },
    { label: "生年月日", key: "birthDate", className: "w-[129px]" },
    { label: "KYB-ID", key: "kybId", className: "w-[132px]" },
    { label: "紹介コード", key: "referralCode", className: "w-[132px]" },
    { label: "紹介者", key: "referredBy", className: "w-[132px]" },
    { label: "メルマガ配信許可", key: "mailAllowed", className: "w-[160px]" },
  ];

  return (
    <div className="">
      <div className="p-4 h-full bg-cp-white overflow-x-auto mx-auto rounded">
        {/* --- テーブル部分 --- */}
        <table className="min-w-[1500px] w-full">
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
            {paginatedUsers.map((user) => (
              <tr
                onClick={() => handleRowClick(user.id)}
                key={user.id}
                className="text-left cursor-pointer hover:bg-cp-ghost-white border-cp-soft-gray border-b"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="h-[40px] px-2 py-1 text-black body-cp-small"
                  >
                    {col.key === "id"
                      ? user[col.key as keyof User]?.toString().padStart(6, "0")
                      : user[col.key as keyof User]}
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
