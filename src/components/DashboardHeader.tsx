import { Search, Bell, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";

export function DashboardHeader() {
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
        <button className="relative p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#2ECC71] rounded-full"></span>
        </button>

        {/* User Avatar */}
        <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800/50 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-[#2ECC71] to-[#F5B041] rounded-full flex items-center justify-center">
            <span className="text-xs text-[#1B1B1B]">RM</span>
          </div>
          <span className="text-sm text-white hidden md:block">Restaurante Madrid</span>
          <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
        </button>
      </div>
    </header>
  );
}
