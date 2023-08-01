import React, { useContext, useEffect, useState } from 'react';

import SearchBar from "../../components/UI/SearchBar";
import { AuthContext } from "../../context/authContext";
import Pagination from "../../components/UI/Pagination";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { getVehicleList } from "../../api/vehicle";
import LoadingCar from '../../components/LoadingCar/LoadingCar'

const filterableFields = [
    {
        label: "Type vehicle",
        options: [
            { value: 'Motorbike', label: "Motorbike" },
            { value: 'Car', label: "Car" },
        ],
        field: "transmission", 
    },
    {
        label: "Automaker",
        options: [
            { value: "Honda", label: "Honda" },
            { value: "Yamaha", label: "Yamaha" },
        ],
        field: "autoMaker_id.name", 
    },
    {
        label: "Category",
        options: [
            { value: "Sedan", label: "Sedan" },
            { value: "Automatic transmission", label: "Automatic transmission" },
        ],
        field: "category_id.name", 
    },
];


const messageKey = "ADMIN_VEHICLE_MANAGEMENT";
const itemsPerPage = 10;

const VehicleManagement = () => {
    const { currentToken } = useContext(AuthContext);
    const [vehicles, setVehicles] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        handleSearchBar();
    }, []);

    useEffect(() => {
        handleSearchBar();
    }, [page]);

    const handleSearchBar = (criteria = {}) => {
        setIsLoading(true)
        getVehicleList(currentToken).then((res) => {
            const filteredList = res
                .filter((item) => {
                    if (criteria?.filter?.field) {
                        const { field, value } = criteria.filter;
                        return field === "type vehicle"
                            ? item.transmission === (value === "Car" ? true : false)
                            : String(item[field]) === value;
                    }
                    return true;
                })
                .filter((item) => {
                    if (criteria?.keyword) {
                        return (
                            item.description?.toLowerCase().includes(criteria?.keyword?.toLowerCase()) ||
                            item.licensePlate?.toLowerCase().includes(criteria?.keyword?.toLowerCase())
                        );
                    }
                    return true;
                })
                .reverse();

            setMaxPage(
                filteredList.length % itemsPerPage === 0 && filteredList.length !== 0
                    ? filteredList.length / itemsPerPage
                    : Math.floor(filteredList.length / itemsPerPage) + 1
            );
            setVehicles(filteredList.slice(itemsPerPage * (page - 1), itemsPerPage * page));
            setIsLoading(false)
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
        <div className="pt-5">
            <SearchBar
                filterableFields={filterableFields}
                onSearch={(criteria) => handleSearchBar(criteria)}
                messageKey={messageKey}
            />
            {!isLoading
                ? vehicles.length > 0
                    ?
                    <>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        Actions
                                    </th>
                                    <th scope="col">
                                        Type Vehicle
                                    </th>
                                    <th scope="col">
                                        Automaker
                                    </th>
                                    <th scope="col">
                                        Model
                                    </th>
                                    <th scope="col">
                                        Category
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
                                        <td className="d-flex">
                                            <i className="ri-file-info-line cursor-pointer mx-2" title="Detail">
                                            </i>
                                        </td>
                                        {console.log(vehicle)}
                                        <td>{vehicle.transmission ? 'Car' : 'Motorbike'}</td>
                                        <td>{vehicle.autoMaker_id.name ?? "N/A"}</td>
                                        <td>{vehicle.model_id.name ?? 'N/A'}</td>
                                        <td>{vehicle.category_id.name ?? 'N/A'}</td>
                                        <td>{vehicle.vehicle_id.licensePlate ?? 'N/A'}</td>
                                        <td>{vehicle.vehicle_id.user_id?.lastName} {vehicle.vehicle_id.user_id?.firstName}</td>
                                    </tr>))}
                                </>
                            </tbody>
                        </table>
                        <Pagination maxPage={maxPage} onChangePage={onChangePage} />
                    </>
                    :
                    <>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        Actions
                                    </th>
                                    <th scope="col">
                                        Type Vehicle
                                    </th>
                                    <th scope="col">
                                        Automaker
                                    </th>
                                    <th scope="col">
                                        Model
                                    </th>
                                    <th scope="col">
                                        Category
                                    </th>
                                    <th scope="col">
                                        License plate
                                    </th>
                                    <th scope="col" style={{ width: '20%' }}>
                                        Owner
                                    </th>
                                </tr>
                            </thead>
                        </table>
                        <div className='w-100 d-flex justify-content-center'>
                            No data matching
                        </div>
                    </>
                : <LoadingCar />
            }
        </div>
    )
}

export default VehicleManagement;