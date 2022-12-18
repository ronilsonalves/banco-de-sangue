import React from 'react'
import ChartPorEstado from '@/components/Charts/PorEstado'
import ChartIMCMedioFaixaEtaria from '@/components/Charts/IMCMedioFaixaEtaria'
import ChartObesidadeSexo from '@/components/Charts/ObesidadePorSexo'
import ChartIdadeMediaTipoSanguineo from '@/components/Charts/IdadeMediaTipoSanguineo'
import ChartPossiveisDoadoresPorTipoSangReceptor from '@/components/Charts/PossiveisDoadoresPorTipoSangReceptor'
import Recents from '@/components/Recents'
import Head from 'next/head'

export default function Home() {
  return (
    <>
    <Head>
      <title>Banco de Sangue | Dashboard</title>
      <meta name="description" content="Dashboard" />
    </Head>
      <div className="max-w7x1 mx-auto px-4 sm:px-6 lg:px-8">
        <Recents />

        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-start">
                <span className="bg-white pr-3 text-lg font-medium text-gray-900">
                  Candidatos em cada estado brasileiro:
                </span>
              </div>
            </div>
            <ChartPorEstado />
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-start">
                <span className="bg-white pr-3 text-lg font-medium text-gray-900">
                  IMC Médio por faixa etária:
                </span>
              </div>
            </div>
            <ChartIMCMedioFaixaEtaria />
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="false"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-start">
                <span className="bg-white pr-3 text-lg font-medium text-gray-900">
                  Obsesidade entre homens e mulheres:
                </span>
              </div>
            </div>
            <ChartObesidadeSexo />
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="false"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-start">
                <span className="bg-white pr-3 text-lg font-medium text-gray-900">
                  Idade média por tipo sanguíneo:
                </span>
              </div>
            </div>
            <ChartIdadeMediaTipoSanguineo className="mx-auto max-w-3xl" />
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="false"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-start">
                <span className="bg-white pr-3 text-lg font-medium text-gray-900">
                  Candidatos aptos por tipo sanguíneo recebedor:
                </span>
              </div>
            </div>
            <ChartPossiveisDoadoresPorTipoSangReceptor className="mx-auto max-w-3xl" />
          </div>
        </div>
      </div>
    </>
  )
}
