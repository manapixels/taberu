import Link from 'next/link'
import type { ReactNode } from 'react'

import { AppConfig } from '@/utils/AppConfig'
import { Droplet, Home, Server } from 'react-feather'
import logo from '../images/logo.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
}

const Main = (props: IMainProps) => {
  const router = useRouter()
  const currentRoute = router.pathname

  return (
    <div className="w-full text-gray-700 antialiased">
      {props.meta}

      <div className="mx-auto flex flex-col h-screen">
        <header className="border-b border-gray-300 background-blue-50 grow-0 flex justify-between p-4">
          <Image src={logo} alt="" className="" width="130" />
          <Link
            href="/apply"
            className="inline-flex justify-items-center items-center rounded-lg text-sm font-semibold py-3 px-4 bg-blue-600 text-white hover:bg-blue-500"
          >
            Apply for listing
          </Link>
        </header>
        <div className="grid grid-flow-col grid-cols-6 grid-rows-1 gap-4 grow">
          <nav className="bg-blue-100 p-3 h-full col-span-1">
            <ul className="flex flex-wrap flex-col text-md">
              <li className="mb-2">
                <Link
                  href="/"
                  className={`relative border-none text-gray-700 hover:text-gray-900 flex items-center hover:bg-blue-200 py-1 px-4 rounded-md after:w-1.5 after:h-full after:rounded-md after:absolute after:left-0 ${currentRoute === '/' && 'bg-white after:bg-blue-500'}`}
                >
                  <Home size={14} stroke={`${currentRoute === '/' ? 'rgb(43 108 176' : '#64748b'}`} />
                  <span className={`ml-2 text-slate-600 font-semibold ${currentRoute === '/' && 'text-blue-700'}`}>
                    Home
                  </span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/jobs"
                  className={`relative border-none text-gray-700 hover:text-gray-900 flex items-center hover:bg-blue-200 py-1 px-4 rounded-md after:w-1.5 after:h-full after:rounded-md after:absolute after:left-0 ${currentRoute === '/jobs' && 'bg-white after:bg-blue-500'}`}
                >
                  <Droplet size={14} stroke={`${currentRoute === '/jobs' ? 'rgb(43 108 176' : '#64748b'}`} />
                  <span className={`ml-2 text-slate-600 font-semibold ${currentRoute === '/jobs' && 'text-blue-700'}`}>
                    Projects
                  </span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/rpc-server"
                  className={`relative border-none text-gray-700 hover:text-gray-900 flex items-center hover:bg-blue-200 py-1 px-4 rounded-md after:w-1.5 after:h-full after:rounded-md after:absolute after:left-0 ${currentRoute === '/rpc-server' && 'bg-white after:bg-blue-500'}`}
                >
                  <Server size={14} stroke={`${currentRoute === '/rpc-server' ? 'rgb(43 108 176' : '#64748b'}`} />
                  <span className={`ml-2 text-slate-600 font-semibold ${currentRoute === '/rpc-server' && 'text-blue-700'}`}>
                    RPC Server
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          <main className="content col-span-5">{props.children}</main>
        </div>

        <footer className="py-2 text-center text-sm">
          © Copyright {new Date().getFullYear()} {AppConfig.title}. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export { Main }
