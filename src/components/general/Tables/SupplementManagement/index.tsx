"use client";

import { useState } from "react";
import Pagination from "@/components/general/Pagination";
import BaseButton from "@/components/general/Button/BaseButton";
import ButtonModal from "@/components/general/Modals/ButtonModal";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { IoMdTrash } from "react-icons/io";
import { Supplement } from "@/mocks/supplement";

type Props = {
  supplements: Supplement[];
};

const PER_PAGE = 10;

export default function SupplementTable({ supplements }: Props) {
  const router = useRouter();
  // ページネーションの計算
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(supplements.length / PER_PAGE);
  const paginatedUsers = supplements.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );
  // 編集ボタン
  const handleEditClick = (id: number) => {
    router.push(
      `/${ROUTES.SUPPLEMENT_MANAGEMENT}/${ROUTES.EDIT_SUPPLEMENT}/${id}`
    );
  };
  // 削除ボタン
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const deleteSupplement = () => {
    if (selectedDeleteId !== null) {
      // TODO: 削除処理を書く
      console.log(`${selectedDeleteId} サプリメント名の削除`);
      setSelectedDeleteId(null);
    }
  };

  return (
    <div className="px-5 pb-5">
      <div className="p-4 w-full overflow-x-scroll bg-cp-white rounded">
        {/* --- テーブル部分 --- */}

        <table className="min-w-[1160px]">
          <thead>
            <tr className="h-[40px] text-left title-cp-small px-2.5 text-cp-sky-blue bg-cp-white border-cp-soft-gray border-b">
              <th className="w-[150px] pl-2.5">登録日</th>
              <th className="w-[150px] pl-2.5">サプリメント名</th>
              <th className="w-[150px] pl-2.5">ブランド名</th>
              <th className="w-[50px] pl-2.5"></th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((supplement) => (
              <tr
                key={supplement.id}
                className="text-left border-cp-soft-gray border-b"
              >
                <td className="px-2 py-1 text-cp-black body-cp-small">
                  {supplement.registerDate.toString().padStart(6, "0")}
                </td>
                <td className="px-2 py-1 text-cp-black">
                  {supplement.supplementName}
                </td>
                <td className="px-2 py-1 text-cp-black">
                  {supplement.supplementBrand}
                </td>
                <td className="px-2 py-1 text-right bg-cp-white">
                  <BaseButton
                    onClick={() => handleEditClick(supplement.id)}
                    text={"編集"}
                    color={"cp-sky-blue"}
                    size={"small"}
                  />

                  {/* 削除ボタン部分 */}
                  <button
                    type="button"
                    onClick={() => setSelectedDeleteId(supplement.id)}
                    className="p-2 text-cp-soft-gray"
                    aria-label="削除"
                  >
                    <IoMdTrash size={25} />
                  </button>
                  <ButtonModal
                    isOpen={selectedDeleteId === supplement.id}
                    title="本当に削除しますか？"
                    leftButtonText="キャンセル"
                    rightButtonText="削除"
                    leftButtonColor="cp-gray"
                    rightButtonColor="cp-red"
                    onRight={deleteSupplement}
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
