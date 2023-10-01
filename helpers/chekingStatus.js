import { useContext, useEffect } from "react"
import { authContext, musicContext } from "../src/context/useContext"
import { verifyToken } from "../api/auth/authProvider";
import { getMusic, getMusicaActual } from "../api/musicApp/musicProvider";


export const chekingUser = () => {

    const {user, setUser, chekingAuth} = useContext(authContext);
    const{ setMusic, setlodingMusic, setCurrentMuic, setCurrentTime, setProgressBar, setActiveRandomMusic,
        setActiveRepeatMusic,setUidMusic, setDuracionActual, setMusicFavorite} = useContext(musicContext);
    
    useEffect(() => {
        if(!user.uid) return;
        
        const getData = async() => {
            setlodingMusic(true);

            const res1  = await getMusic(user.uid);
            if(res1.ok){
                const favoriteMusic = res1.data.filter(m => {
                    return m.favorito === true;
                })
                setMusic(res1.data);
                setMusicFavorite(favoriteMusic);
            }

            const res2 = await getMusicaActual(user.uid);
            if(res2.ok){
                
                const audio = new Audio(res2.data.url);
                audio.currentTime = res2.minutoActual;
                audio.loop = res2.repetir;
                
                
                audio.addEventListener('timeupdate', () => {

                    setDuracionActual(audio.currentTime);
                    const duration = (audio.currentTime / 60);
                    const minutes = String(duration).split('.')[0];
                    let seconds =  String((Number('0.' + String(duration).split('.')[1]) * 60)).split('.')[0];
                    isNaN(seconds) ? seconds = '00' : seconds.length === 1 ? seconds = '0' + seconds : seconds;
                    
                    let porcent = (audio.currentTime / audio.duration) * 100;
                    setProgressBar(porcent);
                    setCurrentTime(`${minutes}:${seconds}`);
                });

                setUidMusic(res2.data.uid);
                setCurrentMuic({audio:audio, ...res2.data});
                setActiveRandomMusic(res2.random);
                setActiveRepeatMusic(res2.repetir);
            }
            
            setlodingMusic(false);
        }
        getData();
    }, [user.uid])



    useEffect(() => {
        
        const checkStatus = async() => {
            chekingAuth();
            const res = await verifyToken();
            if(!res.ok){
                localStorage.clear();
                chekingAuth('NoAutenticated');
                return 
            }
            console.log()
            setUser({...res.data, status:'Autenticated'});
        }

        checkStatus();
    }, []);



    return {
        status:user.status
    }
}