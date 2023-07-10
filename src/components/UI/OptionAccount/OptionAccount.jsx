import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import './style.css'
import { AuthContext } from "../../../context/authContext";
import ModalBox from '../../Modal/ModalBox';
import LoadingCar from '../../LoadingCar/LoadingCar'

const OptionAccount = () => {

  const { currentToken, logout, userDecode, isLoadingEvent } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [modalLogoutOpen, setModalLogoutOpen] = useState(false)

  const getTime = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 11) {
      setTitle('Chào buổi sáng!');
    } else if (currentHour >= 11 && currentHour < 13) {
      setTitle('Chào buổi trưa!');
    } else if (currentHour >= 13 && currentHour < 18) {
      setTitle('Chào buổi chiều!');
    } else if (currentHour >= 18 || currentHour < 5) {
      setTitle('Chào buổi tối!');
    } else {
      setTitle('Chào sáng sớm!')
    }

  };

  const navLinksCustomer = [
    {
      path: "/my_account",
      display: "Thông tin của tôi",
      icon: "ri-user-line"
    },
    {
      path: "/booking_history",
      display: "Lịch sử chuyến đi",
      icon: "ri-road-map-line"
    },
    {
      path: "/change_password",
      display: "Đổi mật khẩu",
      icon: "ri-lock-password-line"
    },
    {
      path: "/home",
      display: "Đăng xuất",
      icon: "ri-logout-box-line"
    },
  ];

  const navLinksBusiness= [
    {
      path: "/my_account",
      display: "Tài khoản của tôi",
      icon: "ri-user-line"
    },
    {
      path: "/create_vehicle",
      display: "Quản lý xe của tôi",
      icon: "ri-car-line"
    },
    {
      path: "/rental_history",
      display: "Lịch sử cho thuê xe",
      icon: "ri-history-line"
    },
    {
      path: "/change_password",
      display: "Đổi mật khẩu",
      icon: "ri-lock-password-line"
    },
    {
      path: "/#",
      display: "Đăng xuất",
      icon: "ri-logout-box-line"
    },
  ];

  const navLinksOwner = [
    {
      path: "/my_account",
      display: "Tài khoản của tôi",
      icon: "ri-user-line"
    },
    {
      path: "/create_vehicle",
      display: "Quản lý xe của tôi",
      icon: "ri-car-line"
    },
    {
      path: "/rental_history",
      display: "Lịch sử cho thuê xe",
      icon: "ri-history-line"
    },
    {
      path: "/change_password",
      display: "Đổi mật khẩu",
      icon: "ri-lock-password-line"
    },
    {
      path: "/#",
      display: "Đăng xuất",
      icon: "ri-logout-box-line"
    },
  ];

  const roleBasedNavLinks = {
    Customer: navLinksCustomer,
    Business: navLinksBusiness,
    Owner: navLinksOwner
  };

  const roleName = userDecode?.role_id?.roleName;
  const navLinks = roleBasedNavLinks[roleName] || [];

  useEffect(() => {
    getTime()
  }, [])

  return (
    <div className="d-flex flex-column option-account-container gap-3">
      <div className='title'>{title}</div>
      <div className='sidebar-account'>
        {navLinks.map((item, index) => {
          const LinkComponent = item.display === "Đăng xuất" ? 'div' : NavLink;
          const onClickHandler = item.display === "Đăng xuất" ? () => setModalLogoutOpen(true) : undefined;

          return (
            <LinkComponent
              to={item.path}
              key={index}
              className="link-option-account"
              onClick={onClickHandler}
            >
              <span className="bold-icon">
                <i className={item.icon}></i>
              </span>
              <div className="text-option-account">{item.display}</div>
            </LinkComponent>
          );
        })}

        {modalLogoutOpen &&
          (<ModalBox
            open={modalLogoutOpen}
            onClose={() => setModalLogoutOpen(false)}
            centerAction={false}
            title={'Đăng xuất'}
            body={'Bạn có chắc muốn đăng xuất tài khoản hay không?'}
            btnActionNo={'Hủy'}
            eventToCancel={() => setModalLogoutOpen(false)}
            btnActionYes={'Xác nhận'}
            eventToContinue={() => { setModalLogoutOpen(false); logout() }}
          />)
        }

        {isLoadingEvent && (<LoadingCar />)}
      </div>
    </div>
  )
}

export default OptionAccount