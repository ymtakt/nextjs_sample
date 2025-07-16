"use client";

import Link from "next/link";
import React from "react";
// iconのインポート
import { FaUserFriends } from "react-icons/fa";
import { FaBell, FaCirclePlay } from "react-icons/fa6";
import { BiInjection } from "react-icons/bi";
import { PiChats } from "react-icons/pi";
import { TbNumber123 } from "react-icons/tb";
import { GiMedicines } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
// import { RiLogoutBoxRFill } from 'react-icons/ri'

import { ROUTES } from "@/constants/routes";

type Props = {
  setIsOpen?: (isOpen: boolean) => void;
};

export default function Navigation(props: Props) {
  const { setIsOpen } = props;

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
    // {
    //   name: 'ログアウト',
    //   icon: RiLogoutBoxRFill,
    //   route: `/${ROUTES.LOGOUT}`,
    // },
  ];

  return (
    <div className="h-screen w-[200] bg-cockpit-blue text-white">
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.route}
                className="flex items-center space-x-2 px-4 h-[60px] hover:bg-cockpit-sky-blue"
                onClick={() => setIsOpen?.(false)}
              >
                <item.icon className="size-6" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
