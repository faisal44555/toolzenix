import { lazy } from 'react';

const GameTools = lazy(() => import('@/pages/GameTools'));
const GameDiceRoller = lazy(() => import('@/pages/GameDiceRoller'));
const PlayingCardPicker = lazy(() => import('@/pages/PlayingCardPicker'));
const MemoryTestGame = lazy(() => import('@/pages/MemoryTestGame'));
const ReactionTimeTester = lazy(() => import('@/pages/ReactionTimeTester'));
const ClickSpeedTester = lazy(() => import('@/pages/ClickSpeedTester'));
const ScoreboardTool = lazy(() => import('@/pages/ScoreboardTool'));
const GameCoinTossSimulator = lazy(() => import('@/pages/GameCoinTossSimulator'));
const SudokuGenerator = lazy(() => import('@/pages/SudokuGenerator'));
const SpinnerWheel = lazy(() => import('@/pages/SpinnerWheel'));
const NamePickerGame = lazy(() => import('@/pages/NamePickerGame'));

export const gameToolRoutes = [
  { path: '/game-tools', component: GameTools, isToolPage: false, title: "Game Tools" },
  { path: '/game-dice-roller', component: GameDiceRoller, isToolPage: true, title: "Random Dice Roller (Game)" },
  { path: '/playing-card-picker', component: PlayingCardPicker, isToolPage: true, title: "Playing Card Picker" },
  { path: '/memory-test-game', component: MemoryTestGame, isToolPage: true, title: "Memory Test Game" },
  { path: '/reaction-time-tester', component: ReactionTimeTester, isToolPage: true, title: "Reaction Time Tester" },
  { path: '/click-speed-tester', component: ClickSpeedTester, isToolPage: true, title: "Click Speed Tester (CPS)" },
  { path: '/scoreboard-tool', component: ScoreboardTool, isToolPage: true, title: "Scoreboard Tool" },
  { path: '/game-coin-toss', component: GameCoinTossSimulator, isToolPage: true, title: "Coin Toss Simulator (Game)" },
  { path: '/sudoku-generator', component: SudokuGenerator, isToolPage: true, title: "Sudoku Generator & Solver" },
  { path: '/spinner-wheel', component: SpinnerWheel, isToolPage: true, title: "Spinner Wheel" },
  { path: '/name-picker-game', component: NamePickerGame, isToolPage: true, title: "Name Picker Game" },
];