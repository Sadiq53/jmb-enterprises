import React, { useEffect, useRef, useState } from 'react'
import {NavLink} from 'react-router-dom'
import Header from '../../shared/Header/Header'
import { useSelector } from 'react-redux'
import ViewPassModal from './ViewPassModal'
import DeleteMemberModal from './DeleteMemberModal'

const MembersList = () => {

  const [finalData, setFinalData] = useState([]);
  const memberData = useSelector(state => state.AdminDataSlice.member)
  const isProcessing = useSelector(state => state.AdminDataSlice.isProcessing)
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState({});
  const [dataPerView, setDataPerView] = useState(0);
  const [paginationLength, setPaginationLength] = useState([1])
  const [currentIndex, setCurrentIndex] = useState(1)

  const findMember = (query) => {
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      setFinalData(
        memberData?.filter((value) =>
          value.member_name.toLowerCase().includes(lowercasedQuery)
        )
      );
    } else {
      setFinalData(memberData); // Reset to original data if query is empty
    }
  };

  const handleSearchChange  = (event) =>{
    setSearchQuery(event);
    findMember(event);
  }


  useEffect(() => {
    // Check to prevent setting invalid pagination values
    if (dataPerView > 0 && memberData.length > 0) {
      const startIndex = (currentIndex - 1) * dataPerView;
      const lastIndex = currentIndex * dataPerView;
      setFinalData(memberData.slice(startIndex, lastIndex));

      const len = memberData.length;
      const length = Math.ceil(len / dataPerView); 
      const arr = Array.from({ length }, (_, i) => i + 1); 
      setPaginationLength(arr);
    } else {
      // Handle cases when dataPerView is 0 or invalid
      setFinalData(memberData);
      setPaginationLength([1]);
      setCurrentIndex(1);
    }
  }, [dataPerView, memberData, currentIndex]);

  
  useEffect(()=>{
    if(isProcessing){
      document.getElementById('show-loader').style.display = 'flex'
      document.getElementById('show-loader').style.opacity = '1'
    } else {
      setFinalData(memberData)
      document.getElementById('show-loader').style.display = 'none'
      document.getElementById('show-loader').style.opacity = '0'
    }
  }, [memberData])
  

  const showPopUp = (value) =>{
    if(value === 'view') {
      document.getElementById("viewModal").classList.add('show')
    } else { 
      document.getElementById("deleteModal").classList.add('show')
    }
  }

  return (
    <>
      <Header />

      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
          <div className="card">
  <div className="card-header">
    <h3>Members List</h3>
  </div>
  <div className="card-body">
    <div className="dt-responsive table-responsive">
      <div
        id="table-style-hover_wrapper"
        className="dt-container dt-bootstrap5"
      >
        <div className="row mt-2 gap-15 justify-content-between">
          <div className="col-md-auto me-auto ">
            <div className="dt-length">
              <select
                name="table-style-hover_length"
                aria-controls="table-style-hover"
                className="form-select form-select-sm"
                id="dt-length-3"
                onChange={(event)=>{setDataPerView(Number(event.target.value))}}
              >
                <option>Select</option>
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <label htmlFor="dt-length-3"> entries per page</label>
            </div>
          </div>
          <div className="col-md-auto ms-auto ">
            <div className="dt-search">
              <label htmlFor="dt-search-3">Search:</label>
              <input
                type="search"
                className="form-control form-control-sm"
                id="dt-search-3"
                placeholder=""
                aria-controls="table-style-hover"
                value={searchQuery}
                onChange={(event)=>{handleSearchChange(event.target.value)}}
              />
            </div>
          </div>
        </div>
        <div className="row mt-2 justify-content-md-center">
          <div className="col-12 ">
            <table
              id="table-style-hover"
              className="table table-striped my-3 table-hover table-bordered nowrap dataTable"
              aria-describedby="table-style-hover_info"
              style={{ width: "851.333px" }}
            >
              <colgroup>
                <col style={{ width: "164.646px" }} />
                <col style={{ width: "238.385px" }} />
                <col style={{ width: "128.594px" }} />
                <col style={{ width: "77.2708px" }} />
                <col style={{ width: "134.375px" }} />
                <col style={{ width: "108.062px" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Member Name</th>
                  <th>Member Phone</th>
                  <th>Member Email</th>
                  <th>Address</th>
                  <th>Created at</th>
                  <th>Password</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  finalData?.map((value, index) => (
                      <tr key={index}>
                      <td className="sorting_1">{index+1}</td>
                      <td>{value?.member_name}</td>
                      <td>{value?.member_phone}</td>
                      <td className="dt-type-numeric">{value?.member_email}</td>
                      <td className="dt-type-date">{value?.address}</td>
                      <td className="dt-type-numeric">{value?.formatdate}</td>
                      <td className="dt-type-numeric"><button  className='btn btn-sm btn-outline-secondary' onClick={(event)=>{setUserData(value), showPopUp("view")}} type='a' ><i class="fa-solid fa-eye"></i> View</button></td>
                      <td className="dt-type-numeric"><button className='btn btn-sm btn-danger' onClick={()=>{setUserData(value), showPopUp("delete")}} type='button'><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                  </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="row mt-2 justify-content-between align-items-center">
          <div className="col-md-auto me-auto ">
            <div
              className="dt-info"
              aria-live="polite"
              id="table-style-hover_info"
              role="status"
            >
              {
                `showing 1 to ${finalData?.length} of ${memberData?.length} entries`
              }
            </div>
          </div>
          <div className="col-md-auto ms-auto ">
            <div className="dt-paging paging_full_numbers">
              <ul className="pagination">
                <li className="dt-paging-button page-item disabled">
                  <a
                    className="page-link previous"
                    aria-controls="table-style-hover"
                    aria-disabled="true"
                    aria-label="Previous"
                    data-dt-idx="previous"
                    tabIndex={-1}
                  >
                    ‹
                  </a>
                </li>
                {
                  paginationLength ? paginationLength?.map((value, index)=>(
                    <li className="dt-paging-button page-item ">
                  <button
                    className="page-link"
                    aria-controls="table-style-hover"
                    aria-current="page"
                    data-dt-idx={0}
                    tabIndex={0}
                    onClick={()=>setCurrentIndex(value)}
                  >
                    {index+1}
                  </button>
                </li>
                  )) : (
                    <li className="dt-paging-button page-item ">
                  <button
                    className="page-link"
                    aria-controls="table-style-hover"
                    aria-current="page"
                    data-dt-idx={0}
                    tabIndex={0}
                  >
                    1
                  </button>
                </li>
                  )
                }
                <li className="dt-paging-button page-item">
                  <a
                    href="#"
                    className="page-link next"
                    aria-controls="table-style-hover"
                    aria-label="Next"
                    data-dt-idx="next"
                    tabIndex={0}
                  >
                    ›
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <NavLink to='/add-members' className='btn btn-info'><i class="fa-solid fa-user-plus"></i> ADD MEMBER</NavLink>
          </div>
      </div>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>

  <ViewPassModal props={userData} />
  <DeleteMemberModal props={userData} />

  <div className="loader" id='show-loader' >
  <div className="p-4 text-center">
    <div className="custom-loader" />
    <h2 className="my-3 f-w-400">Loading..</h2>
    <p className="mb-0">
      Please wait while we get your information from the web
    </p>
  </div>
</div>


    </>
  )
}

export default MembersList