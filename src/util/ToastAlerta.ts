import { toast, Bounce } from 'react-toastify';

export function ToastAlerta(mensagem: string, tipo: string) {
  switch (tipo) {
    case 'sucesso':
      toast.success(mensagem, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
      break;

    case 'erro':
      toast.error(mensagem, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
      break;
  }
}
