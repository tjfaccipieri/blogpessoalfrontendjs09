import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function Perfil() {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === '') {
      alert('Sem logar não rola');
      navigate('/');
    }
  }, [usuario.token]);

  return (
    <div className="flex justify-center mx-4 my-8">
      <div className="container mx-auto rounded-2xl overflow-hidden">
        <img
          src="https://i.imgur.com/ZZFAmzo.jpg"
          alt=""
          className="w-full h-72 object-cover border-b-8 border-white"
        />
        <Link to={`/perfilplus/${usuario.id}`}><img
          src={usuario.foto || 'https://ik.imagekit.io/2zvbvzaqt/usuario.png'}
          alt=""
          className="rounded-full w-56 aspect-square mx-auto mt-[-8rem] border-8 border-white relative z-10"
        /></Link>
        <div className="relative mt-[-6rem] h-72 flex flex-col bg-stone-700 text-white text-2xl items-center justify-center">
          <p>{usuario.nome}</p>
          <p>{usuario.usuario}</p>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
