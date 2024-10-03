import React, { useEffect, useRef, useState } from 'react'
import Header from '../../shared/Header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { handleDeleteFile, resetState } from '../../../../redux/AdminDataSlice';
import DeleteDataModal from './DeleteDataModal';

const DeleteData = () => {

  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("");
  const RawFileData = useSelector(state => state.AdminDataSlice?.file);
  const isError = useSelector(state => state.AdminDataSlice?.isError);
  const isFullfilled = useSelector(state => state.AdminDataSlice?.isFullfilled);
  const [breakDownFIleName, setBreakDownFIleName] = useState([]);
  const [deleteFiles, setDeletFiles] = useState([])
  const resetForm = useRef();


  const handleCheckboxChange = (whichDelete, value) => {
    if (whichDelete === 'select') {
      // Get the array of IDs based on the `value`
      let getFileId = RawFileData?.filter(item => item?.name === value)?.map(item => item._id);
  
      // Ensure getFileId is a flat array (shouldn't be nested if map is used correctly)
      getFileId = getFileId ?? [];
  
      // Update the state based on whether IDs are already selected
      setDeletFiles(prevState => {
        if (getFileId.length === 0) return prevState; // Handle case where no IDs are found
  
        // Flatten previous state and current getFileId
        const flatState = prevState.flat();
        const flatGetFileId = getFileId.flat();
  
        // If IDs are already selected, remove them from state
        if (flatGetFileId.every(id => flatState.includes(id))) {
          return flatState.filter(id => !flatGetFileId.includes(id));
        } else {
          // If IDs are not selected, add them to the state
          return [...new Set([...flatState, ...flatGetFileId])]; // Ensure unique values
        }
      });
    } else {
      // Handle other case
      const getFileData = RawFileData?.map(item => item?._id);
      setDeletFiles(getFileData ?? []);
      getFileData?.length !== 0 ? 
      document.getElementById('deleteModal').classList.add('show') : null
    }
  };


const showPopUp = () =>{
  if(deleteFiles?.length !== 0) {
    document.getElementById('deleteModal').classList.add('show')
  } else { 
      setAlertMsg("Nothing to Delete"),
        setShowAlert(true),
        setTimeout(()=>{
        setShowAlert(false)
        setAlertMsg("")
      }, 5000)
  }
}

  useEffect(()=>{
    setDeletFiles([])
  }, [RawFileData])

  useEffect(()=>{
    setBreakDownFIleName(RawFileData?.map(({ name }) => name));
  }, [RawFileData, isFullfilled])

  useEffect(()=>{
    if(isError) {
      setAlertMsg("Error in Deleting File, Try again later")
      setTimeout(()=>{
        setAlertMsg("")
      }, 5000)
      dispatch(resetState())
    } 
  }, [isError])

  useEffect(()=>{
    if(isFullfilled) {
      setAlertMsg("Data Deleted Successfully")
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
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className='font-size-18'>Delete Data By List</h3>
              <button type='button' onClick={()=>{handleCheckboxChange('bulk'), showPopUp()}} className='btn btn-danger '> <i class="fa-solid fa-trash-can"></i> Bulk Delete</button>
            </div>
            <button ref={resetForm} style={{visibility : "hidden"}} type='reset'></button>
            <div className="card-body">
                {
                  showAlert ? <div className="alert alert-success text-success">{alertMsg}</div> : null
                }
                <div className='my-3 dt-responsive table-responsive'>
                  <table id="table-style-hover"
                          className="table table-striped my-3 table-hover table-bordered nowrap dataTable"
                          aria-describedby="table-style-hover_info">
                            <thead>
                              <tr>
                                <th className='d-flex align-items-center justify-content-between'>File Name <button type='button' onClick={()=>{showPopUp()}} className='btn btn-danger btn-md'>Delete</button></th>
                              </tr>
                            </thead>
                            <tbody>
                            {
                              breakDownFIleName?.map(value=>(
                                <tr key={value}>
                                  <td className='d-flex justify-content-between align-items-center'><h5>{value}</h5> <input className='custom-checkbox' onChange={()=>{handleCheckboxChange('select', value)}} type='checkbox'/></td>
                                </tr>
                              ))
                            }
                            </tbody>
                  </table>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DeleteDataModal props={deleteFiles} />
    </>
  )
}

export default DeleteData