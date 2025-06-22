// 游戏状态枚举
export enum GameStatus {
  DRAFT = 'draft',           // 草稿
  REVIEW = 'review',         // 提审中
  TEST = 'test',             // 测试
  ONLINE = 'online'          // 正式上线
}

// 游戏类型枚举
export enum GameType {
  TAPPLAY = 'tapplay',       // TapPlay
  MINIGAME = 'minigame',     // 小游戏
  OTHER = 'other'            // 其他
}

// 游戏信息类型
export interface Game {
  id: string;
  name: string;
  type: GameType;
  status: GameStatus;
  isRegistered: boolean;
  theme?: string;           // 选择的主题
  description?: string;     // 对主题的表达说明
}

// 用户状态枚举
export enum UserStatus {
  NO_GAME_REGISTERED = 'no_game_registered', // 未登记游戏
  GAME_REGISTERED = 'game_registered'  // 已登记游戏
}

// 应用状态类型
export interface AppState {
  selectedGame: Game | null;
  userStatus: UserStatus;
  games: Game[];
} 