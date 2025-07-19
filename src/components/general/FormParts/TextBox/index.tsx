"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type TextBoxSize = "small" | "medium" | "large";

type TextBoxProps = {
  value: string;
  label?: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  size?: TextBoxSize;
  isDisabled?: boolean;
  error?: string;
  type?: "text" | "password";
  isRounded?: boolean;
};

export default function TextBox({
  label,
  placeholder = "",
  value,
  onChange,
  size = "medium",
  isDisabled = false,
  error,
  type = "text",
  isRounded = true,
}: TextBoxProps) {
  const sizeStyle = {
    small: "h-7.5 w-45",
    medium: "h-15 w-70",
    large: "h-37.5 w-200",
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordType = type === "password";
  const inputType = isPasswordType && !isPasswordVisible ? "password" : "text";
  const roundedType = isRounded ? "rounded" : "";
  const borderStyle = error
    ? "border border-cp-red"
    : "border border-cp-soft-gray";
  // 背景色の指定も含む
  const disabledStyle = isDisabled
    ? "bg-gray-100 cursor-not-allowed"
    : "bg-white";
  const passwordIconStyle = isPasswordVisible
    ? "text-cp-soft-gray"
    : "text-cp-black";

  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="body-cp-medium">{label}</label>}

      {size === "large" ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          className={`
            ${sizeStyle[size]} ${borderStyle} ${disabledStyle} ${roundedType}
            body-cp-small pl-2.5 mt-1 focus:outline-none resize-none `}
        />
      ) : // パスワードの場合はdivコンテナで囲む
      isPasswordType ? (
        <div
          className={`${sizeStyle[size]} ${borderStyle} ${disabledStyle} ${roundedType} relative mt-1`}
        >
          <input
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            className={` 
              h-full ${disabledStyle} ${roundedType}
              body-cp-small pl-2.5 focus:outline-none `}
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className={`absolute right-2 top-1/2 -translate-y-1/2 ${passwordIconStyle}`}
          >
            {isPasswordVisible ? (
              <AiOutlineEyeInvisible size={22} />
            ) : (
              <AiOutlineEye size={22} />
            )}
          </button>
        </div>
      ) : (
        // S or Mでパスワードでない場合
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          className={`
            ${sizeStyle[size]} ${borderStyle} ${disabledStyle} ${roundedType}
            body-cp-small pl-2.5 mt-1 border focus:outline-none `}
        />
      )}

      {error && <p className="label-cp-medium text-cp-red">{error}</p>}
    </div>
  );
}
