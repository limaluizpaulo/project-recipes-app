import React from 'react';

function DetailsReceita(props) {
  const { match: { params: { id } } } = props;
  console.log(id);
  return (
    <div data-testid="0-">
      {id}
    </div>
  );
}

// DetailsReceita.propTypes = {
//   match: PropTypes.objectOf(id.any).isRequired,
// };

export default DetailsReceita;
