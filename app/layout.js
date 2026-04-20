export const metadata = {
  title: 'SAJU — Korean Fate Reading',
  description: 'Ancient Korean SAJU reveals whether fire, water, wood, earth, or metal shapes your destiny.',
  openGraph: {
    title: 'SAJU — Korean Fate Reading',
    description: 'Discover your Five Elements. Ancient Korean astrology, personalized for you.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fontsource/cormorant-garamond/index.css"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#060C18' }}>
        {children}
      </body>
    </html>
  )
}
