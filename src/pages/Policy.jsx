import React, { useState } from 'react'
import { Container } from "reactstrap";
import policyData from "../assets/data/policyData"
import parse from "html-react-parser"
import "../styles/policy.css"

const Policy = () => {
  const [selectedContent, setSelectedContent] = useState(policyData[0]);

  const navLinks = [
    {
      id: 1,
      display: "TERM OF USE",
    },
    {
      id: 2,
      display: "FEE POLICY",
    },
    {
      id: 3,
      display: "TERM & CONDITIONS",
    },
    {
      id: 4,
      display: "DAMAGE POLICY",
    },
    {
      id: 5,
      display: "PRIVARY POLICY",
    },
  ];

  const getPolicyData = (policyData, id) => {
    let position = 0;
    policyData.map((item, key) => {
      if (item.id === id) {
        position = key;
      }
    });
    return policyData[position];
  }

  const removeActive = (className,key) => {
    const itemList = document.querySelectorAll(`.${className}`)
    Array.from(itemList).map((item,itemKey) => {
      if(itemKey === key){
        item?.classList.add("policy_active")
      }else{
        item?.classList.remove("policy_active")
      }
    })
  }

  const handleChangeAction = (className,item,key) => {
    setSelectedContent(getPolicyData(policyData, item.id));
    removeActive(className,key);
  }

  return (
    <Container>
      <div className="menu d-flex justify-content-around m-3 p-2 border-top border-bottom border-2 border-dark">
        {navLinks.map((item, key) => (
          <div className={`policy_item text-uppercase fw-bold p-2 ${key === 0 ? " policy_active" : ''}`}   key = {key} onClick={() => handleChangeAction("policy_item",item,key)}>
            {item.display}
          </div>
        ))}
      </div>
      <div className='text-center fw-bold fs-3 text-uppercase m-4'>{selectedContent.title}</div>
      <div className="policy_content">{parse(selectedContent.content)}</div>
    </Container>
  )
}

export default Policy