import { useContext, useState } from "react";
import { FaSignOutAlt, FaCloudUploadAlt, FaMusic, FaTrash, FaBars } from "react-icons/fa"
import {  useNavigate } from "react-router-dom";
import { authContext, musicContext } from "../../context/useContext"
import { swartAlert } from "../../../helpers/swalAlert";

export const SideBarMusic = () => {
  const {startLogoutSign, user} = useContext(authContext);
  const {onChangeImportMusic, lodingMusic, stopAudio, startDeleteAllMusic} = useContext(musicContext);
  const{ nombre, img} = user;
  const navigate = useNavigate();

  const [sideBar, setsideBar] = useState(false)
  
  const goProcfile = () =>{
    navigate('music/procfile');
  }

  const goHomeMusic = () => {
    navigate('music')
  }

  const onLogout = async() => {
    if(lodingMusic) return;
    const titleReq = 'Desea cerrar sesion?';
    const text = 'Vuelve Pronto!';
    const isConfirmed = await swartAlert(titleReq, text);
    if(isConfirmed){
      startLogoutSign();
      stopAudio();
    }
  }
  
  const onToogleSideBar = () => {
    !sideBar ? setsideBar(true) : setsideBar(false);
  }

  // min-h-screen
  return (
    <div className={`flex flex-col justify-between items-center md:items-stretch bg-tercer ${!sideBar ? 'w-20' : 'w-48' } transition-all duration-100 ease-linear select-none md:text-base text-sm`}>
      <div className="m-2 flex flex-col gap-5">

        <button className="m-auto mt-6" onClick={onToogleSideBar}>
          <FaBars className="text-white text-2xl" />
        </button>

        <div
          onClick={goProcfile}
          className="flex items-center rounded-md text-white bg-cuarty p-1 cursor-pointer transition-all duration-300 hover:opacity-80 shadow-md "
        >
          <img
            src={img}
            className="object-cover object-center w-8 h-8 m-auto"
            alt="Foto Perfil"
            style={{ clipPath: "circle(50%)" }}
          />

          <h3 className={`text-center w-3/4 font-semibold ${!sideBar ? 'hidden' : 'md:block' } `}>
            {nombre}
          </h3>
        </div>


        <label htmlFor="music">
          <div className="flex items-center text-white rounded-md bg-secundary p-1  cursor-pointer transition-all duration-300 hover:opacity-80 shadow-md ">
            <input
              type="file"
              name="music"
              className="w-px h-px"
              id="music"
              onChange={onChangeImportMusic}
              accept="audio/*"
              multiple
              disabled={true && lodingMusic}
            />
            <FaCloudUploadAlt className="m-auto text-2xl" />
            <p className={`text-center w-3/4 font-semibold ${!sideBar ? 'hidden' : 'md:block' }`}>
              Importar música
            </p>
          </div>
        </label>

        <div
          onClick={goHomeMusic}
          className="flex items-center text-white rounded-md bg-secundary px-1 py-2  cursor-pointer transition-all duration-300 hover:opacity-80 shadow-md "
        >
          <FaMusic className="m-auto text-xl" />
          <p className={`text-center w-3/4 font-semibold ${!sideBar ? 'hidden' : 'md:block' }`}>
            Música
          </p>
        </div>

        
        <div
          onClick={startDeleteAllMusic}
          className="flex items-center text-white rounded-md bg-red-500 px-1 py-2  cursor-pointer transition-all duration-300 hover:opacity-80 shadow-md "
        >
          <FaTrash className="m-auto text-xl" />
          <p className={`text-center w-3/4 font-semibold ${!sideBar ? 'hidden' : 'md:block' }`}>
            Eliminar Todas
          </p>
        </div>
      </div>

      <button
        onClick={onLogout}
        className=" ml-2 mb-4 flex items-center gap-2 hover:opacity-60 transition-opacity duration-300"
      >
        <FaSignOutAlt className={`text-secundary text-lg ${!sideBar ? 'm-auto' : '' }`} />
        <p className={`text-secundary font-bold ${!sideBar ? 'hidden' : 'md:block' } }`}>
          Cerrar sesion
        </p>
      </button>
    </div>
  );
}
