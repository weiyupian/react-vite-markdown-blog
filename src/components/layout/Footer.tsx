/**
 * 文件职责：
 * 1. 渲染全站页脚（Logo、导航、版权信息）。
 * 2. 与 Header 共用一套导航数据，保持体验一致。
 *
 * 依赖模块：
 * - react-router 的 Link：Logo 返回首页。
 * - NavLinks：渲染页脚导航链接。
 * - TailwindCSS：直接通过 className 管理样式。
 *
 * 谁会使用它：
 * - HomePage 页面会使用它。
 */

import { Link } from "react-router";
import logo from "../../assets/logo4.png";
import { NavLinks } from "./NavLinks";
import type { NavLinkItem } from "../../data/categoryConfig";

type FooterProps = {
  links?: NavLinkItem[];
};

/**
 * Footer 组件作用：
 * - 显示底部导航和版权区。
 *
 * 关键变量：
 * - links：页脚导航配置。
 */
export function Footer({ links = [] }: FooterProps) {
  return (
    <footer className="mb-5 mt-[70px] flex flex-col items-center justify-center">
      <div className="h-[50px] w-[150px]">
        <Link to="/">
          <img src={logo} className="w-full" alt="Blog Logo" />
        </Link>
      </div>

      <nav className="flex flex-col min-[640px]:flex-row" aria-label="页脚导航">
        <NavLinks
          links={links}
          linkClassName="px-[30px] py-4 text-[18px] text-black no-underline hover:text-[var(--p-color)]"
          activeClassName="!text-[var(--p-color)]"
        />
      </nav>

      <div>© 2026 blog for react</div>
    </footer>
  );
}

export default Footer;
