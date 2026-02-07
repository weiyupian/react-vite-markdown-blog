/**
 * 文件职责：
 * 1. 抽离通用导航链接渲染逻辑，避免 Header/Footer 重复 map。
 * 2. 统一处理 active 状态和首页 end 匹配规则。
 *
 * 依赖模块：
 * - react-router 的 NavLink：自动识别当前路由是否激活。
 *
 * 谁会使用它：
 * - Header 和 Footer 都会复用本组件。
 */

import { NavLink } from "react-router";
import type { NavLinkItem } from "../../data/categoryConfig";

type NavLinksProps = {
  links?: NavLinkItem[];
  linkClassName: string;
  activeClassName: string;
  onItemClick?: () => void;
};

/**
 * NavLinks 组件作用：
 * - 根据 links 配置渲染一组导航链接。
 *
 * 关键变量：
 * - links：导航项数组，格式如 { label, to }。
 * - linkClassName：普通链接样式类名。
 * - activeClassName：激活链接样式类名。
 * - onItemClick：点击某个链接时的回调（移动端关菜单会用到）。
 */
export function NavLinks({
  links = [],
  linkClassName,
  activeClassName,
  onItemClick,
}: NavLinksProps) {
  // 执行流程：
  // 1) 遍历 links
  // 2) 渲染 NavLink
  // 3) 根据 isActive 自动拼接激活样式
  return links.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      end={link.to === "/"}
      className={({ isActive }) =>
        [linkClassName, isActive ? activeClassName : ""].join(" ").trim()
      }
      onClick={onItemClick}
    >
      {link.label}
    </NavLink>
  ));
}
