import { useEffect } from "react";
import "./index.scss";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  reset?: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  reset,
}) => {
  useEffect(() => {
    if (reset) {
      onPageChange(1);
    }
  }, [onPageChange, reset]);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="pagination">
      <button aria-label="Previous page" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <GrFormPrevious />
      </button>

      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={idx}
            className={p === currentPage ? "active" : ""}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ) : (
          <span key={idx} className="dots">
            {p}
          </span>
        )
      )}

      <button aria-label="Next page" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <GrFormNext />
      </button>
    </div>
  );
};

export default Pagination;
