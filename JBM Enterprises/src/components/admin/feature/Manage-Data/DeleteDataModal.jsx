import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  handleDeleteFile, resetState } from '../../../../redux/AdminDataSlice'

const DeleteDataModal = (props) => {

    const dispatch = useDispatch()
    const isFullfilled = useSelector(state => state.AdminDataSlice?.isFullfilled)
    const isProcessing = useSelector(state => state.AdminDataSlice?.isProcessing)
    const [spinner, setSpinner] = useState(false);
    const clsModal = useRef();

    const deleteFiles = () =>{
        // console.log(props?.props)
      dispatch(handleDeleteFile(props?.props))
    }

    useEffect(()=>{
        if(isProcessing) {
            setSpinner(true)
          }
        }, [isProcessing]) 
        
        useEffect(()=>{
          if(isFullfilled) {
          setSpinner(false)
            clsModal.current.click();
            dispatch(resetState())
        }
    }, [isFullfilled])    

  return (
    <>
         <div className="overlay-suds" id="deleteModal">
    <div className="popup-suds">
      <h4>Are You Sure, You Want to Delete {props?.props ? props?.props?.length : null} Files</h4>
      <div className="footer">
      <button
            onClick={()=>document.getElementById('deleteModal').classList.remove('show')}
            className="btn-md btn btn-secondary"
            ref={clsModal}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-md btn-danger"
            onClick={deleteFiles}
            disabled={spinner}
          >
            Delete 
            {
                spinner ? <i class="fa-solid fa-circle-notch fa-spin"></i> : null
            }
          </button>
      </div>
    </div>
  </div>
    </>
  )
}

export default DeleteDataModal