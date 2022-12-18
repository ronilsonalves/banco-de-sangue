import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Form from '@/components/FormEdit'
import { isError, useQuery,isSuccess } from 'react-query'
import { API } from '@/lib/api'

export default function Editar() {
    const [candidato, setCandidato] = useState([])
    const router = useRouter()
    const {id} = router.query
  
    useEffect(() => {
      if (router.isReady) {
        console.log(router.query.id)
  
        const fetchData = async () => {
          const response = await API.get(`/${router.query.id}`).then((res) => res)
          setCandidato(response.data)
        }
        fetchData()
      }
    }, [id])
  
    const { data, isLoading, isSuccess } = useQuery('candidato-details', () =>
      API.get(`/${router.query.id}`)
    )
  
    useEffect(() => {
      if (isSuccess) {
        setCandidato(data.data)
      }
    }, [data])
  
    if (isLoading || !router.isReady || !candidato) {
      return (
        <>
          <Head>
            <title>Banco de Sangue | Candidatos</title>
            <meta name="description" content="Dashboard" />
          </Head>
          <div>...carregando dados</div>
        </>
      )
    }
  
    if (isSuccess)
    return (
      <>
        <Head>
          <title>Banco de Sangue | Editar candidato</title>
          <meta name="description" content="Cadastrar candidato" />
        </Head>
        <div className="max-w7x1 mx-auto px-4 sm:px-6 lg:px-8">
          <Form candidatoValue={candidato}/>
        </div>
      </>
    )
  }