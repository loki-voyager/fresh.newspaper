import { Dispatch, SetStateAction, useState } from "react";

type PaginationProps = {
  total: number;
  page: number;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  limit_change: ({ limit }: { limit: number }) => Promise<void>;
  page_change: ({ page }: { page: number }) => Promise<void>;
  setPage: Dispatch<SetStateAction<number>>;
};

const Pagination: React.FC<PaginationProps> = ({
  total,
  page,
  limit,
  setLimit,
  limit_change,
  page_change,
  setPage,
}: PaginationProps) => {
  const pageNumbers = Array.from({ length: total }, (_, i) => i + 1);

  const paginate = async (new_page: number) => {
    switch (true) {
      case new_page > 0 && new_page <= total:
        setPage(new_page);
        page_change({ page: new_page });
        break;
      case new_page > 0 && new_page > total:
        setPage(1);
        page_change({ page: 1 });
        break;
      case new_page <= 0 && new_page <= total:
        setPage(total);
        page_change({ page: total });
        break;
      default:
        setPage(new_page);
        page_change({ page: new_page });
        break;
    }
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    setPage(1);
    limit_change({ limit: newLimit });
  };

  return (
    <>
      <div className="block frame">
        <div>
          <div className="pagination">
            {pageNumbers.length > 1 && (
              <>
                <button onClick={() => paginate(page - 1)}>Prev</button>
                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`page-link ${
                      page === pageNumber ? "active" : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button onClick={() => paginate(page + 1)}>Next</button>
              </>
            )}
            <span className="block">
              <div className="line items-center">
                <label>Limit:</label>
                <select
                  id="limit"
                  value={limit}
                  onChange={handleLimitChange}
                  className="button"
                >
                  <option value={20}>20</option>
                  <option value={40}>40</option>
                  <option value={60}>60</option>
                  <option value={80}>80</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export { Pagination };
