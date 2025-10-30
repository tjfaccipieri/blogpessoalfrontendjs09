/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import CardTema from '../cardTema/CardTema';
import type Tema from '../../../models/Tema';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { buscar } from '../../../services/Service';
import { SyncLoader } from 'react-spinners';

function ListaTemas() {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [temas, setTemas] = useState<Tema[]>([])
  
  const navigate = useNavigate()

  // desestruturação de objeto
  const {usuario, handleLogout} = useContext(AuthContext)
  const token = usuario.token

  useEffect(() => {
    // voltar o usuario pra tela de login
    if (token === '') {
      alert('Ai cê me quebra')
      navigate('/login')
    }
  }, [token])

  async function buscarTemas() {
    try {
      setIsLoading(true)
      // essa linha aqui ta fazendo tal coisa
      await buscar('/temas', setTemas, {
        headers: {
          Authorization: token
        }
      })
    } catch (error: any) {
      if(error.toString().includes('401')) {
        alert('Sessão expirada')
        handleLogout()
      }
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    buscarTemas()
  }, [temas.length])

  
  return (
    <>
    <h2 className='text-center font-bold text-3xl'>Lista de temas</h2>
    {isLoading && (
      <div className='flex justify-center my-8'><SyncLoader size={32} color='#131515' /></div>
    )}

    {(!isLoading && temas.length === 0) && (
      <span className='text-3xl text-center my-8'>Nenhum tema encontrado!</span>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 container mx-auto">
      {temas.map(tema => (
        <CardTema tema={tema} />
      ))}
    </div>
    </>
  );
}

export default ListaTemas;
