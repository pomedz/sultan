"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Phone, Mail, User, Users, MapPin } from "lucide-react"
import EmailService from "@/lib/emailService"

interface BookingFormData {
  // Personal Information
  fullName: string
  email: string
  phone: string
  idNumber: string
  dateOfBirth: string
  gender: string

  // Travel Information
  selectedPackage: string
  departureDate: string
  numberOfPilgrims: string
  roomType: string

  // Emergency Contact
  emergencyName: string
  emergencyPhone: string
  emergencyRelation: string

  // Special Requirements
  medicalConditions: string
  dietaryRequirements: string
  specialRequests: string

  // Agreement
  termsAccepted: boolean
  privacyAccepted: boolean
}

interface BookingFormProps {
  selectedPackage?: string
  children?: React.ReactNode
  triggerText?: string
  triggerClassName?: string
}

const packages = [
  { id: "1", name: "Umroh Konsorsium Bersama Ustadz Khalid Basalamah", price: "36.500.000" },
  { id: "2", name: "Umroh Turki City Tour Istanbul + Bursa", price: "38.900.000" },
  { id: "3", name: "Umroh Akhir Tahun 2025 - Silver Package", price: "34.500.000" },
  { id: "4", name: "Umroh Akhir Tahun 2025 - Gold Package", price: "44.500.000" },
  { id: "5", name: "Umroh Hemat Ramadhan 2025 - Budget Package", price: "28.500.000" },
  { id: "6", name: "Umroh VIP Executive Bersama Ustadz Ahmad Sarwat", price: "52.500.000" },
  { id: "7", name: "Umroh Keluarga Plus Anak-Anak Special", price: "31.500.000" }
]

export default function BookingForm({ selectedPackage, children, triggerText = "Book Now", triggerClassName }: BookingFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    dateOfBirth: "",
    gender: "",
    selectedPackage: selectedPackage || "",
    departureDate: "",
    numberOfPilgrims: "",
    roomType: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    medicalConditions: "",
    dietaryRequirements: "",
    specialRequests: "",
    termsAccepted: false,
    privacyAccepted: false
  })

  const [errors, setErrors] = useState<{[K in keyof BookingFormData]?: string}>({})

  const handleInputChange = (field: keyof BookingFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: {[K in keyof BookingFormData]?: string} = {}

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Nama lengkap wajib diisi"
      if (!formData.email.trim()) newErrors.email = "Email wajib diisi"
      if (!formData.phone.trim()) newErrors.phone = "Nomor telepon wajib diisi"
      if (!formData.idNumber.trim()) newErrors.idNumber = "Nomor KTP wajib diisi"
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Tanggal lahir wajib diisi"
      if (!formData.gender) newErrors.gender = "Jenis kelamin wajib dipilih"
    }

    if (step === 2) {
      if (!formData.selectedPackage) newErrors.selectedPackage = "Paket umroh wajib dipilih"
      if (!formData.departureDate) newErrors.departureDate = "Tanggal keberangkatan wajib diisi"
      if (!formData.numberOfPilgrims) newErrors.numberOfPilgrims = "Jumlah jamaah wajib diisi"
      if (!formData.roomType) newErrors.roomType = "Tipe kamar wajib dipilih"
    }

    if (step === 3) {
      if (!formData.emergencyName.trim()) newErrors.emergencyName = "Nama kontak darurat wajib diisi"
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Nomor kontak darurat wajib diisi"
      if (!formData.emergencyRelation.trim()) newErrors.emergencyRelation = "Hubungan dengan kontak darurat wajib diisi"
    }

    if (step === 4) {
      if (!formData.termsAccepted) newErrors.termsAccepted = "Anda harus menyetujui syarat dan ketentuan"
      if (!formData.privacyAccepted) newErrors.privacyAccepted = "Anda harus menyetujui kebijakan privasi"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (validateStep(4)) {
      // Create booking object for admin dashboard
      const booking = {
        id: Date.now().toString(),
        bookingNumber: `NR${new Date().getFullYear()}${String(Date.now()).slice(-3).padStart(3, '0')}`,
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        packageName: packages.find(p => p.id === formData.selectedPackage)?.name || "Unknown Package",
        packagePrice: parseInt(packages.find(p => p.id === formData.selectedPackage)?.price.replace(/\./g, '') || "0"),
        departureDate: formData.departureDate,
        numberOfPilgrims: parseInt(formData.numberOfPilgrims),
        roomType: formData.roomType,
        status: "pending" as const,
        submittedAt: new Date().toISOString(),
        emergencyContact: formData.emergencyName,
        emergencyPhone: formData.emergencyPhone,
        specialRequirements: [formData.medicalConditions, formData.dietaryRequirements, formData.specialRequests]
          .filter(Boolean).join('; ')
      }

      try {
        // Store in localStorage for demo (in production, send to backend)
        const existingBookings = JSON.parse(localStorage.getItem('nooruhaBookings') || '[]')
        existingBookings.push(booking)
        localStorage.setItem('nooruhaBookings', JSON.stringify(existingBookings))

        // Send email notifications
        const emailService = EmailService.getInstance()

        // Send confirmation to customer
        const customerEmailSent = await emailService.sendBookingConfirmation(booking)

        // Send notification to admin
        const adminEmailSent = await emailService.sendAdminNotification(booking)

        console.log("Booking submitted:", formData)
        console.log("Customer email sent:", customerEmailSent)
        console.log("Admin email sent:", adminEmailSent)

        // Show success message with email status
        const emailStatus = customerEmailSent
          ? "Email konfirmasi telah dikirim ke alamat email Anda."
          : "Booking berhasil, namun email konfirmasi gagal dikirim."

        alert(`Booking berhasil dikirim! ${emailStatus} Kami akan menghubungi Anda segera.`)

        setIsOpen(false)
        setCurrentStep(1)
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          idNumber: "",
          dateOfBirth: "",
          gender: "",
          selectedPackage: selectedPackage || "",
          departureDate: "",
          numberOfPilgrims: "",
          roomType: "",
          emergencyName: "",
          emergencyPhone: "",
          emergencyRelation: "",
          medicalConditions: "",
          dietaryRequirements: "",
          specialRequests: "",
          termsAccepted: false,
          privacyAccepted: false
        })
      } catch (error) {
        console.error("Error submitting booking:", error)
        alert("Terjadi kesalahan saat mengirim booking. Silakan coba lagi.")
      }
    }
  }

  const selectedPackageInfo = packages.find(pkg => pkg.id === formData.selectedPackage)

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-nooruha-primary mb-4">
              <User className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Informasi Pribadi</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="fullName">Nama Lengkap *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Masukkan nama lengkap sesuai KTP"
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="contoh@email.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Nomor Telepon *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="idNumber">Nomor KTP *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  placeholder="16 digit nomor KTP"
                  className={errors.idNumber ? "border-red-500" : ""}
                />
                {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
              </div>

              <div>
                <Label htmlFor="dateOfBirth">Tanggal Lahir *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className={errors.dateOfBirth ? "border-red-500" : ""}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <Label htmlFor="gender">Jenis Kelamin *</Label>
                <Select onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-nooruha-primary mb-4">
              <MapPin className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Informasi Perjalanan</h3>
            </div>

            <div>
              <Label htmlFor="selectedPackage">Paket Umroh *</Label>
              <Select
                value={formData.selectedPackage}
                onValueChange={(value) => handleInputChange("selectedPackage", value)}
              >
                <SelectTrigger className={errors.selectedPackage ? "border-red-500" : ""}>
                  <SelectValue placeholder="Pilih paket umroh" />
                </SelectTrigger>
                <SelectContent>
                  {packages.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id}>
                      {pkg.name} - Rp {pkg.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.selectedPackage && <p className="text-red-500 text-sm mt-1">{errors.selectedPackage}</p>}
            </div>

            {selectedPackageInfo && (
              <Card className="bg-nooruha-light border-nooruha-primary/20">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-nooruha-dark">{selectedPackageInfo.name}</h4>
                  <p className="text-nooruha-primary font-bold">Rp {selectedPackageInfo.price}</p>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="departureDate">Tanggal Keberangkatan *</Label>
                <Input
                  id="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => handleInputChange("departureDate", e.target.value)}
                  className={errors.departureDate ? "border-red-500" : ""}
                />
                {errors.departureDate && <p className="text-red-500 text-sm mt-1">{errors.departureDate}</p>}
              </div>

              <div>
                <Label htmlFor="numberOfPilgrims">Jumlah Jamaah *</Label>
                <Select onValueChange={(value) => handleInputChange("numberOfPilgrims", value)}>
                  <SelectTrigger className={errors.numberOfPilgrims ? "border-red-500" : ""}>
                    <SelectValue placeholder="Pilih jumlah jamaah" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Orang</SelectItem>
                    <SelectItem value="2">2 Orang</SelectItem>
                    <SelectItem value="3">3 Orang</SelectItem>
                    <SelectItem value="4">4 Orang</SelectItem>
                    <SelectItem value="5+">5+ Orang</SelectItem>
                  </SelectContent>
                </Select>
                {errors.numberOfPilgrims && <p className="text-red-500 text-sm mt-1">{errors.numberOfPilgrims}</p>}
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="roomType">Tipe Kamar *</Label>
                <Select onValueChange={(value) => handleInputChange("roomType", value)}>
                  <SelectTrigger className={errors.roomType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Pilih tipe kamar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Double">Double (2 orang)</SelectItem>
                    <SelectItem value="Triple">Triple (3 orang)</SelectItem>
                    <SelectItem value="Quad">Quad (4 orang)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.roomType && <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-nooruha-primary mb-4">
              <Phone className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Kontak Darurat & Kebutuhan Khusus</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyName">Nama Kontak Darurat *</Label>
                <Input
                  id="emergencyName"
                  value={formData.emergencyName}
                  onChange={(e) => handleInputChange("emergencyName", e.target.value)}
                  placeholder="Nama lengkap kontak darurat"
                  className={errors.emergencyName ? "border-red-500" : ""}
                />
                {errors.emergencyName && <p className="text-red-500 text-sm mt-1">{errors.emergencyName}</p>}
              </div>

              <div>
                <Label htmlFor="emergencyPhone">Nomor Kontak Darurat *</Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className={errors.emergencyPhone ? "border-red-500" : ""}
                />
                {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>}
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="emergencyRelation">Hubungan dengan Kontak Darurat *</Label>
                <Input
                  id="emergencyRelation"
                  value={formData.emergencyRelation}
                  onChange={(e) => handleInputChange("emergencyRelation", e.target.value)}
                  placeholder="Contoh: Suami/Istri, Anak, Orang Tua, Saudara"
                  className={errors.emergencyRelation ? "border-red-500" : ""}
                />
                {errors.emergencyRelation && <p className="text-red-500 text-sm mt-1">{errors.emergencyRelation}</p>}
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="medicalConditions">Kondisi Medis</Label>
                <Textarea
                  id="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                  placeholder="Sebutkan jika ada kondisi medis khusus, alergi obat, atau riwayat penyakit"
                  rows={3}
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="dietaryRequirements">Kebutuhan Diet Khusus</Label>
                <Input
                  id="dietaryRequirements"
                  value={formData.dietaryRequirements}
                  onChange={(e) => handleInputChange("dietaryRequirements", e.target.value)}
                  placeholder="Contoh: Vegetarian, Halal strict, Alergi seafood"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="specialRequests">Permintaan Khusus</Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                  placeholder="Permintaan khusus lainnya untuk kenyamanan perjalanan Anda"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-nooruha-primary mb-4">
              <CalendarDays className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Ringkasan & Persetujuan</h3>
            </div>

            {/* Booking Summary */}
            <Card className="bg-nooruha-light border-nooruha-primary/20">
              <CardHeader>
                <CardTitle className="text-nooruha-dark">Ringkasan Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Nama:</span>
                  <span>{formData.fullName}</span>
                  <span className="font-medium">Email:</span>
                  <span>{formData.email}</span>
                  <span className="font-medium">Telepon:</span>
                  <span>{formData.phone}</span>
                  <span className="font-medium">Paket:</span>
                  <span>{selectedPackageInfo?.name}</span>
                  <span className="font-medium">Harga:</span>
                  <span className="font-bold text-nooruha-primary">Rp {selectedPackageInfo?.price}</span>
                  <span className="font-medium">Tanggal:</span>
                  <span>{formData.departureDate}</span>
                  <span className="font-medium">Jamaah:</span>
                  <span>{formData.numberOfPilgrims} orang</span>
                  <span className="font-medium">Kamar:</span>
                  <span>{formData.roomType}</span>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleInputChange("termsAccepted", !!checked)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  Saya telah membaca dan menyetujui{" "}
                  <span className="text-nooruha-primary font-semibold cursor-pointer hover:underline">
                    syarat dan ketentuan
                  </span>{" "}
                  perjalanan umroh termasuk kebijakan pembatalan dan pengembalian uang.
                </Label>
              </div>
              {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacy"
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) => handleInputChange("privacyAccepted", !!checked)}
                  className="mt-1"
                />
                <Label htmlFor="privacy" className="text-sm leading-relaxed">
                  Saya menyetujui{" "}
                  <span className="text-nooruha-primary font-semibold cursor-pointer hover:underline">
                    kebijakan privasi
                  </span>{" "}
                  dan memberikan persetujuan untuk pemrosesan data pribadi saya.
                </Label>
              </div>
              {errors.privacyAccepted && <p className="text-red-500 text-sm">{errors.privacyAccepted}</p>}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Informasi Penting:</strong> Setelah mengirim formulir ini, tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi booking dan proses pembayaran.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className={triggerClassName || "bg-nooruha-primary hover:bg-nooruha-primary/90 text-white transition-smooth hover-glow"}>
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-nooruha-dark">
            Booking Paket Umroh
          </DialogTitle>
          <DialogDescription>
            Lengkapi formulir di bawah ini untuk melakukan reservasi paket umroh
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step <= currentStep
                    ? "bg-nooruha-primary text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`w-8 sm:w-16 h-1 mx-2 transition-colors ${
                    step < currentStep ? "bg-nooruha-primary" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="w-24"
          >
            Kembali
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              className="bg-nooruha-primary hover:bg-nooruha-primary/90 text-white w-24"
            >
              Lanjut
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white w-32"
            >
              Kirim Booking
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
