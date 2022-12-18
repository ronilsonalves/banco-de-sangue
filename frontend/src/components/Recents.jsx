import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { API } from '@/lib/api'
import DonorCard from './DonorCard'

export default function Recents() {
  const [people, setPeople] = useState([])
  const { data, isLoading, isError } = useQuery('recents', () =>
    API.get('/recents')
  )
  useEffect(() => {
    if (data) {
      setPeople(data.data)
    }
  }, [data])
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error</div>
  }
  return (
    <div className="max-w7x1 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Candidatos cadastrados recentemente
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Abaixo os últimos 6 candidatos cadastrados no sistema.
            </p>
          </div>
        </div>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {people.map((candidato) => (
          <DonorCard key={candidato.email} donor={candidato} />
        ))}
      </ul>
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-end sm:flex-nowrap">
          <div className="ml-4 mt-4 flex-shrink-0">
            <a href="/candidatos">
              <button
                type="button"
                className="relative inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Listar todos os candidatos
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
