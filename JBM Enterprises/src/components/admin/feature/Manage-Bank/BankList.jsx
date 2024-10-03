import React, { useEffect, useState } from 'react'
import Header from '../../shared/Header/Header'
import {useSelector} from 'react-redux'
import DeleteBankModal from './DeleteBankModal';

const BankList = () => {

  const [finalData, setFinalData] = useState([]);
  const [bankInfo, setBankInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const bankData = useSelector(state => state.AdminDataSlice?.bank);
  const findMember = (query) => {
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      setFinalData(
        bankData?.filter((value) =>
          value.bank.toLowerCase().includes(lowercasedQuery)
        )
      );
    } else {
      setFinalData(bankData); // Reset to original data if query is empty
    }
  };

  const showPopUp = () => {
    document.getElementById("deleteModal").classList.add('show')
  }

  const handleSearchChange  = (event) =>{
    setSearchQuery(event);
    findMember(event);
  }

  useEffect(()=>{
    setFinalData(bankData)
  }, [bankData])
  

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
        <div className="row mt-2 justify-content-between">
          <div className="col-md-auto me-auto ">
            {/* <div className="dt-length">
              <select
                name="table-style-hover_length"
                aria-controls="table-style-hover"
                className="form-select form-select-sm"
                id="dt-length-3"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <label htmlFor="dt-length-3"> entries per page</label>
            </div> */}
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
                onChange={(event)=>{handleSearchChange (event.target.value)}}
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
              {/* <colgroup>
                <col style={{ width: "164.646px" }} />
                <col style={{ width: "238.385px" }} />
                <col style={{ width: "128.594px" }} />
                <col style={{ width: "77.2708px" }} />
                <col style={{ width: "134.375px" }} />
                <col style={{ width: "108.062px" }} />
              </colgroup> */}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Bank Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  finalData?.map((value, index) => (
                    <tr key={index}>
                      <td className="sorting_1">{index+1}</td>
                      <td>{value?.bank}</td>
                      <td className="dt-type-numeric"><button className='btn btn-sm btn-danger' onClick={()=>{setBankInfo(value), showPopUp()}} type='button'><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                  </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="row mt-2 justify-content-between">
          <div className="col-md-auto me-auto ">
            <div
              className="dt-info"
              aria-live="polite"
              id="table-style-hover_info"
              role="status"
            >
              Showing 1 to 10 of 30 entries
            </div>
          </div>
          <div className="col-md-auto ms-auto ">
            <div className="dt-paging paging_full_numbers">
              <ul className="pagination">
                <li className="dt-paging-button page-item disabled">
                  <a
                    className="page-link first"
                    aria-controls="table-style-hover"
                    aria-disabled="true"
                    aria-label="First"
                    data-dt-idx="first"
                    tabIndex={-1}
                  >
                    «
                  </a>
                </li>
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
                <li className="dt-paging-button page-item active">
                  <a
                    href="#"
                    className="page-link"
                    aria-controls="table-style-hover"
                    aria-current="page"
                    data-dt-idx={0}
                    tabIndex={0}
                  >
                    1
                  </a>
                </li>
                <li className="dt-paging-button page-item">
                  <a
                    href="#"
                    className="page-link"
                    aria-controls="table-style-hover"
                    data-dt-idx={1}
                    tabIndex={0}
                  >
                    2
                  </a>
                </li>
                <li className="dt-paging-button page-item">
                  <a
                    href="#"
                    className="page-link"
                    aria-controls="table-style-hover"
                    data-dt-idx={2}
                    tabIndex={0}
                  >
                    3
                  </a>
                </li>
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
                <li className="dt-paging-button page-item">
                  <a
                    href="#"
                    className="page-link last"
                    aria-controls="table-style-hover"
                    aria-label="Last"
                    data-dt-idx="last"
                    tabIndex={0}
                  >
                    »
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

      <DeleteBankModal props={bankInfo} />

    </>
  )
}

export default BankList