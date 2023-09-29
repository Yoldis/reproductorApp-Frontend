import {Slider,SliderTrack,SliderFilledTrack,SliderThumb,SliderMark} from '@chakra-ui/react'

import { TbRepeat, FaPauseCircle, FaPlayCircle, FaRandom, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeDown, FaVolumeMute, FaOutdent, AiOutlineReload, AiOutlineHeart, AiFillHeart } from "react-icons/all";
import { musicContext } from "../../context/useContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


export const Multimedia = () => {
    const navigate = useNavigate();
    const{pauseMusic, resumeMusic, onShowBtnProgress, showBtnProgress, showBtnVolumen, prevMusic,  nextMusic, aleatoryMusic, repeatMusic, setCheckMusic, checkMusic, onShowBtnVolumen, mutedVolumenMusic, onGetCurrentVolumen, progressBarVolumen, currentMuic, play, activeRandomMusic, progressBar, moveProgressBar,moveDuration, currentTime, activeRepeatMusic, activeMutedVolumen, onGetCurrentTimeClick, onGetCurrentTimeChange, startUpdateFavoritoMusic,uidMusic} = useContext(musicContext);
    
    const{img, duracion, nombre, favorito} = currentMuic;

    const onCheckMusic = () => {
        checkMusic ? (setCheckMusic(false), navigate('/music')) : ( setCheckMusic(true), navigate('music/chekMusic'));
      }
    

  return (
    <div className="bg-primary z-10 w-full flex flex-col md:gap-6 gap-1.5 md:grid md:grid-cols-3  p-4 md:items-center border-t border-t-borderMusic select-none">
      <div className="flex gap-3 items-center">
        <div>
          {"loadImgMusic" === "Loading" ? (
            <AiOutlineReload className="animate-spin ml-5 mt-3 text-white font-bold text-xl" />
          ) : (
            <img src={img} className="object-cover object-center  w-[107px] h-[49px] " />
          )}
        </div>
        <div className="self-center">
          <h3 className="text-white font-bold  text-sm">{nombre}</h3>
        </div>

        <div className="">
            {!favorito ? (
              <AiOutlineHeart
                onClick={() => startUpdateFavoritoMusic(uidMusic)}
                className={`text-secundary active:text-white/50 text-xl cursor-pointer ${nombre ? 'block' : 'hidden'}`}
              />
            ) : (
              <AiFillHeart
                onClick={() => startUpdateFavoritoMusic(uidMusic)}
                className={`text-secundary active:text-white/50 text-xl cursor-pointer ${nombre ? 'block' : 'hidden'}`}
              />
            )}
          </div>
      </div>

      <div className="mb-2">
        <div className="flex gap-8 text-lg items-center justify-center mb-1 text-white">
          <button>
            <FaRandom
              onClick={() => aleatoryMusic()}
              className={`transition-colors duration-100 ${
                activeRandomMusic
                  ? "hover:text-secundary text-secundary"
                  : "hover:text-white text-white/70 active:text-white/60"
              }`}
            />
          </button>

          <button>
            <FaStepBackward
              onClick={() => prevMusic()}
              className="active:text-white/60 transition-colors duration-200 hover:text-white text-white/70"
            />
          </button>

          <button>
            {play ? (
              <FaPauseCircle
                onClick={() => pauseMusic()}
                className="text-4xl"
              />
            ) : (
              <FaPlayCircle
                onClick={() => resumeMusic()}
                className="text-4xl "
              />
            )}
          </button>

          <button>
            <FaStepForward
              onClick={() => nextMusic()}
              className="transition-colors duration-200 hover:text-white text-white/70 active:text-white/60"
            />
          </button>

          <button>
            <TbRepeat
              onClick={() => repeatMusic()}
              className={`transition-colors duration-100 ${
                activeRepeatMusic
                  ? "hover:text-secundary text-secundary"
                  : "hover:text-white text-white/70 active:text-white/60"
              }`}
            />
          </button>
        </div>

        <div className="flex gap-2 justify-between items-center text-white relative">
          <span className="text-xs text-white/70 font-semibold">
            {moveDuration ? moveDuration : currentTime}
          </span>

        
          <Slider
            value={moveProgressBar ? moveProgressBar : progressBar}
            colorScheme={showBtnProgress ? "orange" : "whiteAlpha"}
            onMouseOver={() => onShowBtnProgress(true)}
            onMouseOut={() => onShowBtnProgress()}
            onChange={onGetCurrentTimeChange}
            onClick={onGetCurrentTimeClick}
            onTouchEnd={onGetCurrentTimeClick}
            minH='3'
          >
            <SliderTrack bg={"#515151"} >
              <SliderFilledTrack borderRadius={'100px'}/>
            </SliderTrack >
            <SliderThumb boxSize={3} display={showBtnProgress ? "block" : "none"} />
          </Slider>
        

          <span className={`text-xs text-white/70 font-semibold`}>
            {duracion}
          </span>
        </div>
      </div>


      <div className="flex justify-center md:justify-end items-center flex-wrap gap-3 text-lg text-white ">
        <button>
          <FaOutdent
            onClick={onCheckMusic}
            className={`transition-colors duration-100 ${
              checkMusic
                ? "hover:text-secundary text-secundary"
                : "hover:text-white text-white/70 active:text-white/60"
            }`}
          />
        </button>

        <button>
          {activeMutedVolumen === 0 ? (
            <FaVolumeMute
              onMouseOver={() => onShowBtnVolumen(true)}
              onMouseOut={() => onShowBtnVolumen()}
              onClick={mutedVolumenMusic}
              className={`transition-colors duration-100 hover:text-white text-white/70 active:text-white/60`}
            />
          ) : activeMutedVolumen <= 0.5 ? (
            <FaVolumeDown
              onMouseOver={() => onShowBtnVolumen(true)}
              onMouseOut={() => onShowBtnVolumen()}
              onClick={mutedVolumenMusic}
              className={`transition-colors duration-100 hover:text-white text-white/70 active:text-white/60`}
            />
          ) : (
            <FaVolumeUp
              onMouseOver={() => onShowBtnVolumen(true)}
              onMouseOut={() => onShowBtnVolumen()}
              onClick={mutedVolumenMusic}
              className={`transition-colors duration-100 hover:text-white text-white/70 active:text-white/60`}
            />
          )}
        </button>

        <section
          className="h-1 rounded-2xl bg-cuarty flex items-center relative "
          style={{ width: "25%" }}
        >
            <Slider
            value={progressBarVolumen}
            colorScheme={showBtnVolumen ? "orange" : "whiteAlpha"}
            onMouseOver={() => onShowBtnVolumen(true)}
            onMouseOut={() => onShowBtnVolumen()}
            onChange={onGetCurrentVolumen}
            onTouchEnd={onGetCurrentVolumen}
            
          >
            <SliderTrack bg={"#515151"} >
              <SliderFilledTrack borderRadius={'100px'}/>
            </SliderTrack >
            <SliderThumb boxSize={3} display={showBtnVolumen ? "block" : "none"} />
          </Slider>

        </section>
      </div>
    </div>
  );
}
