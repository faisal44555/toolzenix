import { lazy } from 'react';

const MiscellaneousTools = lazy(() => import('@/pages/MiscellaneousTools'));
const RandomNumberGenerator = lazy(() => import('@/pages/RandomNumberGenerator'));
const JokeGenerator = lazy(() => import('@/pages/JokeGenerator'));
const WouldYouRatherGenerator = lazy(() => import('@/pages/WouldYouRatherGenerator'));
const TruthOrDareGenerator = lazy(() => import('@/pages/TruthOrDareGenerator'));
const Magic8Ball = lazy(() => import('@/pages/Magic8Ball'));
const NicknameGenerator = lazy(() => import('@/pages/NicknameGenerator'));
const MiscAgeCalculator = lazy(() => import('@/pages/MiscAgeCalculator'));
const CountdownTimer = lazy(() => import('@/pages/CountdownTimer'));
const FortuneCookieGenerator = lazy(() => import('@/pages/FortuneCookieGenerator'));
const DiceRoller = lazy(() => import('@/pages/DiceRoller'));
const BirthdayCountdown = lazy(() => import('@/pages/BirthdayCountdown'));
const QuoteOfTheDay = lazy(() => import('@/pages/QuoteOfTheDay'));
const FunFactGenerator = lazy(() => import('@/pages/FunFactGenerator'));
const EmojiTranslator = lazy(() => import('@/pages/EmojiTranslator'));
const CoinFlipSimulator = lazy(() => import('@/pages/CoinFlipSimulator'));
const RockPaperScissorsGame = lazy(() => import('@/pages/RockPaperScissorsGame'));

export const miscellaneousToolRoutes = [
  { path: '/miscellaneous-tools', component: MiscellaneousTools, isToolPage: false, title: "Miscellaneous Tools" },
  { path: '/random-number-generator', component: RandomNumberGenerator, isToolPage: true, title: "Random Number Generator" },
  { path: '/joke-generator', component: JokeGenerator, isToolPage: true, title: "Joke Generator" },
  { path: '/would-you-rather-generator', component: WouldYouRatherGenerator, isToolPage: true, title: "Would You Rather Generator" },
  { path: '/truth-or-dare-generator', component: TruthOrDareGenerator, isToolPage: true, title: "Truth or Dare Generator" },
  { path: '/magic-8-ball', component: Magic8Ball, isToolPage: true, title: "Magic 8 Ball" },
  { path: '/nickname-generator', component: NicknameGenerator, isToolPage: true, title: "Nickname Generator" },
  { path: '/misc-age-calculator', component: MiscAgeCalculator, isToolPage: true, title: "Age Calculator (Misc)" },
  { path: '/countdown-timer', component: CountdownTimer, isToolPage: true, title: "Countdown Timer (Misc)" },
  { path: '/fortune-cookie-generator', component: FortuneCookieGenerator, isToolPage: true, title: "Fortune Cookie Generator" },
  { path: '/dice-roller', component: DiceRoller, isToolPage: true, title: "Dice Roller" },
  { path: '/birthday-countdown', component: BirthdayCountdown, isToolPage: true, title: "Birthday Countdown" },
  { path: '/quote-of-the-day', component: QuoteOfTheDay, isToolPage: true, title: "Quote of the Day" },
  { path: '/fun-fact-generator', component: FunFactGenerator, isToolPage: true, title: "Fun Fact Generator" },
  { path: '/emoji-translator', component: EmojiTranslator, isToolPage: true, title: "Emoji Translator" },
  { path: '/coin-flip-simulator', component: CoinFlipSimulator, isToolPage: true, title: "Coin Flip Simulator" },
  { path: '/rock-paper-scissors', component: RockPaperScissorsGame, isToolPage: true, title: "Rock Paper Scissors Game" },
];