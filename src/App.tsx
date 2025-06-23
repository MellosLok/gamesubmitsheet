import React, { useState, useEffect } from 'react';
import { AppState, BasicInfo, Game, UserStatus, GameType, GameStatus } from './types';
import BasicInfoForm from './components/BasicInfoForm';
import GameRegistrationForm from './components/GameRegistrationForm';
import RegistrationComplete from './components/RegistrationComplete';
import HeaderInfo from './components/HeaderInfo';

// 模拟游戏数据
const mockGames: Game[] = [
  {
    id: 'game-1',
    name: '科技创新冒险',
    type: GameType.TAPPLAY,
    status: GameStatus.ONLINE,
    isRegistered: false
  },
  {
    id: 'game-2',
    name: '文化传承小游戏',
    type: GameType.MINIGAME,
    status: GameStatus.TEST,
    isRegistered: false
  },
  {
    id: 'game-3',
    name: '普通游戏',
    type: GameType.OTHER,
    status: GameStatus.ONLINE,
    isRegistered: false
  },
  {
    id: 'game-4',
    name: '草稿游戏',
    type: GameType.TAPPLAY,
    status: GameStatus.DRAFT,
    isRegistered: false
  },
  {
    id: 'game-5',
    name: '提审中游戏',
    type: GameType.MINIGAME,
    status: GameStatus.REVIEW,
    isRegistered: false
  }
];

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    basicInfo: null,
    selectedGame: null,
    userStatus: UserStatus.NO_BASIC_INFO,
    games: mockGames
  });

  // 更新用户状态
  const updateUserStatus = () => {
    if (!appState.basicInfo) {
      setAppState(prev => ({ ...prev, userStatus: UserStatus.NO_BASIC_INFO }));
    } else if (!appState.selectedGame) {
      setAppState(prev => ({ ...prev, userStatus: UserStatus.NO_GAME_REGISTERED }));
    } else {
      setAppState(prev => ({ ...prev, userStatus: UserStatus.GAME_REGISTERED }));
    }
  };

  useEffect(() => {
    updateUserStatus();
  }, [appState.basicInfo, appState.selectedGame]);

  // 处理基本报名信息提交
  const handleBasicInfoSubmit = (basicInfo: BasicInfo) => {
    setAppState(prev => ({
      ...prev,
      basicInfo,
      userStatus: UserStatus.NO_GAME_REGISTERED
    }));
  };

  // 处理游戏登记
  const handleGameRegister = (game: Game, theme: string, description: string) => {
    const updatedGame = {
      ...game,
      theme,
      description,
      isRegistered: true
    };
    
    setAppState(prev => ({
      ...prev,
      selectedGame: updatedGame,
      userStatus: UserStatus.GAME_REGISTERED
    }));
  };

  // 处理创建游戏
  const handleCreateGame = () => {
    alert('跳转到游戏创建页面');
  };

  // 处理接入游戏
  const handleIntegrateGame = () => {
    alert('跳转到游戏接入页面');
  };

  // 处理提审
  const handleSubmitReview = () => {
    alert('跳转到游戏提审页面');
  };

  // 继续投稿其他游戏
  const handleContinueSubmit = () => {
    setAppState(prev => ({
      ...prev,
      selectedGame: null,
      userStatus: UserStatus.NO_GAME_REGISTERED,
      games: prev.games.map(g =>
        prev.selectedGame && g.id === prev.selectedGame.id
          ? { ...g, isRegistered: true, theme: prev.selectedGame.theme, description: prev.selectedGame.description }
          : g
      )
    }));
  };

  const renderContent = () => {
    switch (appState.userStatus) {
      case UserStatus.NO_BASIC_INFO:
        return (
          <BasicInfoForm
            onSubmit={handleBasicInfoSubmit}
          />
        );

      case UserStatus.NO_GAME_REGISTERED:
        return (
          <GameRegistrationForm
            games={appState.games}
            onRegister={handleGameRegister}
            onCreateGame={handleCreateGame}
            onIntegrateGame={handleIntegrateGame}
            onSubmitReview={handleSubmitReview}
          />
        );

      case UserStatus.GAME_REGISTERED:
        return (
          <RegistrationComplete
            game={appState.selectedGame!}
            onContinueSubmit={handleContinueSubmit}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部信息栏 */}
      <HeaderInfo />
      
      <div className="container mx-auto px-4 py-8">
        {/* 进度指示器 */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${
              appState.userStatus !== UserStatus.NO_BASIC_INFO ? 'text-blue-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                appState.userStatus !== UserStatus.NO_BASIC_INFO ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {appState.userStatus !== UserStatus.NO_BASIC_INFO ? '✓' : '1'}
              </div>
              <span className="text-sm font-medium">基本信息</span>
            </div>
            
            <div className={`w-16 h-0.5 ${
              appState.userStatus !== UserStatus.NO_BASIC_INFO ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            
            <div className={`flex items-center space-x-2 ${
              appState.userStatus === UserStatus.GAME_REGISTERED ? 'text-blue-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                appState.userStatus === UserStatus.GAME_REGISTERED ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {appState.userStatus === UserStatus.GAME_REGISTERED ? '✓' : '2'}
              </div>
              <span className="text-sm font-medium">游戏登记</span>
            </div>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App; 