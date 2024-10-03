import React, { useEffect, useRef, useState } from 'react'
import Header from '../../shared/Header/Header'
import {useFormik} from 'formik'
import AddMemberSchema from '../../../../schema/AddMemberSchema'
import { handleAddMemberData, resetState } from '../../../../redux/AdminDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import Toast from '../../shared/Toast/Toast'
import { NavLink } from 'react-router-dom'

const AddMembers = () => {

  const dispatch = useDispatch();
  const resetForm = useRef();
  const isError = useSelector(state => state.AdminDataSlice?.isError)
  const isFullfilled = useSelector(state => state.AdminDataSlice?.isFullfilled);
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const isProcessing = useSelector(state => state.AdminDataSlice?.isProcessing)
  const [spinner, setSpinner] = useState(false)

  const openToast = () => {
    setShowToast(true);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  let addMemberForm = useFormik({
    validationSchema : AddMemberSchema,
    initialValues : {
      member_name : '',
      member_phone : '',
      member_email : '',
      address : ''
    },
    onSubmit : (formData) => {
      dispatch(handleAddMemberData(formData))
    }
  })

  useEffect(()=>{
    if(isError) {
      setSpinner(false)
      setAlertMsg("Email ID Already Exist!!")
      setTimeout(()=>{
        setAlertMsg("")
      }, 5000)
      dispatch(resetState())
    } 
  }, [isError])

  useEffect(()=>{
    if(isProcessing) {
      setSpinner(true)
    }
  }, [isProcessing])

  useEffect(()=>{
    if(isFullfilled) {
      setSpinner(false)
      setAlertMsg("Member Added Successfully")
      setShowAlert(true)
      setTimeout(()=>{
        setShowAlert(false);
        setAlertMsg("")
      },3000)
      resetForm.current.click();
      dispatch(resetState())
    }
  }, [isFullfilled])

  return (
    <>
      <Header />

    <div className="container my-5" >
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>Add Member</h3>
            </div>
            <form onSubmit={addMemberForm.handleSubmit}>
              <button ref={resetForm} style={{visibility : "hidden"}} type='reset'></button>
            <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Member Name</label>
                  <input
                    name="member_name" 
                    type="text"
                    onChange={addMemberForm.handleChange}
                    className={'form-control '+(addMemberForm.errors.member_name && addMemberForm.touched.member_name ? 'is-invalid' : null)}
                    placeholder="Enter full name"
                  />
                  {
                    addMemberForm.errors.member_name && addMemberForm.touched.member_name ? <small className="form-text text-muted">
                    {addMemberForm.errors.member_name}
                  </small> : null
                  }
                </div>
                <div className="mb-3">
                  <label className="form-label">Member Phone</label>
                  <input
                    name="member_phone" 
                    type="number"
                    onChange={addMemberForm.handleChange}
                    className={'form-control '+(addMemberForm.errors.member_phone && addMemberForm.touched.member_phone ? 'is-invalid' : null)}
                    placeholder="enter Number"
                  />
                  {
                    addMemberForm.errors.member_phone && addMemberForm.touched.member_phone ? <small className="form-text text-muted">
                    {addMemberForm.errors.member_phone}
                  </small> : null
                  }
                </div>
                <div className="mb-3">
                  <label className="form-label">Member Email</label>
                  <input
                    name="member_email" 
                    type="email"
                    onChange={addMemberForm.handleChange}
                    className={'form-control '+(addMemberForm.errors.member_email && addMemberForm.touched.member_email ? 'is-invalid' : null)}
                    placeholder="Enter email"
                  />
                  {
                    addMemberForm.errors.member_email && addMemberForm.touched.member_email ? <small className="form-text text-muted">
                    {addMemberForm.errors.member_email}
                  </small> : alertMsg ? <small className="form-text text-muted">
                    {alertMsg}
                  </small> : null
                  }
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                <textarea name="address" onChange={addMemberForm.handleChange} 
                  className={'form-control '+(addMemberForm.errors.address && addMemberForm.touched.address ? 'is-invalid' : null)}
                  rows='8' placeholder='Address' id="">

                </textarea>
                {
                    addMemberForm.errors.address && addMemberForm.touched.address ? <small className="form-text text-muted">
                    {addMemberForm.errors.address}
                  </small> : null
                  }
                </div>
                {
                  showAlert ? <div className="alert alert-success text-success d-flex justify-content-between align-items-center"><div className='text-secondary'>{alertMsg}</div><NavLink to='/members-list' className='btn text-info text-sm underline'>View Members</NavLink></div> : null
                }
            </div>
            <div className="card-footer text-right">
              <button disabled={spinner} className='btn btn-primary '>Submit {spinner ? <i class="fa-solid fa-circle-notch fa-spin"></i> : null}</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    {/* <button id="successBtn" className='successBtn success' onClick={openToast}>Success</button>
      {showToast && (
        <Toast 
          type="success" 
          message="This is a success message!" 
          onClose={closeToast} 
        />
      )} */}

    </>
  )
}

export default AddMembers