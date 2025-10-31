import { useContext, useEffect, useState } from "react"
import type Postagem from "../../../models/Postagem"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import { buscar } from "../../../services/Service"
import CardPostagem from "../cardPostagem/CardPostagem"
import { SyncLoader } from "react-spinners"

function ListaPostagens() {
  const [postagens, setPostagens] = useState<Postagem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
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

  async function buscarPostagens() {
      try {
        setIsLoading(true)
        // essa linha aqui ta fazendo tal coisa
        await buscar('/postagens', setPostagens, {
          headers: {
            Authorization: token
          }
        })
        console.log(postagens);
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
    buscarPostagens()
  }, [postagens.length])
  return (
    <>
    {isLoading && (
      <div className='flex justify-center my-8'><SyncLoader size={32} color='#131515' /></div>
    )}

    {(!isLoading && postagens.length === 0) && (
      <span className='text-3xl text-center my-8'>Nenhuma postagem encontrada!</span>
    )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 container mx-auto">
      {postagens.map(postagem => (
        <CardPostagem postagem={postagem} />
      ))}
      
    </div>
    </>
  )
}

export default ListaPostagens