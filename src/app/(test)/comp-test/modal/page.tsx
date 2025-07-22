"use client";

import { useState } from "react";
import ButtonModal from "@/components/general/Modals/ButtonModal";
import BaseButton from "@/components/general/Button/BaseButton";

export default function Home() {
  const [sendComment, setSendComment] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [inputComment, setInputComment] = useState("");
  const handleLogout = () => {
    setSendComment(inputComment);
    setInputComment("");
    setShowLogoutModal(false);
  };
  return (
    <div className="ml-5 my-6  space-y-2 text-black">
      <h2 className="text-xl font-bold mb-4">📌 モーダル テスト</h2>
      <div className="flex">
        <div>
          <BaseButton
            onClick={() => setShowLogoutModal(true)}
            text="コメントモーダル"
            color="cp-white"
            size="medium"
          />
        </div>
        <ButtonModal
          isOpen={showLogoutModal}
          title="タイトル"
          leftButtonText="キャンセル"
          rightButtonText="送信"
          leftButtonColor="cp-white"
          rightButtonColor="cp-red"
          onRight={handleLogout}
          onLeft={() => setShowLogoutModal(false)}
          isLine={true}
          isComment={true}
          inputComment={inputComment}
          commentLabel="コメント"
          onChangeComment={setInputComment}
        />
        <div className="mt-4 ml-2 text-sm flex">
          <p className="text-gray-600">送信したコメント：</p>
          <p className="text-cp-black">{sendComment}</p>
        </div>
      </div>
    </div>
  );
}
