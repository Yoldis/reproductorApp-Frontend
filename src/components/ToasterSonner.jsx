import React, { useContext, useEffect } from 'react'
import { Toaster, toast } from 'sonner';
import { authContext, musicContext } from '../context/useContext';
import { FaExclamationCircle } from 'react-icons/fa';



export const ToasterSonner = () => {
  
  const{errorAuth, errorAuth:{msgAuth = '', descriptionAuth = '', colorAuth = '', iconAuth = <FaExclamationCircle className="text-red-500"/>}} = useContext(authContext);

  const {msgGlobal, msgGlobal:{msgMusic = '', descriptionMusic = '', colorMusic = '', iconMusic = <FaExclamationCircle className="text-red-500"/>}} = useContext(musicContext);

  
  useEffect(() => {
    if(!msgAuth) return;
    toast(msgAuth, {
      position:'top-center',
      duration:2000,
      description:descriptionAuth,
      icon:iconAuth
    })
  }, [errorAuth]);

  useEffect(() => {
    if(!msgMusic) return;
    toast(msgMusic, {
      position:'top-center',
      duration:2000,
      description:descriptionMusic,
      icon:iconMusic
    })
  }, [msgGlobal]);

      
      return (
        <div>
          <Toaster toastOptions={{
            style: { background:colorAuth || colorMusic, border:'none'},
          }}/>
        </div>
      )
}


