import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import axios from 'axios';
import API_URL from '../../../api/Router';
import { AuthContext } from "../../../context/authContext";
import VehicleItem from '../../../components/UI/VehicleItem';
import Helmet from '../../../components/Helmet/Helmet';
import CommonSection from '../../../components/UI/CommonSection';
import './style.css'
import { toast } from 'react-toastify';
import toastOption from '../../../config/toast';
import Loading from 'react-loading';


const VehicleRegistration = () => {
  const { currentToken, userDecode } = useContext(AuthContext);
  const [listVehicle, setListVehicle] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const getVehiclesOfUser = async () => {
    try {

      // console.log(currentToken)
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      };

      const res = await axios.get(`${API_URL}/api/vehicles`, config);

      if (res.status === 200) {
        setListVehicle(res.data.reverse())
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  const editVehicleHandle = () => {
    console.log('click')
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert(`You didn't selected the file to upload`)
    } else {
      try {
        const formData = new FormData();
        formData.append('excel', file);

        console.log(formData)

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${currentToken}`,
          },
        };

        const res = await axios.post(`${API_URL}/api/vehicles/upload`, formData, config)
        if (res.status === 200 || res.status === 201) {
          toast.success('Upload file successfully!', toastOption)
          getVehiclesOfUser()
        }
      } catch (error) {
        toast.error('Upload file failed!', toastOption)
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getVehiclesOfUser()
  }, [])

  return (
    <Helmet title="Vehicles">
      <CommonSection title="Vehicle Registration" />

      <section>
        <Container>
          <Row>
            <Col lg="12" className='d-flex justify-content-between'>
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>

              <div className='upload__file d-flex'>
                <input type="file" onChange={handleFileChange} id="uploadBtn"/>
                {file?<button onClick={handleUpload} className='btn btn-outline-secondary button__upload'>Upload</button>: <></>}
              </div>
              
            </Col>

            {isLoading ? <Loading type="spin" color="#000" /> : (!listVehicle
              ? <h3>You don't have any vehicle to rent yet</h3>
              :
              <div className='d-flex flex-wrap justify-content-center gap-3'>
                {listVehicle?.length && listVehicle?.map((item) => (
                  <div className='card__item position-relative'>
                    <VehicleItem item={item} key={item.id} />
                  </div>
                ))}
              </div>
            )}

          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default VehicleRegistration