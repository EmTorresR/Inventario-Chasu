import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart2,
  Users2,
  Package,
  Edit2,
  History,
  Calendar,
  List,
  Settings,
  HelpCircle,
  Menu,
} from "lucide-react";
import avatar from "../assets/Avatar.png";

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleNavigation = () => setIsMobileMenuOpen(false);

  const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, children }) => {
    const isActive = location.pathname === href;
    return (
      <Link
        to={href}
        onClick={handleNavigation}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md
                    transition-colors duration-500 ease-in-out no-underline ${
          isActive
            ? "border-l-4 border-blue-500 bg-gray-100 dark:bg-[#1F1F23] text-gray-900 dark:text-white"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
        }`}
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    );
  };

  return (
    <>
      {/* Botón móvil */}
      {!isMobileMenuOpen && (
        <button
          type="button"
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md transition-colors duration-500 ease-in-out"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      )}

      {/* Sidebar con movimiento + fade sincronizados */}
      <nav
        className={`
          fixed inset-y-0 left-0 z-40 w-64
          bg-white dark:bg-[#0F0F12]
          border-r border-gray-200 dark:border-[#1F1F23]
          transform
          transition-transform transition-colors
          duration-500 ease-in-out
          lg:translate-x-0 lg:static lg:w-64
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Header / Logo */}
          <div className="h-16 px-6 flex items-center
                          border-b border-black/10 dark:border-white/10
                          transition-[border-color] duration-500 ease-in-out">
            <Link
              to="/"
              onClick={handleNavigation}
              className="flex items-center gap-3 no-underline"
            >
              <img src={avatar} alt="Logo" className="h-8 w-8 flex-shrink-0" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white
                               transition-colors duration-500 ease-in-out">
                Chasu Inventory
              </span>
            </Link>
          </div>

          {/* Menú principal */}
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6 transition-colors duration-500 ease-in-out">
            {/* GENERAL */}
            <div>
              <div className="px-3 mb-3 text-xs font-semibold uppercase tracking-wider
                              text-gray-500 dark:text-gray-400
                              transition-colors duration-500 ease-in-out">
                GENERAL
              </div>
              <div className="space-y-1">
                <NavItem href="/" icon={Home}>Inicio</NavItem>
                <NavItem href="/estadisticas" icon={BarChart2}>Estadísticas</NavItem>
                <NavItem href="/gestion-clientes" icon={Users2}>Gestión Clientes</NavItem>
              </div>
            </div>

            {/* INVENTARIO */}
            <div>
              <div className="px-3 mb-3 text-xs font-semibold uppercase tracking-wider
                              text-gray-500 dark:text-gray-400
                              transition-colors duration-500 ease-in-out">
                INVENTARIO
              </div>
              <div className="space-y-1">
                <NavItem href="/productos" icon={Package}>Productos</NavItem>
                <NavItem href="/scanner" icon={Edit2}>Modificaciones</NavItem>
                <NavItem href="/registro-cambios" icon={History}>Registro de cambios</NavItem>
              </div>
            </div>

            {/* PEDIDOS */}
            <div>
              <div className="px-3 mb-3 text-xs font-semibold uppercase tracking-wider
                              text-gray-500 dark:text-gray-400
                              transition-colors duration-500 ease-in-out">
                PEDIDOS
              </div>
              <div className="space-y-1">
                <NavItem href="/planificar" icon={Calendar}>Planificar</NavItem>
                <NavItem href="/lista-pedidos" icon={List}>Lista de Pedidos</NavItem>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]
                          space-y-1 transition-colors duration-500 ease-in-out">
            <NavItem href="/configuracion" icon={Settings}>Configuración</NavItem>
            <NavItem href="/ayuda" icon={HelpCircle}>Ayuda</NavItem>
          </div>
        </div>
      </nav>

      {/* Overlay móvil desenfocado */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-[#0F0F12]/30 z-30 lg:hidden transition-all duration-300 ease-in-out"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
