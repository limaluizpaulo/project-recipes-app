import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

function Cards() {
    const { data, nameRecipes, imgRecipes, idRecip, typeFunc } = useContext(FetchContext);
    const ELEVEN = 11;
    return (
        <div className="card-container">

        </div>
    );
}

export default Cards;