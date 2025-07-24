"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  location: string
  avatar: string
  rating: number
  review: string
  packageName: string
  travelDate: string
  verified: boolean
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ahmad Hidayat",
    location: "Jakarta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    review: "Alhamdulillah, perjalanan umroh bersama Sultan Haramain Travel sangat berkesan. Pelayanan sangat profesional, guide yang berpengalaman, dan fasilitas hotel yang nyaman. Benar-benar sesuai dengan yang dijanjikan. Recommended untuk yang ingin umroh dengan tenang dan khusyuk.",
    packageName: "Umroh Konsorsium Ustadz Khalid",
    travelDate: "Desember 2024",
    verified: true
  },
  {
    id: "2",
    name: "Siti Fatimah",
    location: "Bandung",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763c5c?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    review: "Subhanallah, pengalaman umroh yang tak terlupakan! Tim Sultan Haramain sangat membantu dari awal pendaftaran hingga kepulangan. Makanan halal, akomodasi nyaman, dan yang paling penting bimbingan ibadah yang sangat baik. Jazakallahu khairan untuk semua tim Sultan haramain.",
    packageName: "Umroh Gold Package",
    travelDate: "November 2024",
    verified: true
  },
  {
    id: "3",
    name: "Muhammad Yusuf",
    location: "Surabaya",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    review: "Perjalanan umroh pertama saya dan keluarga bersama Sultan haramain Travel. Masyaallah, pelayanannya sangat memuaskan. Dari airport service, hotel di Makkah dan Madinah, sampai city tour semuanya terorganisir dengan baik. Pasti akan recommend ke keluarga dan teman-teman.",
    packageName: "Umroh Turkey Tour",
    travelDate: "Oktober 2024",
    verified: true
  },
  {
    id: "4",
    name: "Khadijah Rahman",
    location: "Medan",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    review: "Alhamdulillahirabbil'alamiin, umroh bersama Sultan Haramain sangat berkesan. Guide yang sangat sabar dan menguasai sejarah Islam, hotel dekat Haram, dan pelayanan 24 jam yang siap membantu. Benar-benar worth it dengan harga yang ditawarkan.",
    packageName: "Umroh Silver Package",
    travelDate: "September 2024",
    verified: true
  },
  {
    id: "5",
    name: "Abdullah Malik",
    location: "Yogyakarta",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 4,
    review: "Pelayanan Sultan Haramain Travel sangat baik dan profesional. Hotel strategis dekat Masjidil Haram, transportasi nyaman, dan guide yang berpengalaman. Ada sedikit delay di jadwal tapi overall sangat puas dengan pelayanannya. Insya Allah akan umroh lagi bersama Sultan Haramain Travel.",
    packageName: "Umroh Konsorsium Ustadz Khalid",
    travelDate: "Agustus 2024",
    verified: true
  },
  {
    id: "6",
    name: "Aminah Sari",
    location: "Makassar",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    review: "Subhanallah, umroh terbaik yang pernah saya alami! Sultan Haramain Travel benar-benar memperhatikan detail, mulai dari persiapan dokumen, briefing sebelum berangkat, hingga guidance selama di tanah suci. Tim yang sangat amanah dan terpercaya. Barakallahu fiikum!",
    packageName: "Umroh Gold Package",
    travelDate: "Juli 2024",
    verified: true
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3)
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2)
      } else {
        setItemsPerView(1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= testimonials.length ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, testimonials.length - itemsPerView) : prev - 1
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView)

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + itemsPerView >= testimonials.length ? 0 : prev + 1
      )
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [currentIndex, itemsPerView])

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Quote className="h-8 w-8 text-nooruha-primary" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-nooruha-dark">
              TESTIMONI JAMAAH
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
           Dengarkan pengalaman nyata dari jamaah yang telah merasakan pelayanan terbaik Sultan Haramain Travel
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-semibold">4.9/5</span>
            </div>
            <span>•</span>
            <span>500+ Ulasan</span>
            <span>•</span>
            <span>2000+ Jamaah Puas</span>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(testimonials.length / itemsPerView) * 100}%`
              }}
            >
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="flex-shrink-0 shadow-lg hover-lift transition-smooth bg-white border border-gray-100"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <CardContent className="p-4 sm:p-6">
                    {/* Header with Avatar and Info */}
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="bg-nooruha-primary text-white">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-nooruha-dark text-sm sm:text-base">
                              {testimonial.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-500">{testimonial.location}</p>
                          </div>
                          {testimonial.verified && (
                            <div className="flex items-center space-x-1 text-xs text-green-600">
                              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                              <span>Verified</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>

                    {/* Review Text */}
                    <div className="mb-4">
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-4">
                        "{testimonial.review}"
                      </p>
                    </div>

                    {/* Package Info */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-nooruha-primary font-medium">
                          {testimonial.packageName}
                        </span>
                        <span className="text-gray-500">
                          {testimonial.travelDate}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden sm:block">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:bg-gray-50 z-10"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:bg-gray-50 z-10"
              disabled={currentIndex + itemsPerView >= testimonials.length}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex sm:hidden justify-center space-x-4 mt-6">
            <Button variant="outline" size="sm" onClick={prevSlide} disabled={currentIndex === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex + itemsPerView >= testimonials.length}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <div className="flex space-x-2">
            {Array.from({
              length: Math.ceil(testimonials.length / itemsPerView)
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerView)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / itemsPerView) === index
                    ? 'bg-nooruha-primary'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12 animate-fadeInUp">
          <div className="bg-nooruha-light rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-bold text-nooruha-dark mb-3">
              Bergabunglah dengan Ribuan Jamaah yang Puas
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
             Rasakan pengalaman umroh yang tak terlupakan bersama Sultan Haramain Travel
            </p>
            <Button className="bg-nooruha-primary hover:bg-nooruha-primary/90 text-white px-6 py-2">
              Lihat Paket Umroh
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
