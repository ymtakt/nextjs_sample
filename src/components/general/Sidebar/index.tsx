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
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { ROUTES } from "@/constants/routes";
import ButtonModal from "@/components/general/Modals/ButtonModal";

type Props = {
  setIsOpen?: (isOpen: boolean) => void;
};

export default function Navigation(props: Props) {
  const { setIsOpen } = props;
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSubMenu = (name: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleLogout = () => {
    // TODO 実際のログアウト処理を書く場所
    setShowLogoutModal(false);
  };

  const mainMenuItems = [
    // {
    //   name: 'HOME',
    //   icon: Home,
    //   route: `/`,
    // },
    {
      name: "ユーザー管理",
      icon: FaUserFriends,
      route: `${ROUTES.USER_MANAGEMENT}`,
      subMenu: false,
    },
    {
      name: "検査管理",
      icon: BiInjection,
      route: `${ROUTES.INSPECTION_MANAGEMENT}`,
      subMenu: true,
    },
    {
      name: "相談予約管理",
      icon: PiChats,
      route: `${ROUTES.CONSULTATION_RESERVATION}`,
      subMenu: false,
    },
    {
      name: "動画管理",
      icon: FaCirclePlay,
      route: `${ROUTES.VIDEO_MANAGEMENT}`,
      subMenu: false,
    },
    {
      name: "お知らせ管理",
      icon: FaBell,
      route: `${ROUTES.NOTIFICATION_MANAGEMENT}${ROUTES.MIRALLEL_NOTIFICATIONS}`,
      subMenu: false,
    },
    {
      name: "紹介コード管理",
      icon: TbNumber123,
      route: `${ROUTES.REFERRAL_CODE_MANAGEMENT}`,
      subMenu: false,
    },
    {
      name: "サプリメント管理",
      icon: GiMedicines,
      route: `${ROUTES.SUPPLEMENT_MANAGEMENT}`,
      subMenu: false,
    },
    {
      name: "アカウント管理",
      icon: MdAccountCircle,
      route: `${ROUTES.ACCOUNT_MANAGEMENT}`,
      subMenu: false,
    },
  ];

  const subMenuItems = [
    {
      main: "検査管理",
      name: "検査予約管理",
      route: `${ROUTES.INSPECTION_MANAGEMENT}${ROUTES.INSPECTION_RESERVATIONS}`,
    },
    {
      main: "検査管理",
      name: "検査項目設定",
      route: `${ROUTES.INSPECTION_MANAGEMENT}${ROUTES.INSPECTION_SETTING}`,
    },
  ];

  return (
    <div className="h-full w-50 bg-cp-blue text-white flex flex-col justify-between">
      <nav>
        <ul>
          {/* メインメニュー */}
          {mainMenuItems.map((item, index) => (
            <li key={index}>
              {item.subMenu ? (
                <>
                  <button
                    onClick={() => toggleSubMenu(item.name)}
                    className="flex justify-between items-center w-full px-4 h-15 hover:bg-cp-sky-blue"
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon className="size-6" />
                      <span>{item.name}</span>
                    </div>
                    {openSubMenus[item.name] ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </button>

                  {openSubMenus[item.name] && (
                    <ul className="ml-10  text-white">
                      {subMenuItems
                        .filter((sub) => sub.main === item.name)
                        .map((sub, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={sub.route}
                              className="block py-2 hover:bg-cp-sky-blue"
                              onClick={() => setIsOpen?.(false)}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.route}
                  className="flex items-center space-x-2 px-4 h-15 hover:bg-cp-sky-blue"
                  onClick={() => setIsOpen?.(false)}
                >
                  <item.icon className="size-6" />
                  <span>{item.name}</span>
                </Link>
              )}
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

      <ButtonModal
        isOpen={showLogoutModal}
        title="ログアウトしてよろしいですか？"
        leftButtonText="キャンセル"
        rightButtonText="はい"
        onRight={handleLogout}
        onLeft={() => setShowLogoutModal(false)}
      />
    </div>
  );
}
