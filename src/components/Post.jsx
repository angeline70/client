import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export default function Post({_id, title, summary, cover, content, createdAt }) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:5001/' + cover} alt="" />

        </Link>
      </div>
      <div className='texts'>
        <Link to={`/post/${_id}`}>

          <h2>{title}</h2>
        </Link>
        <p className="info">
          <time>{format(new Date(createdAt), 'MMM, d,yyyy HH:mm')}</time>
        </p>
        <p className='summer'>{summary}</p>
      </div>
    </div>
  )
}
