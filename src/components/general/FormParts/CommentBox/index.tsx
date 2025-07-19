"use client";

type CommentBoxSizeProps = {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
  isRounded?: boolean;
};

export default function CommentBox({
  placeholder = "コメントを入力してください",
  value,
  onChange,
  isDisabled = false,
  isRounded = true,
}: CommentBoxSizeProps) {
  const roundedType = isRounded ? "rounded" : "";
  // 背景色の指定も含む
  const disabledStyle = isDisabled
    ? "bg-gray-100 cursor-not-allowed"
    : "bg-cp-white";
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
      className={`
          ${disabledStyle} ${roundedType}
          w-105 h-76 body-cp-small pl-2.5 pt-2 focus:outline-none resize-none `}
    />
  );
}
