import React, { useEffect, useRef, useState } from 'react'
import Header from '../../shared/Header/Header'
import {useFormik} from 'formik'
import AddBankSchema from '../../../../schema/AddBankSchema'
import { useDispatch, useSelector } from 'react-redux'
import { handleAddBankData, resetState } from '../../../../redux/AdminDataSlice'

const AddBank = () => {

  const dispatch = useDispatch();
  const isError = useSelector(state => state.AdminDataSlice?.isError)
  const isFullfilled = useSelector(state => state.AdminDataSlice?.isFullfilled)
  const isProcessing = useSelector(state => state.AdminDataSlice?.isProcessing)
  const [showAlert, setShowAlert] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [alertMsg, setAlertMsg] = useState("");
  const resetForm = useRef();

  let addBankForm = useFormik({
    validationSchema : AddBankSchema,
    initialValues : {
      bank : ''
    },
    onSubmit : async(formData) => {
      dispatch(handleAddBankData(formData));
    }
  })
  
  useEffect(()=>{
    if(isError) {
      setSpinner(false)
      setAlertMsg("Bank Already Exist!!")
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
      setAlertMsg("Bank Added Successfully")
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
              <h3>Add Bank Name</h3>
            </div>
            <form onSubmit={addBankForm.handleSubmit}>
            <button ref={resetForm} style={{visibility : "hidden"}} type='reset'></button>
            <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Add Bank Name</label>
                  <input
                    name="bank" 
                    type="text"
                    onChange={addBankForm.handleChange}
                    className={'form-control '+(addBankForm.errors.bank && addBankForm.touched.bank ? 'is-invalid' : null)}
                    placeholder="Enter Bank Name"
                  />
                  {
                    addBankForm.errors.bank && addBankForm.touched.bank ? <small className="form-text text-muted">
                    {addBankForm.errors.bank}
                  </small> : alertMsg ? <small className="form-text text-muted">
                    {alertMsg}
                  </small> : null
                  }
                </div>
                {
                  showAlert ? <div className="alert alert-success text-success">{alertMsg}</div> : null
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
    </>
  )
}

export default AddBank