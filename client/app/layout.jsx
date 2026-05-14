import { Inter, JetBrains_Mono, Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata = {
  metadataBase: new URL('https://neuralforge.ai'),
  title: {
    default: 'NeuralForge | Build, Train & Deploy AI Models',
    template: '%s | NeuralForge',
  },
  description:
    'NeuralForge helps teams upload data, explore insights, train models, and deploy predictions from one polished ML workflow.',
  keywords: [
    'AutoML platform',
    'machine learning SaaS',
    'AI model training',
    'NeuralForge',
    'data science dashboard',
    'ML deployment',
  ],
  openGraph: {
    title: 'NeuralForge | Build, Train & Deploy AI Models',
    description:
      'An improved, lightweight ML platform landing page with the original NeuralForge look and feel.',
    url: 'https://neuralforge.ai',
    siteName: 'NeuralForge',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuralForge | Build, Train & Deploy AI Models',
    description:
      'Upload data, compare models, and ship ML workflows faster with NeuralForge.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${mono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#020010] font-[family:var(--font-body)] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
