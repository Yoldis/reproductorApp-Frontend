import { useContext, useEffect, useState } from "react"
import { musicContext } from "../../context/useContext"
import { LoadingAnimation } from "../../router/LoadingAnimation";
import { FaTrash } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart, BsMusicNote } from "react-icons/all";


export const Music = () => {
    const{music, lodingMusic} = useContext(musicContext);

  return (
    <div className={`animate__animated animate__fadeIn overflow-auto h-screen select-none`}>
    <div className="fixed w-full z-10 overflow-x-hidden" style={{background: 'linear-gradient(to top, #434343, #000000)'}}>
          <h1 className=" md:text-4xl text-xl  md:ml-10 my-5 font-bold text-white">Lista de Reproducción</h1>
      </div>  

      <div className="cursor-default md:mb-28  md:mt-[90px] mt-[80px] mb-48" >
      <header className="text-secundary font-medium md:flex items-center my-4 p-2 border-b border-neutral-200 hidden">
        <h2 className="ml-2 w-[40px]">#</h2>
        <h2 className="w-[44%]">Titulo</h2>
        <h2 className="w-[22%]">Fecha en que se añadio</h2>
        <h2></h2>
        <h2>Duración</h2>
      </header>

      {lodingMusic ? (
        <LoadingAnimation />
        ) : (
          <div className="">
          {music.map((music, i) => {
            return <MusicItem  key={i + 1} music={music} index={i + 1} />;
          })}
        </div>
      )}
      </div>
    </div>
  );
}

const MusicItem = ({music, index}) => {
    const{nombre, favorito, uid, img, fecha, duracion} = music;
        const{playMusic, uidMusic, onSelectClickMusic, selectMusic, showBtnDeleteMusic, onShowBtnDeleteMusic, startDeleteOneMusicDB,  startUpdateFavoritoMusic, play, icon1, icon2, icon3, } = useContext(musicContext);
  
        // ${uidMusic === uid ? "bg-black/20" : "bg-transparent"}
  
    return (
      <div
        onClick={() => onSelectClickMusic(uid)}
        className={`  ${
          selectMusic === uid
            ? "bg-black/20 hover:bg-black/20"
            : "bg-transparent"
        } px-2 m-2 hover:bg-black/20 cursor-pointer transition-all duration-200 rounded-md animate__animated animate__fadeIn md:text-base text-sm flex items-center`}
        onMouseOut={() => onShowBtnDeleteMusic()}
        onMouseOver={() => onShowBtnDeleteMusic(uid)}
      >
        <div
          onDoubleClick={() => playMusic(music)}
          className="text-neutral-200 w-[97%] items-center py-0.5 grid md:gap-0 md:grid-cols-2"
        >
          <div className="flex gap-1 items-center">
            <div className="w-[40px]">
              {uidMusic === uid ? (
                <ul className="grid grid-cols-3 relative right-1.5">
                  <BsMusicNote
                    className={`${play && icon1} text-secundary text-sm`}
                  />
                  <BsMusicNote
                    className={`${play && icon2} text-secundary text-sm`}
                  />
                  <BsMusicNote
                    className={`${play && icon3} text-secundary text-sm`}
                  />
                </ul>
              ) : (
                <p className="">{index}</p>
              )}
            </div>

            <img
              className="object-cover object-center w-[55px] h-[40px]"
              src={img}
              alt=""
            />

            <div className="w-full">
              <h3
                className={`ml-3 font-[500] ${
                  uidMusic === uid ? "text-secundary" : "text-white/95"
                }`}
              >
                {nombre}
              </h3>
            </div>
          </div>

          <div className="flex gap-3 mt-1.5 items-center">
            <div className="md:w-[60%]">
              <p>{fecha}</p>
            </div>

            <div className="md:w-[100px]">
              {!favorito ? (
                <AiOutlineHeart
                  onClick={() => startUpdateFavoritoMusic(uid)}
                  className={`text-secundary active:text-white/50 text-lg ${
                    showBtnDeleteMusic === uid ? "block" : "hidden"
                  }`}
                />
              ) : (
                <AiFillHeart
                  onClick={() => startUpdateFavoritoMusic(uid)}
                  className={`text-secundary active:text-white/50 text-lg ${
                    showBtnDeleteMusic === uid || favorito ? "block" : "hidden"
                  }`}
                />
              )}
            </div>

            <div className="md:w-[calc(100%-5px)]">
              <p>{duracion}</p>
            </div>
          </div>
        </div>

        <div className="">
          <FaTrash
            onClick={() => startDeleteOneMusicDB(uid)}
            className={`text-red-400 active:text-white/50 md:text-base text-sm ${
              showBtnDeleteMusic === uid ? "block" : "hidden"
            }`}
          />
        </div>
      </div>
    );
}