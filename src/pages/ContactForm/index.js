import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormBuilder, FieldGroup, Validators } from 'react-reactive-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import CONFIGURATION from 'shared/services/configuration/configuration';

import FieldControlWrapper from './components/FieldControlWrapper';
import CheckboxInput from './components/CheckboxInput';
import TextInput from './components/TextInput';
import TextAreaInput from './components/TextAreaInput';
import './style.scss';
import { makeSelectedDevice, setDevicesActionCreator } from '../../containers/MapContainer/ducks';
import { getMarkerCategory } from '../../services/marker';

const MAX_INPUT_LENGTH = 250;

const oneOrMoreQuestionsValidator = formControl => {
  const controls = [
    formControl.controls.can_i_have_access,
    formControl.controls.can_i_get_more_information,
    formControl.controls.can_i_use_collected_data,
    formControl.controls.does_the_device_register_personal_data,
    formControl.controls.comment,
  ];
  let valid = false;
  controls.forEach(control => {
    if (control.value) {
      valid = true;
    }
  });
  return valid ? null : { noneSelected: true };
};

class ContactForm extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { device: props.device, submitSuccess: false };
  }

  componentDidMount() {}

  contactForm = FormBuilder.group(
    {
      device: this.props.match.params.id,
      contactType: this.props.match.params.contact,
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      can_i_have_access: [false],
      can_i_get_more_information: [false],
      can_i_use_collected_data: [false],
      does_the_device_register_personal_data: [false],
      comment: ['', Validators.maxLength(MAX_INPUT_LENGTH)],
    },
    { validators: oneOrMoreQuestionsValidator },
  );

  handleSubmit = event => {
    event.preventDefault();
    this.contactForm.markAsSubmitted();
    if (this.contactForm.valid) {
      axios({
        method: 'post',
        url: `${CONFIGURATION.API_ROOT}iothings/contact/`,
        data: this.contactForm.value,
      }).then(() => {
        // eslint-disable-line no-unused-vars
        this.setState({ submitSuccess: true });
        this.resetForm();
      });
    }
  };

  resetForm = () => {
    this.contactForm.reset({
      name: '',
      email: '',
      can_i_have_access: false,
      can_i_get_more_information: false,
      can_i_use_collected_data: false,
      does_the_device_register_personal_data: false,
      comment: '',
    });
  };

  renderSuccess = () => (
    <div className="form-success">
      <NavLink className="startagain action" to="/">
        Terug naar de kaart
      </NavLink>
      <h4>Bedankt voor uw verzoek</h4>
      <p>Uw verzoek is doorgestuurd naar de eigenaar. Deze bepaalt of en wanneer hij of zij reageert.</p>
      <p>
        Een kopie van uw verzoek is verstuurd naar <span className="email">{this.contactForm.value.email}</span>. Uw
        verzoek is niet vastgelegd in het register.
      </p>
    </div>
  );

  render() {
    return (
      <div>
        {this.state.submitSuccess ? (
          this.renderSuccess()
        ) : (
          <div className="contact-form">
            <h1>Contact met eigenaar</h1>
            {this.state.device && (
              <table className="contact-form__device-details table table-borderless">
                <tbody>
                  <tr>
                    <td>
                      <strong>Categorie</strong>
                    </td>
                    <td>{getMarkerCategory(this.state.device).name}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Type</strong>
                    </td>
                    <td>{this.state.device.types.length && (this.state.device.types[0].name || 'Onbekend')}</td>
                  </tr>
                </tbody>
              </table>
            )}

            <FieldGroup
              control={this.contactForm}
              render={() => (
                <form onSubmit={this.handleSubmit}>
                  <div>
                    <FieldControlWrapper
                      render={TextInput}
                      name="name"
                      display="Uw naam"
                      control={this.contactForm.get('name')}
                    />
                    <FieldControlWrapper
                      render={TextInput}
                      name="email"
                      display="Uw e-mailadres"
                      control={this.contactForm.get('email')}
                    />
                    <div
                      className={`rij mode_input text rij_verplicht ${
                        this.contactForm.submitted && this.contactForm.hasError('noneSelected') ? 'row_ongeldig' : ''
                      }`}
                    >
                      <label htmlFor="questions">Wat wilt u aan de eigenaar vragen?</label>
                      {this.contactForm.submitted && this.contactForm.hasError('noneSelected') ? (
                        <div className="group-error">Stel minimaal één van onderstaande vragen</div>
                      ) : null}
                      <FieldControlWrapper
                        render={CheckboxInput}
                        aria-labelledby="questions"
                        name="can_i_have_access"
                        display="Kan ik toegang krijgen tot de data uit dit apparaat?"
                        control={this.contactForm.get('can_i_have_access')}
                      />
                      <FieldControlWrapper
                        render={CheckboxInput}
                        aria-labelledby="questions"
                        name="questionInfo"
                        display="Kan ik meer informatie krijgen over de data die uw 'slimme apparaat' (baken, camera, sensor e.d.) verzamelt?"
                        control={this.contactForm.get('can_i_get_more_information')}
                      />
                      <FieldControlWrapper
                        render={CheckboxInput}
                        aria-labelledby="questions"
                        name="questionUse"
                        display="Mag ik de verzamelde data eventueel gebruiken?"
                        control={this.contactForm.get('can_i_use_collected_data')}
                      />
                      <FieldControlWrapper
                        render={CheckboxInput}
                        aria-labelledby="questions"
                        name="questionPersonalData"
                        display="Registreert uw slimme apparaat ook gegevens over personen?"
                        control={this.contactForm.get('does_the_device_register_personal_data')}
                      />
                      <FieldControlWrapper
                        render={TextAreaInput}
                        aria-labelledby="questions"
                        name="comment"
                        display="Andere vraag of opmerking (maximaal 250 tekens):"
                        maxLength={MAX_INPUT_LENGTH}
                        control={this.contactForm.get('comment')}
                      />
                    </div>
                    <button className="action secundary-blue" type="submit">
                      <span className="value">Versturen</span>
                    </button>
                  </div>
                </form>
              )}
            />
          </div>
        )}
      </div>
    );
  }
}

ContactForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      contact: PropTypes.string.isRequired,
    }),
  }),
  device: PropTypes.shape({}).isRequired,
};

const mapStateToProps = createStructuredSelector({
  device: makeSelectedDevice(),
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setDevices: setDevicesActionCreator,
    },
    dispatch,
  );
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ContactForm);
