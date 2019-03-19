import React, { Fragment } from 'react';

import categories from '../../../static/categories';

import './style.scss';

function Categories() {
  const deviceCategories = Object.keys(categories).map((key) =>
    categories[key]
  );

  const renderSubtypes = (subtypes) => (
    <div>{subtypes.length > 0 && 'Typen:'}
      <ul>
        {subtypes.map((subtype) => <li key={subtype}>{subtype}</li>) }
      </ul>
    </div>
  );

  const renderCategories = deviceCategories.filter((category) => category.description).map((category) => (
    <section key={category.name}>
      <h4 id={category.name}>{category.name}</h4>
      <p
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: category.description }}
      />

      {renderSubtypes(category.subtypes)}

      {category.wikipediaDescription && (
        <p><a href={category.wikipediaUrl} target="_blank">Wikipedia:</a> &quot;{category.wikipediaDescription}&quot;</p>
      )}
    </section>
  ));

  return (
    <Fragment>
      <header className="modal-header">
        <h3>Categoriën apparaten</h3>
      </header>

      <div className="modal-body">
        <p>In het volgende een toelichting van de typen apparaten die we onderscheiden. Deze zullen op basis van ervaringen aangepast en aangevuld worden. Om een zo breed mogelijk perspectief te bieden, geven we een korte omschrijving in het Nederlands, gevolgd door een beschrijving van de internationale Wikipedia (Engelstalig).</p>
        <p>
          Onderscheid wordt gemaakt tussen de volgende categorieën:
        </p>
        <ul>
          <li><a href="#Camera toezichtsgebieden">Camera toezichtsgebieden</a></li>
          <li><a href="#Camera">Camera</a></li>
          <li><a href="#Sensor">Sensor</a></li>
          <li><a href="#Beacon">Beacon</a></li>
          <li><a href="#Slimme verkeersinformatie">Slimme weggebonden systemen voor verkeersinformatie</a></li>
          <li><a href="#Slimme laadpaal">Slimme laadpaal</a></li>
          <li><a href="#Slimme lantaarnpaal">Slimme lantaarnpaal</a></li>
        </ul>

        <section>
          <h4 id="Camera toezichtsgebieden">Camera toezichtsgebieden</h4>
          <p>
            Om de veiligheid te vergroten en de overlast in de openbare ruimte te bestrijden kan de gemeente een aantal maatregelen nemen, waaronder het inzetten van cameratoezicht (Artikel 151c Gemeentewet).
            De camera’s geven politie en handhaving ‘extra ogen’ in de stad. Het cameratoezicht heeft de volgende functies:
          </p>
          <ul>
            <li>het verhogen van de efficiëntie en effectiviteit van het optreden van politie en handhavers door het signaleren van situaties waar hun optreden gewenst is (proactie);</li>
            <li>het voorkomen van openbare-ordeproblemen en strafbare feiten in een gebied (preventie);</li>
            <li>het verhogen van het veiligheidsgevoel bij burgers en ondernemers.</li>
          </ul>
          <p>
            De met dit doel gemaakte camerabeelden worden in toenemende mate voor opsporing gebruikt.
          </p>
        </section>

        { renderCategories }
      </div>
    </Fragment>
  );
}

export default Categories;
