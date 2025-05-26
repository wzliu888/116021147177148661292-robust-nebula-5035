import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-4 flex gap-2 bg-blue-600 text-white shadow-md">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/" className="hover:text-blue-200">📅 Simple Calendar</Link>
        </div>
      </nav>
    </header>
  )
}
