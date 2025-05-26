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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Calendar Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Calendar App
          </h1>
          <h2 className="text-xl font-semibold text-gray-700">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{monthNames[currentMonth]} {currentYear}</span>
          </h2>
        </div>

        {/* Days of the week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-indigo-600 py-2"
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
                className={`
                  h-10 w-10 flex items-center justify-center rounded-md text-sm
                  ${
                    day === null
                      ? ''
                      : isCurrentDay
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-lg'
                      : 'bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-gray-700 border border-blue-100'
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
            <span className="font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {monthNames[currentMonth]} {currentDay}, {currentYear}
            </span>
          </p>
        </div>

        {/* Simple stats */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{daysInMonth}</p>
              <p className="text-sm text-gray-600">Days in Month</p>
            </div>
            <div>
              <p className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
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
