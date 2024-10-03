import React, { useEffect, useRef, useState } from 'react'
import Header from '../../shared/Header/Header'
import {useFormik} from 'formik'
import ManageTagsSchema from '../../../../schema/ManageTagsSchema'
import { useDispatch, useSelector } from 'react-redux'
import { handleManageTags, resetState } from '../../../../redux/AdminDataSlice'

const ManageDashTags = () => {

  const dispatch = useDispatch();
  const isError = useSelector(state => state.AdminDataSlice?.isError)
  const isFullfilled = useSelector(state => state.AdminDataSlice?.isFullfilled)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("");
  const resetForm = useRef();

  let manageTagsForm = useFormik({
    validationSchema : ManageTagsSchema,
    initialValues : {
      pending_records : '',
      in_yard_records : '',
      release_records : '',
      hold_records : ''
    },
    onSubmit : async(formData) => {
      dispatch(handleManageTags(formData))
    }
  })

  useEffect(()=>{
    if(isError) {
      setAlertMsg("Form is not Submitted Try again Later")
      setShowAlert(true)
      setTimeout(()=>{
        setShowAlert(false)
        setAlertMsg("")
      }, 5000)
      dispatch(resetState())
    }
  }, [isError])

  useEffect(()=>{
    if(isFullfilled) {
      setAlertMsg("Data Added Successfully")
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
              <h3>Add/Update User Dashboard Tags</h3>
            </div>
            <form onSubmit={manageTagsForm.handleSubmit}>
            <button ref={resetForm} style={{visibility : "hidden"}} type='reset'></button>
            <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Pending Records</label>
                  <input
                    name="pending_records" 
                    type="number"
                    onChange={manageTagsForm.handleChange}
                    className={'form-control '+(manageTagsForm.errors.pending_records && manageTagsForm.touched.pending_records ? 'is-invalid' : null)}
                    placeholder="Pending Records" 
                  />
                  {
                    manageTagsForm.errors.pending_records && manageTagsForm.touched.pending_records ? <small className="form-text text-muted">
                    {manageTagsForm.errors.pending_records}
                  </small> : null
                  }
                </div>
                <div className="mb-3">
                  <label className="form-label">In Yard Records</label>
                  <input
                    name="in_yard_records" 
                    type="number"
                    onChange={manageTagsForm.handleChange}
                    className={'form-control '+(manageTagsForm.errors.in_yard_records && manageTagsForm.touched.in_yard_records ? 'is-invalid' : null)}
                    placeholder="In Yard Records" 
                  />
                  {
                    manageTagsForm.errors.in_yard_records && manageTagsForm.touched.in_yard_records ? <small className="form-text text-muted">
                    {manageTagsForm.errors.in_yard_records}
                  </small> : null
                  }
                </div>
                <div className="mb-3">
                  <label className="form-label">Release Records</label>
                  <input
                    name="release_records" 
                    type="number"
                    onChange={manageTagsForm.handleChange}
                    className={'form-control '+(manageTagsForm.errors.release_records && manageTagsForm.touched.release_records ? 'is-invalid' : null)}
                    placeholder="Release Records" 
                  />
                  {
                    manageTagsForm.errors.release_records && manageTagsForm.touched.release_records ? <small className="form-text text-muted">
                    {manageTagsForm.errors.release_records}
                  </small> : null
                  }
                </div>
                <div className="mb-3">
                  <label className="form-label">Hold Records</label>
                  <input
                    name="hold_records" 
                    type="number"
                    onChange={manageTagsForm.handleChange}
                    className={'form-control '+(manageTagsForm.errors.hold_records && manageTagsForm.touched.hold_records ? 'is-invalid' : null)}
                    placeholder="Hold Records"
                  />
                  {
                    manageTagsForm.errors.hold_records && manageTagsForm.touched.hold_records ? <small className="form-text text-muted">
                    {manageTagsForm.errors.hold_records}
                  </small> : null
                  }
                </div>
                {
                showAlert ? <div className="alert alert-success text-success">{alertMsg}</div> : null
                }
            </div>
            <div className="card-footer text-right">
              <button className='btn btn-primary '>Submit</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ManageDashTags