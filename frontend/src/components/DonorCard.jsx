import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'

export default function DonorCard({ donor }) {
  return (
    <li
      key={donor.email}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <a href={`/candidatos/${donor.id}`}>
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="truncate text-sm font-medium text-gray-900">
                {donor.nome}
              </h3>
              <span className="inline-block flex-shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-green-800">
                {donor.estado}
              </span>
            </div>
            <p className="mt-1 truncate text-sm text-gray-500">{donor.sexo}</p>
          </div>
          <span className="inline-block flex-shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
            {donor.tipo_sanguineo}
          </span>
        </div>
      </a>

      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href={`mailto:${donor.email}`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              <EnvelopeIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span className="ml-3">Email</span>
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href={`tel:+55 ${donor.telefone_fixo}`}
              className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">Ligar</span>
            </a>
          </div>
        </div>
      </div>
    </li>
  )
}
