import { useContext } from "react"
import { musicContext } from "../../context/useContext"
import { FaTrash } from "react-icons/fa";
import { AiFillEdit, AiFillHeart, AiOutlineHeart, AiOutlineReload } from "react-icons/ai";
import { LoadingAnimation } from "../../router/LoadingAnimation";

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
    const{uidMusic, onSelectClickMusic, selectMusic, showBtnDeleteMusic, startUpdateFavoritoMusic, onShowBtnDeleteMusic} = useContext(musicContext);


    return (
      <div
        // onDoubleClick={() => playMusic(audio, id, name, autor , music, img)}
        onClick={() => onSelectClickMusic(uid)}
        className={` ${uidMusic === uid ? "bg-black/20" : "bg-transparent"} ${
          selectMusic === uid ? "bg-white/40 hover:bg-white/40" : "bg-black/20"
        } px-2 my-2 hover:bg-black/20 mx-2  cursor-pointer transition-all duration-200 rounded-md animate__animated animate__fadeIn `}

        onMouseOut={() => onShowBtnDeleteMusic()}
        onMouseOver={() => onShowBtnDeleteMusic(uid)}
      >
        
        <div className="text-neutral-200 grid grid-cols-[30px_600px,repeat(3,minmax(100px,_1fr))] items-center py-0.5">
          <div>
            <p>{index}</p>
          </div>

          <div
            className="flex gap-3 items-center"
          >
            
              <img
                className="object-cover object-center w-[55px] h-[40px]"
                src={img}
                alt=""
              />

            <input
              type="file"
              name="imgAudio"
              className="w-px h-px absolute"
              id={uid}
              // onChange={(e)=> onChangeImgAudioInput(e, autor, name, id, audio)}
              accept="image/*"
            />
            <label
              htmlFor={uid}
              className={`cursor-pointer absolute  left-6 top-3 text-white `}
            >
            </label>

            <div className="w-full">
              <h3
                className={`md:text-base text-sm w-full font-[500] ${
                  uidMusic === uid ? "text-secundary" : "text-white/95"
                }`}
              >
                {nombre}
              </h3>
            </div>
          </div>
          
          <div>
            <p>{fecha}</p>
          </div>
        
          
          <div className="justify-self-center">
            {
              !favorito ? <AiOutlineHeart
                onClick={()=> startUpdateFavoritoMusic(uid)}
                className={`text-secundary active:text-white/50 text-lg ${
                  showBtnDeleteMusic === uid ? "block" : "hidden"
                }`}
              /> : <AiFillHeart
                onClick={()=> startUpdateFavoritoMusic(uid)}
                className={`text-secundary active:text-white/50 text-lg ${
                  showBtnDeleteMusic === uid || favorito ? "block" : "hidden"
                }`}
              />
            }
          
        </div>

        <div>
            <p>{duracion}</p>
          </div>
        </div>
      </div>
    )
}

