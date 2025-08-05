"use client";

import { useState } from "react";
import { ReferralCode } from "@/features/referral-code-management/mocks/referralCodes";
import Pagination from "@/components/general/Pagination";
import BaseButton from "@/components/general/Button/BaseButton";
import ButtonModal from "@/components/general/Modals/ButtonModal";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { IoMdTrash } from "react-icons/io";

type Props = {
  referralCodes: ReferralCode[];
};

const USERS_PER_PAGE = 10;

export default function UserTable({ referralCodes }: Props) {
  const router = useRouter();
  // ページネーションの計算
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(referralCodes.length / USERS_PER_PAGE);
  const paginatedData = referralCodes.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );
  // 編集ボタン
  const handleEditClick = (id: number) => {
    router.push(
      `${ROUTES.REFERRAL_CODE_MANAGEMENT}${ROUTES.EDIT_REFERRAL_CODE}/${id}`
    );
  };
  // 削除ボタン
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const deleteReferralCode = () => {
    if (selectedDeleteId !== null) {
      // TODO: 削除処理を書く
      console.log(`${selectedDeleteId} 紹介コードの削除`);
      setSelectedDeleteId(null);
    }
  };

  // テーブルの要素
  const columns = [
    { label: "紹介コード", key: "referralCode", className: "w-[150px]" },
    { label: "紹介者名", key: "referredName", className: "w-[150px]" },
    { label: "区分", key: "section", className: "w-[150px]" },
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
              {/* アクションボタン用 */}
              <th className="w-[50px] pl-2.5"></th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-cp-gray py-4"
                >
                  データがありません
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="text-left border-cp-soft-gray border-b"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-2 py-1 text-cp-black body-cp-small"
                    >
                      {col.key === "referralCode"
                        ? item[col.key as keyof ReferralCode]
                            ?.toString()
                            .padStart(6, "0")
                        : item[col.key as keyof ReferralCode]}
                    </td>
                  ))}
                  <td className="px-2 py-1 text-right">
                    <BaseButton
                      onClick={() => handleEditClick(item.id)}
                      text={"編集"}
                      color={"cp-sky-blue"}
                      size={"small"}
                    />

                    {/* 削除ボタン部分 */}
                    <button
                      type="button"
                      onClick={() => setSelectedDeleteId(item.id)}
                      className="p-2 text-cp-soft-gray"
                      aria-label="削除"
                    >
                      <IoMdTrash size={25} />
                    </button>
                    <ButtonModal
                      isOpen={selectedDeleteId === item.id}
                      title="本当に削除しますか？"
                      leftButtonText="キャンセル"
                      rightButtonText="削除"
                      leftButtonColor="cp-gray"
                      rightButtonColor="cp-red"
                      onRight={deleteReferralCode}
                      onLeft={() => setSelectedDeleteId(null)}
                    />
                  </td>
                </tr>
              ))
            )}
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
