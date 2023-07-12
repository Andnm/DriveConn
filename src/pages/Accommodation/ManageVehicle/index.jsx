import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import { getVehicleListOfUser } from '../../../api/vehicle'
import { AuthContext } from '../../../context/authContext'
import VehicleLoading from '../../../components/SkeletonLoading/VehicleLoading'
import VehicleItem from '../../../components/UI/VehicleItem'
import LoadingCar from '../../../components/LoadingCar/LoadingCar'
import Pagination from '../../../components/Pagination'
import CreateVehicle from '../../../components/Vehicle/CreateVehicle'
import ModalBox from '../../../components/Modal/ModalBox'

const ManageVehicle = () => {
  const { currentToken, userDecode } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false)
  const [vehiclesList, setVehiclesList] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  //handle add vehicle
  const [radioOption, setRadioOption] = useState('Motorbike');
  const [openModalToChooseVehicle, setOpenModalToChooseVehicle] = useState(false)
  const [openModalAddVehicle, setOpenModalAddVehicle] = useState(false)


  const handleGetAllVehicleOfUser = async () => {
    setIsLoading(true)
    const response = await getVehicleListOfUser(currentToken);
    if (response) {
      setVehiclesList(response)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      console.log(response)
    }

  }

  const handleRadioChange = (e) => {
    setRadioOption(e.target.value)
  }

  useEffect(() => {
    handleGetAllVehicleOfUser()
  }, [currentPage]);

  return (
    <div className="d-flex justify-content-center flex-column manage-vehicle-container gap-3">
      <div className='title'>
        <p>Xe của tôi</p>
        <div className='action d-flex justify-content-between'>
          <div className='search'>
            <form className="form">
              <button>
                <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                  <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
              <input className="input" placeholder="Tìm gì hửm?" required="" type="text" />
              <button className="reset" type="reset">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </form>
          </div>

          <button type="button" className="button" onClick={() => setOpenModalToChooseVehicle(true)}>
            <span className="button__text">Thêm xe</span>
            <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
          </button>
        </div>
      </div>
      <div className='list-profile d-flex gap-4 justify-content-center flex-wrap'>
        {isLoading
          ?
          <LoadingCar className={'blank-container'} />
          :
          (vehiclesList && vehiclesList.length ? (
            vehiclesList
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((item, index) => (
                !item.isRented ? <VehicleItem key={index} item={item} action={'Sửa thông tin'} /> : null
              ))
          ) : (
            <h3>Bạn chưa đăng chiếc xe nào cả</h3>
          ))
        }
      </div>

      {openModalToChooseVehicle
        &&
        <ModalBox
          open={openModalToChooseVehicle}
          onClose={() => setOpenModalToChooseVehicle(false)}
          centerAction={true}
          title={'Lựa chọn kiểu xe bạn muốn đăng'}
          body={
            <div className='find-car-form-container'>
              <div className="container">
                <div className="radio-tile-group gap-3">
                  <div className="input-container" >
                    <input id="bike" className="radio-button" type="radio" value="motorbike" name="radio" onChange={handleRadioChange} defaultChecked />
                    <div className="radio-tile">
                      <div className="icon bike-icon">
                        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"></path>
                        </svg>
                      </div>
                      <label htmlFor="bike" className="radio-tile-label">Motorbike</label>
                    </div>
                  </div>

                  <div className="input-container" >
                    <input id="drive" className="radio-button" type="radio" value="car" name="radio" onChange={handleRadioChange} />
                    <div className="radio-tile">
                      <div className="icon car-icon">
                        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"></path>
                          <path d="M0 0h24v24H0z" fill="none"></path>
                        </svg>
                      </div>
                      <label htmlFor="drive" className="radio-tile-label">Car</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          btnActionNo={'Hủy'}
          eventToCancel={() => setOpenModalToChooseVehicle(false)}
          btnActionYes={'Xác nhận'}
          eventToContinue={() => { setOpenModalAddVehicle(true) }}
        />
      }

      {openModalAddVehicle
        &&
        <CreateVehicle
          open={openModalAddVehicle}
          onClose={() => setOpenModalAddVehicle(false)}
          otherFunction={() => {setOpenModalToChooseVehicle(false); handleGetAllVehicleOfUser()}}
          radioOption={radioOption}
        />
      }

      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(vehiclesList.length / itemsPerPage)}
          goToPage={setCurrentPage}
        />
      )}

    </div>
  )
}

export default ManageVehicle