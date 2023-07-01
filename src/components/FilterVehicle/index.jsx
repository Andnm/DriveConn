import React from 'react'
import './style.css'

const FilterVehicle = ({ selectedFilter, setSelectedFilter }) => {

    const linksFilter = [
        {
            label: "Tất cả",
            imgSrc: "ri-server-line"
        },
        {
            label: "Xe máy",
            imgSrc: "ri-motorbike-line"
        },
        {
            label: "Ô tô",
            imgSrc: "ri-taxi-line"
        },
        {
            label: "Miễn thế chấp",
            imgSrc: "ri-bank-card-line"
        },
        {
            label: "Bảo hiểm",
            imgSrc: "ri-shield-user-line"
        },
        {
            label: "Loại xe",
            imgSrc: "ri-caravan-line"
        },
        {
            label: "Hãng xe",
            imgSrc: "ri-global-line"
        },
        {
            label: "Truyền động",
            imgSrc: "ri-sound-module-fill"
        },
        {
            label: "Nhiên liệu",
            imgSrc: "ri-oil-line"
        },
    ]

    return (
        <div className="filter-div">
            {linksFilter.map((item, i) => (
                <div
                    key={i}
                    className={`links-box ${i == selectedFilter && "selected-box"}`}
                    onClick={() => {
                        setSelectedFilter(i);
                    }}
                >
                    <i className={item.imgSrc} />
                    <p
                        className={`links-label ${i == selectedFilter && "selected-label"}`}
                    >
                        {item.label}
                    </p>
                </div>
            ))}

            <button className='btn btn-secondary d-flex gap-2'>
                <i className="ri-equalizer-line"></i>
                <p>Bộ lọc</p>
            </button>
        </div>
    );
}

export default FilterVehicle;