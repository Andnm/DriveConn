import moment from "moment";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const formatDate = (dateString) => {
  const desiredFormat = "DD/MM/YYYY";
  const currentFormat = moment(dateString, [desiredFormat], true).format();

  if (moment(currentFormat).isValid()) {
    return dateString;
  } else {
    const formattedDate = moment(dateString).format(desiredFormat);
    return formattedDate;
  }
};

const formatToDateType = (dateString) => {
  const [day, month, year] = dateString.split('/');
  const formattedDate = new Date(`${year}-${month}-${day}`);
  return formattedDate.toDateString(); 
}

const formatPrice = (price) => {
  if (price >= 1000000) {
    return (price / 1000).toFixed(0);
  } else if (price >= 1000) {
    return (price / 1000).toFixed(0);
  } else {
    return price.toString();
  }
};

const formatVNDateForm = (dateString) => {
  const formattedDateTime = moment(dateString).format("HH:mm, DD/MM/YYYY");
  return formattedDateTime;
};

const formatPriceNumber = (price) => {
  const parts = price.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

//------------Handle Image With Firebase--------------
const generateFileNameImage = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  const fileName = `image_${hours}${minutes}${seconds}_${day}${month}${year}`;
  return fileName;
};

const splitFullName = (fullName) => {
  const nameArray = fullName.trim().split(" ");

  let lastName = "";
  let firstName = "";

  if (nameArray.length > 2) {
    lastName = nameArray.slice(0, 2).join(" ");
    firstName = nameArray.slice(2, nameArray.length).join(" ");
  } else if (nameArray.length === 1 || nameArray.length === 2) {
    lastName = " ";
    firstName = fullName;
  }

  return { lastName, firstName };
};

//----------handle color status
const getBookingStatusColor = (status) =>{
  switch (status) {
    case 'Pending':
      return { color: 'var(--pending-color)', text: 'Chờ phản hồi từ chủ xe' };
    case 'Paying':
      return { color: 'var(--paying-color)', text: 'Chờ thanh toán' };
    case 'Processing':
      return { color: 'var(--processing-color)', text: 'Đang xử lý giao dịch' };
    case 'Delivering':
      return { color: 'var(--delivering-color)', text: 'Chờ bàn giao xe' };
    case 'Delivered':
      return { color: 'var(--delivered-color)', text: 'Đã bàn giao xe xong' };
    case 'Completed':
      return { color: 'var(--completed-color)', text: 'Đã hoàn thành' };
    case 'Done':
      return { color: 'var(--done-color)', text: 'Đã kết thúc' };
    case 'Cancelled':
      return { color: 'var(--cancelled-color)', text: 'Đã hủy' };
    default:
      return { color: '', text: '' };
  }
}

const getCircleColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'var(--pending-color)';
    case 'Paying':
      return 'var(--paying-color)';
    case 'Processing':
      return 'var(--processing-color)';
    case 'Delivering':
      return 'var(--delivering-color)';
    case 'Delivered':
      return 'var(--delivered-color)';
    case 'Completed':
      return 'var(--completed-color)';
    case 'Cancelled':
      return 'var(--cancelled-color)';
    case 'Done':
      return 'var(--done-color)';
    default:
      return '';
  }
}

const distanceDate = (dateStart, dateEnd) => {
  const date1Obj = new Date(dateStart);
  const date2Obj = new Date(dateEnd);

  const distance = Math.abs((date2Obj - date1Obj) / (1000 * 60 * 60 * 24));
  const roundedDistance = Math.round(distance);

  return roundedDistance;
};

//-----------handle upload image

//------------get last messages
const getLastMessages = (inputString) => {
  if (inputString.length > 20) {
    return inputString.substring(0, 20) + '...';
  } else {
    return inputString;
  }
}

export {
  validateEmail,
  formatToDateType,
  formatDate,
  generateFileNameImage,
  splitFullName,
  formatPrice,
  formatPriceNumber,
  formatVNDateForm,
  getCircleColor,
  getBookingStatusColor,
  distanceDate,
  getLastMessages
};
