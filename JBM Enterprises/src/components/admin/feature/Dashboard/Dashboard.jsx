import React, { useEffect, useState } from 'react'
import Header from '../../shared/Header/Header'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {

  const memberData = useSelector(state => state.AdminDataSlice.member);
  const bankData = useSelector(state => state.AdminDataSlice.bank);
  const fileData = useSelector(state => state.AdminDataSlice.file);
  const [checkRelease, setCheckRelease] = useState([])
  const [checkHold, setCheckHold] = useState([])
  const [checkYard, setCheckYard] = useState([])

  useEffect(()=>{
    let holdValues = []
    fileData?.map(file => {
      file.data?.filter(value => {
        value.ACTION === 'Hold' ?
        holdValues.push(value)  : null
      })
    })
    setCheckHold(holdValues)
  }, [fileData])

  useEffect(()=>{
    let releaseValue = []
    fileData?.map(file => {
      file.data?.filter(value => {
        value.ACTION === 'Release' ?
        releaseValue.push(value)  : null
      })
    })
    setCheckRelease(releaseValue)
  }, [fileData])

  useEffect(()=>{
    let yardValues = []
    fileData?.map(file => {
      file.data?.filter(value => {
        value.ACTION === 'In Yard' ?
        yardValues.push(value)  : null
      })
    })
    setCheckYard(yardValues)
  }, [fileData])

  return (
    <>

    <Header />

    <div className="container my-5">
    <div className="row">
  {/* [ Row 1 ] start */}
  <div className="col-sm-6 col-xl-4">
    <NavLink to='/members-list'>
    <div className="card statistics-card-1">
      <div className="card-header d-flex align-items-center justify-content-between py-3">
        <h5>Total Members</h5>
      </div>
      <div className="card-body">
        <img
          src="/assets/images/widget/img-status-1.svg"
          alt="img"
          className="img-fluid img-bg h-100"
        />
        <div className="d-flex align-items-center">
          <h3 className="f-w-300 d-flex align-items-center m-b-0">
            {memberData ? memberData?.length : 0}<small className="text-muted">&nbsp; Total Count</small>
          </h3>
        </div>
        <div className="progress" style={{ height: 7 }}>
          <div
            className="progress-bar bg-brand-color-2"
            role="progressbar"
            style={{ width: "100%" }}
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
    </NavLink>
  </div>
  <div className="col-sm-6 col-xl-4">
    <NavLink to='/bank-list'>
    <div className="card statistics-card-1">
      <div className="card-header d-flex align-items-center justify-content-between py-3">
        <h5>Banks</h5>
      </div>
      <div className="card-body">
        <img
          src="/assets/images/widget/img-status-2.svg"
          alt="img"
          className="img-fluid img-bg"
        />
        <div className="d-flex align-items-center">
          <h3 className="f-w-300 d-flex align-items-center m-b-0">
            {bankData ? bankData?.length : 0}<small className="text-muted">&nbsp; Total Count</small>
          </h3>
        </div>
        <div className="progress" style={{ height: 7 }}>
          <div
            className="progress-bar bg-brand-color-1"
            role="progressbar"
            style={{ width: "100%" }}
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
    </NavLink>
  </div>
  <div className="col-sm-6 col-xl-4">
    <NavLink to='/data-list'>
    <div className="card statistics-card-1">
      <div className="card-header d-flex align-items-center justify-content-between py-3">
        <h5>File Uploads</h5>
      </div>
      <div className="card-body">
        <img
          src="/assets/images/widget/img-status-3.svg"
          alt="img"
          className="img-fluid img-bg"
        />
        <div className="d-flex align-items-center">
          <h3 className="f-w-300 d-flex align-items-center m-b-0">
            {fileData ? fileData?.length : 0}<small className="text-muted"> &nbsp; Total Count</small>
          </h3>
        </div>
        <div className="progress" style={{ height: 7 }}>
          <div
            className="progress-bar bg-brand-color-3"
            role="progressbar"
            style={{ width: "100%" }}
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
    </NavLink>
  </div>
  {/* [ Row 1 ] end */}

  {/* [ Row 2 ] start */}
  <div className="col-sm-6 col-xl-4">
    <NavLink to={`/action/${'Hold'}`}>
    <div className="card statistics-card-1">
      <div className="card-header d-flex align-items-center justify-content-between py-3">
        <h5>Total Holds</h5>
      </div>
      <div className="card-body">
        <img
          src="/assets/images/widget/img-status-1.svg"
          alt="img"
          className="img-fluid img-bg h-100"
        />
        <div className="d-flex align-items-center">
          <h3 className="f-w-300 d-flex align-items-center m-b-0">
            {checkHold ? checkHold?.length : 0}<small className="text-muted">&nbsp; Total Count</small>
          </h3>
        </div>
        <div className="progress" style={{ height: 7 }}>
          <div
            className="progress-bar bg-brand-color-2"
            role="progressbar"
            style={{ width: "100%" }}
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
    </NavLink>
  </div>
  <div className="col-sm-6 col-xl-4">
    <NavLink to={`/action/${'Release'}`}>
    <div className="card statistics-card-1">
      <div className="card-header d-flex align-items-center justify-content-between py-3">
        <h5>Releases</h5>
      </div>
      <div className="card-body">
        <img
          src="/assets/images/widget/img-status-2.svg"
          alt="img"
          className="img-fluid img-bg"
        />
        <div className="d-flex align-items-center">
          <h3 className="f-w-300 d-flex align-items-center m-b-0">
            {checkRelease ? checkRelease?.length : 0}<small className="text-muted">&nbsp; Total Count</small>
          </h3>
        </div>
        <div className="progress" style={{ height: 7 }}>
          <div
            className="progress-bar bg-brand-color-1"
            role="progressbar"
            style={{ width: "100%" }}
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
    </NavLink>
  </div>
  <div className="col-sm-6 col-xl-4">
    <NavLink to={`/action/${'In Yard'}`}>
    <div className="card statistics-card-1">
      <div className="card-header d-flex align-items-center justify-content-between py-3">
        <h5>In Yards</h5>
      </div>
      <div className="card-body">
        <img
          src="/assets/images/widget/img-status-3.svg"
          alt="img"
          className="img-fluid img-bg"
        />
        <div className="d-flex align-items-center">
          <h3 className="f-w-300 d-flex align-items-center m-b-0">
            {checkYard ? checkYard?.length : 0}<small className="text-muted"> &nbsp; Total Count</small>
          </h3>
        </div>
        <div className="progress" style={{ height: 7 }}>
          <div
            className="progress-bar bg-brand-color-3"
            role="progressbar"
            style={{ width: "100%" }}
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
    </NavLink>
  </div>
  {/* [ Row 2 ] end */}
  
</div>
    </div>

</>

  )
}

export default Dashboard