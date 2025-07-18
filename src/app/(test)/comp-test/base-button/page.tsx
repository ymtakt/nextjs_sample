"use client";

import BaseButton from "@/components/general/Button/BaseButton";

export default function Home() {
  const handleLogout = () => {
    console.log("ボタンがクリックされました");
  };
  return (
    <div className="ml-5">
      <p className="text-black">ベースボタンの確認</p>
      <div className="flex flex-col space-y-4">
        <BaseButton
          onClick={handleLogout}
          text="ログアウト"
          color="cp-sky-blue"
          size="medium"
        />
        <BaseButton
          onClick={handleLogout}
          text="ログアウト"
          color="cp-gray"
          size="medium"
        />
        <BaseButton
          onClick={handleLogout}
          text="ログアウト"
          color="cp-red"
          size="medium"
        />
        <BaseButton
          onClick={handleLogout}
          text="ログアウト"
          color="cp-white"
          size="medium"
        />
        <BaseButton
          onClick={handleLogout}
          text="ログアウト"
          color="cp-slate-gray"
          size="medium"
        />
      </div>
    </div>
  );
}
