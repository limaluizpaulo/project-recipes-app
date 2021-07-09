const copy = require('clipboard-copy');

export const copyLink = ({ url }) => {
  copy(`http://localhost:3000${url}`);
  return true;
};

export const copyLinkInProgress = ({ url }) => {
  const splittedURL = url.split('/');
  const urlNoProgress = `/${splittedURL[1]}/${splittedURL[2]}`;
  copy(`http://localhost:3000${urlNoProgress}`);
  return true;
};

export const verifyCheck = (index, check) => {
  if (check) {
    return check[index];
  }
  return false;
};
