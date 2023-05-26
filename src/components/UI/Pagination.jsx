import { useState, useEffect } from "react";

import {messageService} from "../../services/message";
import "../../styles/pagination.css";

function Pagination({ maxPage, onChangePage, messageKey = "DEFAULT" }) {
    const [currentPage, setCurrentPage] = useState(1);

    const acceptableChange = (page) => {
        onChangePage(page);
    };

    const onChangeCurrentPage = (isPlus) => {
        if (isPlus && currentPage < maxPage) {
            setCurrentPage(currentPage + 1);
            acceptableChange(currentPage + 1);
        } else if (!isPlus && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            acceptableChange(currentPage - 1);
        }
    };

    const onInputPage = (e) => {
        if (e.which === 13) {
            onBlurPage(e);
            e.target.blur();
        }
    };

    const onBlurPage = (e) => {
        const value = e.target.value;
        if (value <= 0) {
            setCurrentPage(1);
            acceptableChange(1);
        } else if (value > maxPage) {
            setCurrentPage(maxPage);
            acceptableChange(maxPage);
        } else {
            acceptableChange(value);
        }
    };

    useEffect(() => {
        const subscription = messageService.getMessage(messageKey).subscribe((value) => {
            if (value?.page) {
                setCurrentPage(value.page);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <div className="yard-pagination mt-4">
            <div>
        <span
            className="pagination-arrow"
            onClick={() => onChangeCurrentPage(false)}
        >
          <i className="ri-arrow-left-line"></i>
        </span>
                <span className="pagination-statistic">
          <input
              type="text"
              value={currentPage}
              onChange={(e) => setCurrentPage(e.target.value)}
              onBlur={(e) => onBlurPage(e)}
              onKeyUp={(e) => onInputPage(e)}
              className="p-0"
          />
          / {maxPage}
        </span>
                <span
                    className="pagination-arrow"
                    onClick={() => onChangeCurrentPage(true)}
                >
          <i className="ri-arrow-right-line"></i>
        </span>
            </div>
        </div>
    );
}

export default Pagination;
