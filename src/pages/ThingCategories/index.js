import React from 'react';

import { getMarkerCategories } from '../../services/iotmap';

import './style.scss';

function Categories() {
  const markerCategories = Object.keys(getMarkerCategories()).map((key) =>
    getMarkerCategories()[key]
  );

  const renderSubtypes = (subtypes) => (
    <div>{subtypes.length > 0 && 'Typen:'}
      <ul>
        {subtypes.map((subtype) => <li key={subtype}>{subtype}</li>) }
      </ul>
    </div>
  );

  const renderCategories = markerCategories.map((category) =>
    (<div key={category.name}>
      <h4>{category.name}</h4>
      <p>{category.description}</p>
      {renderSubtypes(category.subtypes)}
    </div>)
  );

  return (
    <div className="categories">
      <h2>Categoriën apparaten</h2>
      { renderCategories }
    </div>
  );
}

export default Categories;
