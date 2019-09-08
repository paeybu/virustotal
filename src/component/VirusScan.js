import React, { useState } from 'react'

const VirusScan = ({ uploadFile }) => {
  const handleSubmit = e => {
    e.preventDefault()
    console.log(file)
    // uploadFile(file)

    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      uploadFile(reader.result)
    }
  }

  const [file, setFile] = useState(null)

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <form onSubmit={handleSubmit}>
            <label htmlFor="file"></label>
            <input
              type="file"
              name="file"
              onChange={e => setFile(e.target.files[0])}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default VirusScan
