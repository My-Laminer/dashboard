'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Building2,
  Calculator,
  FileText,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Proyectos', href: '/projects', icon: Building2 },
  { name: 'Calculadora', href: '/calculator', icon: Calculator },
  { name: 'Cotizaciones', href: '/quotes', icon: FileText },
]

interface HeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
  }
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo y Navegación Principal */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-800">LAMINER</span>
            </Link>

            {/* Navegación Desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                        ? 'bg-gray-100 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Usuario y Menú Móvil */}
          <div className="flex items-center gap-4">
            {/* Perfil Usuario Desktop */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{user.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Menú Usuario */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="px-4 py-2">
                    <p className="text-xs text-gray-500">Rol</p>
                    <p className="text-sm text-gray-800">{user.role}</p>
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    onClick={() => console.log('Logout')}
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>

            {/* Botón Menú Móvil */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        {showMobileMenu && (
          <nav className="md:hidden border-t border-gray-200">
            <div className="px-2 py-3 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                        ? 'bg-gray-100 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                )
              })}

              {/* Usuario Móvil */}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-lg"
                  onClick={() => console.log('Logout')}
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}