"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextBox from "@/components/general/FormParts/TextBox";
import DropDown from "@/components/general/FormParts/DropDown";
import RadioButton from "@/components/general/FormParts/RadioButton";
import BaseButton from "@/components/general/Button/BaseButton";

import { ROUTES } from "@/constants/routes";
import { HomeDisplayStatusOptions } from "@/mocks/notificationOptions";

export type NotificationSearchParams = {
  title: string;
  displayIsShowHome: string;
  displayIsPushNotification: string;
  targetAudience: string;
};

type Props = {
  onSearch: (params: NotificationSearchParams) => void;
  onReset: () => void;
};

export default function NotificationSearchForm({ onSearch, onReset }: Props) {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState<NotificationSearchParams>({
    title: "",
    displayIsShowHome: "",
    displayIsPushNotification: "",
    targetAudience: "",
  });

  const handleChange = (key: keyof NotificationSearchParams, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSearch = () => {
    const query = new URLSearchParams();
    const adjustedForm = {
      ...form,
      targetAudience:
        form.targetAudience === "user" && userId !== ""
          ? userId
          : form.targetAudience,
    };
    Object.entries(adjustedForm).forEach(([key, value]) => {
      if (key !== "userId" && value) {
        query.append(key, value);
      }
    });
    router.push(
      `/${ROUTES.NOTIFICATION_MANAGEMENT}/${
        ROUTES.MIRALLEL_NOTIFICATIONS
      }?${query.toString()}`
    );
    onSearch(adjustedForm);
  };

  const handleReset = () => {
    setForm({
      title: "",
      displayIsShowHome: "",
      displayIsPushNotification: "",
      targetAudience: "",
    });
    router.push(
      `/${ROUTES.NOTIFICATION_MANAGEMENT}/${ROUTES.MIRALLEL_NOTIFICATIONS}`
    );
    setUserId("");
    onReset();
  };

  return (
    <div className="">
      <div className="p-5 bg-cp-white text-sm">
        <div className="w-full rounded ">
          <div className="p-4 flex gap-10">
            <div>
              <TextBox
                label="タイトル"
                placeholder=""
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                size="small"
              />
            </div>
            <div>
              <DropDown
                label="アプリのホーム画面に表示させるか"
                labelColor="text-cp-black"
                bgColor="bg-cp-ghost-white"
                options={HomeDisplayStatusOptions}
                value={form.displayIsShowHome}
                size={"small"}
                isRounded={false}
                onChange={(value) => handleChange("displayIsShowHome", value)}
              />
            </div>
            <div>
              <RadioButton
                label="配信対象者"
                options={[
                  { label: "全員", value: "全員" },
                  { label: "有料会員", value: "有料会員" },
                  { label: "無料会員", value: "無料会員" },
                  {
                    label: "ユーザーID",
                    value: "user",
                    isInput: true,
                    inputPlaceholder: "ユーザーID",
                  },
                ]}
                value={form.targetAudience}
                inputValue={userId}
                onChange={(value) => handleChange("targetAudience", value)}
                onInputChange={(value) => setUserId(value)}
              />
            </div>
          </div>
          {/* --- 検索／リセット --- */}
          <div className="border-cp-soft-gray border-b mx-4" />
          <div className="pt-5 flex justify-center gap-4">
            <button
              className="text-cp-sky-blue underline"
              onClick={handleReset}
              type="button"
            >
              リセット
            </button>
            <div>
              <BaseButton
                onClick={handleSearch}
                text={"検索"}
                color={"cp-sky-blue"}
                size={"small"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
