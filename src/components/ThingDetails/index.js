import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { getMarkerType } from '../../services/iotmap';

import CloseIcon from '../../images/icon-cross-big.svg';
import MailIcon from '../../images/icon-mail.svg';

import './style.scss';

class ThingDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isMapPreviewPanelVisible: true };
  }

  render() {
    if (!this.props.thing) return null;

    const ContactButton = (<Route
      render={({ history }) => (
        <button className="thing-details__contact-button action secundary-blue" onClick={() => { history.push('/contact-owner'); }}>
          <MailIcon />Contact met eigenaar
        </button>
      )}
    />);

    return (
      <section id="thing-details" className="thing-details">
        <div className="thing-details__heading">
          <button
            className="thing-details__button"
            onClick={this.props.onThingDetailsClose}
            title="Sluiten"
          >
            <CloseIcon className="thing-details__button-icon" />
          </button>
        </div>
        <div className="thing-details__body">
          <table className="thing-details__table">
            <thead>
              <tr className="thing-details__row">
                <th className="thing-details__row-label">Apparaat</th>
                <th className="thing-details__row-element">{this.props.thing.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="thing-details__row">
                <td className="thing-details__row-label">Type</td>
                <td className="thing-details__row-element">{getMarkerType(this.props.thing).name}</td>
              </tr>
              <tr className="thing-details__row">
                <td className="thing-details__row-label">Beschrijving</td>
                <td className="thing-details__row-element">{this.props.thing.description}</td>
              </tr>
              <tr className="thing-details__row">
                <td className="thing-details__row-label">Doel</td>
                <td className="thing-details__row-element">{this.props.thing.purpose}</td>
              </tr>
              <tr className="thing-details__row">
                <td className="thing-details__row-label">Referentie</td>
                <td className="thing-details__row-element">{this.props.thing.ref}</td>
              </tr>
              <tr className="thing-details__row">
                <td className="thing-details__row-label">Plaats</td>
                <td className="thing-details__row-element">{this.props.location.name}</td>
              </tr>
            </tbody>
          </table>
          {ContactButton}
        </div>
      </section>
    );
  }
}

ThingDetails.propTypes = {
  thing: PropTypes.object,
  location: PropTypes.object,
  onThingDetailsClose: PropTypes.func
};

export default ThingDetails;
