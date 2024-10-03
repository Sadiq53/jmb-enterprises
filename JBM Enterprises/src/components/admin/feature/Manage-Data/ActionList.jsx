import React, { useEffect, useRef, useState } from 'react'
import Header from '../../shared/Header/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { handleAddAction, resetState } from '../../../../redux/AdminDataSlice';

const ActionList = () => {

    const getAction = useParams();
    const rawfileData = useSelector(state => state.AdminDataSlice.file)
    const isFullfilled = useSelector(state => state.AdminDataSlice.isFullfilled)
    const [actionData, setActionData] = useState([])
    const dispatch = useDispatch();
    const [actionValue, setActionValue] = useState('');
    const tableContainerRef = useRef(null); // Use useRef to reference the container
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  //--------------------Table Scroll-------------------------------
  
  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - tableContainerRef.current.offsetLeft);
    setScrollLeft(tableContainerRef.current.scrollLeft);
  };
  
  const handleMouseLeaveOrUp = () => {
    setIsDown(false);
  };
  
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - tableContainerRef.current.offsetLeft;
    const walk = (x - startX) * 3; // Adjust scroll speed here
    tableContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  
  //--------------------Table Scroll-------------------------------


    useEffect(() => {
        if (getAction.action) {
            const filteredData = rawfileData?.map(file => {
                // Use filter to get the matching values and return it 
                return file?.data?.filter(value => value.ACTION === getAction.action)  // Filter the data array
            })

            setActionData(filteredData?.flat());  // Set the filtered data into state
        }
    }, [getAction.action, rawfileData]);

    const addAction = (action, value, fileName) => {
        const obj = {
          actionStatus : action,
          agreementNumber : value,
          fileName : fileName,
        }
        dispatch(handleAddAction(obj));
      }
    
      const actionLoader = (ID) => {
          setActionValue(ID)
          document.getElementById(ID).classList.add('loading')
      }
    
      useEffect(()=>{
        if(actionValue) {
          if(isFullfilled){
            document.getElementById(actionValue).classList.remove('loading')
            dispatch(resetState())
          }
        }
      }, [isFullfilled])
    
    
    
  return (
    <>
        <Header />
        {/* <button onClick={console.log(actionData)}>ok</button> */}
        <div className="container-fluid my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3>Data List</h3>
              </div>
              <div className="card-body">
                <div className="dt-responsive table-responsive overflow-hidden ">
                  <div id="table-style-hover_wrapper" className="dt-container dt-bootstrap5">
                    {/* <div className="row mt-2 gap-15 justify-content-evenly my-3">
                      <div className="col-md-3 me-auto">
                        <select
                          name="table-style-hover_length"
                          aria-controls="table-style-hover"
                          className="form-select form-control form-select-sm"
                          id="dt-length-3"
                          onChange={(event) => setChangeFileOnBank(event.target.value)}
                        >
                          <option>Select Bank</option>
                          {bankData?.map(value => (
                            <option key={value?._id} value={value?.bank}>{value?.bank}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3 me-auto">
                        <select
                          name="table-style-hover_length"
                          aria-controls="table-style-hover"
                          className="form-select form-control form-select-sm"
                          id="dt-length-3"
                          onChange={(event) => setChangeFileOnDate(event.target.value)}
                        >
                          <option>Select Month Year</option>
                          {Object.keys(groupedDates).map((key) => (
                            <option key={key} value={key}>{key}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3 me-auto">
                        <select
                          name="table-style-hover_length"
                          aria-controls="table-style-hover"
                          className="form-select form-control form-select-sm"
                          id="dt-length-3"
                          onChange={(event) => setChangeFileOnName(event.target.value)}
                        >
                          <option>Select List</option>
                          {breakDownFIleName?.map(value => (
                            <option key={value} value={value}>{value}</option>
                          ))}
                        </select>
                      </div>
                    </div> */}

                    {/* <div className="row mt-2 justify-content-between">
                      <div className="col-md-auto me-auto">
                        <div className="dt-length">
                          <select
                            name="table-style-hover_length"
                            aria-controls="table-style-hover"
                            className="form-select form-select-sm"
                            id="dt-length-3"
                            onChange={(event) => setDataPerView(Number(event.target.value))}
                            value={dataPerView}
                          >
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={200}>200</option>
                            <option value={500}>500</option>
                          </select>
                          <label htmlFor="dt-length-3"> entries per page</label>
                        </div>
                      </div>
                      <div className="col-md-auto ms-auto">
                        <div className="dt-search">
                          <label htmlFor="dt-search-3">Search:</label>
                          <input
                            type="search"
                            className="form-control form-control-sm"
                            id="dt-search-3"
                            placeholder=""
                            aria-controls="table-style-hover"
                            value={searchQuery}
                            onChange={handleSearchChange}
                          />
                        </div>
                      </div>
                    </div> */}
                    <div className="row mt-2 justify-content-md-center">
                        <div className="col-12 table-container-suds my-3"
                        ref={tableContainerRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeaveOrUp}
                        onMouseUp={handleMouseLeaveOrUp}
                        onMouseMove={handleMouseMove}
                        >
                            <table
                            id="table-style-hover"
                            className="table table-striped my-3 table-hover table-bordered nowrap dataTable"
                            aria-describedby="table-style-hover_info"
                            >
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Agreement No</th>
                                <th>Customer Name</th>
                                <th>Branch</th>
                                <th>Reg No</th>
                                <th>Chassis No</th>
                                <th>Engine No</th>
                                <th>Manufacturer Des</th>
                                <th>Make</th>
                                <th>Model No</th>
                                <th>Assets Des</th>
                                <th>Arm Name</th>
                                <th>Arm Phone</th>
                                <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {actionData?.map((value, index) => {
                              const ARMPHONE = value?.ARMNAME?.match(/\d+/g).join('');
                              const ARMNAME = value?.ARMNAME?.slice(0, -11)
                              return (
                                <tr key={index}>
                                  <td className="sorting_1">{index + 1}</td>
                                  <td className="sorting_1">{value?.AGREEMENTNO}</td>
                                  <td className="sorting_1">{value?.CUSTOMERNAME}</td>
                                  <td className="sorting_1">{value?.BRANCH}</td>
                                  <td className="sorting_1">{value?.REGDNUM}</td>
                                  <td className="sorting_1">{value?.CHASISNUM}</td>
                                  <td className="sorting_1">{value?.ENGINENUM}</td>
                                  <td className="sorting_1">{value?.MANUFACTURERDESC}</td>
                                  <td className="sorting_1">{value?.MAKE}</td>
                                  <td className="sorting_1">{value?.MODELNUM}</td>
                                  <td className="sorting_1">{value?.ASSETSDESC}</td>
                                  <td className="sorting_1">{ARMNAME}</td>
                                  <td className="sorting_1">{ARMPHONE}</td>
                                  <td className="sorting_1">
                                    <div id={value?.AGREEMENTNO} className='actionSet'>
                                      <div className='spinner'></div>
                                    <select value={value.ACTION || 'empty'} 
                                    onChange={(event)=>{addAction(event.target.value, value.AGREEMENTNO, value.FILENAME), 
                                      actionLoader(value.AGREEMENTNO)}} 
                                    name="" className='form-control' >
                                      <option value='empty'>select</option>
                                      <option value='Hold'>⏸ Hold</option>
                                      <option value='Release'>📤 Release</option>
                                      <option value='In Yard'>📥 In Yard</option>
                                    </select>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* <div className="row mt-2 justify-content-between">
                      <div className="col-md-auto me-auto">
                        <div
                          className="dt-info"
                          aria-live="polite"
                          id="table-style-hover_info"
                          role="status"
                        >
                          {`showing 1 to ${onlyFileData?.length} of ${breakDownFIleData?.flat()?.length} entries`}
                        </div>
                      </div>
                      <div className="col-md-auto ms-auto">
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
                            {paginationLength?.map((value, index) => (
                              <li key={index} className="dt-paging-button page-item">
                                <button
                                  className={`page-link ${currentIndex === value ? 'active' : ''}`}
                                  aria-controls="table-style-hover"
                                  aria-current="page"
                                  data-dt-idx={0}
                                  tabIndex={0}
                                  onClick={() => setCurrentIndex(value)}
                                >
                                  {index + 1}
                                </button>
                              </li>
                            ))}
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
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ActionList