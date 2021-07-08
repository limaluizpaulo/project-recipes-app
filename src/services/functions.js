const copy = require('clipboard-copy');

export const copyLink = ({ url }) => {
  copy(`http://localhost:3000${url}`);
  return true;
};

export const verifyCheck = (index, check) => {
  if (check) {
    return check[index];
  }
  return false;
};
