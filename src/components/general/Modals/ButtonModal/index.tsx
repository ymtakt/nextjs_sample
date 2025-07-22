"use client";

import React from "react";
import BaseButton from "@/components/general/Button/BaseButton";
import { ButtonColor } from "@/utils/buttonColor";
import CommentBox from "@/components/general/FormParts/CommentBox";
import TextBox from "@/components/general/FormParts/TextBox";

type ButtonModalProps = {
  isOpen: boolean;
  onLeft: () => void;
  onRight: () => void;
  title: string;
  leftButtonText: string;
  rightButtonText: string;
  leftButtonColor?: ButtonColor;
  rightButtonColor?: ButtonColor;
  isCaption?: boolean;
  caption?: string;
  isLine?: boolean;
  isSingleButton?: boolean;
  // コメント用
  isComment?: boolean;
  inputComment?: string;
  commentLabel?: string;
  onChangeComment?: (val: string) => void;
  // テキストボックス用
  isTextBox?: boolean;
  inputTextBox?: string;
  textBoxLabel?: string;
  textBoxPlaceholder?: string;
  onChangeTextBox?: (val: string) => void;
};

export default function ButtonModal({
  isOpen,
  onLeft,
  onRight,
  title,
  leftButtonText,
  rightButtonText,
  leftButtonColor = "cp-gray",
  rightButtonColor = "cp-sky-blue",
  isCaption = false,
  caption = "",
  isLine = false,
  isSingleButton = false,
  isComment = false,
  inputComment = "",
  commentLabel = "",
  onChangeComment,
  isTextBox = false,
  inputTextBox = "",
  textBoxLabel = "",
  textBoxPlaceholder = "",
  onChangeTextBox,
}: ButtonModalProps): React.JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cp-black/80">
      <div className="bg-cp-white text-cp-black rounded-[6] w-100 text-center">
        <div className="mx-5 mt-10 mb-5 ">
          <p className="headline-cp-large mb-5 h-5 ">{title}</p>
          {isLine && <div className="my-2.5 border-b border-cp-soft-gray" />}
          {/* --- キャプション部分 --- */}
          {isCaption && (
            <div className="my-5 text-center text-sm text-cp-black">
              {caption}
            </div>
          )}
          {/* --- テキストボックス部分 --- */}
          <div className="text-left mb-2.5">
            {isTextBox && (
              <TextBox
                label={textBoxLabel}
                value={inputTextBox}
                placeholder={textBoxPlaceholder}
                onChange={(e) => {
                  onChangeTextBox?.(e.target.value);
                }}
              />
            )}
          </div>
          {/* --- コメント部分 --- */}
          <div className="text-left">
            {isComment && (
              <CommentBox
                label={commentLabel}
                value={inputComment}
                onChange={(e) => {
                  onChangeComment?.(e.target.value);
                }}
              />
            )}
          </div>
          {/* --- ボタン部分 --- */}
          <div
            className={`flex justify-center ${
              !isSingleButton ? "space-x-4" : ""
            }`}
          >
            <BaseButton
              onClick={onLeft}
              text={leftButtonText}
              color={leftButtonColor}
              size={isSingleButton ? "large" : "medium"}
            />
            {!isSingleButton && (
              <BaseButton
                onClick={onRight}
                text={rightButtonText}
                color={rightButtonColor}
                size="medium"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
