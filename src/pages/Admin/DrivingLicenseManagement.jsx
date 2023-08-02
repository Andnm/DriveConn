import React, { useContext, useEffect, useState } from 'react';

import SearchBar from "../../components/UI/SearchBar";
import { AuthContext } from "../../context/authContext";
import Pagination from "../../components/UI/Pagination";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { getAllDrivingLicenseForAdmin, confirmLicensePlate } from "../../api/drivingLicense";
import LoadingCar from '../../components/LoadingCar/LoadingCar'
import { formatDate } from '../../utils/utils';
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import Drawer from '../../components/Drawer';

const filterableFields = [
  {
    label: "License Class",
    options: [
      { value: 'A1', label: "A1" },
      { value: 'A2', label: "A2" },
      { value: 'B2', label: "B1" },
      { value: 'B2', label: "B2" },
    ],
    field: "License Class",
  },
];

const messageKey = "ADMIN_DRIVING_LICENSE_MANAGEMENT";
const itemsPerPage = 10;

const DrivingLicenseManagement = () => {
  const { currentToken } = useContext(AuthContext);
  const [drivingLicenseList, setDrivingLicenseList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [displayedImage, setDisplayedImage] = useState(null);

  useEffect(() => {
    handleSearchBar();
  }, []);

  useEffect(() => {
    handleSearchBar();
  }, [page]);

  const handleSearchBar = (criteria = {}) => {
    getAllDrivingLicenseForAdmin(currentToken).then((res) => {
      const filteredList = res.filter(item => {
        if (criteria?.filter?.field) {
          const { field, value } = criteria.filter;
          return String(item[field]) === value;
        }
        return true;
      }).filter(item => {
        if (criteria?.keyword) {
          return item.description?.toLowerCase().includes(criteria?.keyword?.toLowerCase()) || item.licensePlate?.toLowerCase().includes(criteria?.keyword?.toLowerCase());
        }
        return true;
      })
        .reverse();

      setMaxPage(filteredList.length % itemsPerPage === 0 && filteredList.length !== 0 ? filteredList.length / itemsPerPage : Math.floor(filteredList.length / itemsPerPage) + 1);

      setDrivingLicenseList(filteredList.slice(itemsPerPage * (page - 1), itemsPerPage * page));
    });
  };

  const confirmDrivingLicense = (licenseNo) => {
    confirmAlert({
      message: 'Do you want to confirm driving license this user?', buttons: [{
        label: 'Yes', onClick: () => {
          confirmLicensePlate(currentToken, licenseNo).then(res => {
            if (res) {
              toast.success("Confirm driving license successfully!");
              handleSearchBar();
            }
          }).catch(e => {
            toast.error(e.message);
          });
        },
      }, {
        label: 'No', onClick: null,
      }]
    });
  }

  const clickToViewDrivingLicenseImage = (image) => {
    setIsDrawerOpen(true);
    setDisplayedImage(image)
  }

  const getColor = (status) => {
    return status ? "text-success" : "text-danger";
  };

  const onChangePage = (page) => {
    setPage(page);
  }

  const inlineStyle = {

  }

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="pt-5"><SearchBar
      filterableFields={filterableFields}
      onSearch={handleSearchBar}
      messageKey={messageKey}
    />
      {drivingLicenseList.length > 0
        ? <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">
                  Actions
                </th>
                <th scope="col" style={{ width: '20%' }}>
                  Full name
                </th>
                <th scope="col" style={{ width: '20%' }}>
                  License Class
                </th>
                <th scope="col" style={{ width: '20%' }}>
                  License No
                </th>
                <th scope="col" style={{ width: '20%' }}>
                  Expired Date
                </th>
                <th scope="col" >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <>
                {drivingLicenseList.map((drivingLicense) => (<tr key={drivingLicense?._id}>
                  <td className="d-flex">
                    <i className="ri-image-line cursor-pointer mx-2"
                      title="Click to view image"
                      onClick={() => clickToViewDrivingLicenseImage(drivingLicense?.image)}
                    />
                    {!drivingLicense.isConfirmed
                      ? <i className="ri-check-line  cursor-pointer mx-2"
                        title="Click to confirm"
                        onClick={() => confirmDrivingLicense(drivingLicense.licenseNo)}
                      />
                      : null
                    }
                  </td>
                  <td>{(drivingLicense?.user_id?.firstName) ? (drivingLicense?.user_id?.lastName + ' ' + drivingLicense?.user_id?.firstName) : "N/A"}</td>
                  <td>{drivingLicense?.licenseClass ?? "N/A"}</td>
                  <td>{drivingLicense?.licenseNo ?? 'N/A'}</td>
                  <td>{formatDate(drivingLicense?.expireDate) ?? 'N/A'}</td>
                  <td className={getColor(drivingLicense?.isConfirmed)}>
                    {drivingLicense?.isConfirmed ? 'Confirmed' : 'Unconfirmed'}
                  </td>
                </tr>))}

              </>
            </tbody>
          </table>
          <Pagination maxPage={maxPage} onChangePage={onChangePage} />
          {isDrawerOpen && <Drawer isOpen={isDrawerOpen} toggleDrawer={handleToggleDrawer} content={displayedImage} />}

        </>
        : <LoadingCar />

      }
    </div>
  )
}

export default DrivingLicenseManagement