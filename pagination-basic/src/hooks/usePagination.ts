export interface Props {
  count: number; // 전체 페이지 수
  page: number; // 현재 페이지
  onPageChange: (page: number) => void;
  disabled?: boolean; // 버튼 비활성화
  siblingCount?: number; // 현제 페이지 주변 페이지 표출 갯수
  boundaryCount?: number; // 첫 페이지, 마지막 페이지 주변 페이지 표출 갯수
}

const usePagination = ({
  count,
  page,
  onPageChange,
  disabled,
  siblingCount = 1,
  boundaryCount = 1,
}: Props) => {
  // 전체 범위 : [1, 2, 3, ........ 99, 100]
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }).map((_, index) => index + start);

  const startPage = 1; // 시작 페이지
  const endPage = count; // 마지막 페이지

  // [1, 2] ... 6, 7, 8 ... 99, 100
  // [1, 2, 3] ... 6, 7, 8 ... 98, 99, 100
  const startPages = range(startPage, Math.min(boundaryCount, count));
  // 1, 2 ... 6, 7, 8 ... [99, 100]
  // 1, 2, 3 ... 6, 7, 8 ... [98, 99, 100]
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );
  // 1, 2 ... [6], 7, 8 ... 99, 100
  const siblingStart = Math.max(
    Math.min(
      page + 1 - siblingCount,
      count - boundaryCount - siblingCount * 2 - 1
    ),
    boundaryCount + 2
  );
  // 1, 2 ... 6, 7, [8] ... 99, 100
  const siblingEnd = Math.min(
    Math.max(page + 1 + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : endPage - 1
  );

  const itemList = [
    "prev",
    ...startPages,
    ...(siblingStart > boundaryCount + 2
      ? ["start-ellipsis"]
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),
    ...range(siblingStart, siblingEnd),
    ...(siblingEnd < count - boundaryCount - 1
      ? ["end-ellipsis"]
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),
    ...endPages,
    "next",
  ];

  const items = itemList.map((item, index) =>
    typeof item === "number"
      ? {
          key: index,
          onClick: () => onPageChange(item - 1),
          disabled,
          selected: item - 1 === page,
          item,
        }
      : {
          key: index,
          onClick: () => onPageChange(item === "next" ? page + 1 : page - 1),
          disabled:
            disabled ||
            item.indexOf("ellipsis") > -1 ||
            (item === "next" ? page >= count - 1 : page < 1),
          selected: false,
          item,
        }
  );

  return { items };
};

export default usePagination;
