import { Search, Bell, ChevronDown, LogOut, X } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function DashboardHeader() {
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string }>>([]);
  return (
    <header className="h-16 bg-[#1B1B1B]/80 backdrop-blur-xl border-b border-gray-800 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar platos, ingredientes..."
            className="pl-10 bg-[#2A2A2A] border-gray-700 text-white placeholder:text-gray-400 focus:border-[#F5B041] focus:ring-[#F5B041]/20"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotificationsOpen((v) => !v)}
          className="relative p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5 text-gray-400" />
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#2ECC71] rounded-full"></span>
          )}
        </button>

        {/* Notification dropdown */}
        {notificationsOpen && (
          <div className="absolute right-0 mt-2 w-96 bg-[#1B1B1B] border border-gray-800 rounded-lg shadow-lg z-50">
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-white font-medium">Notificaciones</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-400">No hay notificaciones</div>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.id} className="p-3 border-b border-gray-800 flex items-center justify-between hover:bg-gray-800/30">
                    <p className="text-gray-300 text-sm">{notif.message}</p>
                    <button
                      onClick={() => setNotifications((prev) => prev.filter((n) => n.id !== notif.id))}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* User Avatar - Dropdown with logout */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800/50 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-[#2ECC71] to-[#F5B041] rounded-full flex items-center justify-center">
              <span className="text-xs text-[#1B1B1B]">RM</span>
            </div>
            <span className="text-sm text-white hidden md:block">Restaurante Madrid</span>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#1B1B1B] border-gray-800 text-white w-48">
          <DropdownMenuItem
            onClick={() => navigate('/dashboard/configuracion')}
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 focus:bg-gray-800/50 cursor-pointer"
          >
            <span>Configuración</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate('/')}
            className="text-red-400 hover:text-red-300 hover:bg-red-400/10 focus:bg-red-400/10 cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </header>
  );
}
