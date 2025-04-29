import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const name = searchParams.get("name") || "User"
  const width = Number.parseInt(searchParams.get("width") || "200", 10)
  const height = Number.parseInt(searchParams.get("height") || "200", 10)
  const bgColor = searchParams.get("bg") || "#8b5cf6"
  const textColor = searchParams.get("color") || "#ffffff"

  // Generate SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${bgColor}"/>
      <circle cx="${width / 2}" cy="${height / 3}" r="${Math.min(width, height) / 4}" fill="${textColor}"/>
      <rect x="${width / 2 - width / 6}" y="${height / 3 + height / 6}" width="${width / 3}" height="${height / 3}" rx="${height / 20}" fill="${textColor}"/>
      <text x="${width / 2}" y="${height - height / 10}" font-family="Arial" font-size="${Math.min(width, height) / 10}" fill="${textColor}" text-anchor="middle">${name}</text>
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
