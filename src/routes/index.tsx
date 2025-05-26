import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: CalendarApp,
})

function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day))
  }

  const renderCalendarDays = () => {
    const days = []
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getFullYear() === currentYear && 
                     today.getMonth() === currentMonth && 
                     today.getDate() === day
      
      const isSelected = selectedDate && 
                        selectedDate.getFullYear() === currentYear && 
                        selectedDate.getMonth() === currentMonth && 
                        selectedDate.getDate() === day

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`p-2 h-10 w-10 rounded-lg text-sm font-medium transition-colors hover:bg-blue-100 ${
            isToday ? 'bg-blue-500 text-white' : ''
          } ${
            isSelected ? 'bg-blue-200 text-blue-800' : ''
          }`}
        >
          {day}
        </button>
      )
    }

    return days
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Simple Calendar
        </h1>
        
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            ←
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={goToNextMonth}
            className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {renderCalendarDays()}
        </div>

        {selectedDate && (
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Selected date:</p>
            <p className="font-semibold text-blue-800">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
