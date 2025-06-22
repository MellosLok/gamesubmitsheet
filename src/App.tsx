import React, { useState, useEffect } from 'react';
import { AppState, BasicInfo, Game, UserStatus, GameType, GameStatus } from './types';
import BasicInfoForm from './components/BasicInfoForm';
import GameRegistration from './components/GameRegistration';
import RegistrationComplete from './components/RegistrationComplete';

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

  const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);

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
    setIsEditingBasicInfo(false);
  };

  // 处理游戏登记
  const handleGameRegister = (game: Game) => {
    setAppState(prev => ({
      ...prev,
      selectedGame: game,
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

  // 处理编辑基本信息
  const handleEditBasicInfo = () => {
    setIsEditingBasicInfo(true);
  };

  // 处理更换游戏
  const handleChangeGame = () => {
    setAppState(prev => ({
      ...prev,
      selectedGame: null,
      userStatus: UserStatus.NO_GAME_REGISTERED
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
          <div className="space-y-6">
            <BasicInfoForm
              initialData={appState.basicInfo!}
              onSubmit={handleBasicInfoSubmit}
              onEdit={handleEditBasicInfo}
              isEditing={isEditingBasicInfo}
            />
            
            {!isEditingBasicInfo && (
              <GameRegistration
                games={appState.games}
                onRegister={handleGameRegister}
                onCreateGame={handleCreateGame}
                onIntegrateGame={handleIntegrateGame}
                onSubmitReview={handleSubmitReview}
              />
            )}
          </div>
        );

      case UserStatus.GAME_REGISTERED:
        return (
          <div className="space-y-6">
            {isEditingBasicInfo ? (
              <BasicInfoForm
                initialData={appState.basicInfo!}
                onSubmit={handleBasicInfoSubmit}
                onEdit={handleEditBasicInfo}
                isEditing={isEditingBasicInfo}
              />
            ) : (
              <>
                <BasicInfoForm
                  initialData={appState.basicInfo!}
                  onSubmit={handleBasicInfoSubmit}
                  onEdit={handleEditBasicInfo}
                  isEditing={isEditingBasicInfo}
                />
                
                <RegistrationComplete
                  game={appState.selectedGame!}
                  onEditBasicInfo={handleEditBasicInfo}
                  onChangeGame={handleChangeGame}
                />
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">活动报名后台</h1>
          <p className="text-gray-600">欢迎参加本期征集活动，请按照步骤完成报名</p>
        </div>

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