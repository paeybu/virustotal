import React, { useState, useEffect } from 'react'
import './App.css'
import 'materialize-css/dist/css/materialize.min.css'
import VirusScan from './component/VirusScan'
import axios from 'axios'

const App = () => {
  const [scanMessage, setScanMessage] = useState({})

  useEffect(() => {
    console.log(`React app api_key = ${process.env.REACT_APP_API_KEY}`)
  }, [])

  const uploadFile = async file => {
    const res = await axios({
      url: 'https://www.virustotal.com/vtapi/v2/file/scan',
      method: 'post',
      params: {
        apikey: process.env.REACT_APP_API_KEY
      },
      data: {
        file: file
      }
    })
    setScanMessage(res)
    console.log(res)
    console.log(file)
  }

  return (
    <div className="App">
      <VirusScan uploadFile={uploadFile} />
    </div>
  )
}

export default App
