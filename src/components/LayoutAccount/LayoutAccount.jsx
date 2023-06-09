import React from 'react'
import { Outlet } from "react-router-dom";
import OptionAccount from '../UI/OptionAccount/OptionAccount'
import { Container } from 'reactstrap';
import './style.css'

const LayoutAccount = () => {
  return (
    <Container className='mt-5 mb-5 d-flex gap-3'>
      <OptionAccount className='feature-option-container'/>
      <div className='separate-line-line-layout-account'></div>
      <div className='content-option-container'>
        <Outlet />
      </div>
    </Container>
  )
}

export default LayoutAccount