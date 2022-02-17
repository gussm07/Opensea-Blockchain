import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { useWeb3 } from '@3rdweb/hooks'
import { useEffect } from 'react'

import { client } from '../lib/sanityClient'
import toast, { Toaster } from 'react-hot-toast'

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

export default function Home() {
  const { address, connectWallet } = useWeb3()

/* TOAST CON REACT-HOT-TOAST LIBRARY */
  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back${userName !== 'Unnamed' ? ` ${userName}` : ''}!`,
      {
        style: {
          background: '#04111d',
          color: '#fff',
        },
      }
    )
  }

  /* CUANDO EL USUARIO ENTRA, ALMACENARLO EN BASE DE DATOS */
  useEffect(() => {
    /* SI NO HAY USUARIO, SALIR DE SENTENCIA */
    if (!address)
      return /* SI HAY USUARIO LOGGEADO, ALMACENA EN UN DOC DE SANITY */
    ;(async () => {
      const userDoc = {
        _type: 'users',
        _id: address,
        userName: 'Unnamed',
        walletAddress: address,
      }

      /* ESTA LINEA SOLO CREARÁ UN USUARIO EN SANITY SI NO EXISTE, DE LO CONTRARIO NO CREARÁ NADA */
      const result = await client.createIfNotExists(userDoc)
      /* CUANDO EL USUARIO ESTA LOGGEADO, MUESTRA EL TOAST */
      welcomeUser(result.userName)
    })()
  }, [address])

  return (
    /*  {/* ESTE FRAGMENTO DE CODIGO PERMITE INICIAR SESIÓN CON METAMASK */
    <div className={style.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />

      {/* CONDICIONAL DE SI EXISTE UN USUARIO, MUESTRA ESTO... */}
      {address ? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        /* SINO EXISTE UN USUARIO... */
        <div className={style.walletConnectWrapper}>
          <button
            className={style.button}
            onClick={() => connectWallet('injected')}
          >
            Connect Wallet
          </button>
          <div className={style.details}>
            You need Chrome to be
            <br /> able to run this app.
          </div>
        </div>
      )}
    </div>
    /* TERMINA FRAGMENTO DE CODIGO PARA INICIAR SESION CON METAMASK */
  )
}
