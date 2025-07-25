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

  return (
    <div className="">
      <div className="p-4 h-full bg-cp-white overflow-x-auto mx-auto rounded">
        {/* --- テーブル部分 --- */}
        <table className="min-w-[1500px] w-full">
          <thead>
            <tr className="h-[40px] text-left title-cp-small px-2.5 text-cp-sky-blue bg-cp-white border-cp-soft-gray border-b">
              <th className="w-[92px] pl-2.5">ミラレルID</th>
              <th className="w-[132px] pl-2.5">氏名漢字</th>
              <th className="w-[170px] pl-2.5">氏名かな</th>
              <th className="w-[91px] pl-2.5">性別</th>
              <th className="w-[108px] pl-2.5">会員ランク</th>
              <th className="w-[148px] pl-2.5">住所（都道府県）</th>
              <th className="w-[129px] pl-2.5">生年月日</th>
              <th className="w-[132px] pl-2.5">KYB-ID</th>
              <th className="w-[132px] pl-2.5">紹介コード</th>
              <th className="w-[132px] pl-2.5">紹介者</th>
              <th className="w-[160px] pl-2.5">メルマガ配信許可</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                onClick={() => handleRowClick(user.id)}
                key={user.id}
                className="text-left cursor-pointer hover:bg-cp-ghost-white"
              >
                <td className="px-2 py-1 text-black body-cp-small">
                  {user.id.toString().padStart(6, "0")}
                </td>
                <td className="px-2 py-1 text-black">{user.nameKanji}</td>
                <td className="px-2 py-1 text-black">{user.nameKana}</td>
                <td className="px-2 py-1 text-black">{user.gender}</td>
                <td className="px-2 py-1 text-black">{user.membership}</td>
                <td className="px-2 py-1 text-black">{user.prefecture}</td>
                <td className="px-2 py-1 text-black">{user.birthDate}</td>
                <td className="px-2 py-1 text-black">{user.kybId}</td>
                <td className="px-2 py-1 text-black">{user.referralCode}</td>
                <td className="px-2 py-1 text-black">{user.referredBy}</td>
                <td className="px-2 py-1 text-black">{user.mailAllowed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- ページネーション --- */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
