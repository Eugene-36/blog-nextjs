export function pagination(currentPage, paginationLimit, totalPosts) {
  const offset = (currentPage - 1) * paginationLimit;
  const totalPages = Math.ceil(totalPosts / paginationLimit);
  return { offset, totalPages };
}
