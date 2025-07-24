import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PackageComparison from "@/components/PackageComparison"
import MobileNavigation from "@/components/MobileNavigation"
import BookingForm from "@/components/BookingForm"
import Testimonials from "@/components/Testimonials"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="shadow-sm fixed w-full top-0 z-50 transition-smooth bg-[#262627]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="https://ugc.same-assets.com/9Y7IqIKCnI-iScxOWV_WJHNRDlt_fk9E.png"
                alt="Nooruha Logo"
                width={120}
                height={40}
                className="h-6 sm:h-8 w-auto transition-smooth hover-scale rounded-[0px] object-scale-down mx-[0px] p-[0px] xl:m-[0px] xl:px-[1px] xl:py-[0px]"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 lg:space-x-8 bg-[transparent]">
                <a href="#home" className="hover:text-nooruha-primary font-medium transition-smooth text-sm lg:text-base text-[#ffffff]">Home</a>
                <a href="#paket" className="hover:text-nooruha-primary font-medium transition-smooth text-sm lg:text-base text-[#ffffff]">Paket Umroh</a>
                <a href="#gallery" className="hover:text-nooruha-primary font-medium transition-smooth text-sm lg:text-base text-[#ffffff]">Gallery</a>
                <a href="#blog" className="hover:text-nooruha-primary font-medium transition-smooth text-sm lg:text-base text-[#ffffff]">Blog</a>
              </div>
            </div>

            {/* Mobile Navigation */}
            <MobileNavigation />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-nooruha-gradient relative overflow-hidden py-12 sm:py-16 lg:py-20 mt-16">
        <div className="islamic-pattern absolute inset-0 opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-white animate-slideInLeft text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:text-[50px]" style={{fontFamily: 'serif'}}>SULTAN HARAMAIN
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold text-yellow-300 mb-4 sm:mb-6">
                UMROH BINTANG 5
              </h2>
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8">
                NYAMAN & EKSKLUSIF
              </h3>
              <div className="bg-slate-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg inline-block mb-6 sm:mb-8 hover-glow transition-smooth">
                <span className="text-xs sm:text-sm">MULAI</span>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">29,5 JT</div>
              </div>
              <div className="flex justify-center lg:justify-start items-center space-x-4">
                <div className="text-white/80 hover-scale transition-smooth text-base sm:text-lg font-serif">
                  
                </div>
              </div>
            </div>
            <div className="relative animate-slideInRight order-first lg:order-last">
              <Image
                src="https://i.ibb.co/SXJJY6xc/POSTER-SULTAN.png"
                alt="Umroh Package"
                width={500}
                height={400}
                className="rounded-3xl shadow-2xl hover-lift transition-smooth w-full h-auto max-w-md mx-auto lg:max-w-none"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white text-xs sm:text-sm animate-fadeInUp delay-400">
         @sultan.haramain
        </div>
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-white text-xs sm:text-sm animate-fadeInUp delay-400">
         www.sultanharamain.id
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-nooruha-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative animate-slideInLeft order-last lg:order-first">
              <Image
                src="https://i.ibb.co/qSjQ6s7/Whats-App-Image-2025-03-20-at-18-03-44.jpg"
                alt="Kaaba"
                width={500}
                height={400}
                className="rounded-3xl shadow-lg hover-lift transition-smooth w-full h-auto"
              />
            </div>
            <div className="animate-slideInRight text-center lg:text-left">
              <div className="text-xs sm:text-sm text-nooruha-primary font-semibold mb-2">
               TENTANG SULTAN HARAMAIN TRAVEL
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-nooruha-dark mb-4 sm:mb-6 leading-tight">
                TEMAN PERJALANAN UMROH YANG MENYENANGKAN & SESUAI SUNNAH
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
               Sultan Haramain Travel Umroh hadir sebagai mitra terpercaya dalam mewujudkan perjalanan ibadah umrohmu. Dengan pelayanan profesional, fasilitas nyaman, dan pembimbing berpengalaman, kami siap mengantarkan Anda menuju tanah suci dengan penuh khidmat..
              </p>

              <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8 text-xs sm:text-sm">
                <p><strong>Nama Perusahaan:</strong> PT SULTAN HARAMAIN</p>
                <p><strong>Izin PPIU:</strong> 0200000000000000</p>
                <p><strong>Izin NIB:</strong> 021 0000000</p>
                <p><strong>Alamat:</strong></p>
                <p className="text-gray-600">
                 JAWA TIMUR INDONESIA
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button className="bg-nooruha-primary hover:bg-nooruha-primary/90 text-white transition-smooth hover-glow py-2 sm:py-3 text-sm sm:text-base">
                  SELENGKAPNYA
                </Button>
                <BookingForm triggerText="BOOKING SEKARANG" triggerClassName="border-yellow-500 text-white-600 hover:bg-yellow-50 transition-smooth hover-lift py-2 sm:py-3 text-sm sm:text-base" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="paket" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 animate-fadeInUp">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-nooruha-dark mb-3 sm:mb-4">
              PAKET UMROH TERBAIK
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Pilih paket umroh yang sesuai dengan kebutuhan dan budget Anda. Semua paket dilengkapi dengan fasilitas terbaik dan pembimbing berpengalaman.
            </p>
          </div>

          {/* Package Comparison Component */}
          <div className="mb-8 sm:mb-12 animate-fadeInUp delay-200">
            <PackageComparison />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {/* Package 1 */}
            <Card className="overflow-hidden shadow-lg hover-lift transition-smooth animate-scaleIn">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="https://ext.same-assets.com/2946107391/1736387760.png"
                  alt="Umroh Package"
                  fill
                  className="object-cover hover-scale transition-smooth"
                />
                <Badge className="absolute top-2 left-2 bg-teal-500 hover-glow transition-smooth text-xs">
                  Mulai Dari 36.500.000
                </Badge>
              </div>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-sm sm:text-lg leading-tight">Umroh Konsorsium Bersama Ustadz Khalid basalamah.</CardTitle>
                <div className="text-yellow-500 text-xs sm:text-sm">★★★★★ (5)</div>
                <div className="flex flex-wrap gap-1 text-xs text-gray-600">
                  <span>✓ Hotel</span>
                  <span>✓ Kereta Cepat</span>
                  <span>✓ Pesawat</span>
                  <span>✓ Guide</span>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <BookingForm
                  selectedPackage="1"
                  triggerText="BOOK NOW"
                >
                  <Button variant="outline" className="w-full border-nooruha-primary text-nooruha-primary hover-glow transition-smooth text-xs sm:text-sm py-2">
                    BOOK NOW
                  </Button>
                </BookingForm>
              </CardContent>
            </Card>

            {/* Package 2 */}
            <Card className="overflow-hidden shadow-lg hover-lift transition-smooth animate-scaleIn delay-100">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="https://ext.same-assets.com/2946107391/3283025538.png"
                  alt="Umroh Package"
                  fill
                  className="object-cover hover-scale transition-smooth"
                />
                <Badge className="absolute top-2 left-2 bg-teal-500 hover-glow transition-smooth text-xs">
                  Mulai Dari 38.900.000
                </Badge>
              </div>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-sm sm:text-lg leading-tight">Umroh Turki City Tour Istanbul + Bursa</CardTitle>
                <div className="text-yellow-500 text-xs sm:text-sm">★★★★★ (5)</div>
                <div className="flex flex-wrap gap-1 text-xs text-gray-600">
                  <span>✓ Hotel</span>
                  <span>✓ Kereta Cepat</span>
                  <span>✓ Pesawat</span>
                  <span>✓ Guide</span>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <BookingForm
                  selectedPackage="2"
                  triggerText="BOOK NOW"
                >
                  <Button variant="outline" className="w-full border-nooruha-primary text-nooruha-primary hover-glow transition-smooth text-xs sm:text-sm py-2">
                    BOOK NOW
                  </Button>
                </BookingForm>
              </CardContent>
            </Card>

            {/* Package 3 */}
            <Card className="overflow-hidden shadow-lg hover-lift transition-smooth animate-scaleIn delay-200">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="https://ext.same-assets.com/2946107391/3404327236.png"
                  alt="Umroh Package"
                  fill
                  className="object-cover hover-scale transition-smooth"
                />
                <Badge className="absolute top-2 left-2 bg-teal-500 hover-glow transition-smooth text-xs">
                  Mulai Dari 34.500.000
                </Badge>
              </div>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-sm sm:text-lg leading-tight">Umroh Akhir Tahun 2025 Besama Ustad Ayub - Silver Package</CardTitle>
                <div className="text-yellow-500 text-xs sm:text-sm">★★★★★ (5)</div>
                <div className="flex flex-wrap gap-1 text-xs text-gray-600">
                  <span>✓ Hotel</span>
                  <span>✓ Kereta Cepat</span>
                  <span>✓ Pesawat</span>
                  <span>✓ Guide</span>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <BookingForm
                  selectedPackage="3"
                  triggerText="BOOK NOW"
                >
                  <Button variant="outline" className="w-full border-nooruha-primary text-nooruha-primary hover-glow transition-smooth text-xs sm:text-sm py-2">
                    BOOK NOW
                  </Button>
                </BookingForm>
              </CardContent>
            </Card>

            {/* Package 4 */}
            <Card className="overflow-hidden shadow-lg hover-lift transition-smooth animate-scaleIn delay-300">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="https://ext.same-assets.com/2946107391/3387087657.png"
                  alt="Umroh Package"
                  fill
                  className="object-cover hover-scale transition-smooth"
                />
                <Badge className="absolute top-2 left-2 bg-teal-500 hover-glow transition-smooth text-xs">
                  Mulai Dari 44.500.000
                </Badge>
              </div>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-sm sm:text-lg leading-tight">Umroh Akhir Tahun 2025 Besama Ustad Ayub - Gold Package</CardTitle>
                <div className="text-yellow-500 text-xs sm:text-sm">★★★★★ (5)</div>
                <div className="flex flex-wrap gap-1 text-xs text-gray-600">
                  <span>✓ Hotel</span>
                  <span>✓ Kereta Cepat</span>
                  <span>✓ Pesawat</span>
                  <span>✓ Guide</span>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <BookingForm
                  selectedPackage="4"
                  triggerText="BOOK NOW"
                >
                  <Button variant="outline" className="w-full border-nooruha-primary text-nooruha-primary hover-glow transition-smooth text-xs sm:text-sm py-2">
                    BOOK NOW
                  </Button>
                </BookingForm>
              </CardContent>
            </Card>

            {/* Package 5 - Budget */}
            <Card className="overflow-hidden shadow-lg hover-lift transition-smooth animate-scaleIn delay-400">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="https://ext.same-assets.com/2946107391/1736387760.png"
                  alt="Umroh Package"
                  fill
                  className="object-cover hover-scale transition-smooth"
                />
                <Badge className="absolute top-2 left-2 bg-green-500 hover-glow transition-smooth text-xs">
                  Mulai Dari 28.500.000
                </Badge>
              </div>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-sm sm:text-lg leading-tight">Umroh Hemat Ramadhan 2025 - Budget Package</CardTitle>
                <div className="text-yellow-500 text-xs sm:text-sm">★★★★☆ (4)</div>
                <div className="flex flex-wrap gap-1 text-xs text-gray-600">
                  <span>✓ Hotel</span>
                  <span>✓ Pesawat</span>
                  <span>✓ Guide</span>
                  <span>✓ Ekonomis</span>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <BookingForm
                  selectedPackage="5"
                  triggerText="BOOK NOW"
                >
                  <Button variant="outline" className="w-full border-nooruha-primary text-nooruha-primary hover-glow transition-smooth text-xs sm:text-sm py-2">
                    BOOK NOW
                  </Button>
                </BookingForm>
              </CardContent>
            </Card>

            {/* Package 6 - VIP */}
            <Card className="overflow-hidden shadow-lg hover-lift transition-smooth animate-scaleIn delay-500">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="https://ext.same-assets.com/2946107391/3283025538.png"
                  alt="Umroh Package"
                  fill
                  className="object-cover hover-scale transition-smooth"
                />
                <Badge className="absolute top-2 left-2 bg-purple-500 hover-glow transition-smooth text-xs">
                  Mulai Dari 52.500.000
                </Badge>
              </div>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-sm sm:text-lg leading-tight">Umroh VIP Executive Bersama Ustadz Ahmad Sarwat</CardTitle>
                <div className="text-yellow-500 text-xs sm:text-sm">★★★★★ (5)</div>
                <div className="flex flex-wrap gap-1 text-xs text-gray-600">
                  <span>✓ Hotel VIP</span>
                  <span>✓ Kereta Cepat</span>
                  <span>✓ Butler Service</span>
                  <span>✓ Eksklusif</span>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <BookingForm
                  selectedPackage="6"
                  triggerText="BOOK NOW"
                >
                  <Button variant="outline" className="w-full border-nooruha-primary text-nooruha-primary hover-glow transition-smooth text-xs sm:text-sm py-2">
                    BOOK NOW
                  </Button>
                </BookingForm>
              </CardContent>
            </Card>

            {/* Package 7 - Family */}
            <Card className="overflow-hidden shadow-lg hover-lift transition-smooth animate-scaleIn delay-600">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="https://ext.same-assets.com/2946107391/3404327236.png"
                  alt="Umroh Package"
                  fill
                  className="object-cover hover-scale transition-smooth"
                />
                <Badge className="absolute top-2 left-2 bg-pink-500 hover-glow transition-smooth text-xs">
                  Mulai Dari 31.500.000
                </Badge>
              </div>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-sm sm:text-lg leading-tight">Umroh Keluarga Plus Anak-Anak Special</CardTitle>
                <div className="text-yellow-500 text-xs sm:text-sm">★★★★★ (5)</div>
                <div className="flex flex-wrap gap-1 text-xs text-gray-600">
                  <span>✓ Family Friendly</span>
                  <span>✓ Fasilitas Anak</span>
                  <span>✓ Pengasuh</span>
                  <span>✓ Edukasi</span>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <BookingForm
                  selectedPackage="7"
                  triggerText="BOOK NOW"
                >
                  <Button variant="outline" className="w-full border-nooruha-primary text-nooruha-primary hover-glow transition-smooth text-xs sm:text-sm py-2">
                    BOOK NOW
                  </Button>
                </BookingForm>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-nooruha-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-nooruha-dark mb-8 sm:mb-12 animate-fadeInUp">
           GALLERY UMROH SULTAN HARAMAIN
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {[
              "https://ext.same-assets.com/2946107391/2473678912.jpeg",
              "https://ext.same-assets.com/2946107391/3115365928.jpeg",
              "https://ext.same-assets.com/2946107391/2958601730.jpeg",
              "https://ext.same-assets.com/2946107391/993124543.jpeg",
              "https://ext.same-assets.com/2946107391/1904685608.jpeg",
              "https://ext.same-assets.com/2946107391/4113955347.jpeg",
              "https://ext.same-assets.com/2946107391/3798275439.jpeg",
              "https://ext.same-assets.com/2946107391/1096429981.jpeg"
            ].map((src, index) => (
              <div key={index} className={`relative aspect-square animate-scaleIn delay-${(index % 4) * 100}`}>
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg shadow-md hover-lift transition-smooth"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Blog Section */}
      <section id="blog" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-nooruha-dark mb-8 sm:mb-12 animate-fadeInUp">
            ARTIKEL & TIPS UMROH
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="overflow-hidden shadow-lg hover-lift transition-smooth animate-slideInLeft">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="https://ext.same-assets.com/2946107391/2881764894.jpeg"
                  alt="Blog image"
                  fill
                  className="object-cover hover-scale transition-smooth"
                />
              </div>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg text-nooruha-dark hover:text-nooruha-primary transition-smooth cursor-pointer leading-tight">
                  Persiapkan Fisik Dan Mental Sebelum Umroh
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Umroh bukan hanya sekadar perjalanan spiritual, tetapi juga perjalanan fisik yang membutuhkan persiapan matang...
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden shadow-lg hover-lift transition-smooth animate-fadeInUp delay-100">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="https://ext.same-assets.com/2946107391/913853737.jpeg"
                  alt="Blog image"
                  fill
                  className="object-cover hover-scale transition-smooth"
                />
              </div>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg text-nooruha-dark hover:text-nooruha-primary transition-smooth cursor-pointer leading-tight">
                  Tips Memilih Paket Umroh
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Umroh merupakan ibadah yang sangat dinanti-nantikan oleh umat Islam. Namun, dalam menjalankan ibadah umroh...
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden shadow-lg hover-lift transition-smooth animate-slideInRight delay-200 md:col-span-2 lg:col-span-1">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="https://ext.same-assets.com/2946107391/1682056515.jpeg"
                  alt="Blog image"
                  fill
                  className="object-cover hover-scale transition-smooth"
                />
              </div>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg text-nooruha-dark hover:text-nooruha-primary transition-smooth cursor-pointer leading-tight">
                  Perjalanan Spiritual Ke Tanah Suci
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Umroh merupakan salah satu ibadah yang sangat dianjurkan bagi umat Islam. Meskipun tidak wajib seperti haji...
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nooruha-primary text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-fadeInUp">
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h3>
              <p className="text-lg sm:text-xl font-bold mb-2 hover:text-yellow-300 transition-smooth cursor-pointer">0811-XXX-XXXX</p>
              <p className="text-xs sm:text-sm leading-relaxed">
                indonesia
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Menu</h3>
              <div className="space-y-2">
                <p className="text-xs sm:text-sm hover:text-yellow-300 transition-smooth cursor-pointer">Paket Umroh</p>
                <p className="text-xs sm:text-sm hover:text-yellow-300 transition-smooth cursor-pointer">
                  <a href="/admin">Admin Dashboard</a>
                </p>
              </div>
            </div>
            <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Booking Now</h3>
              <BookingForm triggerText="Booking Umroh">
                <Button className="bg-white text-nooruha-primary hover:bg-gray-100 transition-smooth hover-lift w-full sm:w-auto text-sm sm:text-base py-2">
                  Booking Umroh
                </Button>
              </BookingForm>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20 text-center text-xs sm:text-sm">
           Copyright © 2025 Sultanharamain.id. All Rights Reserved..
          </div>
        </div>
      </footer>
    </div>
  )
}
