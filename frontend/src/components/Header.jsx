import LogoAnimated from "./LogoAnimated"

const navigation = [
    { name: 'Listar candidatos', href: '/candidatos' },
    { name: 'Adicionar candidato', href: '/candidatos/adicionar' },
  ]
  
  export default function Header() {
    return (
      <header className="bg-red-400">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-red-300 py-6 lg:border-none">
          <div className="flex items-center">
            <LogoAnimated />
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-red-50">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <a
              href="/load"
              className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-red-500 hover:bg-opacity-75"
            >
              Carregar arquivo JSON
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
    )
  }
  