const copy = require('clipboard-copy');

export const copyLink = ({ url }) => {
  copy(`http://localhost:3000${url}`);
  return true;
};

export const reserveFn = () => {

};
