import './globals.css'
import type { Metadata } from 'next'
import {Header} from "@/components/Header";


export const metadata: Metadata = {
  title: "Newspaper",
}

export default function RootLayout(
    {
      children,
    }: {
  children: React.ReactNode
}) {
  return (
      <html
          lang="en"
      >
      <meta
          httpEquiv="Content-Security-Policy"
          content="img-src 'self' blob: data:"
      />
      <body>
        <Header/>
        <main>{children}</main>
      </body>
      </html>
  )
}
