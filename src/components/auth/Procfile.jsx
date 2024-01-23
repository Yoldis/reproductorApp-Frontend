import { useContext,  useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { authContext, musicContext } from "../../context/useContext";
import { AiFillHeart } from "react-icons/ai";
import { LoadingAnimation } from "../../router/LoadingAnimation";
import { BsMusicNote } from "react-icons/bs";
import { Audio } from "react-loader-spinner";

export const Procfile = () => {

  const {user:{nombre, img}, loadImgProcfile, onChangeInputFile, setToogleProcfileDetails , setOpacityFocus} = useContext(authContext);
  
  const{musicFavorite, lodingMusic} = useContext(musicContext);
  const [opacity, setOpacity] = useState("");
  const [hidden, setHidden] = useState('hidden');
  

  const hoverEnterPhotoURL = () => {
    setOpacity('opacity-50');
    setHidden('flex');
  }

  const hoverLeavePhotoURL = () => {
    setOpacity('');
    setHidden('hidden');
  }

  const onShowProcfileDetails = () => {
    setToogleProcfileDetails('block');
    setOpacityFocus('opacity-50');
  }

  return (
    <div
      className={`mt-5 text-white animate__animated animate__fadeIn select-none overflow-auto h-[90vh]`}
    >
      <div className="ml-5 flex flex-wrap mx-3 gap-5">
        <div className="w-52 h-52 rounded-full">
          <img
            src={img}
            className={` h-52 w-52  object-cover drop-shadow-2xl rounded-full  shadow-2xl ${opacity}`}
            alt=""
            onMouseOver={hoverEnterPhotoURL}
            onMouseOut={hoverLeavePhotoURL}
          />

          <label
            htmlFor="file"
            className="z-0 cursor-pointer"
            onClick={onShowProcfileDetails}
          >
            <div
              onMouseOut={hoverLeavePhotoURL}
              onMouseOver={hoverEnterPhotoURL}
              className={`relative bottom-[210px] w-52 h-52 rounded-full z-1 object-cover ${hidden} justify-center flex-col items-center cursor-pointer`}
            >
              <input
                type="file"
                name="file"
                className="w-px h-px  "
                id="file"
                onChange={onChangeInputFile}
                accept="'image/*"
                disabled={true && loadImgProcfile}
              />
              <FiEdit2 className="text-6xl" />
              <p>Elegir Foto</p>
            </div>
          </label>
        </div>

        <div className="mt-6 font-bold">
          <p className="">Perfil</p>
          <h3
            onClick={onShowProcfileDetails}
            className="md:text-8xl text-3xl  cursor-pointer"
          >
            {nombre}
          </h3>
        </div>
      </div>

      <section className="mt-10 mb-[80px]">
        <header className="flex flex-wrap gap-2">
          <h1 className="ml-2 text-secundary font-bold md:text-3xl text-lg">
            Musica que te gustan!
          </h1>
          <AiFillHeart className="text-secundary font-semibold md:text-3xl text-lg md:self-end self-center" />
        </header>

        <div className="cursor-default md:mb-0 mt-5 mb-[140px] ">
          <div className="text-secundary font-medium md:grid grid-cols-[45px_2fr_1fr_45px_1fr] my-4 p-2 border-b border-neutral-200 w-full hidden">
            <h2 className='ml-2'>#</h2>
            <h2>Titulo</h2>
            <h2>Fecha en que se añadio</h2>
            <h2></h2>
            <h2>Duración</h2>
          </div>

          {lodingMusic ? (
            <LoadingAnimation/>
          ) : (
            <div className="">
              {musicFavorite.map((music, i) => {
                return <MusicasFavoritas key={i + 1} music={music} index={i + 1} />;
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


const MusicasFavoritas = ({music, index}) => {
  const{nombre, uid, img, fecha, duracion} = music;
  const{playMusic, uidMusic, onSelectClickMusic, onShowBtnDeleteMusic, selectMusic, play } = useContext(musicContext);
  return (
    <div
        onDoubleClick={() => playMusic(music)}
        onClick={() => onSelectClickMusic(uid)}
        className={`  ${
          selectMusic === uid
            ? "bg-black/20 hover:bg-black/20"
            : "bg-transparent"
        } px-2 m-2 hover:bg-black/20 cursor-pointer transition-all duration-200 rounded-md animate__animated animate__fadeIn md:text-base text-sm`}
        onMouseOut={() => onShowBtnDeleteMusic()}
        onMouseOver={() => onShowBtnDeleteMusic(uid)}
      >
        <div className="text-neutral-200 w-full items-center py-0.5 grid md:gap-0 md:grid-cols-2">
          <div className="flex gap-1 items-center">
            <div className="w-[40px]">
              {uidMusic === uid && play ? (
                <ul className="relative right-1.5 animate__animated animate__fadeIn">
                   <Audio
                    height="25"
                    width="25"
                    color="#f97316"
                    ariaLabel="audio-loading"
                    wrapperStyle={{}}
                    wrapperClass="wrapper-class"
                    visible={true}
                  />
                </ul>
              ) : (
                <p className={`font-medium animate__animated animate__fadeIn ${uidMusic === uid ? "text-secundary" : "text-white/95"}`}>{index}</p>
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
            <div className="md:w-full">
              <p>{fecha}</p>
            </div>

            <div className="">
            <AiFillHeart className={`text-secundary active:text-white/50 text-lg`}/>
            </div>

            <div className="md:w-full">
              <p>{duracion}</p>
            </div>

          </div>
        </div>
      </div>
  )
}
