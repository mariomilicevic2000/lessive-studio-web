export interface DayHoursType {
  day: string
  open: string | null
  close: string | null
}

// Index 0 = Monday ... 6 = Sunday
export const workingHours: DayHoursType[] = [
  { day: "PON", open: "08:00", close: "18:00" },
  { day: "UTO", open: "08:00", close: "18:00" },
  { day: "SRI", open: "08:00", close: "18:00" },
  { day: "ČET", open: "08:00", close: "18:00" },
  { day: "PET", open: "08:00", close: "18:00" },
  { day: "SUB", open: "08:00", close: "14:00" },
  { day: "NED", open: null, close: null },
]
