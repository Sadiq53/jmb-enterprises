import React, { useEffect, useRef, useState } from 'react'
import {NavLink} from 'react-router-dom'

const Header = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the sidebar
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  // Detect if the screen is mobile size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile breakpoint, adjust as needed
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = (menu) => {
    if (isMobile) {
      setOpenSubMenu(openSubMenu === menu ? null : menu);
    }
  };


  return (
    <>
  {/* [ Pre-loader ] start */}
  <div className="loader-bg">
    <div className="loader-track">
      <div className="loader-fill" />
    </div>
  </div>
  {/* [ Pre-loader ] End */}
  
  {/* [ Sidebar Menu ] start */}
  <nav  
   ref={sidebarRef}
   className={` pc-sidebar rel ${isSidebarOpen ? 'mob-sidebar-active' : ''}`}
  id='toggle-mob'>
    <div className="navbar-wrapper">
      <div className="m-header">
        <NavLink to='/'
          className="b-brand text-primary"
        >
          {/* ========   Change your logo from here   ============ */}
          <img
            src="/assets/images/logo.png"
            alt="logo image"
            className="logo-lg width-6"
          />
          {/* <span className="badge bg-brand-color-2 rounded-pill ms-2 theme-version">
            v1.2.0
          </span> */}
        </NavLink>
      </div>
      <div className="navbar-content">
      <ul className="pc-navbar">
        <li className="pc-item pc-caption">
          <i className="ph-duotone ph-gauge" />
        </li>

        {/* Dashboard */}
        <li className="pc-item">
          <NavLink to="/" className="pc-link">
            <span className="pc-micon">
              <i className="ph-duotone ph-gauge" />
            </span>
            <span className="pc-mtext">Dashboard</span>
            <span className="pc-badge">2</span>
          </NavLink>
        </li>

        {/* Manage Members */}
        <li className={`pc-item pc-hasmenu ${openSubMenu === 'members' ? 'active' : ''}`} onClick={() => handleToggle('members')}>
          <NavLink to="#" className="pc-link">
            <span className="pc-micon">
              <img className="width-100" src="/assets/images/menu-icons/manage membwr.png" alt="Manage Members" />
            </span>
            <span className="pc-mtext">Manage Members</span>
            <span className="pc-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </NavLink>
          <ul className={`pc-submenu ${isMobile && openSubMenu === 'members' ? 'open' : ''}`}>
            <li className="pc-item">
              <NavLink className="pc-link list-flex" to="/add-members">
                <img src="/assets/images/menu-icons/add members.png" alt="Add Member" />
                Add Member
              </NavLink>
            </li>
            <li className="pc-item">
              <NavLink className="pc-link list-flex" to="/members-list">
                <img src="/assets/images/menu-icons/members list.png" alt="Members List" />
                Members List
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Manage Bank */}
        <li className={`pc-item pc-hasmenu ${openSubMenu === 'bank' ? 'active' : ''}`} onClick={() => handleToggle('bank')}>
          <NavLink to="#" className="pc-link">
            <span className="pc-micon">
              <img className="width-100" src="/assets/images/menu-icons/manage bank.png" alt="Manage Bank" />
            </span>
            <span className="pc-mtext">Manage Bank</span>
            <span className="pc-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </NavLink>
          <ul className={`pc-submenu ${isMobile && openSubMenu === 'bank' ? 'open' : ''}`}>
            <li className="pc-item">
              <NavLink className="pc-link list-flex" to="/add-bank">
                <img src="/assets/images/menu-icons/add bank.png" alt="Add Bank" />
                Add Bank
              </NavLink>
            </li>
            <li className="pc-item">
              <NavLink className="pc-link list-flex" to="/bank-list">
                <img src="/assets/images/menu-icons/bank list.png" alt="Bank List" />
                Bank List
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Manage Data */}
        <li className={`pc-item pc-hasmenu ${openSubMenu === 'data' ? 'active' : ''}`} onClick={() => handleToggle('data')}>
          <NavLink to="#" className="pc-link">
            <span className="pc-micon">
              <img className="width-100" src="/assets/images/menu-icons/manage data.png" alt="Manage Data" />
            </span>
            <span className="pc-mtext">Manage Data</span>
            <span className="pc-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </NavLink>
          <ul className={`pc-submenu ${isMobile && openSubMenu === 'data' ? 'open' : ''}`}>
            <li className="pc-item">
              <NavLink className="pc-link list-flex" to="/add-data">
                <img src="/assets/images/menu-icons/Add data.png" alt="Add Data" />
                Add Data
              </NavLink>
            </li>
            <li className="pc-item">
              <NavLink className="pc-link list-flex" to="/data-list">
                <img src="/assets/images/menu-icons/data list.png" alt="Data List" />
                Data List
              </NavLink>
            </li>
            <li className="pc-item">
              <NavLink className="pc-link list-flex" to="/manage-tags">
                <img src="/assets/images/menu-icons/manage dashboard tags.png" alt="Manage Dashboard Tags" />
                Manage Dashboard Tags
              </NavLink>
            </li>
            <li className="pc-item">
              <NavLink className="pc-link list-flex" to="/delete-data">
                <img src="/assets/images/menu-icons/delete data.png" alt="Delete Data" />
                Delete Data
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Manage Location */}
        <li className={`pc-item pc-hasmenu ${openSubMenu === 'location' ? 'active' : ''}`} onClick={() => handleToggle('location')}>
          <NavLink to="#" className="pc-link">
            <span className="pc-micon">
              <img className="width-100" src="/assets/images/menu-icons/location.png" alt="Manage Location" />
            </span>
            <span className="pc-mtext">Manage Location</span>
            <span className="pc-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </NavLink>
          <ul className={`pc-submenu ${isMobile && openSubMenu === 'location' ? 'open' : ''}`}>
            <li className="pc-item">
              <NavLink className="pc-link list-flex" to="/members-list">
                <img src="/assets/images/menu-icons/members list.png" alt="Members List" />
                Members List
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    </div>
  </nav>
  {/* [ Sidebar Menu ] end */}




  {/* [ Header Topbar ] start */}
  <header className="pc-header abs">
    <div className="header-wrapper">
      {" "}
      {/* [Mobile Media Block] start */}
      <div className="me-auto pc-mob-drp">
        <ul className="list-unstyled">
          {/* ======= Menu collapse Icon ===== */}
          <li className="pc-h-item pc-sidebar-collapse">
            <button  className="pc-head-link ms-0"  id="sidebar-hide">
              <i className="ti ti-menu-2" />
            </button>
          </li>
          <li className="pc-h-item pc-sidebar-popup">
            <button  className="pc-head-link ms-0" onClick={() => setIsSidebarOpen(true)} id="mobile-collapse">
              <i className="ti ti-menu-2" />
            </button>
          </li>
        </ul>
      </div>
      {/* [Mobile Media Block end] */}
      
    </div>
  </header>
  {/* [ Header ] end */}
</>

  )
}

export default Header