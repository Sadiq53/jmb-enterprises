import React, { useEffect, useRef } from 'react'
import Header from '../../shared/Header/Header'
import {useFormik} from 'formik'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import AddDataSchema from '../../../../schema/AddDataSchema'
import { handleData, resetState } from '../../../../redux/AdminDataSlice';
import { API_URL } from '../../../../util/API_URL';


const AddData = () => {

  let [ checkFileFormat, setCheckFileFormat ] = useState(0)
  let [ isFileEmpty, setIsFileEmpty ] = useState(false)
  let [ fileData, setFileData ] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("");
  const [spinner, setSpinner] = useState(false);
  const isError = useSelector(state => state.AdminDataSlice.isError)
  const isFullfilled = useSelector(state => state.AdminDataSlice.isFullfilled)
  const isProcessing = useSelector(state => state.AdminDataSlice.isProcessing)
  let chckFile = useRef();
  const dispatch = useDispatch()
  const resetForm = useRef()
  const banks = useSelector(state => state.AdminDataSlice?.bank)

  const handleFileUpload = (e) =>{
    let chckFormat = e.name?.split(".")
    if(chckFormat?.at(-1) != "xlsx" && chckFormat?.at(-1) != "csv") {
      setCheckFileFormat(1)
    } else {
      setIsFileEmpty(false)
      setCheckFileFormat(2)
      // console.log(e)
      setFileData(e)
    }
  }

  let addDataForm = useFormik({
    validationSchema : AddDataSchema,
    initialValues : {
      upload_file : null,
      bank : ''
    },
    onSubmit : async(formData) => {
        let vForm = new FormData();
        const file = fileData
          vForm.set("file", file);
          vForm.set("bank", formData?.bank); 
        // for (let [key, value] of vForm) {
        //   console.log(`${key}: ${value}`);
        // }
        // for (let [key, value] of vForm.entries()) {
        //   if (value instanceof File) {
        //       // If the entry is a file, log basic info
        //       console.log(`File Key: ${key}`);
        //       console.log(`File Name: ${value.name}`);
        //       console.log(`File Type: ${value.type}`);
        //       console.log(`File Size: ${value.size} bytes`);
        //   }}
        dispatch(handleData(vForm))
      }
    })

    useEffect(()=>{
      // console.log(isError)
      if(isError) {
        setSpinner(false)
        setShowAlert(true)
        setAlertMsg("Data Already Exist!!")
        setTimeout(()=>{
          setShowAlert(false)
          setAlertMsg("")
        }, 5000)
        dispatch(resetState())
      } 
    }, [isError])

    useEffect(()=>{
      // console.log(isError)
      if(isProcessing) {
        setSpinner(true)
      } 
    }, [isProcessing])
    
    useEffect(()=>{
      if(isFullfilled) {
        setSpinner(false)
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
              <h3>Add Data</h3>
              <a href="./public/assets/samplefiles/sample_sheet.xlsx" download='Sample-File.xlsx'>Download Sample File</a>
            </div>
            <form onSubmit={addDataForm.handleSubmit}>
            <button ref={resetForm} style={{visibility : "hidden"}} type='reset'></button>
            <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Upload Excel Sheet</label>
                  <input
                    name="upload_file" 
                    type="file"
                    accept=".csv, .xlsx"
                    onChange={(event) => {
                    handleFileUpload(event.currentTarget.files[0]); addDataForm.handleChange(event)
                    }} ref={chckFile}
                    className={'form-control '+(checkFileFormat === 1 || isFileEmpty ? 'is-invalid' : null)}
                    placeholder="Enter full name"
                  />
                  {
                    checkFileFormat === 1 || isFileEmpty ? <small className="form-text text-muted">
                    Incorrect File Formate
                  </small> : null
                  }
                </div>
                <div className="mb-3">
                  <select name='bank' onChange={addDataForm.handleChange} className={'form-control '+(addDataForm.errors.bank && addDataForm.touched.bank ? 'is-invalid' : '')}>
                    <option>Select Bank Name</option>
                    {
                      banks?.map((value, index)=>(
                        <option key={index}>{value?.bank}</option>
                      ))
                    }
                  </select>
                  {
                    addDataForm.errors.bank && addDataForm.touched.bank ? <small className="form-text text-muted">
                    {addDataForm.errors.bank}
                  </small> : null
                  }
                </div>
                {
                  showAlert ? <div className="alert alert-success text-success">{alertMsg}</div> : null
                }
            </div>
            <div className="card-footer text-right">
              <button type='submit' onClick={()=>{checkFileFormat === 0 ? setIsFileEmpty(true) : setIsFileEmpty(false) }}  disabled={checkFileFormat === 1 || spinner ? true : false} className='btn btn-primary '>Submit {spinner ? <i class="fa-solid fa-circle-notch fa-spin"></i> : null}</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default AddData