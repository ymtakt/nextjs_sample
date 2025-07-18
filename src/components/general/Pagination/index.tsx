type PaginationProps = {
  number: number;
  active?: boolean;
  size?: number;
};

export default function Pagination({
  number,
  active = false,
  size = 32,
}: PaginationProps) {
  const paginationStyle = active
    ? // TODO: カラー未定のため暫定
      "text-white bg-cp-dark-blue"
    : "text-white bg-cp-sky-blue";

  return (
    <div
      className={`rounded-full text-white font-bold flex items-center justify-center ${paginationStyle}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {number}
    </div>
  );
}
