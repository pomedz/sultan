interface BookingData {
  bookingNumber: string
  customerName: string
  email: string
  phone: string
  packageName: string
  packagePrice: number
  departureDate: string
  numberOfPilgrims: number
  roomType: string
  emergencyContact: string
  emergencyPhone: string
  specialRequirements?: string
}

interface EmailTemplate {
  subject: string
  html: string
  text: string
}

interface EmailLog {
  to: string
  subject: string
  type: 'booking_confirmation' | 'admin_notification' | 'status_update'
  bookingId: string
  sentAt: string
  status: 'sent' | 'failed'
}

class EmailService {
  private static instance: EmailService

  private constructor() {}

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  // Email templates
  private getBookingConfirmationTemplate(booking: BookingData): EmailTemplate {
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(booking.packagePrice)

    const subject = `Konfirmasi Booking Umroh - ${booking.bookingNumber}`

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Konfirmasi Booking Umroh</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #bb834c 0%, #d2b794 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .detail-label { font-weight: bold; }
          .footer { background: #bb834c; color: white; padding: 20px; text-align: center; margin-top: 20px; border-radius: 8px; }
          .button { background: #bb834c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🕌 Sultan Haramain Travel</h1>
            <h2>Konfirmasi Booking Umroh</h2>
          </div>

          <div class="content">
            <p>Assalamu'alaikum Warahmatullahi Wabarakatuh,</p>
            <p>Terima kasih <strong>${booking.customerName}</strong> telah mempercayakan perjalanan umroh Anda kepada Sultan Haramain Travel.</p>

            <div class="booking-details">
              <h3>📋 Detail Booking</h3>
              <div class="detail-row">
                <span class="detail-label">Nomor Booking:</span>
                <span>${booking.bookingNumber}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Nama Jamaah:</span>
                <span>${booking.customerName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span>${booking.email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Telepon:</span>
                <span>${booking.phone}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Paket Umroh:</span>
                <span>${booking.packageName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Harga:</span>
                <span style="color: #bb834c; font-weight: bold;">${formattedPrice}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Tanggal Keberangkatan:</span>
                <span>${new Date(booking.departureDate).toLocaleDateString('id-ID')}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Jumlah Jamaah:</span>
                <span>${booking.numberOfPilgrims} orang</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Tipe Kamar:</span>
                <span>${booking.roomType}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Kontak Darurat:</span>
                <span>${booking.emergencyContact} (${booking.emergencyPhone})</span>
              </div>
              ${booking.specialRequirements ? `
                <div class="detail-row">
                  <span class="detail-label">Kebutuhan Khusus:</span>
                  <span>${booking.specialRequirements}</span>
                </div>
              ` : ''}
            </div>

            <h3>📞 Langkah Selanjutnya:</h3>
            <ol>
              <li>Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi</li>
              <li>Siapkan dokumen yang diperlukan (KTP, Paspor, Foto, dll)</li>
              <li>Lakukan pembayaran sesuai instruksi yang akan diberikan</li>
              <li>Ikuti briefing sebelum keberangkatan</li>
            </ol>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/6281117414100?text=Halo,%20saya%20ingin%20konfirmasi%20booking%20${booking.bookingNumber}" class="button">
                💬 Hubungi WhatsApp
              </a>
            </div>
          </div>

          <div class="footer">
            <p><strong>Sultan Haramain</strong></p>
            <p>📱 0811-1741-410 | 📧 info@SultanHaramain.id</p>
            <p>🏢 Mall Poins Square Lt.1 No.42, Jakarta Selatan</p>
            <p><em>Teman Perjalanan Umroh yang Menyenangkan & Sesuai Sunnah</em></p>
          </div>
        </div>
      </body>
      </html>
    `

    const text = `
      Assalamu'alaikum ${booking.customerName},

      Terima kasih telah mempercayakan perjalanan umroh Anda kepada Sultan Haramain Travel.

      Detail Booking:
      - Nomor Booking: ${booking.bookingNumber}
      - Paket: ${booking.packageName}
      - Harga: ${formattedPrice}
      - Tanggal: ${new Date(booking.departureDate).toLocaleDateString('id-ID')}
      - Jamaah: ${booking.numberOfPilgrims} orang

      Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi lebih lanjut.

      Hubungi kami: 0811-1741-410

      Barakallahu fiikum,
      Sultan Haramain Travel Team
    `

    return { subject, html, text }
  }

  private getAdminNotificationTemplate(booking: BookingData): EmailTemplate {
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(booking.packagePrice)

    const subject = `🔔 Booking Baru: ${booking.bookingNumber} - ${booking.customerName}`

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Baru</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #bb834c; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .booking-details { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .urgent { background: #ff6b6b; color: white; padding: 10px; border-radius: 5px; text-align: center; margin: 10px 0; }
          .button { background: #bb834c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Booking Baru Masuk!</h1>
          </div>

          <div class="content">
            <div class="urgent">
              <strong>⚡ PERLU TINDAKAN SEGERA</strong><br>
              Hubungi customer dalam 1x24 jam!
            </div>

            <div class="booking-details">
              <h3>👤 Informasi Customer</h3>
              <p><strong>Nama:</strong> ${booking.customerName}</p>
              <p><strong>Email:</strong> ${booking.email}</p>
              <p><strong>Phone:</strong> ${booking.phone}</p>
              <p><strong>Kontak Darurat:</strong> ${booking.emergencyContact} (${booking.emergencyPhone})</p>
            </div>

            <div class="booking-details">
              <h3>📦 Detail Booking</h3>
              <p><strong>Booking ID:</strong> ${booking.bookingNumber}</p>
              <p><strong>Paket:</strong> ${booking.packageName}</p>
              <p><strong>Harga:</strong> ${formattedPrice}</p>
              <p><strong>Keberangkatan:</strong> ${new Date(booking.departureDate).toLocaleDateString('id-ID')}</p>
              <p><strong>Jamaah:</strong> ${booking.numberOfPilgrims} orang</p>
              <p><strong>Kamar:</strong> ${booking.roomType}</p>
              ${booking.specialRequirements ? `<p><strong>Kebutuhan Khusus:</strong> ${booking.specialRequirements}</p>` : ''}
            </div>

            <div style="text-align: center; margin: 20px 0;">
              <a href="https://same-li196380emh-latest.netlify.app/admin" class="button">
                🖥️ Buka Admin Dashboard
              </a>
              <a href="https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}?text=Halo%20${booking.customerName},%20terima%20kasih%20telah%20booking%20umroh%20dengan%20Nooruha%20Travel" class="button">
                💬 WhatsApp Customer
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    const text = `
      BOOKING BARU MASUK!

      Customer: ${booking.customerName}
      Email: ${booking.email}
      Phone: ${booking.phone}

      Booking: ${booking.bookingNumber}
      Paket: ${booking.packageName}
      Harga: ${formattedPrice}
      Tanggal: ${new Date(booking.departureDate).toLocaleDateString('id-ID')}

      SEGERA HUBUNGI CUSTOMER!

      Admin Dashboard: https://same-li196380emh-latest.netlify.app/admin
    `

    return { subject, html, text }
  }

  // Send booking confirmation to customer
  async sendBookingConfirmation(booking: BookingData): Promise<boolean> {
    try {
      const template = this.getBookingConfirmationTemplate(booking)

      // In production, integrate with email service like:
      // - SendGrid
      // - Mailgun
      // - AWS SES
      // - Resend

      // For demo, we'll log the email and show success
      console.log('📧 Sending booking confirmation email to:', booking.email)
      console.log('Subject:', template.subject)
      console.log('HTML Preview:', template.html.substring(0, 200) + '...')

      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Store email log for admin dashboard
      this.logEmail({
        to: booking.email,
        subject: template.subject,
        type: 'booking_confirmation',
        bookingId: booking.bookingNumber,
        sentAt: new Date().toISOString(),
        status: 'sent'
      })

      return true
    } catch (error) {
      console.error('Failed to send booking confirmation:', error)
      return false
    }
  }

  // Send notification to admin
  async sendAdminNotification(booking: BookingData): Promise<boolean> {
    try {
      const template = this.getAdminNotificationTemplate(booking)

      console.log('📧 Sending admin notification email')
      console.log('Subject:', template.subject)

      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 500))

      // Store email log
      this.logEmail({
        to: 'admin@nooruha.id',
        subject: template.subject,
        type: 'admin_notification',
        bookingId: booking.bookingNumber,
        sentAt: new Date().toISOString(),
        status: 'sent'
      })

      return true
    } catch (error) {
      console.error('Failed to send admin notification:', error)
      return false
    }
  }

  // Send status update to customer
  async sendStatusUpdate(booking: BookingData, newStatus: string, oldStatus: string): Promise<boolean> {
    try {
      const statusMessages = {
        confirmed: 'Booking Anda telah dikonfirmasi! 🎉',
        paid: 'Pembayaran telah diterima! 💰',
        completed: 'Perjalanan umroh selesai! Terima kasih! 🕌',
        cancelled: 'Booking dibatalkan. Hubungi kami untuk info lebih lanjut. 📞'
      }

      const subject = `Update Status Booking ${booking.bookingNumber}: ${newStatus}`

      console.log('📧 Sending status update email:', subject)

      this.logEmail({
        to: booking.email,
        subject,
        type: 'status_update',
        bookingId: booking.bookingNumber,
        sentAt: new Date().toISOString(),
        status: 'sent'
      })

      return true
    } catch (error) {
      console.error('Failed to send status update:', error)
      return false
    }
  }

  // Log email for tracking
  private logEmail(emailLog: EmailLog): void {
    const existingLogs: EmailLog[] = JSON.parse(localStorage.getItem('emailLogs') || '[]')
    existingLogs.push(emailLog)
    localStorage.setItem('emailLogs', JSON.stringify(existingLogs))
  }

  // Get email logs for admin dashboard
  getEmailLogs(): EmailLog[] {
    return JSON.parse(localStorage.getItem('emailLogs') || '[]')
  }

  // Clear email logs
  clearEmailLogs(): void {
    localStorage.removeItem('emailLogs')
  }
}

export default EmailService
