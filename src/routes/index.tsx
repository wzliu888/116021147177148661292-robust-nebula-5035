import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const currentDay = today.getDate()

  const handleDateClick = () => {
    alert(`You clicked on ${monthNames[currentMonth]} ${currentDay}, ${currentYear}!`)
  }

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Calendar Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Calendar App
          </h1>
          <h2 className="text-xl font-semibold text-gray-700">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">{monthNames[currentMonth]} {currentYear}</span>
          </h2>
        </div>

        {/* Days of the week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-indigo-600 py-2 bg-gradient-to-b from-indigo-50 to-blue-50 rounded-md"
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
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
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
            <button
              onClick={handleDateClick}
              className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 cursor-pointer transition-all duration-200 border-none bg-none p-0 underline decoration-transparent hover:decoration-emerald-500"
            >
              {monthNames[currentMonth]} {currentDay}, {currentYear}
            </button>
          </p>
        </div>

        {/* Simple stats */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-b from-purple-600 to-pink-600">{daysInMonth}</p>
              <p className="text-sm text-gray-600">Days in Month</p>
            </div>
            <div>
              <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-indigo-600">
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
