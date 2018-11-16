import React from 'react';
import PropTypes from 'prop-types';
import { FormBuilder, FieldGroup, Validators } from 'react-reactive-form';

import { getDevice } from '../../services/api/iot';
import { getMarkerCategory } from '../../services/iotmap';

import FieldControlWrapper from './components/FieldControlWrapper';
import CheckboxInput from './components/CheckboxInput';
import TextInput from './components/TextInput';
import TextAreaInput from './components/TextAreaInput';
import './style.scss';

const MAX_INPUT_LENGTH = 250;

class ContactForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = { device: null, submitSuccess: false };
  }

  componentDidMount() {
    this.getDeviceInfo();
  }

  async getDeviceInfo() {
    const device = await getDevice(parseInt(this.props.match.params.deviceId, 10));
    this.setState({ device });
  }

  contactForm = FormBuilder.group({
    device: this.props.match.params.deviceId,
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    can_i_have_access: [false],
    can_i_get_more_information: [false],
    can_i_use_collected_data: [false],
    does_the_device_register_personal_data: [false],
    comment: ['', Validators.maxLength(MAX_INPUT_LENGTH)]
  });

  handleSubmit = (event) => {
    event.preventDefault();
    this.contactForm.markAsSubmitted();
    if (this.contactForm.valid) {
      this.setState({ submitSuccess: true });
      this.resetForm();
    }
  }

  resetForm = () => {
    this.contactForm.reset({
      name: '',
      email: '',
      can_i_have_access: false,
      can_i_get_more_information: false,
      can_i_use_collected_data: false,
      does_the_device_register_personal_data: false,
      comment: ''
    });
  }

  render() {
    return (
      <div>
        { this.state.submitSuccess ? <h1>Uw verzoek is verstuurd naar de eigenaar</h1> :
        <div className="contact-form">
          <h1>Contact met eigenaar</h1>
          { this.state.device && <table className="contact-form__device-details table table-borderless">
            <tbody>
              <tr>
                <td><strong>Naam</strong></td>
                <td>{ this.state.device.reference }</td>
              </tr>
              <tr>
                <td><strong>Categorie</strong></td>
                <td>{getMarkerCategory(this.state.device).name}</td>
              </tr>
              <tr>
                <td><strong>Type</strong></td>
                <td>{this.state.device.types[0] ? this.state.device.types[0].description : 'Onbekend'}</td>
              </tr>
              <tr>
                <td><strong>Plaats</strong></td>
                <td>{this.state.device.address.street}</td>
              </tr>
            </tbody>
          </table> }

          <FieldGroup
            control={this.contactForm}
            render={() => (
              <form onSubmit={this.handleSubmit}>
                <div>
                  <FieldControlWrapper render={TextInput} name="name" display="Uw naam" control={this.contactForm.get('name')} />
                  <FieldControlWrapper render={TextInput} name="email" display="Uw e-mailadres" control={this.contactForm.get('email')} />
                  <FieldControlWrapper render={CheckboxInput} name="can_i_have_access" display="Kan ik toegang krijgen tot de data uit dit apparaat?" control={this.contactForm.get('can_i_have_access')} />
                  <FieldControlWrapper render={CheckboxInput} name="questionInfo" display="Kan ik meer informatie krijgen over de data die uw 'slimme apparaat' (baken, camera, sensor e.d.) verzamelt?" control={this.contactForm.get('can_i_get_more_information')} />
                  <FieldControlWrapper render={CheckboxInput} name="questionUse" display="Mag ik de verzamelde data eventueel gebruiken?" control={this.contactForm.get('can_i_use_collected_data')} />
                  <FieldControlWrapper render={CheckboxInput} name="questionPersonalData" display="Registreert uw slimme apparaat ook gegevens over personen?" control={this.contactForm.get('does_the_device_register_personal_data')} />
                  <FieldControlWrapper render={TextAreaInput} name="comment" display="Andere vraag of opmerking (maximaal 250 tekens):" maxLength={MAX_INPUT_LENGTH} control={this.contactForm.get('comment')} />

                  <button className="action secundary-blue" type="submit">
                    <span className="value">Versturen</span>
                  </button>
                </div>
              </form>
            )}
          />
        </div> }
      </div>
    );
  }
}

ContactForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      deviceId: PropTypes.string.isRequired
    })
  }),
};

export default ContactForm;
