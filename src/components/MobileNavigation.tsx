"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"

interface MobileNavigationProps {
  className?: string
}

const navigationItems = [
  { href: "#home", label: "Home" },
  { href: "#paket", label: "Paket Umroh" },
  { href: "#gallery", label: "Gallery" },
  { href: "#blog", label: "Blog" }
]

export default function MobileNavigation({ className }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`md:hidden ${className}`}
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6 text-nooruha-dark" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
        <SheetHeader className="text-left">
          <SheetTitle className="text-nooruha-dark text-xl font-bold">
            Menu Navigasi
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-6 mt-8">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="text-lg font-medium text-nooruha-dark hover:text-nooruha-primary transition-smooth py-3 px-2 border-b border-gray-100 last:border-b-0"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-6 space-y-4">
            <Button
              className="w-full bg-nooruha-primary hover:bg-nooruha-primary/90 text-white py-3 text-base"
              onClick={handleLinkClick}
            >
              Booking Umroh
            </Button>
            <div className="text-center text-sm text-gray-600 space-y-2">
              <p className="font-semibold text-nooruha-primary">Hubungi Kami</p>
              <p>📱 0811-XXXX-XXXX</p>
              <p>📧 info@sultanharamain.id</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
