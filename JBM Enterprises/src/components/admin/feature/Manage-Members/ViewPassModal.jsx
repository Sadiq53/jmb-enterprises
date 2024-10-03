import React, { useRef } from 'react'

const ViewPassModal = (props) => {

  const tooltip = useRef(null)

  const showToolTip = () =>{
    tooltip.current.style.opacity = '1';
    tooltip.current.style.visibility = 'visible';
  }

  const hideTooltip = () => {
    tooltip.current.style.opacity = '0';
    tooltip.current.style.visibility = 'hidden';
  };

  return (
    <>
        <div className="overlay-suds" id="viewModal">
          <div className="popup-suds">
            <div className="header">
            <h2>Member Password</h2>
            <button className=" btn suds-btn" onClick={()=>document.getElementById('viewModal').classList.remove('show')}>
              ×
            </button>
            </div>
            <div className="content">
            {
            props.props ? (
              <>
                <h5>Name : {props?.props?.member_name}</h5>
                <h5>Email ID : {props?.props?.member_email}</h5>
                <h5>Password : {props?.props?.password} <button className='btn tooltip-button' onMouseLeave={hideTooltip}  onMouseEnter={()=>{navigator.clipboard.writeText(props?.props?.password), showToolTip}} onClick={()=>{navigator.clipboard.writeText(props?.props?.password)}}><i class="fa-regular fa-copy"></i></button></h5>
              </>
            ) : null
          }
            </div>
        </div>
  </div>

  <div className="tooltip-suds " ref={tooltip}>
          Copied
  </div>
    </>
  )
}

export default ViewPassModal