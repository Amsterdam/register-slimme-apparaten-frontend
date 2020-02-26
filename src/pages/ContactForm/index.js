import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';
import { Button, themeSpacing } from '@datapunt/asc-ui';
import { FormBuilder, FieldGroup, Validators } from 'react-reactive-form';
import axios from 'axios';

import CONFIGURATION from 'shared/configuration/environment';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FieldControlWrapper from './components/FieldControlWrapper';
import CheckboxInput from './components/CheckboxInput';
import TextInput from './components/TextInput';
import TextAreaInput from './components/TextAreaInput';
import './style.scss';
import { makeSelectedItem } from '../../containers/MapContainer/MapContainerDucks';
import queryStringParser from '../../shared/services/auth/services/query-string-parser/query-string-parser';

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

const ContactFormStyle = styled.div``;

const FormSuccessStyle = styled.div`
  margin-top: ${themeSpacing(3)};
`;

const ContactForm = ({ device }) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const params = queryStringParser(window.location.search);

  const contactForm = FormBuilder.group(
    {
      device: params.id,
      contact_owner: params.source === 'iothings' ? '' : params.contact,
      device_data: params.source === 'iothings' ? {} : device.properties,
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      can_i_have_access: [false],
      can_i_get_more_information: [false],
      can_i_use_collected_data: [false],
      does_the_device_register_personal_data: [false],
      comment: ['', Validators.maxLength(MAX_INPUT_LENGTH)],
      __link: `${window.location.origin}/${window.location.search}`,
    },
    { validators: oneOrMoreQuestionsValidator },
  );

  const handleSubmit = event => {
    event.preventDefault();
    contactForm.markAsSubmitted();
    if (contactForm.valid) {
      axios({
        method: 'post',
        url: `${CONFIGURATION.API_ROOT}iothings/contact/`,
        data: contactForm.value,
      }).then(() => {
        // eslint-disable-line no-unused-vars
        setSubmitSuccess(true);
        resetForm();
      });
    }
  };

  const resetForm = () => {
    contactForm.reset({
      name: '',
      email: '',
      can_i_have_access: false,
      can_i_get_more_information: false,
      can_i_use_collected_data: false,
      does_the_device_register_personal_data: false,
      comment: '',
    });
  };

  const renderSuccess = () => (
    <FormSuccessStyle>
      <NavLink className="startagain action" to="/">
        Terug naar de kaart
      </NavLink>
      <h4>Bedankt voor uw verzoek</h4>
      <p>Uw verzoek is doorgestuurd naar de eigenaar. Deze bepaalt of en wanneer hij of zij reageert.</p>
      <p>
        Een kopie van uw verzoek is verstuurd naar <span className="email">{contactForm.value.email}</span>. Uw verzoek
        is niet vastgelegd in het register.
      </p>
    </FormSuccessStyle>
  );

  return (
    <div>
      {submitSuccess ? (
        renderSuccess()
      ) : (
        <ContactFormStyle className="contact-form">
          <h1>Contact met eigenaar</h1>
          {device && (
            <table className="contact-form__device-details table table-borderless">
              <tbody>
                <tr>
                  <td>
                    <strong>Categorie</strong>
                  </td>
                  <td>{device.category}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Type</strong>
                  </td>
                  <td>{device.soort || 'Onbekend'}</td>
                </tr>
              </tbody>
            </table>
          )}

          <FieldGroup
            control={contactForm}
            render={() => (
              <form onSubmit={handleSubmit}>
                <div>
                  <FieldControlWrapper
                    render={TextInput}
                    name="name"
                    display="Uw naam"
                    control={contactForm.get('name')}
                  />
                  <FieldControlWrapper
                    render={TextInput}
                    name="email"
                    display="Uw e-mailadres"
                    control={contactForm.get('email')}
                  />
                  <div
                    className={`rij mode_input text rij_verplicht ${
                      contactForm.submitted && contactForm.hasError('noneSelected') ? 'row_ongeldig' : ''
                    }`}
                  >
                    <label htmlFor="questions">Wat wilt u aan de eigenaar vragen?</label>
                    {contactForm.submitted && contactForm.hasError('noneSelected') ? (
                      <div className="group-error">Stel minimaal één van onderstaande vragen</div>
                    ) : null}
                    <FieldControlWrapper
                      render={CheckboxInput}
                      aria-labelledby="questions"
                      name="can_i_have_access"
                      display="Kan ik toegang krijgen tot de data uit dit apparaat?"
                      control={contactForm.get('can_i_have_access')}
                    />
                    <FieldControlWrapper
                      render={CheckboxInput}
                      aria-labelledby="questions"
                      name="questionInfo"
                      display="Kan ik meer informatie krijgen over de data die uw 'slimme apparaat' (baken, camera, sensor e.d.) verzamelt?"
                      control={contactForm.get('can_i_get_more_information')}
                    />
                    <FieldControlWrapper
                      render={CheckboxInput}
                      aria-labelledby="questions"
                      name="questionUse"
                      display="Mag ik de verzamelde data eventueel gebruiken?"
                      control={contactForm.get('can_i_use_collected_data')}
                    />
                    <FieldControlWrapper
                      render={CheckboxInput}
                      aria-labelledby="questions"
                      name="questionPersonalData"
                      display="Registreert uw slimme apparaat ook gegevens over personen?"
                      control={contactForm.get('does_the_device_register_personal_data')}
                    />
                    <FieldControlWrapper
                      render={TextAreaInput}
                      aria-labelledby="questions"
                      name="comment"
                      display="Andere vraag of opmerking (maximaal 250 tekens):"
                      maxLength={MAX_INPUT_LENGTH}
                      control={contactForm.get('comment')}
                    />
                  </div>
                  <Button variant="primary" type="submit">
                    Versturen
                  </Button>
                </div>
              </form>
            )}
          />
        </ContactFormStyle>
      )}
    </div>
  );
};

ContactForm.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  device: PropTypes.shape({
    category: PropTypes.string,
    soort: PropTypes.string,
    properties: PropTypes.shape({}),
  }),
};

const mapStateToProps = createStructuredSelector({
  device: makeSelectedItem(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ContactForm);
