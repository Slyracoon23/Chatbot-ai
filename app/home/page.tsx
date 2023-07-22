'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Spotlight from '../../components/spotlight';

export default function HomePage() {
    const [isHeroVisible, setIsHeroVisible] = useState(true);
  
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


  return (
    <div className="App flex h-screen items-center justify-center bg-black">
    {isHeroVisible && (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isHeroVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
          <div className="Hero inline-flex h-80 w-[550px] flex-col items-center justify-start gap-5">
            <div className="HeroContent relative h-[252px] w-[550px]">
              <div className="HeroContent absolute left-0 top-0 inline-flex w-[550px] flex-col items-center justify-center gap-4">
                <div className="Div inline-flex shrink grow basis-0 flex-col items-center justify-center gap-4 self-stretch">
                  <div className="ProjectTitle w-[270px] text-center text-[64px] font-bold leading-[73px] text-white">GraphID</div>
                  <div className="Slogan text-[32px] font-semibold text-white">Your Digital Universe, Mapped Out</div>
                </div>
                <div className="MisionStatement w-[461px] text-center text-base font-normal leading-normal tracking-wide text-white">Reimagine how you share, manage, and visualize your digital data across Web2 and Web3</div>
              </div>
              <div className="InputBox absolute left-[101.42px] top-[212px] inline-flex h-10 w-[365.16px] items-center justify-start gap-[10.32px] rounded-lg border border-white border-opacity-10 bg-white bg-opacity-5 px-[10.32px] py-[6.45px] opacity-60 backdrop-blur-[85.16px]">
                <div className="Cksearch relative h-[20.65px] w-[20.65px]"></div>
                <div className="Label text-center text-base font-normal leading-normal tracking-tight text-white text-opacity-60">START SEARCH WITH SPACEBAR</div>
              </div>
            </div>
            <div
              className="Button inline-flex h-12 w-[174px] items-center justify-center gap-2.5 rounded-[72px] bg-neutral-200 px-4 py-2"
              onClick={handleConnectClick}
            >
              <div className="Continue text-base font-medium leading-normal text-black">Connect</div>
            </div>
          </div>
        </motion.div>
      )}
      <Spotlight/>
    </div>
  );
}