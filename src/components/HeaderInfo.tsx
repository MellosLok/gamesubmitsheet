import React from 'react';

const HeaderInfo: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-1 md:space-y-0">
            <h1 className="text-xl md:text-2xl font-bold">
              聚光灯主题游戏创作征集 #1
            </h1>
            <div className="text-sm md:text-base opacity-90">
              本期征集时间：2025年7月28日 - 2025年10月26日
            </div>
          </div>
          <div>
            <a
              href="#"
              className="inline-flex items-center text-sm md:text-base font-medium hover:underline transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // 这里可以跳转到活动详情页面
                alert('跳转到活动详情页面');
              }}
            >
              了解更多
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo; 