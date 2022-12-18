import Form from '@/components/Form'
import Head from 'next/head'

export default function Adicionar() {
  return (
    <>
      <Head>
        <title>Banco de Sangue | Cadastrar candidato</title>
        <meta name="description" content="Cadastrar candidato" />
      </Head>
      <div className="max-w7x1 mx-auto px-4 sm:px-6 lg:px-8">
        <Form />
      </div>
    </>
  )
}
