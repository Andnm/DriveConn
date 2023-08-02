import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/authContext';
import { formatDate } from '../../../utils/utils'
import { getUserProfileById } from '../../../api/user';

const OwnerInfo = (props) => {
    const { user_id, vehicle_id } = props.data;
    const { userDecode, currentToken } = useContext(AuthContext);

    const [ownerProfile, setOwnerProfile] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfileById(currentToken, vehicle_id.user_id);
                console.log(response);
                setOwnerProfile(response);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [props]);

    return (
        <div className='booking-detail-container d-flex flex-column gap-4 mt-4'>

            <div className='customer-profile'>
                <h4>Owner</h4>
                <div className='customer-info-drawer d-flex gap-3 align-items-center' style={{ paddingLeft: "20px" }}>
                    <img src={ownerProfile.imgURL} alt='Customer' />
                    <p style={{ fontSize: '25px' }}>{ownerProfile.lastName + ' ' + ownerProfile.firstName}</p>
                </div>

                <div className='time mt-2'>
                    <div className='time-detail d-flex align-items-start gap-5'>
                        <div className="d-flex flex-column">
                            <p>Email:</p>
                            <p>Phone:</p>
                            <p>Gender:</p>
                            <p>Birthday:</p>
                            <p>Address:</p>
                        </div>
                        <div className="d-flex flex-column">
                            <p>{ownerProfile.email ? ownerProfile.email : '(User not updated)'}</p>
                            <p>{ownerProfile.phone ? ownerProfile.phone : '(User not updated)'}</p>
                            <p>{ownerProfile.gender ? ownerProfile.gender : '(User not updated)'}</p>
                            <p>{ownerProfile.dob ? formatDate(ownerProfile.dob) : '(User not updated)'}</p>
                            <p>{ownerProfile.address ? ownerProfile.address : '(User not updated)'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerInfo;
