import { useContext, useState } from "react"
import { FiEdit2 } from "react-icons/fi"
import { RiErrorWarningLine } from "react-icons/ri"
import { authContext } from "../../context/useContext"
import { useForm } from "../../hooks/useForm";
import { FaRedoAlt } from "react-icons/fa";


export const DetailsProcfile = () => {
    
    const{onChangeInputFile, user, user:{img, uid}, imgTemp, loadImgProcfile, startUpdateDisplayName, startRemovePhotoUrl, chekUpdateDisplayName } = useContext(authContext);
    const{nombre, onChangeInput } = useForm(user);

    const [opacityDetails, setOpacityDetails] = useState("");
    const [hiddenDetails, setHiddenDetails] = useState('hidden');

    const hoverEnterUpdate = () => {
        setOpacityDetails('opacity-50');
        setHiddenDetails('flex');
    }

    const hoverLeaveUpdate = () => {
        setOpacityDetails('');
        setHiddenDetails('hidden');
    }
    

  return (
    <div className=" flex flex-wrap justify-center  mt-8 mb-3 gap-5 relative">
      <div className="md:w-40 md:h-40 w-28 h-28 ">
        <img
          src={imgTemp ? imgTemp : img}
          className={` md:w-40 md:h-40  w-28 h-28 rounded-full object-cover drop-shadow-2xl  shadow-2xl ${opacityDetails}`}
          alt=""
          onMouseOver={hoverEnterUpdate}
          onMouseOut={hoverLeaveUpdate}
        />

        {loadImgProcfile && (
              <div className=" absolute top-0 md:w-40 md:h-40 w-28 h-28 rounded-full z-1 flex justify-center flex-col items-center">
                <FaRedoAlt className="md:text-4xl text-3xl animate-spin text-black" />
              </div>
        )}
      </div>
      <div className=" flex flex-col justify-center md:w-3/5 w-4/5 gap-3">
        <div className={`flex items-center text-red-500 font-semibold gap-1 ${!nombre.trim() || chekUpdateDisplayName ? 'flex' : 'hidden'}`}>
          <RiErrorWarningLine className="text-lg" />
          <p className="text-xs md:text-base"> El nombre debe ser obligatorio</p>
        </div>
        <input
          type="text"
          name="nombre"
          className=" text-sm p-2  rounded-md bg-cuarty text-gray-100 font-bold border-none outline-none"
          onChange={onChangeInput}
          value={nombre}
          disabled = {loadImgProcfile ? true : false}
        />

        <button
          onClick={() => startUpdateDisplayName(nombre)}
          className={`bg-gray-100 text-black font-bold py-3 w-28 rounded-full self-center md:self-end md:max-lg:self-center cursor-pointer hover:opacity-75  ${loadImgProcfile ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          disabled= {loadImgProcfile ? true :false}
        >
          Guardar
        </button>
      </div>

      <div
        onMouseOver={hoverEnterUpdate}
        onMouseOut={hoverLeaveUpdate}
        className={`absolute md:top-0  top-2.5 md:left-0 md:w-40 md:h-40  rounded-full z-1 object-cover ${hiddenDetails} justify-center flex-col items-center  `}
      >
        <input
          type="file"
          name="file"
          className="w-px h-px  "
          id="file"
          onChange={onChangeInputFile}
          accept="'image/*"
          disabled = {true && loadImgProcfile}
        />
        <label htmlFor="file" className="hover:underline cursor-pointer text-sm md:text-base">
          Elegir Foto
        </label>
        <FiEdit2 className="md:text-5xl my-2.5 text-3xl " />
        <button
          onClick={startRemovePhotoUrl}
          className="hover:underline cursor-pointer text-sm md:text-base"
        >
          Quitar Foto
        </button>
      </div>
    </div>
  );
}
