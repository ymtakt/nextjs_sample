"use client";

import Link from "next/link";
import React, { useState } from "react";
// iconのインポート
import { FaUserFriends } from "react-icons/fa";
import { FaBell, FaCirclePlay } from "react-icons/fa6";
import { BiInjection } from "react-icons/bi";
import { PiChats } from "react-icons/pi";
import { TbNumber123 } from "react-icons/tb";
import { GiMedicines } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";

import { ROUTES } from "@/constants/routes";
import YexNoModal from "@/components/general/Modal/yesNoModal";

type Props = {
  setIsOpen?: (isOpen: boolean) => void;
};

export default function Navigation(props: Props) {
  const { setIsOpen } = props;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // TODO 実際のログアウト処理を書く場所
    setShowLogoutModal(false);
  };

  const menuItems = [
    // {
    //   name: 'HOME',
    //   icon: Home,
    //   route: `/`,
    // },
    {
      name: "ユーザー管理",
      icon: FaUserFriends,
      route: `/${ROUTES.USER_MANAGEMENT}`,
    },
    {
      name: "検査管理",
      icon: BiInjection,
      route: `/${ROUTES.INSPECTION_MANAGEMENT}`,
    },
    {
      name: "相談予約管理",
      icon: PiChats,
      route: `/${ROUTES.CONSULTATION_BOOKING}`,
    },
    {
      name: "動画管理",
      icon: FaCirclePlay,
      route: `/${ROUTES.VIDEO_MANAGEMENT}`,
    },
    {
      name: "お知らせ管理",
      icon: FaBell,
      route: `/${ROUTES.NOTIFICATION_MANAGEMENT}`,
    },
    {
      name: "紹介コード管理",
      icon: TbNumber123,
      route: `/${ROUTES.REFERRAL_CODE_MANAGEMENT}`,
    },
    {
      name: "サプリメント管理",
      icon: GiMedicines,
      route: `/${ROUTES.SUPPLEMENT_MANAGEMENT}`,
    },
    {
      name: "アカウント管理",
      icon: MdAccountCircle,
      route: `/${ROUTES.ACCOUNT_MANAGEMENT}`,
    },
  ];

  return (
    <div className="h-full w-50 bg-cp-blue text-white flex flex-col justify-between">
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.route}
                className="flex items-center space-x-2 px-4 h-15 hover:bg-cp-sky-blue"
                onClick={() => setIsOpen?.(false)}
              >
                <item.icon className="size-6" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex w-full justify-center items-center space-x-2.5 h-15 bg-cp-deep-blue cursor-pointer"
        >
          <RiLogoutBoxRFill className="size-6" />
          <span>ログアウト</span>
        </button>
      </div>

      <YexNoModal
        isOpen={showLogoutModal}
        mainText="ログアウトしてよろしいですか？"
        leftButtonText="キャンセル"
        rightButtonText="はい"
        onRight={handleLogout}
        onLeft={() => setShowLogoutModal(false)}
      />
    </div>
  );
}
