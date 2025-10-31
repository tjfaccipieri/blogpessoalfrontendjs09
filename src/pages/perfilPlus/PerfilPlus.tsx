import { useContext, useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import type Usuario from '../../models/Usuario';
import { buscar } from '../../services/Service';

function PerfilPlus() {
  // para essa tela de perfil, iremos trabalhar pegando o ID do usuario da URL do navegador, para conseguir fazer um get do usuario
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // trazendo a context, pra poder pegar o token, sem ele, não rola de fazer o GET
  const { usuario } = useContext(AuthContext);
  // estado onde iremos guardar o usuário que está vindo do backend
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario>({} as Usuario);

  async function getUserById(id: string) {
    try {
      await buscar(`/usuarios/${id}`, (dados: Usuario) => {
        // Zera o campo da senha, para não ficar visivel no front
        dados.senha = '';
        // joga o restante dos dados dentro do estado criado acima
        setUsuarioLogado(dados);
      }
, {
        headers: { Authorization: usuario.token },
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        alert('Tem q estar logado');
        navigate('/');
      }
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
      setUsuarioLogado({
        // ...usuarioLogado => mantem o que já tinha no estado
        ...usuarioLogado,
        // pega o campo que está sendo usado, e preenche com o valor digitado na tela
        [e.target.name]: e.target.value,
      });
    }

  useEffect(() => {
    // O ID pode ser nulo, então precisamos tratar isso
    if (id !== undefined) {
      getUserById(id);
    }
  }, [id]);

  return (
    <div className="container mx-auto my-10 flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-sky-900 font-bold text-4xl">
          Dados de perfil
        </h2>
        <div className="flex gap-8 mt-4 items-center">
          <img
            src={usuarioLogado.foto || 'https://ik.imagekit.io/2zvbvzaqt/usuario.png'}
            alt=""
            className="border-4 border-sky-800 rounded-2xl w-56"
          />
          <div className="">
            <p className="font-semibold text-sky-900 text-3xl">
              {usuarioLogado.nome}
            </p>
            <p className="font-semibold text-sky-900 text-lg">
              {usuarioLogado.usuario}
            </p>
          </div>
        </div>
        <hr className="border-sky-900 border w-full my-4" />
        <div className='w-1/2'>
          <h2>Atualizar dados</h2>
          <form className=''>
            <div className="flex flex-col w-full">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                name="nome"
                id="nome"
                placeholder="Nome completo"
                className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogado.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="usuario">Usuário</label>
              <input
                type="text"
                name="usuario"
                id="usuario"
                placeholder="Seu melhor e-mail"
                className="border-2 border-slate-700 rounded p-2"
                disabled
                value={usuarioLogado.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="foto">Foto</label>
              <input
                type="text"
                name="foto"
                id="foto"
                placeholder="URL da foto"
                className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogado.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Senha (minimo 8 caracteres)"
                className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogado.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PerfilPlus;
