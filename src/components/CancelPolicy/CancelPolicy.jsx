import React from 'react'
import { useSelector } from 'react-redux'

export const CancelPolicy = ({cancelPolicy}) => {
  return (
    <div>
        <p>{cancelPolicy}</p>
    </div>
  )
}
