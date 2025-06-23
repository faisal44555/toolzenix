import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Keyboard, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const keyLayout = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ContextMenu', 'ControlRight']
];

const keyDisplayNames = {
  Backquote: '`', Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5', Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', Digit0: '0', Minus: '-', Equal: '=', Backspace: 'Backspace',
  Tab: 'Tab', KeyQ: 'Q', KeyW: 'W', KeyE: 'E', KeyR: 'R', KeyT: 'T', KeyY: 'Y', KeyU: 'U', KeyI: 'I', KeyO: 'O', KeyP: 'P', BracketLeft: '[', BracketRight: ']', Backslash: '\\',
  CapsLock: 'Caps Lock', KeyA: 'A', KeyS: 'S', KeyD: 'D', KeyF: 'F', KeyG: 'G', KeyH: 'H', KeyJ: 'J', KeyK: 'K', KeyL: 'L', Semicolon: ';', Quote: "'", Enter: 'Enter',
  ShiftLeft: 'Shift', KeyZ: 'Z', KeyX: 'X', KeyC: 'C', KeyV: 'V', KeyB: 'B', KeyN: 'N', KeyM: 'M', Comma: ',', Period: '.', Slash: '/', ShiftRight: 'Shift',
  ControlLeft: 'Ctrl', MetaLeft: 'Win/Cmd', AltLeft: 'Alt', Space: 'Space', AltRight: 'Alt', MetaRight: 'Win/Cmd', ContextMenu: 'Menu', ControlRight: 'Ctrl',
  
  ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→',
  Escape: 'Esc',
  F1: 'F1', F2: 'F2', F3: 'F3', F4: 'F4', F5: 'F5', F6: 'F6', F7: 'F7', F8: 'F8', F9: 'F9', F10: 'F10', F11: 'F11', F12: 'F12',
  PrintScreen: 'PrtSc', ScrollLock: 'Scroll Lock', Pause: 'Pause',
  Insert: 'Ins', Home: 'Home', PageUp: 'PgUp', Delete: 'Del', End: 'End', PageDown: 'PgDn',
  Numpad0: 'Num 0', Numpad1: 'Num 1', Numpad2: 'Num 2', Numpad3: 'Num 3', Numpad4: 'Num 4',
  Numpad5: 'Num 5', Numpad6: 'Num 6', Numpad7: 'Num 7', Numpad8: 'Num 8', Numpad9: 'Num 9',
  NumpadDecimal: 'Num .', NumpadAdd: 'Num +', NumpadSubtract: 'Num -', NumpadMultiply: 'Num *', NumpadDivide: 'Num /',
  NumpadEnter: 'Num Enter', NumLock: 'Num Lock'
};


const KeyboardTester = () => {
  const { toast } = useToast();
  const [pressedKeys, setPressedKeys] = useState({});
  const [lastPressed, setLastPressed] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [keysToTest, setKeysToTest] = useState(new Set(keyLayout.flat()));
  const [testedKeys, setTestedKeys] = useState(new Set());

  const handleKeyDown = useCallback((e) => {
    if (!testStarted) return;
    e.preventDefault();
    const { key, code, keyCode, ctrlKey, altKey, shiftKey, metaKey } = e;
    
    setPressedKeys(prev => ({ ...prev, [code]: true }));
    setLastPressed({ key, code, keyCode, ctrlKey, altKey, shiftKey, metaKey });
    
    if (keysToTest.has(code)) {
      setTestedKeys(prev => new Set(prev).add(code));
    }

    toast({
      title: `Key Pressed: ${keyDisplayNames[code] || key}`,
      description: `Code: ${code}, Ctrl: ${ctrlKey}, Alt: ${altKey}, Shift: ${shiftKey}, Meta: ${metaKey}`,
    });
  }, [testStarted, toast, keysToTest]);

  const handleKeyUp = useCallback((e) => {
    if (!testStarted) return;
    e.preventDefault();
    setPressedKeys(prev => ({ ...prev, [e.code]: false }));
  }, [testStarted]);

  useEffect(() => {
    if (testStarted) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [testStarted, handleKeyDown, handleKeyUp]);

  const startTest = () => {
    setTestStarted(true);
    setPressedKeys({});
    setLastPressed(null);
    setTestedKeys(new Set());
    toast({ title: "Keyboard Test Started", description: "Press any key to see its information." });
  };

  const resetTest = () => {
    setTestStarted(false);
    setPressedKeys({});
    setLastPressed(null);
    setTestedKeys(new Set());
    toast({ title: "Keyboard Test Reset", description: "Click 'Start Test' to begin again." });
  };
  
  const getSpecialKeyWidth = (code) => {
    switch (code) {
      case 'Backspace': return 'w-28';
      case 'Tab': return 'w-20';
      case 'CapsLock': return 'w-28';
      case 'Enter': return 'w-28';
      case 'ShiftLeft': return 'w-36';
      case 'ShiftRight': return 'w-36';
      case 'Space': return 'w-72';
      default: return 'w-14';
    }
  };

  const allKeysTested = testedKeys.size === keysToTest.size && keysToTest.size > 0;

  return (
    <>
      <Helmet>
        <title>Keyboard Tester - Toolzenix</title>
        <meta name="description" content="Test your keyboard keys online. Check if all keys are working correctly with our interactive keyboard tester." />
        <link rel="canonical" href="https://toolzenix.com/keyboard-tester" />
      </Helmet>

      <motion.div 
        className="max-w-4xl mx-auto p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 shadow-xl">
          <CardHeader className="text-center text-white">
            <motion.div 
              initial={{ scale: 0.8, rotate: -5 }} 
              animate={{ scale: 1, rotate: 0 }} 
              transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}
              className="mx-auto mb-4 w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Keyboard className="w-10 h-10" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">Keyboard Tester</CardTitle>
            <CardDescription className="text-indigo-100 dark:text-indigo-200">
              Press keys on your keyboard to see them light up and verify their functionality.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 bg-white dark:bg-slate-800/80 backdrop-blur-sm">
            <div className="flex justify-center gap-4 mb-6">
              {!testStarted ? (
                <Button onClick={startTest} size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                  <CheckCircle className="mr-2 h-5 w-5" /> Start Test
                </Button>
              ) : (
                <Button onClick={resetTest} size="lg" variant="destructive">
                  <AlertCircle className="mr-2 h-5 w-5" /> Reset Test
                </Button>
              )}
            </div>

            {testStarted && lastPressed && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg shadow text-sm"
              >
                <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-100">Last Key Pressed:</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <p><strong className="text-slate-600 dark:text-slate-300">Key:</strong> {lastPressed.key}</p>
                  <p><strong className="text-slate-600 dark:text-slate-300">Code:</strong> {lastPressed.code}</p>
                  <p><strong className="text-slate-600 dark:text-slate-300">KeyCode (Legacy):</strong> {lastPressed.keyCode}</p>
                  <p><strong className="text-slate-600 dark:text-slate-300">Ctrl:</strong> {lastPressed.ctrlKey ? 'Yes' : 'No'}</p>
                  <p><strong className="text-slate-600 dark:text-slate-300">Alt:</strong> {lastPressed.altKey ? 'Yes' : 'No'}</p>
                  <p><strong className="text-slate-600 dark:text-slate-300">Shift:</strong> {lastPressed.shiftKey ? 'Yes' : 'No'}</p>
                  <p><strong className="text-slate-600 dark:text-slate-300">Meta:</strong> {lastPressed.metaKey ? 'Yes' : 'No'}</p>
                </div>
              </motion.div>
            )}
            
            {testStarted && (
              <div className="mb-4 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Tested {testedKeys.size} of {keysToTest.size} standard keys.
                </p>
                {allKeysTested && (
                  <motion.p 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-green-600 dark:text-green-400 font-semibold mt-1"
                  >
                    All standard keys tested successfully!
                  </motion.p>
                )}
              </div>
            )}

            <div className="p-2 sm:p-4 bg-slate-200 dark:bg-slate-900 rounded-lg shadow-inner select-none">
              {keyLayout.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center mb-1 sm:mb-2">
                  {row.map((keyName) => {
                    const isPressed = pressedKeys[keyName];
                    const isTested = testedKeys.has(keyName);
                    return (
                      <motion.div
                        key={keyName}
                        className={`
                          ${getSpecialKeyWidth(keyName)} h-12 sm:h-14 flex items-center justify-center m-0.5 sm:m-1 
                          border border-slate-300 dark:border-slate-700 rounded-md text-xs sm:text-sm font-medium shadow
                          ${isPressed ? 'bg-blue-500 text-white scale-95' : (isTested && testStarted ? 'bg-green-300 dark:bg-green-700' : 'bg-slate-50 dark:bg-slate-800')}
                          ${isPressed ? 'dark:bg-blue-600' : ''}
                          ${testStarted ? 'cursor-default' : 'cursor-not-allowed opacity-70'}
                          transition-all duration-50 ease-out
                        `}
                        whileTap={testStarted ? { scale: 0.90 } : {}}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {keyDisplayNames[keyName] || keyName}
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
            
            {!testStarted && (
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-600 rounded-lg text-center">
                <Info className="w-6 h-6 mx-auto mb-2 text-yellow-600 dark:text-yellow-400" />
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Click "Start Test" to activate the keyboard tester.
                </p>
              </div>
            )}
             <motion.p 
              className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              This tool helps identify faulty keys. Some special keys or non-standard keyboard layouts might not be fully represented.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default KeyboardTester;