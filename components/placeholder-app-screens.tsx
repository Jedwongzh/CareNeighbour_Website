interface PlaceholderAppScreenProps {
  text: string
  width?: number
  height?: number
}

export function PlaceholderAppScreen({ text, width = 300, height = 600 }: PlaceholderAppScreenProps) {
  return (
    <div
      className="relative bg-purple-100 rounded-lg overflow-hidden flex items-center justify-center"
      style={{ width, height }}
    >
      <div className="text-purple-500 text-center p-4">
        <p className="font-medium">{text}</p>
        <p className="text-sm mt-2">App Screen Placeholder</p>
      </div>
    </div>
  )
}
