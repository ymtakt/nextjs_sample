"use client";

type CommentBoxSizeProps = {
  value: string;
  label?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
  isRounded?: boolean;
  isMaxLength?: boolean;
  maxLength?: number;
};

export default function CommentBox({
  placeholder = "コメントを入力してください",
  value,
  label,
  onChange,
  isDisabled = false,
  isRounded = true,
  isMaxLength = false,
  maxLength = 10000,
}: CommentBoxSizeProps) {
  const roundedType = isRounded ? "rounded" : "";
  // 背景色の指定も含む
  const disabledStyle = isDisabled
    ? "bg-gray-100 cursor-not-allowed"
    : "bg-cp-white";
  return (
    <div className="w-105">
      {label && <label className="body-cp-medium">{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        {...(isMaxLength && maxLength ? { maxLength } : {})}
        className={`
          ${disabledStyle} ${roundedType}
          w-full h-76 body-cp-small pl-2.5 pt-2 mt-1 focus:outline-none resize-none
        `}
      />
      {isMaxLength && maxLength && (
        <p className=" text-right label-cp-medium text-cp-black">
          {value.length}/{maxLength} 文字
        </p>
      )}
    </div>
  );
}
