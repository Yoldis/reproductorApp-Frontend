import { useEffect, useState } from "react";

const promotion = [
  {
      id:0,
      title:'!Sumergete en la musica como nunca antes!',
      img:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1695995172/MusicApp/MusicImg/cimy92nu2vurototidf5.svg'
  },

  {
      id:1,
      title: '!Importa tus musicas favoritas y dale play!',
      img:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1695995172/MusicApp/MusicImg/qoqthuzciudv6cyxchus.svg'
  },
  
  {
      id:2,
      title:'!Vive la emocion de una unica experiencia! ',
      img:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1695995172/MusicApp/MusicImg/w0xdzpab3idqzl45sjls.svg'
  },

  {
      id:3,
      title: '!Canta a todo pulmon sin interrupciones!',
      img:'https://res.cloudinary.com/dljqyy9l7/image/upload/v1695995172/MusicApp/MusicImg/nguvtrx8wftnbbdil2gp.svg'
  }

]

export const AnimationAuth = ({children}) => {

  const [getIndexPromo, setGetIndexPromo] = useState(0);
  const [promo, setPromo] = useState(promotion[0]);
  const{img} = promo;
  
  useEffect(() => {

    let count = 0;
    const promo = setInterval(() => {

      count <=2 ? count ++ : count = 0;
      const indexPromo = promotion.findIndex((e) => {
        return e.id === count;
      });
      
      const newPromo = promotion.find((e) => {
        return e.id === count;
      });

      setGetIndexPromo(indexPromo);
      setPromo(newPromo);

    }, 4000);

    return () => {
      clearInterval(promo);
    };
  }, []);
  
  
  return (
    <div className={`animate__animated animate__fadeIn text-white select-none`} >
      <div className="grid grid-cols-3 pt-5 ">
        <div className="animate__animated animate__fadeIn transition-all duration-200 bg-no-repeat bg-contain bg-center mb-5" style={{backgroundImage: `url(${img})`}}></div>
        <div className="flex flex-col items-center mb-7">
          <div>
            <img className="w-12" src="/src/assets/iconMusic.png" alt="" />
          </div>
          <h1 className="font-bold text-2xl text-secundary">Beats</h1>

          <h2 className="font-bold text-md md:text-3xl text-center">Tu Musica en cualquier lugar</h2>
        </div>
        <div className="animate__animated animate__fadeIn transition-all duration-200 bg-no-repeat bg-contain bg-center mb-5" style={{backgroundImage: `url(${img})`}}></div>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-2 items-center px-4 gap-5">
        {promotion.map((promo) => (
          <AnimationItem
            key={promo.id}
            title={promo.title}
            img={promo.img}
            id={promo.id}
            getIndexPromo={getIndexPromo}
          />
        ))}
      </div>
      {children}
      
    </div>
  );
}



const AnimationItem = ({id, title, img, getIndexPromo}) => {

    return (
      <div
        className={`bg-animationBG h-60 rounded-xl shadow-shadowAnimation p-1 mb-2 ${id === getIndexPromo && 'scale-105 border border-black'} transition-all duration-500 `}
      >
        <h3 className="md:text-lg text-md font-bold py-1 text-center text-cuarty">{title}</h3>

        <div className=" flex justify-center py-2 ">
          <img className="w-40 " src={img} alt="" />
        </div>
      </div>
    );
}
