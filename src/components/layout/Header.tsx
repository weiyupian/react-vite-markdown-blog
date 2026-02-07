/**
 * 文件职责：
 * 1. 渲染全站头部区域（Logo + 桌面导航 + 移动端菜单）。
 * 2. 管理移动端汉堡菜单开关状态。
 *
 * 依赖模块：
 * - react-router 的 Link：点击 Logo 返回首页。
 * - react-icons：显示汉堡图标和关闭图标。
 * - NavLinks：复用导航链接渲染逻辑。
 * - TailwindCSS：直接通过 className 控制样式和响应式行为。
 *
 * 谁会使用它：
 * - HomePage 和 PostDetail 页面都会使用它。
 */

import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import logo from "../../assets/logo4.png";
import { NavLinks } from "./NavLinks";
import type { NavLinkItem } from "../../data/categoryConfig";

type HeaderProps = {
  links?: NavLinkItem[];
};

/**
 * Header 组件作用：
 * - 展示顶部导航。
 * - 在手机宽度下支持展开/收起移动菜单。
 *
 * 关键变量：
 * - isOpen：移动端菜单是否展开。
 * - links：导航数据（默认空数组，避免未传时报错）。
 */
export function Header({ links = [] }: HeaderProps) {
  // 移动菜单开关状态
  const [isOpen, setIsOpen] = useState(false);

  // 点击汉堡按钮时，切换开关状态
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // 点击移动菜单项后，关闭菜单
  const closeMenu = () => setIsOpen(false);

  // 桌面端链接样式
  const desktopLinkClass =
    "px-[30px] py-4 text-[18px] text-[var(--s-color)] no-underline hover:text-[var(--p-color)]";

  // 移动端链接样式
  const mobileLinkClass =
    "block w-full cursor-pointer px-1 py-1 pl-6 text-[var(--s-color)] no-underline hover:bg-[var(--s-color)] hover:text-white";

  return (
    <header className="flex flex-row items-center justify-between">
      <div className="ml-[var(--sp-lg)] h-[50px] w-[150px]">
        <Link to="/">
          <img src={logo} className="w-full" alt="Blog Logo" />
        </Link>
      </div>

      <nav
        className="hidden flex-row justify-center whitespace-nowrap min-[640px]:flex"
        aria-label="主导航"
      >
        <NavLinks
          links={links}
          linkClassName={desktopLinkClass}
          activeClassName="!text-[var(--p-color)]"
        />
      </nav>

      <button
        className="mr-10 cursor-pointer border-none bg-transparent min-[640px]:hidden"
        onClick={toggleMenu}
        aria-label={isOpen ? "关闭导航菜单" : "打开导航菜单"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
      >
        {isOpen ? <MdOutlineClose size={24} /> : <GiHamburgerMenu size={24} />}
      </button>

      {/* 仅在 isOpen 为 true 时渲染移动端菜单 */}
      {isOpen && (
        <nav
          id="mobile-nav"
          className="fixed left-0 right-0 top-[60px] z-[1000] flex flex-col bg-[var(--bg-page)] min-[640px]:hidden"
          aria-label="移动端导航"
        >
          <NavLinks
            links={links}
            linkClassName={mobileLinkClass}
            activeClassName="!bg-[var(--s-color)] !text-white"
            onItemClick={closeMenu}
          />
        </nav>
      )}
    </header>
  );
}

export default Header;
