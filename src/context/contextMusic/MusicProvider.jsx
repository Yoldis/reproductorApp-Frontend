
// (252 / 100) * 50 = 126 obtener el width de la etiqueta y restarlo con  el offsetX
import Swal from 'sweetalert2';
import { useContext, useEffect, useState } from 'react'
import {authContext, musicContext} from '../useContext';
import { deleteAllMusic, deleteOneMusic, importMusic, saveInDBMusicActual, updateMuiscFavorito } from '../../../api/musicApp/musicProvider';
import { swal, swartAlert } from '../../../helpers/swalAlert';
import style from "../../css/LoadingAnimation.module.css"

const imgMusicDefault = 'https://res.cloudinary.com/dljqyy9l7/image/upload/v1694993573/MusicApp/MusicImg/sje9jskc0glwyvq1ijgv.png';




export const MusicProvider = ({children}) => {
  
  const{user:{uid}, setUser, user} = useContext(authContext);
  const [music, setMusic] = useState([]);
  const [musicAleatory, setMusicAleatory] = useState([]);
  const [musicFavorite, setMusicFavorite] = useState([]);
  const [lodingMusic, setlodingMusic] = useState(false);
  const [showBtnDeleteMusic, setShowBtnDeleteMusic] = useState(false);
  const [uidMusic, setUidMusic] = useState(null);
  const [msgGlobal, setMsgGlobal] = useState({msgMusic:''});
  const [checkMusic, setCheckMusic] = useState(false);
  const [play, setPlay] = useState(false);
  const [activeRandomMusic, setActiveRandomMusic] = useState(false);
  const [selectMusic, setSelectMusic] = useState(false);
  const [currentTime, setCurrentTime] = useState(" ");
  const [activeRepeatMusic, setActiveRepeatMusic] = useState(false);
  
  const [currentMuic, setCurrentMuic] = useState({audio:''})
 
  const [activeMutedVolumen, setactiveMutedVolumen] = useState(1);
  const [progressBarVolumen, setProgressBarVolumen] = useState(100);
  const [showBtnVolumen, setshowBtnVolumen] = useState(false);
  
  const [progressBar, setProgressBar] = useState(0);
  const [showBtnProgress, setShowBtnProgress] = useState(false);
  const [moveProgressBar, setMoveProgressBar] = useState(0);
  const [moveDuration, setMoveDuration] = useState('');
  const [duracionActual, setDuracionActual] = useState('');
  
  const [icon1, setIcon1] = useState('');
  const [icon2, setIcon2] = useState('');
  const [icon3, setIcon3] = useState('');

  const setTime = [
      {fn:setIcon1, seconds:100},
      {fn:setIcon2, seconds:200},
      {fn:setIcon3, seconds:300},
    ];

    
  // REDIRECCIONAR AL LOGIN SI EL TOKEN SE VENCIO
  const authRedirect = ({msg}) => {
      localStorage.clear();
      stopAudio();
      setMsgGlobal({msgMusic:msg, descriptionMusic:'Inicia sesion nuevamente', colorMusic:'#fecaca'});
      return setTimeout(() => {
          setUser({status: 'NoAutenticated'});
          setMsgGlobal({msgMusic:''});
      }, 2100)
  }
  
  // SUBIR MUSICA
  const onChangeImportMusic = async(e) => {
    setlodingMusic(true);
    const files = e.target.files;
    const formData = new FormData();
    for (const file of files) {
      formData.append('archivo', file);
    }

    formData.append('id', uid);
    const data = await importMusic(formData);

    if(!data.ok){
      // Retornar Error en la interfaz
      if(data.data?.token){
        authRedirect({msg:data.data?.token});
      }
      else if(data.data?.msg){
        setMsgGlobal({msgMusic:data.data?.msg, descriptionMusic:'Intentelo de nuevo', colorMusic:'#fecaca'});
        setlodingMusic(false);
        return;
      }
    }
    setMusic([...music, ...data.data]);
    setlodingMusic(false);
  }


  // ELIMINAR UNA MUSICA EN PARTICULAR
  const startDeleteOneMusicDB = async(idAudio) => {
    const titleReq ='Seguro que quieres eliminar la musica?'
    const titleRes = 'Musica eliminada con exito!'

    const isConfirmed = await swartAlert(titleReq);

    if(isConfirmed){
      const {ok, data} = await deleteOneMusic(idAudio);
      if(ok){
        swal('success', titleRes);
        // setMsgGlobal({msgMusic:'Elimado con exito!', colorMusic:'#4ade80'});
        const filterMusic = music.filter(m => m.uid !== idAudio);
        setMusic(filterMusic);
      }
      else{
        if(data?.token){
          return authRedirect({msg:data?.token});
        }
        return swal('error', data)
      }
    }
    
  }

  // ELIMINAR TODAS LAS MUSICAS
  const startDeleteAllMusic = async() => {
    const titleReq = 'Seguro que quieres eliminar Todas las Musicas?'
    const titleRes ='Musicas eliminadas con exito!'
    const isConfirmed = await swartAlert(titleReq);
    
    if(isConfirmed){
      const{ok, data} = await deleteAllMusic(uid);
      if(!ok){
        if(data?.token){
          return authRedirect({msg:data?.token});
        }
        return swal('error', data);
      }
      swal('success', titleRes);
      setMusic([]);
    }
  }

  // ACTIVAR MODO ALEATORIO
  const getAleatoryMusic = (array) => {
    const randomMusic = array.map((m, i) => {
      const random = Math.floor(Math.random() * array.length + 1);
      const indexRandom = random * 2;
      m = {...m, idRandom:indexRandom}
      return m
    })

    const getRandonMusic = randomMusic.sort((a, b) => {
      return a.idRandom - b.idRandom;
    })

    return getRandonMusic
  }
  // ACTIVAR MODO ALEATORIO
  const aleatoryMusic = () => {
    activeRandomMusic ? setActiveRandomMusic(false) : setActiveRandomMusic(true);
  }

  useEffect(() => {
    if(activeRandomMusic){
      const aleatory = getAleatoryMusic(music);
      setMusicAleatory(aleatory);
  }
  }, [activeRandomMusic]);


  // AGREGAR MUSICA A FAVORITOS
const startUpdateFavoritoMusic = async(id) => {
  const {ok, data} = await updateMuiscFavorito(id);
  if(!ok){
    if(data?.token){
      return authRedirect({msg:data?.token});
    }
    // OTRO MENSAJE DE ERROR
  }

  const update = music.map(m => {
    if(m.uid === data.uid) return data;
    return{...m};
  })

  const updateAleatory = musicAleatory.map(m => {
    if(m.uid === data.uid) return data;
    return{...m};
  })

  setMusic(update);
  setMusicAleatory(updateAleatory);
  if(currentMuic.audio && data.nombre === currentMuic.nombre ) setCurrentMuic({...currentMuic, ...data});
}

useEffect(() => {
  if(!music) return;
  const favoriteMusic = music.filter(m => {
    return m.favorito === true;
  })
  setMusicFavorite(favoriteMusic);

}, [music])


  // SELECCIONAR MUSICA
  const onSelectClickMusic = (id) => {
    setSelectMusic(id);
  }


  // REPRODUCIR MUSICA
  const playMusic = async(musica) =>{

    setIcon1(''); setIcon2(''); setIcon3('');
    currentMuic.audio && currentMuic.audio?.pause();

    const{url} = musica;
    const audio = new Audio(url);
    setPlay(true);

    audio.addEventListener('timeupdate', () => {

      setDuracionActual(audio.currentTime);
      const duration = (audio.currentTime / 60);
      const minutes = String(duration).split('.')[0];
      let seconds =  String((Number('0.' + String(duration).split('.')[1]) * 60)).split('.')[0];
      isNaN(seconds) ? seconds = '00' : seconds.length === 1 ? seconds = '0' + seconds : seconds;
      
      let porcent = (audio.currentTime / audio.duration) * 100;
      setProgressBar(porcent);
      setCurrentTime(`${minutes}:${seconds}`);
    })
    setCurrentMuic({...currentMuic, audio:audio, ...musica});
    setUidMusic(musica.uid);
    setactiveMutedVolumen(1);
    setProgressBarVolumen(100);
    audio.play();

    setTime.forEach(t => {
      setTimeout(()=> {
        t.fn(style.animationMusicActual);
      }, t.seconds)
    })
    
  }


  useEffect(() => {
    if(!currentMuic.audio) return;
    if(currentMuic.audio?.ended) nextMusic();

    if(!uidMusic) return;
    saveInDBMusicActual({musica:uidMusic, usuario:uid, random:activeRandomMusic, repetir:activeRepeatMusic, minutoActual:duracionActual});

  }, [currentMuic.audio?.ended, currentTime, activeRandomMusic, activeRepeatMusic, uidMusic]);


  // PAUSAR MUSICA
  const pauseMusic = () => {
    if(!currentMuic?.audio) return;
    setPlay(false);
    currentMuic.audio.pause();
    setIcon1(''); setIcon2(''); setIcon3('');
  }


  // REANUNDAR MUSICA
  const resumeMusic = () => {
    if(!currentMuic?.audio) return;
    setPlay(true);
    currentMuic.audio.play();
    
    setTime.forEach(t => {
      setTimeout(()=> {
        t.fn(style.animationMusicActual);
      }, t.seconds)
    })
  }


  // ESCUCHAR MUSICA ANTERIOR
  const prevMusic = () => {
    if(!currentMuic.audio) return;
    const prev = (array) => {
      array.forEach((m, i) => {
        if(m.nombre === currentMuic.nombre){
          i === 0 ? playMusic(array[array.length - 1]) : playMusic(array[i - 1]);
          i === 0 ? setSelectMusic(array[array.length - 1].uid) : setSelectMusic(array[i - 1].uid);
        }
      })
    }
    if(Number(currentTime.split(':')[1]) > 5){
      currentMuic.audio.currentTime = 0.1;
    }
    else{
      currentMuic.audio.loop = false;
      setActiveRepeatMusic(false);
      activeRandomMusic ? prev(musicAleatory) : prev(music);
    }
    
  }


  // ESCUCHAR SIGUIENTE MUSICA
  const nextMusic = (musica = currentMuic) => {
    musica.audio ? musica.audio.loop = false : musica.audio;
    setActiveRepeatMusic(false);

    const next = (array) => {
      array.forEach((m, i) => {
        if(m.nombre === musica.nombre){
          i === array.length - 1 ? playMusic(array[0]) : playMusic(array[i + 1]);
          i === array.length - 1 ? setSelectMusic(array[0].uid) : setSelectMusic(array[i + 1].uid);
        }
      })
    }
    activeRandomMusic ? next(musicAleatory) : next(music);
  }


  // REPETIR MUSICA
  const repeatMusic = () => {
    if(currentMuic.audio){
      if(activeRepeatMusic) {
        currentMuic.audio.loop = false
        setActiveRepeatMusic(false);
      }
      else{
        currentMuic.audio.loop = true
        setActiveRepeatMusic(true)
      }
    }
  }

  // ACTIVAR ESTILOS DE LA BARRA DE PROGRESO DE LA MUSICA
  const onShowBtnProgress = (value = false) => {
    setShowBtnProgress(value);
  }


  // ACTIVAR BOTON PARA ELIMINAR MUSICA
  const onShowBtnDeleteMusic = (id) => {
    setShowBtnDeleteMusic(id)
  }


  // REPRODUCIR MUSICA EN EL TIEMPO ACTUAL SELECCIONADO
  const onGetCurrentTimeChange = (value) => {
    
    if(!currentMuic.audio) return;
    let duracion = (value  * currentMuic.audio.duration) / 100;
    duracion = (duracion / 60);
    const minutes = String(duracion).split('.')[0];
    let seconds =  String((Number('0.' + String(duracion).split('.')[1]) * 60)).split('.')[0];
    isNaN(seconds) ? seconds = '00' : seconds.length === 1 ? seconds = '0' + seconds : seconds;
    setMoveDuration(`${minutes}:${seconds}`);
    setMoveProgressBar(value);
  }

  const onGetCurrentTimeClick = () => {
    if(!currentMuic.audio || !moveDuration) return;
    let totalSeconds = (moveProgressBar * currentMuic.audio.duration) / 100;
    currentMuic.audio.currentTime = totalSeconds;
    setTimeout(() => {
      setMoveProgressBar(0);
      setMoveDuration(``);
    }, 1000);
  }


  // ACTIVAR ESTILOS DE LA BARRA DE PROGRESO DEL VOLUMEN
  const onShowBtnVolumen = (value = false) => {
    setshowBtnVolumen(value)
  }


  // AJUSTAR VOLUMEN DE LA MUSICA
  const onGetCurrentVolumen = (value) => {
    if(!currentMuic.audio) return;
    let volumen = (value / 100).toFixed(1);
    
    currentMuic.audio.volume = Number(volumen);
    setactiveMutedVolumen(currentMuic.audio.volume);
    setProgressBarVolumen(value);
  }


  // AJUSTAR VOLUMEN DANDOLE CLICK A LOS ICONOS
  const mutedVolumenMusic = () => {
    if(activeMutedVolumen === 1 || activeMutedVolumen > 0 && activeMutedVolumen < 1){
      currentMuic.audio.muted = true;
      setactiveMutedVolumen(0);
      setProgressBarVolumen(0 * 100);
    }
    else if(activeMutedVolumen === 0 && currentMuic.audio.volume === 0){
      currentMuic.audio.volume = 1;
      setactiveMutedVolumen(1);
      setProgressBarVolumen(1 * 100);
    }
    else{
      currentMuic.audio.muted = false;
      setactiveMutedVolumen(currentMuic.audio.volume);
      setProgressBarVolumen(currentMuic.audio.volume * 100);
    }
  }

  // DETENER LA MUSICA CUANDO CIERRA SESION
  const stopAudio = () => {
    if(!currentMuic.audio) return;
    currentMuic.audio.pause();
    currentMuic.audio.addEventListener('timeupdate', () => {
      setProgressBar(0);
      setCurrentTime(``);
    })

  setMusic([]); setMusicAleatory([]); setMusicFavorite([]); setlodingMusic(false); setShowBtnDeleteMusic(false); setUidMusic(null);
  setMsgGlobal({msgMusic:''}); setCheckMusic(false); setPlay(false); setActiveRandomMusic(false); setSelectMusic(false); 
  setCurrentTime(""); setActiveRepeatMusic(false); setCurrentMuic({audio:''});
  setactiveMutedVolumen(1); setProgressBarVolumen(100); setshowBtnVolumen(false); setProgressBar(0);
  setShowBtnProgress(false); setMoveProgressBar(0); setMoveDuration(''); setIcon1(''); setIcon2(''); setIcon3('');
  }



  return (
    <musicContext.Provider
      value={{
        onChangeImportMusic,
        music,
        lodingMusic,
        setlodingMusic,
        msgGlobal,
        startUpdateFavoritoMusic,
        playMusic,
        uidMusic,
        currentMuic,
        play,
        selectMusic,
        musicFavorite,
        setMusicFavorite,
        pauseMusic,
        resumeMusic,
        onSelectClickMusic,
        currentTime,
        progressBar,
        moveProgressBar,
        moveDuration,

        onShowBtnProgress,
        showBtnProgress,
        setMusic,
        onGetCurrentTimeChange,
        onGetCurrentTimeClick,
        prevMusic,
        nextMusic,
        aleatoryMusic,
        activeRandomMusic,
        musicAleatory,
        setCheckMusic, 
        checkMusic,
        repeatMusic,
        activeRepeatMusic,
        onShowBtnVolumen, 
        showBtnVolumen,
        mutedVolumenMusic,
        activeMutedVolumen,
        onGetCurrentVolumen,
        progressBarVolumen,
        onShowBtnDeleteMusic,
        showBtnDeleteMusic,
        startDeleteOneMusicDB,
        startDeleteAllMusic,
        stopAudio,
        
        setactiveMutedVolumen,
        setProgressBarVolumen,
        setMusicAleatory,

        icon1,
        icon2,
        icon3,

        setUidMusic,
        setCurrentMuic,
        setCurrentTime,
        setProgressBar,
        setActiveRandomMusic,
        setActiveRepeatMusic,
        setDuracionActual,
        getAleatoryMusic
      }}
    >
      {children}
    </musicContext.Provider>
  );
}


