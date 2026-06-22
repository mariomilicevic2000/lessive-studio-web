interface SectionTitleProps {
  eyebrow: string
  title: string
  description?: string
  center?: boolean
  darkMode?: boolean
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  center = true,
  darkMode = false,
}: SectionTitleProps) {
  return (
    <div className={`space-y-3 ${center ? "text-center" : ""}`}>
      <div
        className={`inline-block ${darkMode ? "bg-background text-foreground" : "bg-foreground text-background"} px-4 py-1 text-xs tracking-wider font-body font-bold mb-2`}
      >
        {eyebrow}
      </div>
      <h2
        className={`text-4xl md:text-5xl lg:text-6xl font-display tracking-tight ${darkMode ? "text-background" : "text-foreground"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-[900px] ${darkMode ? "text-background/80" : "text-foreground/70"} md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body ${center ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
