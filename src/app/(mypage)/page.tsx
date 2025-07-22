"use client";

import { useState } from "react";
import ButtonModal from "@/components/general/Modals/ButtonModal";
import BaseButton from "@/components/general/Button/BaseButton";

export default function Home() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // TODO 実際のログアウト処理を書く場所
    setShowLogoutModal(false);
  };
  return (
    <div>
      <p className="text-red-500 font-noto">フォント指定test</p>
      <p className="text-red-500 ">フォント指定test</p>
      <p className="text-red-500 font-test">フォント指定test</p>
      <div>
        <button
          onClick={() => setShowLogoutModal(true)}
          className="mb-5 flex w-full justify-center items-center space-x-2.5 h-15 bg-cp-deep-blue cursor-pointer"
        >
          <span>ボタン</span>
        </button>
      </div>
      <div>
        <BaseButton
          onClick={handleLogout}
          text="ログアウト"
          color="cp-white"
          size="medium"
        />
      </div>
      <ButtonModal
        isOpen={showLogoutModal}
        title="ログアウトしてよろしいですか？"
        leftButtonText="キャンセル"
        rightButtonText="はい"
        leftButtonColor="cp-white"
        rightButtonColor="cp-red"
        isCaption={true}
        caption="ログアウトしてよろしいですか？ログアウトしてよろしいですか？ログアウトしてよろしいですか？ログアウトしてよろしいですか？ログアウトしてよろしいですか？ログアウトしてよろしいですか？ログアウトしてよろしいですか？"
        isLine={true}
        onRight={handleLogout}
        onLeft={() => setShowLogoutModal(false)}
        // isSingleButton={true}
      />
    </div>
  );
}
