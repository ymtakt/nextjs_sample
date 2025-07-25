"use client";

import { useState } from "react";
import { ReferralCode } from "@/mocks/referralCodes";
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
  const paginatedUsers = referralCodes.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );
  // 編集ボタン
  const handleEditClick = (id: number) => {
    router.push(
      `/${ROUTES.REFERRAL_CODE_MANAGEMENT}/${ROUTES.EDIT_REFERRAL_CODE}/${id}`
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

  return (
    <div className="px-5 pb-5">
      <div className="w-full overflow-x-scroll bg-cp-white rounded">
        {/* --- テーブル部分 --- */}

        <table className="min-w-[1160px]">
          <thead>
            <tr className="h-[40px] text-left title-cp-small px-2.5 text-cp-sky-blue bg-cp-white border-cp-soft-gray border-b">
              <th className="w-[150px] pl-2.5">紹介コード</th>
              <th className="w-[150px] pl-2.5">紹介者名</th>
              <th className="w-[150px] pl-2.5">区分</th>
              <th className="w-[50px] pl-2.5"></th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((referralCode) => (
              <tr key={referralCode.id} className="text-left ">
                <td className="px-2 py-1 text-cp-black body-cp-small">
                  {referralCode.referralCode.toString().padStart(6, "0")}
                </td>
                <td className="px-2 py-1 text-cp-black">
                  {referralCode.referredName}
                </td>
                <td className="px-2 py-1 text-cp-black">
                  {referralCode.section}
                </td>
                <td className="px-2 py-1 text-right">
                  <BaseButton
                    onClick={() => handleEditClick(referralCode.id)}
                    text={"編集"}
                    color={"cp-sky-blue"}
                    size={"small"}
                  />

                  {/* 削除ボタン部分 */}
                  <button
                    type="button"
                    onClick={() => setSelectedDeleteId(referralCode.id)}
                    className="p-2 text-cp-soft-gray"
                    aria-label="削除"
                  >
                    <IoMdTrash size={25} />
                  </button>
                  <ButtonModal
                    isOpen={selectedDeleteId !== null}
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
