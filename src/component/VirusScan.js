import React, { useState } from 'react'

const VirusScan = ({ uploadFile, scanMessage, scans, loading }) => {
  const handleSubmit = e => {
    e.preventDefault()
    if (file === null) return
    console.log(file)

    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      uploadFile(reader.result)
    }
  }

  const [file, setFile] = useState(null)

  return (
    <section className="section section-scan">
      <div className="container">
        <div className="row">
          <div className="col s6 offset-s3">
            <form onSubmit={handleSubmit}>
              <label htmlFor="file"></label>
              <div className="file-field input-field">
                <div className="btn">
                  <span>File</span>
                  <input
                    type="file"
                    name="file"
                    onChange={e => setFile(e.target.files[0])}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn waves-effect waves-light"
              />
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            {loading && (
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            )}
            <p className="red-text">{scanMessage.verbose_msg}</p>
            <p className="blue-text">{scanMessage.md5}</p>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <ul>
              {scans.map(scan => (
                <li key={scan.name}>
                  <p>
                    <span className="green-text">{scan.name}</span> version:{' '}
                    {scan.version}
                  </p>
                  <p>
                    Detected:{' '}
                    {scan.detected ? (
                      <span className="red-text">
                        <strong>True</strong>
                      </span>
                    ) : (
                      <span className="blue-text">False</span>
                    )}
                  </p>
                  {scan.detected && (
                    <p className="red-text">Result: {scan.result}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VirusScan
