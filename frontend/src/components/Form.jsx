import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

export default function Form() {
  const [status, setStatus] = useState('IDLE')
  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
  })

  const handleRegistration = async (data) => {
    console.log(data)
    let dataPost = {
      nome: data.nome,
      cpf: data.cpf,
      rg: data.rg,
      sexo: data.sexo,
      data_nasc: data.data_nasc,
      mae: data.mae,
      pai: data.pai,
      email: data.email,
      telefone_fixo: data.telefone_fixo,
      celular: data.celular,
      endereco: data.endereco,
      numero: data.numero,
      bairro: data.bairro,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
      tipo_sanguineo: data.tipo_sanguineo,
      peso: data.peso,
      altura: data.altura,
    }
    try {
      const response = await axios.post(
        'http://localhost:8080/candidatos',
        dataPost
      )
      setStatus('SUCCESS')
      console.log(response)
      handleResponse(data)
      reset()
    } catch (error) {
      setStatus('ERROR')
      handleResponse(data)
      console.log(error)
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
                Candidato(a) cadastrado com sucesso!
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  As informações do candidato foram salvas com sucesso no
                  sistema.
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
              <CheckCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Erro ao cadastrar candidato(a)
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  Ocorreu um erro ao tentar cadastrar o candidato(a) no sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  const patOne = /^[a-zA-Z]+$/i
  const patCPF = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
  const patRG = /^\d{2}\.\d{3}\.\d{3}\-\d{1}$/
  const patCEP = /^\d{5}\-\d{3}$/
  const patCel = /^\(?[1-9]{2}\)?\s?\d{5}(\-|\s)?\d{4}$/
  const patTel = /^\(?[1-9]{2}\)?\s?\d{4}(\-|\s)?\d{4}$/

  return (
    <div className="flex flex-col flex-wrap">
      {handleResponse()}
      <form
        onSubmit={handleSubmit(handleRegistration)}
        className="mt-4 flex flex-col flex-wrap"
      >
        <h1 className="text-2xl font-bold">
          Dados do(a) candidato a doador(a)
        </h1>
        <p className="text-gray-500">* Campos obrigatórios</p>
        <div className="mb-4 flex flex-col flex-wrap">
          <label
            htmlFor="nome"
            className="text-m block font-medium text-gray-700"
          >
            Nome completo *
          </label>
          <input
            {...register('nome', { required: true, pattern: patOne })}
            type="text"
            placeholder="Nome completo"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          {errors?.nome?.type === 'pattern' && (
            <p className="my-2 text-red-500">
              Não é possível inserir números no nome
            </p>
          )}
          {errors?.nome?.type === 'required' && (
            <p className="my-2 text-red-500">Nome é obrigatório</p>
          )}
          <label
            htmlFor="cpf"
            className="text-m block font-medium text-gray-700"
          >
            CPF *
          </label>
          <input
            {...register('cpf', { required: true, pattern: patCPF })}
            type="text"
            placeholder="123.456.789-10"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          {errors?.cpf?.type === 'required' && (
            <p className="my-2 text-red-500">CPF é obrigatório</p>
          )}
          {errors?.cpf?.type === 'pattern' && (
            <p className="my-2 text-red-500">
              Preencha o CPF neste formato: xxx.xxx.xxx-xx
            </p>
          )}

          <label
            htmlFor="rg"
            className="text-m block font-medium text-gray-700"
          >
            RG *
          </label>
          <input
            {...register('rg', { required: true, pattern: patRG })}
            type="text"
            placeholder="12.345.678-9"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          {errors?.rg?.type === 'required' && (
            <p className="my-2 text-red-500">RG é obrigatório</p>
          )}
          {errors?.rg?.type === 'pattern' && (
            <p className="my-2 text-red-500">
              Preencha o RG neste formato: xx.xxx.xxx-x
            </p>
          )}

          <label
            htmlFor="sexo"
            className="text-m block font-medium text-gray-700"
          >
            Sexo *
          </label>
          <select
            {...register('sexo', { required: true })}
            type="select"
            placeholder="Sexo"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          >
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>

          <label
            htmlFor="mae"
            className="text-m block font-medium text-gray-700"
          >
            Nome da mãe *
          </label>
          <input
            {...register('mae')}
            type="text"
            placeholder="Nome da mãe"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="pai"
            className="text-m block font-medium text-gray-700"
          >
            Nome do pai *
          </label>
          <input
            {...register('pai')}
            type="text"
            placeholder="Nome do pai"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="email"
            className="text-m block font-medium text-gray-700"
          >
            Endereço de e-mail *
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="cep"
            className="text-m block font-medium text-gray-700"
          >
            CEP *
          </label>
          <input
            {...register('cep', { required: true, pattern: patCEP })}
            type="text"
            placeholder="00000-000"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          {errors?.cep?.type === 'required' && (
            <p className="my-2 text-red-500">CEP é obrigatório</p>
          )}
          {errors?.cep?.type === 'pattern' && (
            <p className="my-2 text-red-500">
              Preencha o CEP neste formato: xxxxx-xxx
            </p>
          )}

          <label
            htmlFor="endereco"
            className="text-m block font-medium text-gray-700"
          >
            Endereço *
          </label>
          <input
            {...register('endereco', { required: true })}
            type="text"
            placeholder="Endereço"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="endereco"
            className="text-m block font-medium text-gray-700"
          >
            Número *
          </label>
          <input
            {...register('numero', { required: true })}
            type="text"
            placeholder="Número"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="bairro"
            className="text-m block font-medium text-gray-700"
          >
            Bairro *
          </label>
          <input
            {...register('bairro', { required: true })}
            type="text"
            placeholder="Bairro"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="cidade"
            className="text-m block font-medium text-gray-700"
          >
            Cidade *
          </label>
          <input
            {...register('cidade', { required: true })}
            type="text"
            placeholder="Cidade"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="estado"
            className="text-m block font-medium text-gray-700"
          >
            Estado *
          </label>
          <select
            {...register('estado', { required: true })}
            type="text"
            placeholder="Estado"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          >
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>

          <label
            htmlFor="celular"
            className="text-m block font-medium text-gray-700"
          >
            Celular *
          </label>
          <input
            {...register('celular', { required: true, pattern: patCel })}
            type="text"
            placeholder="Celular"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          {errors?.celular?.type === 'required' && (
            <p className="my-2 text-red-500">Celular é obrigatório</p>
          )}
          {errors?.celular?.type === 'pattern' && (
            <p className="my-2 text-red-500">
              Preencha o celular neste formato: (xx) xxxxx-xxxx
            </p>
          )}

          <label
            htmlFor="altura"
            className="text-m block font-medium text-gray-700"
          >
            Altura *
          </label>
          <input
            {...register('altura', { required: true })}
            type="number"
            step={0.01}
            min={0}
            max={3}
            placeholder="Altura"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="peso"
            className="text-m block font-medium text-gray-700"
          >
            Peso *
          </label>
          <input
            {...register('peso', { required: true })}
            type="number"
            placeholder="Peso"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="data_nasc"
            className="text-m block font-medium text-gray-700"
          >
            Data de nascimento *
          </label>
          <input
            {...register('data_nasc', { required: true })}
            type="date"
            placeholder="Data de nascimento"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="telefone_fixo"
            className="text-m block font-medium text-gray-700"
          >
            Telefone fixo *
          </label>
          <input
            {...register('telefone_fixo', { required: true, pattern: patTel })}
            type="text"
            placeholder="Telefone fixo"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          {errors?.telefone_fixo?.type === 'required' && (
            <p className="my-2 text-red-500">Telefone fixo é obrigatório</p>
          )}
          {errors?.telefone_fixo?.type === 'pattern' && (
            <p className="my-2 text-red-500">
              Preencha o telefone fixo neste formato: (xx) xxxx-xxxx
            </p>
          )}

          <label
            htmlFor="tipo_sanguineo"
            className="text-m block font-medium text-gray-700"
          >
            Tipo sanguíneo *
          </label>
          <select
            {...register('tipo_sanguineo', { required: true })}
            type="text"
            placeholder="Tipo sanguíneo"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="text-md mb-4 inline-flex items-center justify-center rounded border border-transparent bg-gray-600 px-2.5 py-1.5 font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cadastrar candidato
        </button>
      </form>
    </div>
  )
}
