"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Users, Package, TrendingUp, Eye, Edit, Trash2, Search, Filter, Download, Plus, FileText, Globe, Clock } from "lucide-react"
import BlogEditor from "@/components/BlogEditor"
import EmailService from "@/lib/emailService"

interface Booking {
  id: string
  bookingNumber: string
  customerName: string
  email: string
  phone: string
  packageName: string
  packagePrice: number
  departureDate: string
  numberOfPilgrims: number
  roomType: string
  status: "pending" | "confirmed" | "paid" | "completed" | "cancelled"
  submittedAt: string
  emergencyContact: string
  emergencyPhone: string
  specialRequirements: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  category: string
  status: 'draft' | 'published'
  publishedAt?: string
  createdAt: string
  updatedAt: string
  author: string
  tags: string[]
  metaTitle?: string
  metaDescription?: string
}

// Mock data for demonstration
const mockBookings: Booking[] = [
  {
    id: "1",
    bookingNumber: "NR2025001",
    customerName: "Ahmad Hidayat",
    email: "ahmad.hidayat@email.com",
    phone: "081234567890",
    packageName: "Umroh Konsorsium Bersama Ustadz Khalid Basalamah",
    packagePrice: 36500000,
    departureDate: "2025-03-15",
    numberOfPilgrims: 2,
    roomType: "Double",
    status: "confirmed",
    submittedAt: "2025-01-20T10:30:00Z",
    emergencyContact: "Siti Hidayat",
    emergencyPhone: "081987654321",
    specialRequirements: "Halal strict diet"
  },
  {
    id: "2",
    bookingNumber: "NR2025002",
    customerName: "Fatimah Rahman",
    email: "fatimah.rahman@email.com",
    phone: "082345678901",
    packageName: "Umroh Turki City Tour Istanbul + Bursa",
    packagePrice: 38900000,
    departureDate: "2025-04-10",
    numberOfPilgrims: 1,
    roomType: "Single",
    status: "pending",
    submittedAt: "2025-01-22T14:15:00Z",
    emergencyContact: "Abdullah Rahman",
    emergencyPhone: "082876543210",
    specialRequirements: "Wheelchair accessible"
  },
  {
    id: "3",
    bookingNumber: "NR2025003",
    customerName: "Muhammad Yusuf",
    email: "m.yusuf@email.com",
    phone: "083456789012",
    packageName: "Umroh Akhir Tahun 2025 - Gold Package",
    packagePrice: 44500000,
    departureDate: "2025-12-20",
    numberOfPilgrims: 4,
    roomType: "Quad",
    status: "paid",
    submittedAt: "2025-01-18T09:45:00Z",
    emergencyContact: "Khadijah Yusuf",
    emergencyPhone: "083765432109",
    specialRequirements: "Family with elderly"
  },
  {
    id: "4",
    bookingNumber: "NR2025004",
    customerName: "Aminah Sari",
    email: "aminah.sari@email.com",
    phone: "084567890123",
    packageName: "Umroh Hemat Ramadhan 2025 - Budget Package",
    packagePrice: 28500000,
    departureDate: "2025-04-15",
    numberOfPilgrims: 1,
    roomType: "Single",
    status: "confirmed",
    submittedAt: "2025-01-23T11:30:00Z",
    emergencyContact: "Hasan Sari",
    emergencyPhone: "084876543210",
    specialRequirements: "Budget conscious"
  },
  {
    id: "5",
    bookingNumber: "NR2025005",
    customerName: "Dr. Ibrahim Mansur",
    email: "ibrahim.mansur@email.com",
    phone: "085678901234",
    packageName: "Umroh VIP Executive Bersama Ustadz Ahmad Sarwat",
    packagePrice: 52500000,
    departureDate: "2025-05-01",
    numberOfPilgrims: 2,
    roomType: "Double VIP",
    status: "paid",
    submittedAt: "2025-01-24T16:20:00Z",
    emergencyContact: "Zahrah Mansur",
    emergencyPhone: "085987654321",
    specialRequirements: "VIP treatment, private guide"
  },
  {
    id: "6",
    bookingNumber: "NR2025006",
    customerName: "Keluarga Rahman",
    email: "keluarga.rahman@email.com",
    phone: "086789012345",
    packageName: "Umroh Keluarga Plus Anak-Anak Special",
    packagePrice: 31500000,
    departureDate: "2025-06-20",
    numberOfPilgrims: 5,
    roomType: "Family Suite",
    status: "pending",
    submittedAt: "2025-01-25T13:45:00Z",
    emergencyContact: "Ahmad Rahman",
    emergencyPhone: "086098765432",
    specialRequirements: "Traveling with 3 children ages 8, 12, 15"
  }
]

// Mock blog posts for demonstration
const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Tips Persiapan Umroh yang Wajib Diketahui",
    slug: "tips-persiapan-umroh-wajib-diketahui",
    excerpt: "Panduan lengkap untuk mempersiapkan diri menghadapi ibadah umroh yang berkualitas dan berkesan.",
    content: "<p>Persiapan umroh yang matang adalah kunci sukses ibadah yang khusyuk...</p>",
    featuredImage: "https://same-assets.com/nooruha.id/images/blog-1.jpg",
    category: "tips",
    status: "published",
    publishedAt: "2025-01-15T08:00:00Z",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z",
    author: "Admin",
    tags: ["umroh", "persiapan", "tips", "panduan"],
    metaTitle: "10 Tips Persiapan Umroh yang Wajib Diketahui - Nooruha Travel",
    metaDescription: "Panduan lengkap persiapan umroh mulai dari dokumen, kesehatan, hingga mental spiritual."
  },
  {
    id: "2",
    title: "Doa dan Zikir Selama Perjalanan Umroh",
    slug: "doa-zikir-selama-perjalanan-umroh",
    excerpt: "Kumpulan doa dan zikir yang dianjurkan dibaca selama melaksanakan ibadah umroh.",
    content: "<p>Ibadah umroh tidak hanya sekedar ritual fisik, tetapi juga spiritual...</p>",
    featuredImage: "https://same-assets.com/nooruha.id/images/blog-2.jpg",
    category: "panduan",
    status: "published",
    publishedAt: "2025-01-10T10:00:00Z",
    createdAt: "2025-01-08T14:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z",
    author: "Admin",
    tags: ["doa", "zikir", "umroh", "spiritual"],
    metaTitle: "Doa dan Zikir Selama Perjalanan Umroh - Nooruha Travel",
    metaDescription: "Kumpulan doa dan zikir yang dianjurkan untuk dibaca selama melaksanakan ibadah umroh."
  },
  {
    id: "3",
    title: "Pengalaman Umroh Bersama Ustadz Khalid Basalamah",
    slug: "pengalaman-umroh-ustadz-khalid-basalamah",
    excerpt: "Testimoni jamaah yang telah mengikuti program umroh bersama Ustadz Khalid Basalamah.",
    content: "<p>Program umroh bersama Ustadz Khalid Basalamah memberikan pengalaman spiritual yang mendalam...</p>",
    featuredImage: "https://same-assets.com/nooruha.id/images/blog-3.jpg",
    category: "pengalaman",
    status: "draft",
    createdAt: "2025-01-20T16:00:00Z",
    updatedAt: "2025-01-22T09:00:00Z",
    author: "Admin",
    tags: ["pengalaman", "ustadz", "testimoni"],
    metaTitle: "Pengalaman Umroh Bersama Ustadz Khalid Basalamah",
    metaDescription: "Testimoni dan pengalaman jamaah yang mengikuti program umroh bersama Ustadz Khalid Basalamah."
  }
]

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  // Blog management state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [showBlogEditor, setShowBlogEditor] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>(undefined)
  const [blogSearchTerm, setBlogSearchTerm] = useState("")
  const [blogStatusFilter, setBlogStatusFilter] = useState<string>("all")

  // Load data on component mount
  useEffect(() => {
    if (isAuthenticated) {
      const storedBookings = JSON.parse(localStorage.getItem('nooruhaBookings') || '[]')
      const allBookings = [...mockBookings, ...storedBookings]
      setBookings(allBookings)

      const storedBlogPosts = JSON.parse(localStorage.getItem('nooruhaBlogPosts') || '[]')
      const allBlogPosts = [...mockBlogPosts, ...storedBlogPosts]
      setBlogPosts(allBlogPosts)
    }
  }, [isAuthenticated])

  const handleLogin = () => {
    // Simple demo authentication - in production, use proper auth
    if (loginForm.username === "admin" && loginForm.password === "nooruha2025") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials. Use admin/nooruha2025")
    }
  }

  const handleStatusChange = (bookingId: string, newStatus: Booking["status"]) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    )
  }

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "confirmed": return "bg-blue-100 text-blue-800"
      case "paid": return "bg-green-100 text-green-800"
      case "completed": return "bg-purple-100 text-purple-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Blog management functions
  const handleBlogSave = (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()

    if (editingPost) {
      // Update existing post
      const updatedPost: BlogPost = {
        ...editingPost,
        ...postData,
        updatedAt: now,
        ...(postData.status === 'published' && !editingPost.publishedAt && { publishedAt: now })
      }

      setBlogPosts(prev => prev.map(post =>
        post.id === editingPost.id ? updatedPost : post
      ))

      // Update localStorage
      const storedPosts = JSON.parse(localStorage.getItem('nooruhaBlogPosts') || '[]')
      const updatedStoredPosts = storedPosts.map((post: BlogPost) =>
        post.id === editingPost.id ? updatedPost : post
      )
      localStorage.setItem('nooruhaBlogPosts', JSON.stringify(updatedStoredPosts))
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: Date.now().toString(),
        ...postData,
        createdAt: now,
        updatedAt: now,
        ...(postData.status === 'published' && { publishedAt: now })
      }

      setBlogPosts(prev => [newPost, ...prev])

      // Update localStorage
      const storedPosts = JSON.parse(localStorage.getItem('nooruhaBlogPosts') || '[]')
      localStorage.setItem('nooruhaBlogPosts', JSON.stringify([newPost, ...storedPosts]))
    }

    setShowBlogEditor(false)
    setEditingPost(undefined)
  }

  const handleBlogEdit = (post: BlogPost) => {
    setEditingPost(post)
    setShowBlogEditor(true)
  }

  const handleBlogDelete = (postId: string) => {
    if (confirm('Yakin ingin menghapus artikel ini?')) {
      setBlogPosts(prev => prev.filter(post => post.id !== postId))

      // Update localStorage
      const storedPosts = JSON.parse(localStorage.getItem('nooruhaBlogPosts') || '[]')
      const updatedStoredPosts = storedPosts.filter((post: BlogPost) => post.id !== postId)
      localStorage.setItem('nooruhaBlogPosts', JSON.stringify(updatedStoredPosts))
    }
  }

  const handleBlogStatusToggle = (postId: string) => {
    const post = blogPosts.find(p => p.id === postId)
    if (!post) return

    const newStatus: BlogPost["status"] = post.status === 'published' ? 'draft' : 'published'
    const now = new Date().toISOString()

    const updatedPost: BlogPost = {
      ...post,
      status: newStatus,
      updatedAt: now,
      ...(newStatus === 'published' && !post.publishedAt && { publishedAt: now })
    }

    setBlogPosts(prev => prev.map(p => p.id === postId ? updatedPost : p))

    // Update localStorage
    const storedPosts = JSON.parse(localStorage.getItem('nooruhaBlogPosts') || '[]')
    const updatedStoredPosts = storedPosts.map((p: BlogPost) =>
      p.id === postId ? updatedPost : p
    )
    localStorage.setItem('nooruhaBlogPosts', JSON.stringify(updatedStoredPosts))
  }

  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(blogSearchTerm.toLowerCase()))

    const matchesStatus = blogStatusFilter === "all" || post.status === blogStatusFilter

    return matchesSearch && matchesStatus
  })

  const getBlogStatusColor = (status: BlogPost["status"]) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800"
      case "draft": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === "pending").length,
    confirmedBookings: bookings.filter(b => b.status === "confirmed").length,
    totalRevenue: bookings.filter(b => b.status === "paid" || b.status === "completed")
                          .reduce((sum, b) => sum + (b.packagePrice * b.numberOfPilgrims), 0)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-nooruha-primary">Admin Login</CardTitle>
            <CardDescription>Masuk ke dashboard admin Nooruha Travel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Masukkan username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Masukkan password"
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-nooruha-primary hover:bg-nooruha-primary/90">
              Login
            </Button>
            <Alert>
              <AlertDescription className="text-xs">
                Demo credentials: admin / nooruha2025
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-nooruha-dark">Nooruha Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingBookings}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed Bookings</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.confirmedBookings}</div>
              <p className="text-xs text-muted-foreground">Ready to depart</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(stats.totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">From paid bookings</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="bookings">Manage Bookings</TabsTrigger>
            <TabsTrigger value="blog">Manage Blog</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Management</CardTitle>
                <CardDescription>View and manage customer bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by name, email, or booking number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Bookings Table */}
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking #</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Package</TableHead>
                        <TableHead>Departure</TableHead>
                        <TableHead>Pilgrims</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.bookingNumber}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{booking.customerName}</div>
                              <div className="text-sm text-gray-500">{booking.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[200px]">
                              <div className="font-medium text-sm">{booking.packageName}</div>
                              <div className="text-sm text-gray-500">
                                {new Intl.NumberFormat('id-ID', {
                                  style: 'currency',
                                  currency: 'IDR',
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0
                                }).format(booking.packagePrice)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{new Date(booking.departureDate).toLocaleDateString('id-ID')}</TableCell>
                          <TableCell>{booking.numberOfPilgrims} orang</TableCell>
                          <TableCell>
                            <Select
                              value={booking.status}
                              onValueChange={(value) => handleStatusChange(booking.id, value as Booking["status"])}
                            >
                              <SelectTrigger className="w-[120px]">
                                <Badge className={getStatusColor(booking.status)} variant="secondary">
                                  {booking.status}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedBooking(booking)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details Modal */}
            {selectedBooking && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Booking Details - {selectedBooking.bookingNumber}</CardTitle>
                    <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                      Close
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Customer Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Name:</strong> {selectedBooking.customerName}</p>
                        <p><strong>Email:</strong> {selectedBooking.email}</p>
                        <p><strong>Phone:</strong> {selectedBooking.phone}</p>
                        <p><strong>Emergency Contact:</strong> {selectedBooking.emergencyContact}</p>
                        <p><strong>Emergency Phone:</strong> {selectedBooking.emergencyPhone}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Travel Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Package:</strong> {selectedBooking.packageName}</p>
                        <p><strong>Price:</strong> {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        }).format(selectedBooking.packagePrice)}</p>
                        <p><strong>Departure:</strong> {new Date(selectedBooking.departureDate).toLocaleDateString('id-ID')}</p>
                        <p><strong>Pilgrims:</strong> {selectedBooking.numberOfPilgrims} orang</p>
                        <p><strong>Room Type:</strong> {selectedBooking.roomType}</p>
                      </div>
                    </div>
                  </div>
                  {selectedBooking.specialRequirements && (
                    <div>
                      <h4 className="font-semibold mb-2">Special Requirements</h4>
                      <p className="text-sm bg-gray-50 p-3 rounded">{selectedBooking.specialRequirements}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            {showBlogEditor ? (
              <BlogEditor
                post={editingPost}
                onSave={handleBlogSave}
                onCancel={() => {
                  setShowBlogEditor(false)
                  setEditingPost(undefined)
                }}
              />
            ) : (
              <>
                {/* Blog Management Header */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Blog Management</CardTitle>
                        <CardDescription>Create and manage blog articles</CardDescription>
                      </div>
                      <Button
                        onClick={() => setShowBlogEditor(true)}
                        className="bg-nooruha-primary hover:bg-nooruha-primary/90"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Buat Artikel Baru
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Cari artikel berdasarkan judul, konten, atau tag..."
                            value={blogSearchTerm}
                            onChange={(e) => setBlogSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Select value={blogStatusFilter} onValueChange={setBlogStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Blog Posts Table */}
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Published</TableHead>
                            <TableHead>Updated</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBlogPosts.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                Tidak ada artikel ditemukan
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredBlogPosts.map((post) => (
                              <TableRow key={post.id}>
                                <TableCell>
                                  <div className="max-w-[300px]">
                                    <div className="font-medium">{post.title}</div>
                                    <div className="text-sm text-gray-500 truncate">{post.excerpt}</div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {post.category}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <Badge className={getBlogStatusColor(post.status)} variant="secondary">
                                      {post.status === 'published' ? 'Published' : 'Draft'}
                                    </Badge>
                                    <Switch
                                      checked={post.status === 'published'}
                                      onCheckedChange={() => handleBlogStatusToggle(post.id)}
                                    />
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {post.publishedAt ? (
                                    <div className="flex items-center space-x-1">
                                      <Globe className="h-3 w-3 text-green-600" />
                                      <span className="text-sm">
                                        {new Date(post.publishedAt).toLocaleDateString('id-ID')}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-sm text-gray-400">-</span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3 text-gray-400" />
                                    <span className="text-sm">
                                      {new Date(post.updatedAt).toLocaleDateString('id-ID')}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleBlogEdit(post)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleBlogDelete(post.id)}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Blog Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{blogPosts.length}</div>
                      <p className="text-xs text-muted-foreground">All articles</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Published</CardTitle>
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        {blogPosts.filter(post => post.status === 'published').length}
                      </div>
                      <p className="text-xs text-muted-foreground">Live articles</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                      <Edit className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600">
                        {blogPosts.filter(post => post.status === 'draft').length}
                      </div>
                      <p className="text-xs text-muted-foreground">Unpublished articles</p>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Booking trends and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Popular Packages</h4>
                    <div className="space-y-2">
                      {[
                        { name: "Ustadz Khalid Package", bookings: 12 },
                        { name: "Turkey Tour Package", bookings: 8 },
                        { name: "Gold Package", bookings: 6 },
                        { name: "VIP Executive Package", bookings: 5 },
                        { name: "Silver Package", bookings: 4 },
                        { name: "Family Package", bookings: 3 },
                        { name: "Budget Ramadhan Package", bookings: 7 }
                      ].map((pkg, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">{pkg.name}</span>
                          <Badge>{pkg.bookings} bookings</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Monthly Revenue</h4>
                    <div className="space-y-2">
                      {[
                        { month: "January 2025", revenue: 245000000 },
                        { month: "December 2024", revenue: 189000000 },
                        { month: "November 2024", revenue: 156000000 }
                      ].map((month, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">{month.month}</span>
                          <span className="text-sm font-medium">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0
                            }).format(month.revenue)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
