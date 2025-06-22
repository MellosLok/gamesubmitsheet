import React, { useState } from 'react';
import { Game, GameType, GameStatus } from '../types';

interface GameRegistrationFormProps {
  games: Game[];
  onRegister: (game: Game, theme: string, description: string) => void;
  onCreateGame: () => void;
  onIntegrateGame: () => void;
  onSubmitReview: () => void;
}

const GameRegistrationForm: React.FC<GameRegistrationFormProps> = ({
  games,
  onRegister,
  onCreateGame,
  onIntegrateGame,
  onSubmitReview
}) => {
  const [selectedGameId, setSelectedGameId] = useState<string>('');
  const [theme, setTheme] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [errors, setErrors] = useState<{theme?: string; description?: string}>({});

  const themes = [
    '重力',
    '盲盒',
    '永无止境的闯关',
    '缝合',
    '重启人生',
    '萌宠'
  ];

  const getStatusText = (status: GameStatus): string => {
    switch (status) {
      case GameStatus.DRAFT: return '草稿';
      case GameStatus.REVIEW: return '提审中';
      case GameStatus.TEST: return '测试';
      case GameStatus.ONLINE: return '正式上线';
      default: return '未知';
    }
  };

  const getTypeText = (type: GameType): string => {
    switch (type) {
      case GameType.TAPPLAY: return 'TapPlay';
      case GameType.MINIGAME: return '小游戏';
      case GameType.OTHER: return '其他';
      default: return '未知';
    }
  };

  const getStatusColor = (status: GameStatus): string => {
    switch (status) {
      case GameStatus.DRAFT: return 'bg-gray-100 text-gray-800';
      case GameStatus.REVIEW: return 'bg-yellow-100 text-yellow-800';
      case GameStatus.TEST: return 'bg-blue-100 text-blue-800';
      case GameStatus.ONLINE: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: GameType): string => {
    switch (type) {
      case GameType.TAPPLAY: return 'bg-purple-100 text-purple-800';
      case GameType.MINIGAME: return 'bg-orange-100 text-orange-800';
      case GameType.OTHER: return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {theme?: string; description?: string} = {};

    if (!theme) {
      newErrors.theme = '请选择主题';
    }

    if (!description) {
      newErrors.description = '请输入游戏对主题的表达说明';
    } else if (description.length < 10) {
      newErrors.description = '表达说明至少需要10个字符';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) return;
    
    const selectedGame = games.find(game => game.id === selectedGameId);
    if (selectedGame) {
      onRegister(selectedGame, theme, description);
    }
  };

  const canRegister = (game: Game): boolean => {
    // 检查是否为TapPlay或小游戏
    if (game.type === GameType.OTHER) {
      return false;
    }
    
    // 检查状态是否为正式上线或测试
    if (game.status !== GameStatus.ONLINE && game.status !== GameStatus.TEST) {
      return false;
    }
    
    return true;
  };

  const getGameIssue = (game: Game): string | null => {
    if (game.type === GameType.OTHER) {
      return '需要接入TapPlay或小游戏';
    }
    
    if (game.status === GameStatus.DRAFT) {
      return '游戏状态为草稿，需要提审';
    }
    
    if (game.status === GameStatus.REVIEW) {
      return '游戏正在提审中，请等待审核完成';
    }
    
    return null;
  };

  if (games.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">游戏登记</h2>
        
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无游戏</h3>
          <p className="text-gray-500 mb-6">您还没有创建任何游戏，请先创建游戏后再进行登记。</p>
          <button
            onClick={onCreateGame}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            创建游戏
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">游戏登记</h2>
      
      <div className="space-y-6">
        {/* 游戏选择 */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">选择游戏</h3>
          <div className="space-y-4">
            {games.map(game => {
              const disabled = game.isRegistered || !canRegister(game);
              return (
                <div
                  key={game.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    selectedGameId === game.id && !disabled
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => {
                    if (!disabled) setSelectedGameId(game.id);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-medium text-gray-900">{game.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(game.type)}`}>
                          {getTypeText(game.type)}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(game.status)}`}>
                          {getStatusText(game.status)}
                        </span>
                        {game.isRegistered && (
                          <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-gray-300 text-gray-700">已投稿</span>
                        )}
                      </div>
                      {getGameIssue(game) && (
                        <div className="flex items-center space-x-2 text-sm text-red-600">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span>{getGameIssue(game)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {game.type === GameType.OTHER && (
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            onIntegrateGame();
                          }}
                          className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                        >
                          接入
                        </button>
                      )}
                      {game.status === GameStatus.DRAFT && (
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            onSubmitReview();
                          }}
                          className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                        >
                          提审
                        </button>
                      )}
                      {canRegister(game) && !game.isRegistered && (
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="selectedGame"
                            value={game.id}
                            checked={selectedGameId === game.id}
                            onChange={e => setSelectedGameId(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-600">选择此游戏</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 主题和描述表单 */}
        {selectedGameId && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">游戏主题信息</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  所选择主题 <span className="text-red-500">*</span>
                </label>
                <select
                  value={theme}
                  onChange={(e) => {
                    setTheme(e.target.value);
                    if (errors.theme) {
                      setErrors(prev => ({ ...prev, theme: undefined }));
                    }
                  }}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.theme ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">请选择主题</option>
                  {themes.map(themeOption => (
                    <option key={themeOption} value={themeOption}>{themeOption}</option>
                  ))}
                </select>
                {errors.theme && (
                  <p className="mt-1 text-sm text-red-500">{errors.theme}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  游戏对主题的表达说明 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) {
                      setErrors(prev => ({ ...prev, description: undefined }));
                    }
                  }}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="请详细描述您的游戏如何表达所选主题..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={onCreateGame}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          创建新游戏
        </button>
        {selectedGameId && (
          <button
            onClick={handleRegister}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            登记游戏
          </button>
        )}
      </div>
    </div>
  );
};

export default GameRegistrationForm; 