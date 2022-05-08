import React, { useEffect, useState } from "react";
import { DEFAULT_PAGE, ITEMS_PER_PAGE } from "../../utils/constants";
import { Pagination as MuiPagination } from "@mui/material";

type PaginationProps = {
  total: number;
  onPageSelect: (index: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ total, onPageSelect }) => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  useEffect(() => setPage(DEFAULT_PAGE), [total]);
  useEffect(() => onPageSelect(page), [page]);

  return (
    <MuiPagination
      page={page}
      className={"flex justify-center mb-4" + (total > 0 ? "" : " hidden ")}
      count={Math.ceil(total / ITEMS_PER_PAGE)}
      shape="rounded"
      color="primary"
      onChange={(_, i) => i !== page && setPage(i)}
    />
  );
};

export default Pagination;
