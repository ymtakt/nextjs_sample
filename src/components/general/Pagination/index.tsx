import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size?: number;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  size = 32,
}: PaginationProps) {
  const getButtonStyle = (active: boolean) =>
    active ? "text-white bg-cp-sky-blue" : "text-white bg-cp-soft-gray";

  const renderPageButton = (page: number) => (
    <button
      key={page}
      onClick={() => onPageChange(page)}
      className={`rounded-full font-bold flex items-center justify-center ${getButtonStyle(
        page === currentPage
      )}`}
      style={{ width: size, height: size }}
      aria-current={page === currentPage ? "page" : undefined}
    >
      {page}
    </button>
  );

  return (
    <div className="mt-6 flex justify-center items-center gap-2">
      {/* 前へ */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`p-1 ${
          currentPage === 1 ? "opacity-30 cursor-not-allowed" : ""
        }`}
        aria-label="前のページ"
      >
        <IoIosArrowBack size={24} className="text-cp-slate-gray" />
      </button>

      {/* ページ番号 */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
        renderPageButton
      )}

      {/* 次へ */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`p-1 ${
          currentPage === totalPages ? "opacity-30 cursor-not-allowed" : ""
        }`}
        aria-label="次のページ"
      >
        <IoIosArrowForward size={24} className="text-cp-slate-gray" />
      </button>
    </div>
  );
}
