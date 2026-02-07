/**
 * 文件职责：
 * 1. 管理分页状态（当前页、总页数、当前页数据）。
 * 2. 提供分页操作方法（跳页、上一页、下一页）。
 *
 * 依赖模块：
 * - React 的 useState。
 *
 * 谁会使用它：
 * - PaginatedPostGrid 组件。
 */

import { useState } from 'react';

type UsePaginationOptions = {
  pageSize?: number;
  onPageChange?: (nextPage: number) => void;
};

type UsePaginationResult<T> = {
  currentPage: number;
  totalPages: number;
  pageItems: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

/**
 * usePagination 作用：
 * - 把任意数组 items 按 pageSize 做分页。
 * - 返回分页状态和控制函数。
 *
 * 关键变量：
 * - items：要分页的原始数组。
 * - pageSize：每页条数。
 * - currentPage：当前页码（状态）。
 * - totalPages：总页数（至少是 1，避免边界报错）。
 * - pageItems：当前页对应的数据切片。
 */
export function usePagination<T>(
  items: T[],
  options: UsePaginationOptions = {},
): UsePaginationResult<T> {
  const {
    pageSize = 6,
    onPageChange,
  } = options;

  const [currentPage, setCurrentPage] = useState(1);

  // 计算总页数：最少返回 1，避免空数组时页码变成 0
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  // 防止 currentPage 超过 totalPages（例如切换分类后数据变少）
  const safePage = Math.min(currentPage, totalPages);

  // 根据 safePage 计算当前页数据范围
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = items.slice(start, end);

  // 跳到任意页：会自动限制在 [1, totalPages] 范围内
  const goToPage = (page: number) => {
    const next = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(next);
    onPageChange?.(next);
  };

  const nextPage = () => {
    if (safePage < totalPages) {
      goToPage(safePage + 1);
    }
  };

  const prevPage = () => {
    if (safePage > 1) {
      goToPage(safePage - 1);
    }
  };

  // 返回给组件使用的分页能力
  return {
    currentPage: safePage,
    totalPages,
    pageItems,
    goToPage,
    nextPage,
    prevPage,
  };
}
