import React, { useState } from 'react';

export default function Headerr() {
  const [btn, setBtn] = useState(false);

  return (
    <div>
      <button type="button" onClick={ () => setBtn(!btn) }>toggle</button>
    </div>
  );
}
