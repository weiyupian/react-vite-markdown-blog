/**
 * 文件职责：
 * 1. 捕获子组件渲染过程中抛出的错误。
 * 2. 当错误发生时展示兜底页面，避免整站白屏。
 *
 * 依赖模块：
 * - React Component（类组件能力）。
 *
 * 谁会使用它：
 * - App 根组件会包裹它，让全站受保护。
 */

import { Component, type ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

/**
 * ErrorBoundary 组件作用：
 * - 这是 React 官方推荐的错误边界写法（类组件）。
 *
 * 关键变量：
 * - hasError：是否捕获到错误。
 * - error：捕获到的具体错误对象。
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // render 执行流程：
  // 1) 如果有错误，渲染兜底提示
  // 2) 否则正常渲染子组件
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40 }}>
          <h2>出错了 😢</h2>
          <p>{this.state.error?.message}</p>
          <a href="/">返回首页</a>
        </div>
      );
    }

    return this.props.children;
  }
}
