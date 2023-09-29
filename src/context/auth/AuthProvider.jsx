
import {  useContext, useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm'
import { useValidateForm } from '../../hooks/useValidateForm';
import {authContext} from '../useContext'
import { cancelImgProcFile, loginWithEmailAndPassword, registerWithEmailAndPassword, updateImgProcfile, updateProcfile } from '../../../api/auth/authProvider';
import { swartAlert } from '../../../helpers/swalAlert';

const initialState = {
  uid:'',
  nombre:'',
  correo:'',
  password:'',
  status:'Cheking',
  img:"",
}

const formValidate = {
  ok:true,
  okNombre:true,
  casoNombre:'',
  okEmail:true,
  casoEmail: '',
  okPassword:true,
  casoPassword: '',
  msg: '',
}

export const AuthProvider = ({children}) => {
  const imgDefault = 'https://res.cloudinary.com/dljqyy9l7/image/upload/v1694990391/MusicApp/Perfil/yk0adqwmt615fkpezdgx.jpg';

  const {
    nombre,
    correo,
    password,
    img,
    onChangeInput,
    onChangeInputFile,
    onResetForm,
    form,
    validate,
    setValidate,
  } = useForm(initialState, formValidate);

  const{validateForm, validateFormRegister,} = useValidateForm(formValidate);
  const [user, setUser] = useState(form);
  const{uid} = user;
  const [imgTemp, setimgTemp] = useState('');
  const [loadImgProcfile, setloadImgProcfile] = useState(false);

  const [toogleProcfileDetails, setToogleProcfileDetails] = useState('hidden');
  const [opacityFocus, setOpacityFocus] = useState('');
  const [chekUpdateDisplayName , setchekUpdateDisplayName ] = useState(false);

  const [errorAuth, seterrorAuth] = useState({msg:''});
  

  const chekingAuth = (status = 'Cheking') => {
    setUser({...user, status});
  }

  const startRegisterEmailPassowrd = async(e, nombre, correo, password)=> {
      e.preventDefault();
      const resp = validateFormRegister(nombre, correo, password);
      if(!resp.ok){
        return setValidate({...resp});
      }
      else{
        chekingAuth();
        const data = await registerWithEmailAndPassword({nombre, correo, password});
        if(!data.ok){
          chekingAuth('NoAutenticated');
          setValidate({
            ok:false,
            msg:data.error
          });
        } 
        
        localStorage.setItem('token', (data.data.token));
        setUser({status:'Autenticated', nombre, correo, uid:data.data.usuario.uid, img:data.data.usuario.img});
        onResetForm();
      }
    }

  const startLoginWithEmailPassword = async(correo, password) => {
    
      const resp  = validateForm(correo, password);
      if(!resp.ok){
        return setValidate({...resp});
      }
      else{
        chekingAuth();
        const data = await loginWithEmailAndPassword({correo, password});
        
        if(!data.ok){
          chekingAuth('NoAutenticated');
          setValidate({
            ok:false,
            msg:data.error
          });
        } 

        localStorage.setItem('token', (data.data.token));
        setUser({status:'Autenticated', nombre:data.data.usuario.nombre, correo, uid:data.data.usuario.uid, img:data.data.usuario.img});
        onResetForm();
      }
      
  }


  const startLogoutSign = async() => {
    chekingAuth();
    localStorage.clear();
    setUser({status: 'NoAutenticated'});
    onResetForm();
  }



  useEffect(()=> {
    const updateImg = async() => {
      if(img === '' || img === undefined) return;
      setloadImgProcfile(true);
      const data = await updateImgProcfile({archivo:img, img:imgTemp});
      if(!data.ok){
        // Retornar Error en la interfaz
      }
      setimgTemp(data.img);
      setloadImgProcfile(false);
    }

    updateImg();
  }, [img]);



  const startUpdateDisplayName = async(displayName) => {

    if(displayName.trim() === "") return setchekUpdateDisplayName(true);
      setToogleProcfileDetails('hidden');
      setOpacityFocus('');
      setchekUpdateDisplayName(false);

      const resp  = await updateProcfile({nombre:displayName, id:uid, img:imgTemp});
      if(!resp.ok){

        if(resp.data.token){
          localStorage.clear();
          seterrorAuth({msgAuth:resp.data.token, descriptionAuth:'Inicie sesion nuevamente'});
          await cancelImgProcFile({id:uid, img:imgTemp});
          setimgTemp('');
          return setTimeout(() => {
            setUser({status: 'NoAutenticated'});
            seterrorAuth({msgAuth:''});
          }, 1000)
        }
        else{
          seterrorAuth({msgAuth:resp.data.msg, descriptionAuth:'Intente otra vez'});
        }
        return;
      }
      
      const{nombre, img} = resp;
      setUser({...user, nombre, img});
      setimgTemp('');
  }

  const startRemovePhotoUrl = async() => {
    setimgTemp(imgDefault);
  }


const onHiddenProcfile = async() => {
  setToogleProcfileDetails('hidden');
  setOpacityFocus('');
  setUser({...user, nombre:user.nombre});
  setimgTemp('');

  if(!imgTemp || imgTemp === imgDefault) return;
  await cancelImgProcFile({id:uid, img:imgTemp});
}


  return (
    <authContext.Provider
      value={{
        errorAuth,
        nombre,
        correo,
        password,
        user,
        setUser,
        imgTemp,
        setimgTemp,
        loadImgProcfile,
        onChangeInput,
        startRegisterEmailPassowrd,
        startLoginWithEmailPassword,
        startLogoutSign,
        chekingAuth,
        onResetForm,
        onChangeInputFile,
        startUpdateDisplayName,
        toogleProcfileDetails,
        setToogleProcfileDetails,
        startRemovePhotoUrl,
        opacityFocus,
        setOpacityFocus,
        onHiddenProcfile,
        validate,
        setValidate,
        chekUpdateDisplayName,
        setchekUpdateDisplayName
      }}
    >
      {children}
    </authContext.Provider>
  );
}
