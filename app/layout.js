import './globals.css'

export const metadata = {
  title: 'Born From — Korean Saju & BaZi Reading in English',
  description: 'Discover your elemental identity with Saju (사주) — Korea\'s 3,000-year-old Four Pillars system. Free element reading, compatibility check, and personalized love, career & life reports delivered to your email.',
  keywords: 'saju, bazi, korean astrology, four pillars, saju reading english, korean personality test, saju compatibility, 사주, bazi reading, k-astrology, elemental analysis, born from',
  openGraph: {
    title: 'Born From — Korean Saju & BaZi Reading in English',
    description: 'Free element reading + personalized Saju reports. Used by Koreans for 3,000 years. Now in English.',
    url: 'https://bornfrom.co',
    siteName: 'Born From',
    images: [
      {
        url: 'https://bornfrom.co/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Born From — Korean Saju Reading',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Born From — Korean Saju & BaZi Reading in English',
    description: 'Free element reading + personalized Saju reports. Used by Koreans for 3,000 years. Now in English.',
    images: ['https://bornfrom.co/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://bornfrom.co',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
