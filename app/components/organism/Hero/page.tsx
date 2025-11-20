import { HeartHandshake, Megaphone, Trophy, Users } from 'lucide-react'
import Image from 'next/image'

const Hero = () => {
    return (
        <div className="relative w-full h-[450px] sm:h-[500px] overflow-hidden">
            {/* Gambar Latar Belakang */}
            <Image
                src="/hero.png"
                alt="Komunitas crowdfunding sedang berinteraksi"
                fill
                priority
                className="object-cover object-center"
            />

            {/* Overlay gelap */}
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/70"></div>

            {/* Konten Hero (Judul & Tombol CTA) */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 pb-24">
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
                    Satu Aksi Kecil, Dampak Besar
                </h1>
                <p className="text-lg sm:text-xl font-medium mb-8 max-w-md drop-shadow-md">
                    Bergabunglah dengan jutaan #OrangBaik lain, wujudkan harapan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                    className="w-full sm:w-auto bg-white text-[#00806e] font-bold px-6 py-2.5 rounded-full flex items-center justify-center gap-2 text-base shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                    >
                    <HeartHandshake size={20} />
                    Donasi Sekarang
                    </button>
                    <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-bold px-6 py-2.5 rounded-full flex items-center justify-center gap-2 text-base shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/10">
                    <Megaphone size={20} />
                    Mulai Galang Dana
                    </button>
                </div>
            </div>
            
            {/* Kartu Statistik (Keberhasilan & Dampak) */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
                    <div className="flex items-center justify-around">
                        <div className="text-white text-center flex flex-col items-center gap-1">
                            <div className="flex items-center gap-1.5">
                                <Trophy size={14} className="opacity-80" />
                                <span className="text-xs opacity-80">Kampanye Tuntas</span>
                            </div>
                            <p className="text-2xl font-bold drop-shadow-md">1.240</p>
                        </div>
                        <div className="h-10 w-px bg-white/20"></div>
                        <div className="text-white text-center flex flex-col items-center gap-1">
                            <div className="flex items-center gap-1.5">
                                <Users size={14} className="opacity-80" />
                                <span className="text-xs opacity-80">Penerima Manfaat</span>
                            </div>
                            <p className="text-2xl font-bold drop-shadow-md">4.500+</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero