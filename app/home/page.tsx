"use client" 

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spotlight from '../../components/spotlight';

export default function HomePage() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const handleKeydown = (event: { key: string; }) => {
      if (event.key === ' ') {
        setIsHeroVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleConnectClick = () => {
    setIsHeroVisible(false);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="App flex h-screen items-center justify-center bg-black">
      <div className="Hero inline-flex h-80 w-[550px] flex-col items-center justify-start gap-5">
        <div className="HeroContent relative h-[252px] w-[550px]">
          <AnimatePresence>
            {!isInputFocused && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isHeroVisible ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="HeroContent absolute left-0 top-0 inline-flex w-[550px] flex-col items-center justify-center gap-4">
                  <div className="Div inline-flex shrink grow basis-0 flex-col items-center justify-center gap-4 self-stretch">
                    <div className="ProjectTitle w-[270px] text-center text-[64px] font-bold leading-[73px] text-white">GraphID</div>
                    <div className="Slogan text-[32px] font-semibold text-white">Your Digital Universe, Mapped Out</div>
                  </div>
                  <div className="MisionStatement w-[461px] text-center text-base font-normal leading-normal tracking-wide text-white">Reimagine how you share, manage, and visualize your digital data across Web2 and Web3</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            initial={{ scale: 1, y: 0 }}
            animate={{ scale: isInputFocused ? 1.5 : 1, y: isInputFocused ? -50 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              className="InputBox absolute left-[101.42px] top-[212px] inline-flex h-10 w-[365.16px] items-center justify-start gap-[10.32px] rounded-lg border border-white border-opacity-10 bg-white bg-opacity-5 px-[10.32px] py-[6.45px] opacity-60 backdrop-blur-[85.16px]"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Start search with spacebar"
            />
          </motion.div>
        </div>
        <AnimatePresence>
          {!isInputFocused && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="Button inline-flex h-12 w-[174px] items-center justify-center gap-2.5 rounded-[72px] bg-neutral-200 px-4 py-2"
                onClick={handleConnectClick}
              >
                <div className="Continue text-base font-medium leading-normal text-black">Connect</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Spotlight/>
    </div>
  );
}
