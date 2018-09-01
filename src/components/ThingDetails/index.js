import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { getMarkerType } from '../../services/iotmap';

import CloseIcon from '../../images/icon-cross-big.svg';
import QuestionMarkIcon from '../../images/icon-question-mark.svg';
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
        <button className="thing-details__contact-button action secundary-blue" onClick={() => { history.push(`/contact-owner/${this.props.thing.id}/${this.props.location.id}`); }}>
          <MailIcon />Contact met eigenaar
        </button>
      )}
    />);

    const TypesButton = (<Route
      render={({ history }) => (
        <button className="thing-details__question-mark-button" onClick={() => { history.push('/types'); }}>
          <QuestionMarkIcon></QuestionMarkIcon>
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
          <div className="thing-details__table">
            <div className="thing-details__header-row thing-details__row">
              <div className="thing-details__row-label">Apparaat</div>
              <div className="thing-details__row-element">{this.props.thing.name}</div>
            </div>
            <div className="thing-details__row">
              <div className="thing-details__row-label">Type</div>
              <div className="thing-details__row-element">{getMarkerType(this.props.thing).name}</div>
              { TypesButton }
            </div>
            <div className="thing-details__row">
              <div className="thing-details__row-label">Beschrijving</div>
              <div className="thing-details__row-element">{this.props.thing.description}</div>
            </div>
            <div className="thing-details__row">
              <div className="thing-details__row-label">Doel</div>
              <div className="thing-details__row-element">{this.props.thing.purpose}</div>
            </div>
            <div className="thing-details__row">
              <div className="thing-details__row-label">Referentie</div>
              <div className="thing-details__row-element">{this.props.thing.ref}</div>
            </div>
            <div className="thing-details__row">
              <div className="thing-details__row-label">Plaats</div>
              <div className="thing-details__row-element">{this.props.location.name}</div>
            </div>
          </div>
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
