import moment from 'moment';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const formatDate = (dateString) => {
  const formattedDate = moment(dateString).format('DD/MM/YYYY');
  return formattedDate;
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
    lastName = " "
    firstName = fullName;
  }

  return { lastName, firstName };
};

export { validateEmail, formatDate, generateFileNameImage, splitFullName};
