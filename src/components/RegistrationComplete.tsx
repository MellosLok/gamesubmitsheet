import React from 'react';
import { Game } from '../types';

interface RegistrationCompleteProps {
  game: Game;
  onEditBasicInfo: () => void;
  onChangeGame: () => void;
}

const RegistrationComplete: React.FC<RegistrationCompleteProps> = ({
  game,
  onEditBasicInfo,
  onChangeGame
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-8">
        <div className="text-green-500 mb-4">
          <svg className="mx-auto h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">报名成功！</h2>
        <p className="text-gray-600">您正在以【{game.name}】参加本期征集活动</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 mt-1">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-800 mb-1">了解更多</h3>
            <p className="text-sm text-blue-700 mb-2">
              查看活动详情、规则说明和最新动态，获取更多关于本期征集活动的信息。
            </p>
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium underline"
              onClick={(e) => {
                e.preventDefault();
                // 这里可以跳转到建站器或活动详情页面
                alert('跳转到建站器页面');
              }}
            >
              查看活动详情 →
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">已登记游戏</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 font-medium">{game.name}</p>
              <p className="text-sm text-gray-500 mt-1">游戏ID: {game.id}</p>
            </div>
            <button
              onClick={onChangeGame}
              className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              更换游戏
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">报名信息</h3>
          <p className="text-gray-600 mb-3">您的报名信息已提交，如需修改请联系管理员。</p>
          <button
            onClick={onEditBasicInfo}
            className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            查看报名信息
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="text-yellow-500 mt-1">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-yellow-800 mb-1">注意事项</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 请确保游戏内容符合活动主题要求</li>
              <li>• 活动期间请保持游戏正常运行</li>
              <li>• 如有问题请及时联系活动主办方</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationComplete; 