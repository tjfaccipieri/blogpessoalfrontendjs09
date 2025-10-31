import { Link } from 'react-router-dom';
import type Postagem from '../../../models/Postagem';

interface CardPostagemProps {
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagemProps) {
  return (
    <div className="w-full border-2 border-slate-800 rounded-lg text-lg overflow-auto">
      <div className="flex gap-4 px-4 items-center bg-stone-800 text-white p-2 text-2xl font-bold">
        <img
          src={
            postagem.usuario?.foto ||
            'https://ik.imagekit.io/2zvbvzaqt/usuario.png'
          }
          alt=""
          className="w-8 rounded-full"
        />
        <p>{postagem.usuario?.nome || 'Anonimo'}</p>
      </div>
      <div className='px-4 py-2'>
        <p><span className='text-xl font-bold'>Titulo: </span>{postagem.titulo}</p>
        <p><span className='text-xl font-bold'>Texto: </span>{postagem.texto}</p>
        <p><span className='text-xl font-bold'>Tema: </span>{postagem.tema?.descricao}</p>
        <p><span className='text-xl font-bold'>Data: </span>
          {new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'full',
            timeStyle: 'medium',
          }).format(new Date(postagem.data))}
        </p>
      </div>
        <div className="flex">
        <Link to={`/editarpostagem/${postagem.id}`} className="flex-1 px-4 py-2 font-bold text-white bg-stone-600 hover:bg-stone-800 text-center">
          Editar
        </Link>
        <Link to={`/deletarpostagem/${postagem.id}`} className="flex-1 px-4 py-2 font-bold text-white bg-red-400 hover:bg-red-800 text-center">
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardPostagem;
