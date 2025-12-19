import { BlockProps, CalendarConfig, CalendarData } from './types'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DAY_NAMES_MONDAY = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function CalendarBlock({ config, data }: BlockProps<CalendarConfig, CalendarData>) {
  const daysInMonth = new Date(data.year, data.month + 1, 0).getDate()
  const firstDayOfMonth = new Date(data.year, data.month, 1).getDay()

  // Adjust for Monday start
  let startOffset = config.startOnMonday
    ? (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1)
    : firstDayOfMonth

  const dayNames = config.startOnMonday ? DAY_NAMES_MONDAY : DAY_NAMES
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: startOffset }, (_, i) => i)

  const getEventForDay = (day: number) => {
    return data.events.find(e => e.date === day)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4 font-semibold text-text-main">
        {MONTH_NAMES[data.month]} {data.year}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-text-muted py-2"
          >
            {day}
          </div>
        ))}

        {/* Empty cells */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Days */}
        {days.map((day) => {
          const event = config.showEvents ? getEventForDay(day) : null
          const isToday = day === data.today

          return (
            <div
              key={day}
              className={`aspect-square flex flex-col items-center justify-center rounded cursor-pointer transition-colors ${
                isToday
                  ? 'bg-accent text-text-on-accent font-bold'
                  : 'text-text-muted hover:bg-element hover:text-text-main'
              }`}
            >
              <span className="text-sm">{day}</span>
              {event && (
                <div
                  className="w-1 h-1 rounded-full mt-1"
                  style={{ backgroundColor: event.color || 'var(--bg-accent)' }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
