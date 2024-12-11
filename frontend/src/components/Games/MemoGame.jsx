import React from 'react';
import GameBoard from '../MemoGame/GameBoard';
import SideBar from '../MemoGame/SideBar';
import GameContextProvider from '../MemoGame/context/GameContextProvider';
import Overlay from '../MemoGame/Overlay';
import appBg from '../MemoGame/images/app-bg.jpg'
import gameBoardImg from '../MemoGame/images/gameboard.png'


const MemoGame = () => {
  return (
    <GameContextProvider>
      <main className="relative overflow-hidden h-screen w-screen flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${appBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className=" absolute bg-gradient-to-r from-[#5ec73e] to-[#5ec808] opacity-50 w-full h-full" />
        <div className=" relative -mt-28 md:mt-10 md:-ms-72 lg:ms-0 w-[34rem] h-[34rem] md:w-[40rem] md:h-[40rem]"
        style={{
          backgroundImage: `url(${gameBoardImg})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
          <GameBoard />
          <SideBar />
        </div>
        <Overlay />
      </main>
    </GameContextProvider>
  );
};

export default MemoGame;