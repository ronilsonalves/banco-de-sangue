import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import { API } from '@/lib/api'
import DonorCard from '@/components/DonorCard'

export default function ListarCandidatos() {
  const { handleSubmit, register } = useForm({ mode: 'onChange' })

  const router = useRouter()
  const [candidatos, setCandidatos] = useState([])
  const [apiURL, setApiURL] = useState('')
  const { data, isLoading, isError } = useQuery('candidatos', () =>
    API.get()
  )

  useEffect(() => {
    if (data) {
      setCandidatos(data.data)
    }
  }, [data])

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Banco de Sangue | Candidatos</title>
          <meta name="description" content="Candidatos" />
        </Head>
        <div className="max-w7x1 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Candidatos
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Carregando candidatos cadastrados...
                </p>
              </div>
              <div className="ml-4 mt-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    router.push('/candidatos/adicionar')
                  }}
                  className="relative inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Adicionar novo candidato
                </button>
              </div>
            </div>
          </div>
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {candidatos.map((candidato) => (
              <DonorCard key={candidato.email} donor={candidato} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <Head>
          <title>Banco de Sangue | Candidatos</title>
          <meta name="description" content="Candidatos" />
        </Head>
        <div>Erro ao carregar os dados</div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Banco de Sangue | Candidatos</title>
        <meta name="description" content="Candidatos" />
      </Head>
      <div className="max-w7x1 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Candidatos
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Abaixo estão listados todos os candidatos cadastrados no
                sistema.
              </p>
            </div>
            <div className="ml-4 mt-4 flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  router.push('/candidatos/adicionar')
                }}
                className="relative inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Adicionar novo candidato
              </button>
            </div>
          </div>
        </div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {candidatos.map((candidato) => (
            <DonorCard key={candidato.email} donor={candidato} />
          ))}
        </ul>
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-end sm:flex-nowrap">
            <div className="ml-4 mt-4 flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  router.push('/candidatos/adicionar')
                }}
                className="relative inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Adicionar novo candidato
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
