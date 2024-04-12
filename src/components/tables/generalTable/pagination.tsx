import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const PaginatedItems = ({ itemsLength, itemsPerPage }: IPagination) => {
  const { setQuery } = useGlobalFunctions();

  const searchParams = useSearchParams();
  const tablePage = parseInt(searchParams.get("page") || "1");

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  //   const itemsPerPage = currentItems?.length;

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  //   const endOffset = itemOffset + itemsPerPage;

  //   const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(itemsLength / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageChange = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % itemsLength;
    setItemOffset(newOffset);
    setQuery("page", event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<ChevronRight />}
      onPageChange={handlePageChange}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      forcePage={tablePage - 1}
      previousLabel={<ChevronLeft />}
      renderOnZeroPageCount={null}
      className="flex border border-border rounded text-foreground-5 overflow-x-auto max-w-max"
      pageClassName="flex [&_a]:h-10 [&_a]:px-3 [&_a]:py-1.5 border-l border-border hover:bg-muted"
      breakClassName="flex [&_a]:px-3 [&_a]:py-1.5 border-l border-border"
      nextClassName="flex [&_a]:flex [&_a]:items-center [&_a]:px-2  border-l border-border"
      previousClassName="flex [&_a]:flex [&_a]:items-center [&_a]:px-2 "
      activeClassName="bg-primary-8/50 text-primary hover:bg-primary-8/50"
    />
  );
};

export default PaginatedItems;

export interface IPagination {
  itemsPerPage: number;
  itemsLength: number;
}
