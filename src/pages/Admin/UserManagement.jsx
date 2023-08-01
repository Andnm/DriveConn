import React, { useContext, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from "react-toastify";

import SearchBar from "../../components/UI/SearchBar";
import { AuthContext } from "../../context/authContext";
import { blockUserById, deleteUserById, getUserList, upRole } from "../../api/user";
import Pagination from "../../components/UI/Pagination";
import 'react-confirm-alert/src/react-confirm-alert.css';
import LoadingCar from '../../components/LoadingCar/LoadingCar'

const filterableFields = [
    {
        label: "Status",
        options: [
            { value: true, label: "ACTIVE" },
            { value: false, label: "INACTIVE" },
        ],
        field: "status",
    },
    {
        label: "Role",
        options: [
            { value: "Owner", label: "Owner" },
            { value: "Customer", label: "Customer" },
            { value: "Hotelier", label: "Hotelier" },
        ],
        field: "role",
    },
];


const messageKey = "ADMIN_USER_MANAGEMENT";
const itemsPerPage = 10;

const UserManagement = () => {
    const { currentToken } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
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
        getUserList(currentToken).then((res) => {
            const filteredList = res
                .filter((item) => item.role_id?.roleName !== "Admin")
                .filter((item) => {
                    if (criteria?.filter?.field) {
                        const { field, value } = criteria.filter;
                        if (field === "role") {
                            return item.role_id?.roleName === value;
                        }
                        return String(item[field]) === value;
                    }
                    return true;
                })
                .filter((item) => {
                    if (criteria?.keyword) {
                        return (
                            item.email?.toLowerCase().includes(criteria?.keyword?.toLowerCase()) ||
                            `${item.lastName} ${item.firstName}`.toLowerCase().includes(criteria?.keyword.toLowerCase())
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

            setUsers(filteredList.slice(itemsPerPage * (page - 1), itemsPerPage * page));
            setIsLoading(false)
        });

    };


    const deleteUser = (userId) => {
        confirmAlert({
            message: 'Do you want to delete this user?', buttons: [{
                label: 'Yes', onClick: () => {
                    deleteUserById(currentToken, userId).then(res => {
                        if (res) {
                            toast.success("Delete user successfully!");
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

    const blockUser = (userId) => {
        confirmAlert({
            message: 'Do you want to block this user?', buttons: [{
                label: 'Yes', onClick: () => {
                    blockUserById(currentToken, userId).then(res => {
                        if (res) {
                            toast.success("Block user successfully!");
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

    const upRoleToHotelier = (userId) => {
        confirmAlert({
            message: "Do you want to up this user's role?", buttons: [{
                label: 'Yes', onClick: () => {
                    upRole(currentToken, userId).then(res => {
                        if (res) {
                            toast.success("Up role successfully!");
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

    const getColor = (status) => {
        return status ? "text-success" : "text-danger";
    };

    const onChangePage = (page) => {
        setPage(page);
    }

    return (
        <div className="pt-5">
            <SearchBar
                filterableFields={filterableFields}
                onSearch={handleSearchBar}
                messageKey={messageKey} />

            {!isLoading
                ? users.length > 0
                    ?
                    <>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: '20%' }}>
                                        Actions
                                    </th>
                                    <th scope="col" style={{ width: '20%' }}>
                                        Name
                                    </th>
                                    <th scope="col" style={{ width: '20%' }}>
                                        Role
                                    </th>
                                    <th scope="col" style={{ width: '20%' }}>
                                        Email
                                    </th>
                                    <th scope="col" >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {users.map((user) => (<tr key={user._id}>
                                        <td className="d-flex">
                                            <i className="ri-delete-bin-6-line cursor-pointer mx-2" title="Delete"
                                                onClick={() => deleteUser(user._id)}></i>

                                            {user.status ? <i className="ri-lock-line cursor-pointer mx-2" title="Block"
                                                onClick={() => blockUser(user._id)}></i> :
                                                <i className="ri-lock-unlock-line cursor-pointer mx-2" title="Unblock"></i>}

                                            {user.role_id?.roleName === 'Customer' &&
                                                <i className="ri-group-line cursor-pointer mx-2" title="Up role to Owner"
                                                    onClick={() => upRoleToHotelier(user._id)}></i>}

                                            <i className="ri-file-info-line cursor-pointer mx-2" title="Detail"></i>
                                        </td>
                                        <td
                                            className="text-truncate"
                                            title={`${user.lastName} ${user.firstName}`}
                                        >
                                            {`${user.lastName} ${user.firstName}`}
                                        </td>
                                        <td>{user.role_id?.roleName ?? 'N/A'}</td>
                                        <td
                                            className="text-truncate"
                                            title={user.email || "N/A"}
                                        >
                                            {user.email || "N/A"}
                                        </td>
                                        <td className={getColor(user.status)}>
                                            {user.status ? 'ACTIVE' : 'INACTIVE'}
                                        </td>
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
                                    <th scope="col" style={{ width: '20%' }}>
                                        Actions
                                    </th>
                                    <th scope="col" style={{ width: '20%' }}>
                                        Name
                                    </th>
                                    <th scope="col" style={{ width: '20%' }}>
                                        Role
                                    </th>
                                    <th scope="col" style={{ width: '20%' }}>
                                        Email
                                    </th>
                                    <th scope="col" >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                        </table>
                        <div className='w-100 d-flex justify-content-center'>
                            No data matching
                        </div>
                    </>
                :
                <LoadingCar />
            }

        </div>
    )
}

export default UserManagement;