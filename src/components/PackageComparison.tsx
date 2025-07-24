"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BookingForm from "@/components/BookingForm"
import Image from "next/image"

interface Package {
  id: string
  name: string
  price: string
  priceNumber: number
  image: string
  features: string[]
  rating: number
  duration: string
  ustadz?: string
  includes: {
    hotel: boolean
    keretaCepat: boolean
    pesawat: boolean
    guide: boolean
  }
}

const packages: Package[] = [
  {
    id: "1",
    name: "Umroh Konsorsium Bersama Ustadz Khalid basalamah",
    price: "Mulai Dari 36.500.000",
    priceNumber: 36500000,
    image: "https://ext.same-assets.com/2946107391/1736387760.png",
    features: ["Hotel Bintang 5", "Pembimbing Berpengalaman", "Grup Kecil", "Madinah 4 Hari"],
    rating: 5,
    duration: "12 Hari",
    ustadz: "Ustadz Khalid Basalamah",
    includes: {
      hotel: true,
      keretaCepat: true,
      pesawat: true,
      guide: true
    }
  },
  {
    id: "2",
    name: "Umroh Turki City Tour Istanbul + Bursa",
    price: "Mulai Dari 38.900.000",
    priceNumber: 38900000,
    image: "https://ext.same-assets.com/2946107391/3283025538.png",
    features: ["City Tour Turki", "Hotel Premium", "Wisata Religi", "Istanbul & Bursa"],
    rating: 5,
    duration: "14 Hari",
    includes: {
      hotel: true,
      keretaCepat: true,
      pesawat: true,
      guide: true
    }
  },
  {
    id: "3",
    name: "Umroh Akhir Tahun 2025 Besama Ustad Ayub - Silver Package",
    price: "Mulai Dari 34.500.000",
    priceNumber: 34500000,
    image: "https://ext.same-assets.com/2946107391/3404327236.png",
    features: ["Paket Silver", "Hotel Nyaman", "Pembimbing Profesional", "Grup Terjamin"],
    rating: 5,
    duration: "10 Hari",
    ustadz: "Ustadz Ayub",
    includes: {
      hotel: true,
      keretaCepat: true,
      pesawat: true,
      guide: true
    }
  },
  {
    id: "4",
    name: "Umroh Akhir Tahun 2025 Besama Ustad Ayub - Gold Package",
    price: "Mulai Dari 44.500.000",
    priceNumber: 44500000,
    image: "https://ext.same-assets.com/2946107391/3387087657.png",
    features: ["Paket Gold", "Hotel Mewah", "Fasilitas Premium", "Layanan VIP"],
    rating: 5,
    duration: "12 Hari",
    ustadz: "Ustadz Ayub",
    includes: {
      hotel: true,
      keretaCepat: true,
      pesawat: true,
      guide: true
    }
  },
  {
    id: "5",
    name: "Umroh Hemat Ramadhan 2025 - Budget Package",
    price: "Mulai Dari 28.500.000",
    priceNumber: 28500000,
    image: "https://ext.same-assets.com/2946107391/1736387760.png",
    features: ["Paket Hemat", "Hotel Standard", "Grup Besar", "Ekonomis Terjangkau"],
    rating: 4,
    duration: "9 Hari",
    ustadz: "Ustadz Mahmud",
    includes: {
      hotel: true,
      keretaCepat: false,
      pesawat: true,
      guide: true
    }
  },
  {
    id: "6",
    name: "Umroh VIP Executive Bersama Ustadz Ahmad Sarwat",
    price: "Mulai Dari 52.500.000",
    priceNumber: 52500000,
    image: "https://ext.same-assets.com/2946107391/3283025538.png",
    features: ["Paket VIP", "Hotel Bintang 5+", "Layanan Eksklusif", "Butler Service"],
    rating: 5,
    duration: "15 Hari",
    ustadz: "Ustadz Ahmad Sarwat",
    includes: {
      hotel: true,
      keretaCepat: true,
      pesawat: true,
      guide: true
    }
  },
  {
    id: "7",
    name: "Umroh Keluarga Plus Anak-Anak Special",
    price: "Mulai Dari 31.500.000",
    priceNumber: 31500000,
    image: "https://ext.same-assets.com/2946107391/3404327236.png",
    features: ["Khusus Keluarga", "Fasilitas Anak", "Pengasuh Anak", "Program Edukasi"],
    rating: 5,
    duration: "11 Hari",
    ustadz: "Ustadz Rahman",
    includes: {
      hotel: true,
      keretaCepat: true,
      pesawat: true,
      guide: true
    }
  }
]

export default function PackageComparison() {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePackageToggle = (packageId: string) => {
    setSelectedPackages(prev => {
      if (prev.includes(packageId)) {
        return prev.filter(id => id !== packageId)
      } else if (prev.length < 3) {
        return [...prev, packageId]
      }
      return prev
    })
  }

  const selectedPackageData = packages.filter(pkg => selectedPackages.includes(pkg.id))

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="w-full">
      {/* Package Selection Cards */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-nooruha-dark mb-3 sm:mb-4 text-center lg:text-left px-4">
          Pilih paket untuk dibandingkan (maksimal 3):
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={`cursor-pointer transition-all duration-300 hover-lift ${
              selectedPackages.includes(pkg.id) ? 'ring-2 ring-nooruha-primary bg-nooruha-light' : ''
            }`}>
              <CardHeader className="p-2 sm:p-4">
                <div className="flex items-start justify-between mb-2">
                  <Checkbox
                    checked={selectedPackages.includes(pkg.id)}
                    onCheckedChange={() => handlePackageToggle(pkg.id)}
                    disabled={!selectedPackages.includes(pkg.id) && selectedPackages.length >= 3}
                    className="mt-1"
                  />
                  <Badge className="ml-2 bg-teal-500 text-white text-xs flex-1 text-center">
                    {pkg.price}
                  </Badge>
                </div>
                <div className="relative h-16 sm:h-20 lg:h-24 mt-2">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <CardTitle className="text-xs sm:text-sm leading-tight mt-2">{pkg.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Compare Button */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-nooruha-primary hover:bg-nooruha-primary/90 text-white px-6 sm:px-8 py-2 sm:py-3 transition-smooth hover-glow text-sm sm:text-base"
              disabled={selectedPackages.length < 2}
            >
              Bandingkan Paket ({selectedPackages.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-6xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-2xl text-nooruha-dark">
                Perbandingan Paket Umroh
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Bandingkan detail paket umroh pilihan Anda untuk memilih yang terbaik
              </DialogDescription>
            </DialogHeader>

            {selectedPackageData.length >= 2 ? (
              <div className="mt-4 sm:mt-6">
                {/* Mobile View - Stack Cards */}
                <div className="block sm:hidden space-y-4">
                  {selectedPackageData.map((pkg) => (
                    <Card key={pkg.id} className="border border-nooruha-primary/20">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="relative h-12 w-16 flex-shrink-0">
                            <Image
                              src={pkg.image}
                              alt={pkg.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-nooruha-dark truncate">{pkg.name}</h3>
                            <Badge className="bg-nooruha-primary text-white text-xs mt-1">
                              {formatPrice(pkg.priceNumber)}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div><strong>Durasi:</strong> {pkg.duration}</div>
                          <div><strong>Rating:</strong> <span className="text-yellow-500">{'★'.repeat(pkg.rating)}</span></div>
                        </div>
                        {pkg.ustadz && (
                          <div><strong>Pembimbing:</strong> {pkg.ustadz}</div>
                        )}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Hotel: {pkg.includes.hotel ? '✓' : '✗'}</div>
                          <div>Kereta Cepat: {pkg.includes.keretaCepat ? '✓' : '✗'}</div>
                          <div>Pesawat: {pkg.includes.pesawat ? '✓' : '✗'}</div>
                          <div>Guide: {pkg.includes.guide ? '✓' : '✗'}</div>
                        </div>
                        <div>
                          <strong className="text-xs">Fitur Unggulan:</strong>
                          <ul className="text-xs mt-1 space-y-1">
                            {pkg.features.map((feature, index) => (
                              <li key={index}>• {feature}</li>
                            ))}
                          </ul>
                        </div>
                        <BookingForm selectedPackage={pkg.id} triggerText="Pilih Paket">
                          <Button size="sm" className="w-full bg-nooruha-primary hover:bg-nooruha-primary/90 text-white mt-3">
                            Pilih Paket
                          </Button>
                        </BookingForm>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Desktop View - Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px] lg:w-[200px] font-semibold text-xs sm:text-sm">Detail</TableHead>
                        {selectedPackageData.map((pkg) => (
                          <TableHead key={pkg.id} className="text-center font-semibold min-w-[180px]">
                            <div className="space-y-2">
                              <div className="relative h-12 lg:h-16 mx-auto w-16 lg:w-24">
                                <Image
                                  src={pkg.image}
                                  alt={pkg.name}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                              <div className="text-xs lg:text-sm leading-tight">{pkg.name}</div>
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-xs sm:text-sm">Harga</TableCell>
                        {selectedPackageData.map((pkg) => (
                          <TableCell key={pkg.id} className="text-center">
                            <Badge className="bg-nooruha-primary text-white text-xs">
                              {formatPrice(pkg.priceNumber)}
                            </Badge>
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-xs sm:text-sm">Durasi</TableCell>
                        {selectedPackageData.map((pkg) => (
                          <TableCell key={pkg.id} className="text-center text-xs sm:text-sm">{pkg.duration}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-xs sm:text-sm">Rating</TableCell>
                        {selectedPackageData.map((pkg) => (
                          <TableCell key={pkg.id} className="text-center">
                            <div className="text-yellow-500 text-xs sm:text-sm">
                              {'★'.repeat(pkg.rating)} ({pkg.rating})
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                      {selectedPackageData.some(pkg => pkg.ustadz) && (
                        <TableRow>
                          <TableCell className="font-medium text-xs sm:text-sm">Pembimbing</TableCell>
                          {selectedPackageData.map((pkg) => (
                            <TableCell key={pkg.id} className="text-center text-xs sm:text-sm">
                              {pkg.ustadz || '-'}
                            </TableCell>
                          ))}
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell className="font-medium text-xs sm:text-sm">Hotel</TableCell>
                        {selectedPackageData.map((pkg) => (
                          <TableCell key={pkg.id} className="text-center text-sm sm:text-base">
                            {pkg.includes.hotel ? '✓' : '✗'}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-xs sm:text-sm">Kereta Cepat</TableCell>
                        {selectedPackageData.map((pkg) => (
                          <TableCell key={pkg.id} className="text-center text-sm sm:text-base">
                            {pkg.includes.keretaCepat ? '✓' : '✗'}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-xs sm:text-sm">Pesawat</TableCell>
                        {selectedPackageData.map((pkg) => (
                          <TableCell key={pkg.id} className="text-center text-sm sm:text-base">
                            {pkg.includes.pesawat ? '✓' : '✗'}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-xs sm:text-sm">Guide</TableCell>
                        {selectedPackageData.map((pkg) => (
                          <TableCell key={pkg.id} className="text-center text-sm sm:text-base">
                            {pkg.includes.guide ? '✓' : '✗'}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-xs sm:text-sm">Fitur Unggulan</TableCell>
                        {selectedPackageData.map((pkg) => (
                          <TableCell key={pkg.id} className="text-center">
                            <ul className="text-xs space-y-1">
                              {pkg.features.map((feature, index) => (
                                <li key={index}>• {feature}</li>
                              ))}
                            </ul>
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-xs sm:text-sm">Aksi</TableCell>
                        {selectedPackageData.map((pkg) => (
                          <TableCell key={pkg.id} className="text-center">
                            <BookingForm selectedPackage={pkg.id} triggerText="Pilih Paket">
                              <Button size="sm" className="bg-nooruha-primary hover:bg-nooruha-primary/90 text-white text-xs">
                                Pilih Paket
                              </Button>
                            </BookingForm>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
                Pilih minimal 2 paket untuk membandingkan
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
