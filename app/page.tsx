'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Search, User, Home, Wallet, FileText, Mail, ChevronRight, BadgeCheck, HeartHandshake, Megaphone, Trophy, Users } from 'lucide-react';

/**
 * Komponen utama untuk halaman beranda (Home) aplikasi donasi.
 * Menampilkan berbagai section seperti header pencarian, hero, menu aksi cepat,
 * daftar kampanye (mendesak, rekomendasi), banner spesial, kategori, dan navigasi bawah.
 */
const HomePage = () => {
  // State untuk melacak tab navigasi bawah yang sedang aktif.
  const [activeTab, setActiveTab] = useState('donasi');

  // --- Data Mock (Contoh Data) ---
  // Data ini nantinya bisa diganti dengan data dari API.

  /** Mock data untuk section "Penggalangan Dana Mendesak" */
  const urgentCampaigns = [
    {
      id: 1,
      title: "Solidaritas Bantu Pendidikan Dhuafa!",
      organizer: "Salam Setara",
      verified: true,
      collected: 14077250,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
      progress: 45
    },
    {
      id: 2,
      title: "Ringangan Beban Tulang Punggung Dhuafa",
      organizer: "Salam Setara Amanah Nusantara",
      verified: true,
      collected: 431932558,
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop",
      progress: 85
    }
  ];

  /** Mock data untuk section "Pilih Kategori" */
  const categories = [
    { id: 'bencana', name: 'Bencana Alam', icon: '🌊', color: 'bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300' },
    { id: 'balita', name: 'Balita & Anak Sakit', icon: '🔥', color: 'bg-gradient-to-br from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300' },
    { id: 'medis', name: 'Bantuan Medis & Kesehatan', icon: '💊', color: 'bg-gradient-to-br from-[#e6fff9] to-[#c0fff1] hover:from-[#c0fff1] hover:to-[#a0fded]' },
    { id: 'lainnya', name: 'Lainnya', icon: '⚙️', color: 'bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300' }
  ];

  /** Mock data untuk section "Rekomendasi Pilihan" */
  const recommendedCampaigns = [
    {
      id: 1,
      title: "Bersama BAZNAS, Bantu Sesama Bangkit dari Bencana",
      organizer: "BAZNAS Hub",
      verified: true,
      collected: 828450308,
      daysLeft: 1876,
      image: "https://images.unsplash.com/photo-1469571486292_0ba58a3f068b?w=400&h=300&fit=crop",
      label: "REKOMENDASI",
      progress: 75
    },
    {
      id: 2,
      title: "Bantu Warga Terdampak Banjir & Longsor Sukabumi",
      organizer: "Sinergi Sahabat Peduli For Humanity",
      verified: true,
      collected: 65000,
      daysLeft: 30,
      image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=400&h=300&fit=crop",
      progress: 15
    },
    {
      id: 3,
      title: "Aksi Bantuan Banjir Semarang",
      organizer: "Aksi Insan Mulia",
      verified: true,
      collected: 285000,
      daysLeft: 30,
      image: "https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=400&h=300&fit=crop",
      progress: 30
    }
  ];

  /** Mock data untuk menu "Aksi Cepat" (Quick Actions) */
  const quickActions = [
    { name: 'Donasi', icon: '💰', color: 'bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300' },
    { name: 'Zakat', icon: '🕌', color: 'bg-gradient-to-br from-emerald-100 to-emerald-200 hover:from-emerald-200 hover:to-emerald-300' },
    { name: 'Galang Dana', icon: '💼', color: 'bg-gradient-to-br from-[#e6fff9] to-[#c0fff1] hover:from-[#c0fff1] hover:to-[#a0fded]' },
    { name: 'Donasi Otomatis', icon: '🔄', color: 'bg-gradient-to-br from-violet-100 to-violet-200 hover:from-violet-200 hover:to-violet-300' },
    { name: 'Kitabisa Experience', icon: '🎁', color: 'bg-gradient-to-br from-pink-100 to-pink-200 hover:from-pink-200 hover:to-pink-300' },
    { name: 'Kolaborasi CSR', icon: '🤝', color: 'bg-gradient-to-br from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300' },
    { name: 'Asuransi SalingJaga', icon: '🛡️', color: 'bg-gradient-to-br from-red-100 to-red-200 hover:from-red-200 hover:to-red-300' },
    { name: 'Dana Abadi', icon: '🌱', color: 'bg-gradient-to-br from-lime-100 to-lime-200 hover:from-lime-200 hover:to-lime-300' }
  ];

  /** Mock data untuk "Special Banner Carousel" */
  const specialBanners = [
    {
      id: 1,
      tag: 'PENDIDIKAN',
      title: 'Investasi Bekal Akhirat',
      description: 'Sedekah Jariyah Pendidikan untuk masa depan siswa dhuafa.',
      buttonText: 'Sedekah Sekarang',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&h=500&fit=crop',
      gradient: 'bg-gradient-to-br from-pink-400 via-pink-500 to-rose-400',
      buttonColor: 'text-pink-600'
    },
    {
      id: 2,
      tag: 'MEDIS & KESEHATAN',
      title: 'Selamatkan Nyawa Pasien',
      description: 'Donasimu bantu biaya pengobatan pasien kritis yang membutuhkan.',
      buttonText: 'Bantu Sekarang',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=500&fit=crop',
      gradient: 'bg-gradient-to-br from-[#00b396] via-[#009980] to-[#007f6b]',
      buttonColor: 'text-[#00b396]'
    },
    {
      id: 3,
      tag: 'KEMANUSIAAN',
      title: 'Bantu Korban Bencana',
      description: 'Uluran tanganmu ringankan duka saudara kita yang terdampak bencana.',
      buttonText: 'Donasi Bencana',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=500&fit=crop',
      gradient: 'bg-gradient-to-br from-orange-400 via-orange-500 to-amber-400',
      buttonColor: 'text-orange-600'
    }
  ];

  // --- Fungsi Helper ---

  /**
   * Memformat angka menjadi string mata uang Rupiah (IDR).
   * @param {number} amount - Jumlah angka yang akan diformat.
   * @returns {string} String yang sudah diformat (e.g., "Rp 10.000").
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // --- Logika Embla Carousel untuk Banner Spesial ---

  /**
   * Hook Embla Carousel untuk fungsionalitas swipe pada Special Banner.
   * Menggunakan plugin Autoplay untuk rotasi otomatis.
   * [emblaRef] - Ref yang harus ditempelkan ke elemen kontainer carousel.
   * [emblaApi] - API untuk mengontrol carousel secara programatik (e.g., scrollTo).
   */
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  
  // State untuk melacak indeks slide (dot) yang aktif pada carousel.
  const [selectedIndex, setSelectedIndex] = useState(0);

  /**
   * Fungsi untuk menggulir carousel ke slide tertentu secara manual.
   * Dibungkus dengan useCallback agar tidak dibuat ulang di setiap render.
   * @param {number} index - Indeks slide tujuan.
   */
  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  /**
   * Callback yang dipanggil saat slide carousel berubah (event 'select').
   * Mengupdate state `selectedIndex` untuk sinkronisasi dot navigasi.
   */
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  /**
   * Efek untuk menginisialisasi listener Embla Carousel saat komponen dimuat.
   * Mendaftarkan event 'select' dan 'reInit' untuk memperbarui UI (dot navigasi).
   */
  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); // Panggil sekali saat inisialisasi
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // --- Render Komponen ---

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
      
      {/* Header Section (Search Bar) */}
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

      {/* Hero Section */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>

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

      {/* Quick Actions (Bubble Menu) */}
      <div className="px-4 py-6">
        <h2 className="font-bold text-gray-900 mb-5 text-lg">
          Mau berbuat baik apa hari ini?
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button 
              key={index} 
              className="flex flex-col items-center gap-2.5 group transition-all duration-300 hover:-translate-y-1"
            >
              <div 
                className={`${action.color} w-16 h-16 rounded-full flex items-center justify-center 
                           transition-all duration-300 shadow-lg shadow-gray-900/10 group-hover:shadow-xl`}
              >
                <div className="text-3xl opacity-90">
                  {action.icon}
                </div>
              </div>
              <span className="text-xs text-center font-semibold text-gray-700 leading-tight">
                {action.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Urgent Campaigns Section */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-800 text-lg">Penggalangan Dana Mendesak</h2>
          <a 
            href="#" 
            className="flex items-center text-sm font-semibold text-[#00806e] hover:text-[#006e5e] transition-colors group"
          >
            Lihat Semua
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        {/* Kontainer scroll horizontal */}
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
          {urgentCampaigns.map(campaign => (
            <div 
              key={campaign.id} 
              className="bg-white rounded-2xl shadow-md overflow-hidden shrink-0 w-72 
                         transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative overflow-hidden group h-40">
                <Image 
                  src={campaign.image} 
                  alt={campaign.title} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="288px" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-2">
                  <span className="font-medium truncate">{campaign.organizer}</span>
                  {campaign.verified && (
                    <BadgeCheck 
                      size={14} 
                      className="fill-[#00FFC6] text-white flex-shrink-0" 
                    />
                  )}
                </div>
                <h3 
                  className="font-bold text-base text-gray-800 mb-3 h-12 line-clamp-2 hover:text-[#00806e] transition-colors"
                >
                  {campaign.title}
                </h3>
                <div className="space-y-2.5">
                  <div className="text-xs text-gray-500">Terkumpul</div>
                  <div className="font-bold text-gray-900 text-lg">{formatCurrency(campaign.collected)}</div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00FFC6] to-[#00d1a3] rounded-full transition-all duration-500" style={{ width: `${campaign.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Banner (Carousel) */}
      <div className="px-4 py-3">
        <h2 className="font-bold text-gray-800 mb-4 text-lg">Spesial Buat Kamu</h2>
        {/* Kontainer Carousel Embla */}
        <div className="relative rounded-2xl shadow-xl overflow-hidden" ref={emblaRef}>
          {/* Viewport Carousel */}
          <div className="flex">
            {specialBanners.map(banner => (
              // Slide individu
              <div 
                key={banner.id} 
                className="flex-[0_0_100%] min-w-0 relative"
              >
                <div className={`w-full h-80 ${banner.gradient} relative overflow-hidden cursor-pointer`}>
                  {/* Konten Teks (Kiri) */}
                  <div className="absolute top-0 left-0 p-5 sm:p-6 text-white h-full flex flex-col justify-between z-10 w-3/5 sm:w-1/2">
                    <div>
                      <span className="bg-white/20 text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm uppercase">
                        {banner.tag}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold mt-4 mb-2 drop-shadow-md">
                        {banner.title}
                      </h3>
                      <p className="text-xs sm:text-sm drop-shadow opacity-90">
                        {banner.description}
                      </p>
                    </div>
                    <button 
                      className={`bg-white ${banner.buttonColor} font-bold px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm shadow-lg hover:shadow-xl 
                                 transition-all duration-300 hover:scale-105 w-auto`}
                    >
                      {banner.buttonText}
                    </button>
                  </div>
                  {/* Konten Gambar (Kanan) */}
                  <div className="absolute right-0 bottom-0 h-full w-2/5 sm:w-1/2">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      priority={banner.id === 1}
                      className="object-cover"
                      style={{ 
                        maskImage: 'linear-gradient(to left, black 60%, transparent 100%)' 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Navigasi Dot Carousel */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {specialBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? 'bg-white shadow-md w-4' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section (Bubble Menu) */}
      <div className="px-4 py-5">
        <h2 className="font-bold text-gray-900 mb-5 text-lg">
          Pilih Kategori Favoritmu
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {categories.map(cat => (
            <button 
              key={cat.id} 
              className="flex flex-col items-center gap-2.5 group transition-all duration-300 hover:-translate-y-1"
            >
              <div 
                className={`${cat.color} w-16 h-16 rounded-full flex items-center justify-center 
                           transition-all duration-300 shadow-lg shadow-gray-900/10 group-hover:shadow-xl`}
              >
                <div className="text-3xl opacity-90">
                  {cat.icon}
                </div>
              </div>
              <span className="text-xs text-center font-semibold text-gray-700 leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Campaigns Section */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-800 text-lg">Rekomendasi Pilihan</h2>
          <a 
            href="#" 
            className="flex items-center text-sm font-semibold text-[#00806e] hover:text-[#006e5e] transition-colors group"
          >
            Lihat Semua
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        {/* Daftar vertikal kampanye */}
        <div className="space-y-3">
          {recommendedCampaigns.map((campaign, index) => (
            <div 
              key={campaign.id} 
              className="bg-white rounded-2xl shadow-md overflow-hidden 
                         transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              {/* Label Rekomendasi (hanya untuk item pertama) */}
              {index === 0 && (
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-1 inline-block shadow-md">
                  REKOMENDASI
                </div>
              )}
              {/* Konten Kartu */}
              <div className="flex gap-4 p-4">
                {/* Gambar Kampanye */}
                <div className="relative overflow-hidden rounded-xl group flex-shrink-0 w-28 h-28">
                  <Image 
                    src={campaign.image} 
                    alt={campaign.title} 
                    width={112}
                    height={112}
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                {/* Info Konten (Judul, Progress, Stats) */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  {/* Grup Atas: Judul & Organizer */}
                  <div>
                    <h3 
                      className="font-bold text-base text-gray-800 mb-1.5 line-clamp-2 hover:text-[#00806e] transition-colors"
                    >
                      {campaign.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-2">
                      <span className="truncate font-medium">{campaign.organizer}</span>
                      {campaign.verified && (
                        <BadgeCheck 
                          size={14} 
                          className="fill-[#00FFC6] text-white flex-shrink-0" 
                        />
                      )}
                    </div>
                  </div>
                  {/* Grup Bawah: Progress Bar & Stats */}
                  <div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00FFC6] to-[#00d1a3] rounded-full"
                        style={{ width: `${campaign.progress}%` }} 
                      />
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-xs text-gray-500">Terkumpul</div>
                        <div className="font-bold text-sm text-gray-800">{formatCurrency(campaign.collected)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Sisa hari</div>
                        <div className="font-bold text-sm text-gray-800">{campaign.daysLeft}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="px-4 py-5 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
            <div className="overflow-hidden rounded-lg group">
              <Image 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop" 
                alt="Tentang Kitabisa" 
                width={80}
                height={80}
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Tentang Kitabisa</h3>
              <p className="text-xs text-gray-600">Pelajari mengenai pengelolaan dan dampak donasi via Kitabisa</p>
              <button 
                className="text-[#00806e] hover:text-[#006e5e] text-xs font-semibold mt-1 flex items-center gap-1 transition-all hover:gap-2"
              >
                Baca selengkapnya <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-4 py-5 bg-gradient-to-b from-white to-gray-50 text-center text-xs text-gray-600">
        <p className="mb-3">Berdiri sejak 2013, Kitabisa memiliki izin Penggumpulan Uang dan Barang dari Kemensos. Kitabisa rutin diaudit dengan status Wajar Tanpa Pengecualian (WTP).</p>
        <div className="flex justify-center gap-4 mb-4 flex-wrap">
          <a href="#" className="text-gray-600 hover:text-[#00806e] transition-colors">Tentang Kitabisa</a>
          <span>|</span>
          <a href="#" className="text-gray-600 hover:text-[#00806e] transition-colors">Syarat & Ketentuan</a>
          <span>|</span>
          <a href="#" className="text-gray-600 hover:text-[#00806e] transition-colors">Pusat Bantuan</a>
        </div>
        <div className="flex justify-center gap-3 mb-4">
          {['f', 't', 'i', 'y', 'tk', 'in', 'bl'].map((icon, i) => (
            <div key={i} className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 text-xs font-bold transition-all duration-300 cursor-pointer hover:scale-110 shadow-sm hover:shadow-md">
              {icon}
            </div>
          ))}
        </div>
        <p className="text-gray-500">Copyright © 2025 Kitabisa. All Rights Reserved</p>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto 
                   bg-white/80 backdrop-blur-md 
                   border-t border-gray-100 
                   shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-5">
          
          {/* Tombol Navigasi: Donasi */}
          <button
            onClick={() => setActiveTab('donasi')}
            className={`flex flex-col items-center gap-1.5 py-3 transition-all duration-300 rounded-lg ${
              activeTab === 'donasi' 
                ? 'text-[#00806e]' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Home size={24} strokeWidth={2} />
            <span className="text-xs font-medium">Donasi</span>
          </button>
          
          {/* Tombol Navigasi: Galang Dana */}
          <button
            onClick={() => setActiveTab('galang')}
            className={`flex flex-col items-center gap-1.5 py-3 transition-all duration-300 rounded-lg ${
              activeTab === 'galang' 
                ? 'text-[#00806e]' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Wallet size={24} strokeWidth={2} />
            <span className="text-xs font-medium">Galang Dana</span>
          </button>
          
          {/* Tombol Navigasi: Donasi Saya */}
          <button
            onClick={() => setActiveTab('donasi-saya')}
            className={`flex flex-col items-center gap-1.5 py-3 transition-all duration-300 rounded-lg ${
              activeTab === 'donasi-saya' 
                ? 'text-[#00806e]' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileText size={24} strokeWidth={2} />
            <span className="text-xs font-medium">Donasi Saya</span>
          </button>
          
          {/* Tombol Navigasi: Inbox */}
          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex flex-col items-center gap-1.5 py-3 transition-all duration-300 rounded-lg ${
              activeTab === 'inbox' 
                ? 'text-[#00806e]' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Mail size={24} strokeWidth={2} />
            <span className="text-xs font-medium">Inbox</span>
          </button>
          
          {/* Tombol Navigasi: Akun */}
          <button
            onClick={() => setActiveTab('akun')}
            className={`flex flex-col items-center gap-1.5 py-3 transition-all duration-300 rounded-lg ${
              activeTab === 'akun' 
                ? 'text-[#00806e]' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <User size={24} strokeWidth={2} />
            <span className="text-xs font-medium">Akun</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;