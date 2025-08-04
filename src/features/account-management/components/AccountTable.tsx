"use client";

import { useState } from "react";
import { Account } from "@/features/account-management/mocks/accounts";
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
    router.push(`${ROUTES.ACCOUNT_MANAGEMENT}/${id}${ROUTES.EDIT_ACCOUNT}`);
  };

  const columns = [
    { label: "アカウントID", key: "accountId", className: "w-[92px]" },
    { label: "アカウント名", key: "accountName", className: "w-[132px]" },
    { label: "表示名", key: "displayName", className: "w-[132px]" },
    { label: "アカウント権限", key: "accountAuthority", className: "w-[91px]" },
    { label: "資格", key: "accountLicense", className: "w-[108px]" },
    { label: "メールアドレス", key: "mail", className: "w-[148px]" },
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
            {paginatedAccounts.map((account) => (
              <tr
                onClick={() => handleRowClick(account.id)}
                key={account.id}
                className="h-10 text-left cursor-pointer hover:bg-cp-ghost-white border-cp-soft-gray border-b"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-2 py-1 text-black">
                    {account[col.key as keyof Account]}
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
