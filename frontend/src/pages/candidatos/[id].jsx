import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { isError, useQuery,isSuccess } from 'react-query'
import { API } from '@/lib/api'
import FormEdit from '@/components/FormEdit'

export default function Candidato() {
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

  if (isSuccess) {
    return (
      <>
        <Head>
          <title>Banco de Sangue | Candidato | {candidato.nome}</title>
          <meta name="description" content="Dashboard" />
        </Head>
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="flex justify-center text-lg font-medium leading-6 text-gray-900">
              Detalhes do candidato
            </h3>
            <p className="mt-1 flex justify-center text-sm text-gray-500">
              Informações sobre o candidato(a)
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Nome completo
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{candidato.nome}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">CPF</dt>
                <dd className="mt-1 text-sm text-gray-900">{candidato.cpf}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Sexo</dt>
                <dd className="mt-1 text-sm text-gray-900">{candidato.sexo}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">RG</dt>
                <dd className="mt-1 text-sm text-gray-900">{candidato.rg}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Data de nascimento
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {candidato.data_nasc}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Mãe</dt>
                <dd className="mt-1 text-sm text-gray-900">{candidato.mae}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Pai</dt>
                <dd className="mt-1 text-sm text-gray-900">{candidato.pai}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-900">
                  Dados de contato:
                </dt>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {candidato.email}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Telefone</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {candidato.telefone_fixo}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Celular</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {candidato.celular}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Endereço</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {candidato.endereco}, {candidato.numero}, {candidato.bairro},{' '}
                  {candidato.cidade} - {candidato.estado}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-900">
                  Informações clínicas:
                </dt>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Tipo Sanguíneo
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {candidato.tipo_sanguineo}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Altura</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {candidato.altura}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Peso</dt>
                <dd className="mt-1 text-sm text-gray-900">{candidato.peso}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">IMC</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {candidato.imc.toFixed(2)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div>
          <div className="mt-5 flex flex-row justify-between md:my-2 md:col-span-2">
            <button className='text-md mb-4 inline-flex items-center justify-center rounded border border-transparent bg-gray-600 px-2.5 py-1.5 font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
              <a href="/candidatos">Voltar</a>
            </button>
            <button
            className='text-md mb-4 inline-flex items-center justify-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            onClick={() => router.push(`/candidatos/editar/${candidato.id}`)}>
              Editar
            </button>
          </div>
        </div>
      </>
    )
  }
}
