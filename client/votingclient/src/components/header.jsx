import React from 'react'
import { Link } from 'react-router-dom'

function header() {
  return (
    <div>
      <nav class="flex flex-row-reverse space-x-4 m-10">
        {[
          ['Vote', '/voteNow'],
          ['Result', '/checkResult'],

        ].map(([title, url]) => (
          <Link to={url} className="rounded-lg px-3 py-2 text-white font-medium hover:bg-slate-100 hover:text-slate-900">{title}</Link>
        ))}
      </nav>
    </div>
  )
}

export default header