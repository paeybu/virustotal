import React, { useState } from 'react'
import './App.css'
import 'materialize-css/dist/css/materialize.min.css'
import VirusScan from './component/VirusScan'
import axios from 'axios'
import qs from 'querystring'
import M from 'materialize-css'

const App = () => {
  const [scanMessage, setScanMessage] = useState({})
  const [scans, setScans] = useState([])
  const [loading, setLoading] = useState(false)

  const uploadFile = async file => {
    setLoading(true)
    const url = 'https://www.virustotal.com/vtapi/v2/file/scan'
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        apikey: process.env.REACT_APP_API_KEY
      }
    }
    const body = {
      file: file
    }
    const res = await axios.post(url, qs.stringify(body), config)
    setScanMessage(res.data)
    console.dir(`From uploadfile:`)
    console.dir(res.data)
    reportFile(res.data.md5)
    setLoading(false)
  }

  const reportFile = async md5 => {
    const res = await axios.get(
      `https://www.virustotal.com/vtapi/v2/file/report?apikey=${process.env.REACT_APP_API_KEY}&resource=${md5}`
    )
    console.dir(`from reportfile :`)
    console.dir(res.data)

    let temp = []
    for (let key in res.data.scans) {
      temp.push({
        name: key,
        detected: res.data.scans[key].detected,
        version: res.data.scans[key].version,
        update: res.data.scans[key].update,
        result: res.data.scans[key].result
      })
    }
    setScanMessage(res.data)
    setScans(temp)
    console.log(temp)
  }

  return (
    <div className="App">
      <VirusScan
        uploadFile={uploadFile}
        scanMessage={scanMessage}
        scans={scans}
        loading={loading}
      />
    </div>
  )
}

export default App
