import { useContext } from "react"
import { musicContext } from "../../context/useContext"
import { FaTrash } from "react-icons/fa";
import { AiFillEdit, AiFillHeart, AiOutlineHeart, AiOutlineReload } from "react-icons/ai";
import { LoadingAnimation } from "../../router/LoadingAnimation";
import { BsMusicNote } from "react-icons/bs";

export const MusicAleatory = () => {
    const{musicAleatory, activeRandomMusic, music, lodingMusic } = useContext(musicContext);
    
  return (
    <div className="overflow-auto h-screen animate__animated animate__fadeIn">
       <div className="fixed w-full z-10" style={{background: 'linear-gradient(to top, #434343, #000000)'}}>
          <h1 className=" md:text-4xl text-2xl ml-5 md:ml-10 my-5 font-bold text-white">Cola</h1>
      </div>

      <div className="md:mb-28 md:mt-[90px] mt-[80px] mb-48" >

    {
      lodingMusic ? <LoadingAnimation/> :
      activeRandomMusic ? (
        <div className="">
          {musicAleatory.map((music, i) => {
            return (
              <MusicAleatoryItem key={i + 1} music={music} index={i + 1} />
            );
          })}
        </div>
      ) : (
        <div>
          {music.map((music, i) => {
            return (
              <MusicAleatoryItem key={i + 1} music={music} index={i + 1} />
            );
          })}
        </div>
      )
    }
        
      
      </div>
    </div>
  );
}

const MusicAleatoryItem = ({music, index}) => {
    const{nombre, favorito, uid, img, fecha, duracion} = music;
    const{uidMusic,play, icon1, icon2,icon3, onSelectClickMusic, selectMusic, showBtnDeleteMusic, startUpdateFavoritoMusic,playMusic, onShowBtnDeleteMusic} = useContext(musicContext);


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
    )
}

