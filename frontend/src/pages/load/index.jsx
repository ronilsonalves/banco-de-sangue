import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import LogoAnimated from '../../components/LogoAnimated'
import axios from 'axios'
import ListarCandidatos from '../candidatos'

export default function Upload() {
  const [status, setStatus] = useState('IDLE')
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  const handleLoad = async (data) => {
    setStatus('LOADING')
    console.log(status)
    try {
      const response = await axios.post(
        'http://localhost:8080/candidatos/load-json'
      )
      setStatus('SUCCESS')
      setOpen(false)
      handleResponse(data)
    } catch (error) {
      setStatus('ERROR')
      setOpen(false)
      handleResponse(data)
    }
  }

  const handleResponse = (data) => {
    if (status === 'SUCCESS') {
      data = null
      return (
        <div className="my-4 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Dados dos arquivos JSON salvos no sistema.
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  As informações dos candidatos presentes no arquivo JSON foram
                  salvas com sucesso no sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (status === 'ERROR') {
      data = null
      return (
        <div className="my-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Erro ao salvar dados do JSON no sistema.
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  Ocorreu um erro ao tentar salvar as informações presentes no
                  arquivo JSON no sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (status === 'LOADING') {
      return (
        <div className="my-4 rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon
                className="h-5 w-5 text-yellow-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Carregando dados do JSON...
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Os dados do arquivo JSON estão sendo carregados no sistema.
                  Por favor, aguarde...ao sair dessa página você não receberá qualquer notificação em caso de falha ou sucesso!
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      {handleResponse()}
      <ListarCandidatos />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                      <LogoAnimated />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Carregar Arquivo Json
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Ao carregadar um novo arquivo, o antigo será
                          substituido e as informações atualizadas no banco de
                          dados do sistema. Essa ação não poderá ser desfeita.
                          Essa execução pode demorar alguns minutos.
                        </p>
                        <p className="text-md text-gray-600">
                          URL do arq a ser carregado no banco:{' '}
                          <a href="https://cdn.ronilsonalves.com/testes/bancodesangue/data.json">
                            data.json
                          </a>
                        </p>
                      </div>
                      {handleResponse()}
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      //onClick={() => setOpen(false)}
                      onClick={() => handleLoad()}
                    >
                      Carregar
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
