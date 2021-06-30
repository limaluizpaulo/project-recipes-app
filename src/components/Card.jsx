import React from 'react';

export default function Card(props) {
  const { thumbnail } = props;
  console.log(thumbnail);
  return (
    <div>
      <img src={ thumbnail } alt="thumbnail" />
      <span>asfd</span>
    </div>
  );
}
