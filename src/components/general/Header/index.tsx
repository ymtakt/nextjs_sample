"use client";

import React from "react";
import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";

type Props = {
  userName: string;
};

export default function Header({ userName }: Props) {
  return (
    <header className="h-[70] w-full flex items-center justify-between px-5 bg-white">
      {/* ロゴとバッジ */}
      <div className="flex items-center w-[250] h-[40] my-[15] space-x-2.5">
        {/* ミラレル ロゴ */}
        <Image src="/logo.svg" alt="ミラレル" width={160} height={40} />
        {/* cockpitバッジ */}
        <Image src="/cockpit.svg" alt="コックピット" width={80} height={30} />
      </div>
      {/* 右側：ユーザー情報 */}
      <div className="flex items-center space-x-2.5">
        <div className="bg-cp-white rounded-full">
          <MdAccountCircle className="text-cp-sky-blue size-[35]" />
        </div>
        <span className="body-cp-medium text-cp-black">{userName}</span>
      </div>
    </header>
  );
}
