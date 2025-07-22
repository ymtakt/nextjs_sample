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
  bgColor?: string;
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
  bgColor = "bg-cp-white",
}: CommentBoxSizeProps) {
  const roundedType = isRounded ? "rounded" : "";
  const bgColorStyle = isDisabled ? "bg-gray-100 cursor-not-allowed" : bgColor;
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
          ${roundedType} ${bgColorStyle}
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
