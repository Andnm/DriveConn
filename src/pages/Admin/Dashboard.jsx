import React, { } from 'react'
import DoughnutChart from '../../components/Admin/DashboardComponents/DoughnutChart/DoughnutCart'
import RevenueChart from '../../components/Admin/DashboardComponents/RevenueChart/RevenueChart'
import HeaderDashBoard from '../../components/Admin/DashboardComponents/HeaderDashBoard'

const Dashboard = () => {

  return (
    <div className='container w-100 h-auto d-flex flex-column gap-3'>
      <div className='row border bg-light py-3'>
        <HeaderDashBoard/>
      </div>

      <div className='row bg-light '>
        <div className="col-12 border py-3">
          <RevenueChart />
        </div>
      </div>
    </div>
  )
}

export default Dashboard