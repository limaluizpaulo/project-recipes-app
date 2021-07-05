import React from 'react';

function DetailsReceita() {
  // const { match: { params: { id } } } = props;
  // console.log(id);
  return (
    <div data-testid="0-">
      {/* {id} */}
      <button type="button" data-testid="start-recipe-btn">
        Go
      </button>
    </div>
  );
}

// DetailsReceita.propTypes = {
//   match: PropTypes.objectOf(id.any).isRequired,
// };

export default DetailsReceita;
