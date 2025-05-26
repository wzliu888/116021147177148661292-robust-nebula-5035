import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const currentDay = today.getDate()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Subtle seasonal colors based on month
  const getSeasonalColors = (month: number) => {
    if (month >= 2 && month <= 4) return { bg: 'from-emerald-50 to-teal-50', accent: 'emerald', text: 'emerald-700' } // Spring
    if (month >= 5 && month <= 7) return { bg: 'from-amber-50 to-yellow-50', accent: 'amber', text: 'amber-700' } // Summer
    if (month >= 8 && month <= 10) return { bg: 'from-orange-50 to-red-50', accent: 'orange', text: 'orange-700' } // Fall
    return { bg: 'from-blue-50 to-indigo-50', accent: 'blue', text: 'blue-700' } // Winter
  }

  const seasonalColors = getSeasonalColors(currentMonth)

  // Get first day of the month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const startingDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  // Create calendar grid
  const calendarDays = []
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${seasonalColors.bg} py-8`}>
      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        {/* Calendar Header */}
        <div className="text-center mb-6">
          <h1 className={`text-2xl font-bold text-${seasonalColors.text} mb-2`}>
            Calendar App
          </h1>
          <h2 className={`text-xl font-semibold text-${seasonalColors.text}/80`}>
            {monthNames[currentMonth]} {currentYear}
          </h2>
        </div>

        {/* Days of the week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className={`text-center text-sm font-semibold text-${seasonalColors.text}/70 py-2`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const isCurrentDay = day === currentDay
            
            return (
              <div
                key={index}
                className={`h-10 w-10 flex items-center justify-center rounded-lg text-sm transition-all duration-200
                  ${
                    day === null
                      ? ''
                      : isCurrentDay
                      ? `bg-${seasonalColors.accent}-500 text-white font-bold shadow-md ring-2 ring-${seasonalColors.accent}-200`
                      : `bg-white/60 hover:bg-${seasonalColors.accent}-100 text-gray-700 hover:text-${seasonalColors.text} hover:shadow-sm`
                  }
                `}
              >
                {day}
              </div>
            )
          })}
        </div>

        {/* Current date info */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Today is{' '}
            <span className={`font-semibold text-${seasonalColors.accent}-600`}>
              {monthNames[currentMonth]} {currentDay}, {currentYear}
            </span>
          </p>
        </div>

        {/* Simple stats */}
        <div className={`mt-4 pt-4 border-t border-${seasonalColors.accent}-200/30`}>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className={`bg-${seasonalColors.accent}-50/50 rounded-lg py-2 px-3`}>
              <p className={`text-lg font-bold text-${seasonalColors.text}`}>{daysInMonth}</p>
              <p className="text-sm text-gray-600">Days in Month</p>
            </div>
            <div className={`bg-${seasonalColors.accent}-50/50 rounded-lg py-2 px-3`}>
              <p className={`text-lg font-bold text-${seasonalColors.text}`}>
                {Math.ceil(calendarDays.length / 7)}
              </p>
              <p className="text-sm text-gray-600">Weeks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
