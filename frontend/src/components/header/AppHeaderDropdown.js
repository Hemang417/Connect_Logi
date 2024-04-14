import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import '../../css/styles.css'
import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {

  const [allBranches, setallBranches] = useState([]);
  const FetchAllBranches = async () => {
    try {
      const branches = await axios.get('http://localhost:5000/getAllBranches', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode'),
          username: localStorage.getItem('username')
        }
      });
      setallBranches(branches.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchAllBranches();
  }, []);


  const handleBranchSelection = (branch) => {
    // Update localStorage with the selected branch's details
    localStorage.setItem('branchnameofemp', branch.ownbranchname);
    localStorage.setItem('branchcodeofemp', branch.branchcode);
    FetchAllBranches();
  }


  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">

        <CDropdownHeader className="bg-light fw-semibold py-2">Branches</CDropdownHeader>

        {allBranches && allBranches.map((item, index) => {
          // Check if the current item's ownbranchname matches the branchname stored in localStorage
          const isSelectedBranch = localStorage.getItem('branchnameofemp') === item.ownbranchname;

          // Define a CSS class based on the condition
          const className = isSelectedBranch ? 'selected-branch' : 'allbranches';

          return (
            <CDropdownItem key={index} className={className} onClick={() => handleBranchSelection(item)}>
              {item.ownbranchname}
            </CDropdownItem>
          );
        })}


        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
