import React from 'react';
import { Game } from '../types';

interface RegistrationCompleteProps {
  game: Game;
  onContinueSubmit: () => void;
}

const RegistrationComplete: React.FC<RegistrationCompleteProps> = ({
  game,
  onContinueSubmit
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

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">已登记游戏</h3>
          <div className="space-y-3">
            <div>
              <p className="text-gray-900 font-medium">{game.name}</p>
              <p className="text-sm text-gray-500 mt-1">游戏ID: {game.id}</p>
            </div>
            {game.theme && (
              <div>
                <p className="text-sm text-gray-600">选择主题：<span className="font-medium text-gray-900">{game.theme}</span></p>
              </div>
            )}
            {game.description && (
              <div>
                <p className="text-sm text-gray-600">表达说明：</p>
                <p className="text-sm text-gray-900 mt-1">{game.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={onContinueSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          继续投稿其他游戏
        </button>
      </div>
    </div>
  );
};

export default RegistrationComplete; 