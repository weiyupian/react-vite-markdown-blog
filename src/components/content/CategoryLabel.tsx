/**
 * 文件职责：
 * 1. 在首页/分类页顶部显示当前栏目标签。
 * 2. 根据是否有 category 参数，切换显示“分类名”或“归档”。
 *
 * 依赖模块：
 * - TailwindCSS：通过 className 管理标题样式。
 *
 * 谁会使用它：
 * - HomePage 页面会使用它。
 */

/**
 * CategoryLabel 组件作用：
 * - 展示页面当前所属分类。
 *
 * 关键变量：
 * - category：路由里的分类名，例如 "programming"。
 */
type CategoryLabelProps = {
  category?: string;
};

export function CategoryLabel({ category }: CategoryLabelProps) {
  return (
    <div className="mb-[var(--sp-lg)] mt-[var(--sp-lg)] flex flex-row items-center justify-center pl-5 max-[768px]:flex-col max-[768px]:text-center">
      <div className="h-[60px] flex-1 whitespace-nowrap text-[40px] font-bold text-[var(--p-color)]">
        {category ? `CATEGORY: ${category}` : '归档'}
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
