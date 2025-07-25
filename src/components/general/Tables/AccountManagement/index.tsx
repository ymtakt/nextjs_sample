"use client";

import { useState } from "react";
import { Account } from "@/mocks/accounts";
import Pagination from "@/components/general/Pagination";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

type Props = {
  accounts: Account[];
};

const USERS_PER_PAGE = 10;

export default function AccountTable({ accounts }: Props) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(accounts.length / USERS_PER_PAGE);

  const paginatedAccounts = accounts.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handleRowClick = (id: number) => {
    router.push(`/${ROUTES.ACCOUNT_MANAGEMENT}/${id}/${ROUTES.EDIT_ACCOUNT}`);
  };

  return (
    <div className="">
      <div className="p-4 h-full bg-cp-white overflow-x-auto mx-auto rounded">
        {/* --- テーブル部分 --- */}
        <table className="min-w-[1500px] w-full">
          <thead>
            <tr className="h-[40px] text-left title-cp-small px-2.5 text-cp-sky-blue bg-cp-white border-cp-soft-gray border-b">
              <th className="w-[92px] pl-2.5">アカウントID</th>
              <th className="w-[132px] pl-2.5">アカウント名</th>
              <th className="w-[132px] pl-2.5">表示名</th>
              <th className="w-[91px] pl-2.5">アカウント権限</th>
              <th className="w-[108px] pl-2.5">資格</th>
              <th className="w-[148px] pl-2.5">メールアドレス</th>
            </tr>
          </thead>

          <tbody>
            {paginatedAccounts.map((account) => (
              <tr
                onClick={() => handleRowClick(account.id)}
                key={account.id}
                className="h-10 text-left cursor-pointer hover:bg-cp-ghost-white border-cp-soft-gray border-b"
              >
                <td className="px-2 py-1 text-black">{account.accountId}</td>
                <td className="px-2 py-1 text-black">{account.accountName}</td>
                <td className="px-2 py-1 text-black">{account.displayName}</td>
                <td className="px-2 py-1 text-black">
                  {account.accountAuthority}
                </td>
                <td className="px-2 py-1 text-black">
                  {account.accountLicense}
                </td>
                <td className="px-2 py-1 text-black">{account.mail}</td>
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
