import React, { useContext, useEffect, useState } from 'react';

import SearchBar from "../../components/UI/SearchBar";
import { AuthContext } from "../../context/authContext";
import Pagination from "../../components/UI/Pagination";
import 'react-confirm-alert/src/react-confirm-alert.css';
import empty from "../../assets/all-images/empty.png";
import { getVehicleList } from "../../api/vehicle";
import LoadingCar from '../../components/LoadingCar/LoadingCar'

const filterableFields = [];

const messageKey = "ADMIN_VEHICLE_MANAGEMENT";
const itemsPerPage = 10;

const VehicleManagement = () => {
    const { currentvehicle } = useContext(AuthContext);
    const [vehicles, setVehicles] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        handleSearchBar();
    }, []);

    useEffect(() => {
        handleSearchBar();
    }, [page]);

    const handleSearchBar = (criteria = {}) => {
        getVehicleList(currentvehicle).then((res) => {          
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

            setVehicles(filteredList.slice(itemsPerPage * (page - 1), itemsPerPage * page));
        });
    };

    const getColor = (status) => {
        return status ? "text-success" : "text-danger";
    };

    const onChangePage = (page) => {
        setPage(page);
    }

    const inlineStyle = {
        
    }

    return (
        <div className="pt-5"><SearchBar
            filterableFields={filterableFields}
            onSearch={handleSearchBar}
            messageKey={messageKey}
        />
            {vehicles.length > 0
                ? <>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: '20%' }}>
                                    Description
                                </th>
                                <th scope="col">
                                    Insurance
                                </th>
                                <th scope="col">
                                    License plate
                                </th>
                                <th scope="col" style={{ width: '20%' }}>
                                    Owner
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <>
                                {vehicles.map((vehicle) => (<tr key={vehicle._id}>
                                    <td>
                                        {vehicle.description ?? "N/A"}
                                    </td>
                                    <td>{vehicle.insurance ?? 'N/A'}</td>
                                    <td>{vehicle.licensePlate ?? 'N/A'}</td>
                                    <td>{`${vehicle.user_id?.firstName} ${vehicle.user_id?.lastName}`}</td>
                                </tr>))}
                            </>
                        </tbody>
                    </table>
                    <Pagination maxPage={maxPage} onChangePage={onChangePage} />
                </>
                : <LoadingCar />
         
            }
        </div>
    )
}

export default VehicleManagement;