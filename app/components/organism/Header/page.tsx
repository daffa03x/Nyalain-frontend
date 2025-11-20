import { Search } from "lucide-react"

const Header = () => {
    return (
        <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm transition-all duration-300">
            <div className="px-5 py-3">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <input
                    type="text"
                    placeholder='Coba cari "Tolong menolong"'
                    className="w-full bg-gray-100 pl-12 pr-4 py-2.5 rounded-full text-sm 
                                text-gray-800 placeholder-gray-500
                                focus:outline-none focus:ring-2 focus:ring-[#00FFC6] 
                                border border-transparent focus:border-[#00FFC6]"
                    />
                </div>
            </div>
        </div>
    )
}

export default Header