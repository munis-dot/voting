import React from 'react'

function header() {
  return (
    <div>
        <nav class="flex flex-row-reverse space-x-4 m-10">
        {[
    ['Vote', '/vote'],
    ['Result', '/result'],
 
  ].map(([title, url]) => (
    <a href={url} className="rounded-lg px-3 py-2 text-white font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a>
  ))}
</nav>
    </div>
  )
}

export default header