import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import { getVehicleListOfUser } from '../../../api/vehicle'
import { AuthContext } from '../../../context/authContext'
import VehicleLoading from '../../../components/SkeletonLoading/VehicleLoading'
import VehicleItem from '../../../components/UI/VehicleItem'
import LoadingCar from '../../../components/LoadingCar/LoadingCar'

const CreateVehicle = () => {

  const { currentToken, userDecode } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false)
  const [vehiclesList, setVehiclesList] = useState([])

  const handleGetAllVehicleOfUser = async () => {
    setIsLoading(true)
    const response = await getVehicleListOfUser(currentToken);
    if (response) {
      setVehiclesList(response)
      setIsLoading(false)
    }else {
      setIsLoading(false)
      console.log(response)
    }
  }

  useEffect(() => {
    handleGetAllVehicleOfUser()
  }, []);

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

          <button type="button" className="button">
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
            vehiclesList.map((item) => (
              !item.isRented ? <VehicleItem item={item} action={'Sửa thông tin'} /> : null
            ))
          ) : (
            <h3>Bạn chưa đăng chiếc xe nào cả</h3>
          ))
        }
      </div>
    </div>
  )
}

export default CreateVehicle