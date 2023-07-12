import React, { useState, useEffect, useContext, useCallback } from 'react'
import { AuthContext } from '../../../context/authContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoadingCar from '../../LoadingCar/LoadingCar';
import ModalBox from '../../Modal/ModalBox';
import { getAllCarAutomaker, getAllMotorbikeAutomaker } from '../../../api/automaker';
import { getAllCarCategories, getAllMotorbikeCategories } from '../../../api/category';
import { getAllCarModels, getAllMotorbikeModels } from '../../../api/model';
import { facilitiesServices } from '../../../assets/data/facilities';
import MultiSelect from 'multiselect-react-dropdown';

import './style.css'
import { registerCar } from '../../../api/car';
import { registerMotorbike } from '../../../api/motorbike';
import { storage } from '../../../config/configFirebase';
import { toast } from 'react-toastify';
import toastOption from '../../../config/toast';
import { generateFileNameImage } from '../../../utils/utils';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreateVehicle = (props) => {

  const { open, onClose, otherFunction, radioOption } = props

  const { currentToken } = useContext(AuthContext);

  const [carAutoMakerList, setCarAutoMakeList] = useState([])
  const [carCategoryList, setCarCategoryList] = useState([])
  const [carModelList, setCarModelList] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [preImgLoad, setPreImgLoad] = useState('')
  const [imageLoad, setImageLoad] = useState('')

  const [openModalWarningCancel, setOpenModalWarningCancel] = useState(false)

  const [dataCar, setDataCar] = useState({
    licensePlate: "",
    description: "",
    autoMaker: "",
    model: "",
    insurance: true,
    fuel: "",
    category: "",
    transmission: "",
    yearOfManufacturer: "",
    price: "",
    otherFacilities: "",
    images: [],
    mortgage: false
  })
  
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const handleFacilitiesChange = (selectedList, selectedItem) => {
    const facilityIds = selectedList.map((item) => item.id);
    setDataCar((prevData) => ({
      ...prevData,
      otherFacilities: facilityIds
    }));
    setSelectedFacilities(selectedList);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (radioOption === 'car') {
          const responseAutomaker = await getAllCarAutomaker(currentToken);
          setCarAutoMakeList(responseAutomaker.data)

          const responseCategory = await getAllCarCategories(currentToken);
          setCarCategoryList(responseCategory.data)

          const responseModel = await getAllCarModels(currentToken);
          setCarModelList(responseModel.data)
        } else {
          const responseAutomaker = await getAllMotorbikeAutomaker(currentToken);
          setCarAutoMakeList(responseAutomaker.data)

          const responseCategory = await getAllMotorbikeCategories(currentToken);
          setCarCategoryList(responseCategory.data)

          const responseModel = await getAllMotorbikeModels(currentToken);
          setCarModelList(responseModel.data)
        }


      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentToken, radioOption]);

  //years
  const currentYear = new Date().getFullYear();
  const startYear = 1900;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => currentYear - index);

  //handle api add vehicle

  const handleRemoveImage = () => {
    setPreImgLoad('')
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    setImageLoad(event.target.files[0])

    reader.onload = (e) => {
      setPreImgLoad(e.target.result);
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  };

  const handleSubmit = () => {
    setIsLoading(true)
    const fileName = generateFileNameImage();
    const imageRef = ref(storage, fileName);
    uploadBytes(imageRef, imageLoad)
      .then(() => {
        getDownloadURL(imageRef)
          .then(async (url) => {

            if (radioOption === 'car') {
              const response = await registerCar(currentToken, dataCar, url);

              if (response.status === 200 || response.status === 201) {
                toast.success('Đăng xe ô tô thành công!', toastOption)
              } else {
                toast.error('Đã có lỗi xảy ra. Vui lòng thử lại sau!', toastOption)
              }
            } else {
              const response = await registerMotorbike(currentToken, dataCar, url);

              if (response.status === 200 || response.status === 201) {
                toast.success('Đăng xe máy thành công!', toastOption)
              } else {
                toast.error('Đã có lỗi xảy ra. Vui lòng thử lại sau!', toastOption)
              }
            }

            setDataCar({
              licensePlate: "",
              description: "",
              autoMaker: "",
              model: "",
              insurance: true,
              fuel: "",
              category: "",
              transmission: "",
              yearOfManufacturer: "",
              price: "",
              otherFacilities: "",
              images: [],
              mortgage: false
            })
            setPreImgLoad(null);
            setIsLoading(false)
            onClose()
            otherFunction()
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });

      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleWarningClose = () => {
    for (const key in dataCar) {
      if (dataCar.hasOwnProperty(key) && dataCar[key] === "") {
        setOpenModalWarningCancel(true);
        return;
      }
    }
  }

  return (
    <Modal show={open} onHide={handleWarningClose} centered={true} size="xl">
      <Modal.Header closeButton>
        <Modal.Title >
          Thêm xe
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="create-vehicle-body">
          <div className="left-section">
            <div>
              <label>License Plate:</label>
              <input
                className='input'
                type="text"
                value={dataCar.licensePlate}
                onChange={(e) =>
                  setDataCar((prevData) => ({
                    ...prevData,
                    licensePlate: e.target.value
                  }))
                }
              />
            </div>

            <div>
              <label>Description:</label>
              <textarea
                value={dataCar.description}
                onChange={(e) =>
                  setDataCar((prevData) => ({
                    ...prevData,
                    description: e.target.value
                  }))
                }
              />
            </div>

            <div>
              <label>Price:</label>
              <input
                className='input'
                type="number"
                value={dataCar.price}
                onChange={(e) =>
                  setDataCar((prevData) => ({
                    ...prevData,
                    price: e.target.value
                  }))
                }
              />
            </div>

            <div>
              <label>Auto Maker:</label>
              <select
                value={dataCar.autoMaker}
                onChange={(e) =>
                  setDataCar((prevData) => ({
                    ...prevData,
                    autoMaker: e.target.value
                  }))
                }
              >
                <option value="">Select Auto Maker</option>
                {carAutoMakerList.map((maker) => (
                  <option key={maker.id} value={maker.name}>
                    {maker.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Model:</label>
              <select
                value={dataCar.model}
                onChange={(e) =>
                  setDataCar((prevData) => ({
                    ...prevData,
                    model: e.target.value
                  }))
                }
              >
                <option value="">Select Model</option>
                {carModelList.map((model) => (
                  <option key={model.id} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Fuel:</label>
              <select
                value={dataCar.fuel}
                onChange={(e) =>
                  setDataCar((prevData) => ({
                    ...prevData,
                    fuel: e.target.value
                  }))
                }
              >
                <option value="">Select Fuel</option>
                <option value="Gas">Gas</option>
                <option value="Oil">Oil</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

          </div>

          <div className="right-section">

            <div>
              <label>Category:</label>
              <select
                value={dataCar.category}
                onChange={(e) =>
                  setDataCar((prevData) => ({
                    ...prevData,
                    category: e.target.value
                  }))
                }
              >
                <option value="">Select Category</option>
                {carCategoryList.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {radioOption === 'car'
              &&
              <div>
                <label>Transmission:</label>
                <select
                  value={dataCar.transmission}
                  onChange={(e) =>
                    setDataCar((prevData) => ({
                      ...prevData,
                      transmission: e.target.value
                    }))
                  }
                >
                  <option value="">Select Transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            }

            <div>
              <label>Year of Manufacturer:</label>
              <select
                value={dataCar.yearOfManufacturer}
                onChange={(e) =>
                  setDataCar((prevData) => ({
                    ...prevData,
                    yearOfManufacturer: e.target.value
                  }))
                }
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className='multi-select'>
              <label>Other Facilities:</label>
              <MultiSelect
                options={facilitiesServices}
                selectedValues={selectedFacilities}
                onSelect={handleFacilitiesChange}
                onRemove={handleFacilitiesChange}
                displayValue="name"
                showCheckbox={true}
                closeOnSelect={false}
                placeholder="Select Facilities"
              />
            </div>

            <div>
              <label>Images:</label>
              <div className='upload-image-box'>
                <div className='d-flex justify-content-center align-items-center flex-column'>
                  <div className="custom-file-upload">
                    {!preImgLoad
                      ?
                      <label htmlFor="file">
                        <div className="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
                        </div>
                        <div className="text">
                          <span>Bấm vào đây để đăng ảnh</span>
                        </div>
                        <input type="file" id="file" onChange={handleImageChange} />
                      </label>
                      :
                      <div className='img-upload'>
                        <div className='remove-img d-flex justify-content-center align-items-center' onClick={handleRemoveImage}>X</div>
                        <img src={preImgLoad} alt="picture"></img>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {openModalWarningCancel &&
          <ModalBox
            open={openModalWarningCancel}
            onClose={() => setOpenModalWarningCancel(false)}
            centerAction={true}
            title={'Bỏ thay đổi'}
            body={'Bạn có chắc chắn muốn bỏ các thay đổi không?'}
            btnActionNo={'Hủy'}
            eventToCancel={() => setOpenModalWarningCancel(false)}
            btnActionYes={'Xác nhận'}
            eventToContinue={onClose}
            styleModal={'cancel-modal-update-avatar'}
          />
        }

        {isLoading && <LoadingCar background={true} />}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Thêm xe
        </Button>

      </Modal.Footer>
    </Modal>
  )
}

export default CreateVehicle