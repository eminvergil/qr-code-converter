'use client'

import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toast } from "@/components/ui/toast"
import { Copy, Share2 } from 'lucide-react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [asciiQR, setAsciiQR] = useState('')
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (url) {
      setQrCode(url)
      generateASCIIQR(url)
    }
  }, [url])

  const generateASCIIQR = async (text: string) => {
    try {
      const QRCode = await import('qrcode')
      const ascii = await QRCode.toString(text, { type: 'terminal' })
      setAsciiQR(ascii)
    } catch (err) {
      console.error('Failed to generate ASCII QR code:', err)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'QR Code',
        text: asciiQR,
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
    } else {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(asciiQR).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex space-x-2 mb-4">
        <Input
          type="url"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow"
        />
        <Button variant="outline" onClick={handleCopy}>
          <Copy className="w-4 h-4 mr-2" />
          {copied ? 'Copied!' : 'Copy QR'}
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
      <div className="flex-grow flex items-center justify-center bg-white">
        {qrCode && (
          <QRCodeSVG
            value={qrCode}
            size={Math.min(window.innerWidth, window.innerHeight) * 0.8}
            level="L"
            includeMargin={true}
          />
        )}
      </div>
      {showToast && (
        <Toast>
          <div className="flex items-center">
            <span>Sharing is not supported on this device.</span>
          </div>
        </Toast>
      )}
    </div>
  )
}