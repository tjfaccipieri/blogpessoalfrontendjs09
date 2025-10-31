/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type Postagem from '../../../models/Postagem';
import type Tema from '../../../models/Tema';
import { atualizar, buscar, cadastrar } from '../../../services/Service';

function FormPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' });

  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  const temaCarregando = tema.descricao === '';

  async function buscarTemas() {
    try {
      await buscar('/temas', setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      console.log(error);
      if (error.toString().includes('401')) {
        handleLogout();
      }
    }
  }

  async function getTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: usuario.token },
      });
      console.log(tema);
    } catch (error) {
      alert('deu ruim');
    }
  }

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: usuario.token },
      });
      console.log(tema);
    } catch (error) {
      alert('deu ruim');
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  async function cadastrarPostagem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (id !== undefined) {
      try {
        await atualizar('/postagens', postagem, setPostagem, {
          headers: { Authorization: token },
        });
        alert('Aeee... não passei vergonha');
        navigate('/postagens');
      } catch (error) {
        console.log('deu ruim');
      }
    } else {
      try {
        await cadastrar('/postagens', postagem, setPostagem, {
          headers: { Authorization: token },
        });
        alert('Aeee... não passei vergonha');
        navigate('/postagens');
      } catch (error) {
        console.log('deu ruim');
      }
    }
  }

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  useEffect(() => {
    if (token === '') {
      alert('Vaza...');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
  }, [temas.length]);

  useEffect(() => {
    if(id !== undefined) {
      buscarPostagemPorId(id)
    }
  }, [id])

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Atualizar' : 'Cadastrar'} Postagem</h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={cadastrarPostagem}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo da postagem</label>
          <input
            type="text"
            placeholder="Titulo"
            name="titulo"
            id="titulo"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="texto">Texto da postagem</label>
          <input
            type="text"
            placeholder="texto"
            name="texto"
            id="texto"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Tema da postagem</p>
          <select
            name="tema"
            id="tema"
            className="border p-2 border-slate-700 rounded"
            onChange={(e) => getTemaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione um tema
            </option>
            {temas.map((tema) => (
              <option value={tema.id}>{tema.descricao}</option>
            ))}
          </select>
        </div>
        <button
          disabled={temaCarregando}
          type="submit"
          className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
        >
          {id !== undefined ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;
