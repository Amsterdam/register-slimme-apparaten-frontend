import React from 'react';
import PropTypes from 'prop-types';
import { FormBuilder, FieldGroup, Validators } from 'react-reactive-form';

import { getThing, getLocation } from '../../services/api/iot';
import { getMarkerCategory } from '../../services/iotmap';

import FieldControlWrapper from './components/FieldControlWrapper';
import CheckboxInput from './components/CheckboxInput';
import TextInput from './components/TextInput';
import TextAreaInput from './components/TextAreaInput';
import './style.scss';

class ContactForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = { thing: null, location: null };
  }

  componentDidMount() {
    this.getDeviceInfo();
  }

  async getDeviceInfo() {
    const thing = await getThing(this.props.match.params.thingId);
    const location = await getLocation(this.props.match.params.locationId);
    this.setState({ thing, location });
  }

  contactForm = FormBuilder.group({
    name: [''],
    emailAddress: ['', Validators.required],
    wantsAccess: [false],
    questionTitle: [''],
    questionBody: [''],
    motivation: [''],
    acceptTermsAndConditions: [false, Validators.required]
  });

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.contactForm);
  }


  render() {
    const termsAndConditionsLink = <span>Ik ga akkoord met de <a href="" target="_blank" rel="noopener noreferrer">algemene voorwaarden</a></span>;
    return (
      <div className="contact-form">
        <h1>Contact met eigenaar</h1>
        { this.state.thing && <table className="table table-borderless">
          <tbody>
            <tr>
              <td><strong>Naam</strong></td>
              <td>{ this.state.thing.name }</td>
            </tr>
            <tr>
              <td><strong>Type</strong></td>
              <td>{getMarkerCategory(this.state.thing).name}</td>
            </tr>
            <tr>
              <td><strong>Plaats</strong></td>
              <td>{this.state.location.name}</td>
            </tr>
          </tbody>
        </table> }

        <FieldGroup
          control={this.contactForm}
          render={({ invalid }) => (
            <form onSubmit={this.handleSubmit}>
              <div>
                <FieldControlWrapper render={TextInput} name="name" display="Uw naam" control={this.contactForm.get('name')} />
                <FieldControlWrapper render={TextInput} name="emailAddress" display="Uw e-mailadres" control={this.contactForm.get('emailAddress')} />
                <FieldControlWrapper render={CheckboxInput} name="wantsAccess" display="Ik wil toegang tot de data uit dit apparaat" control={this.contactForm.get('wantsAccess')} />
                <FieldControlWrapper render={TextInput} name="questionTitle" display="Titel van uw vraag" control={this.contactForm.get('questionTitle')} />
                <FieldControlWrapper render={TextAreaInput} name="questionBody" display="Uw vraag" control={this.contactForm.get('questionBody')} rows={3} />
                <FieldControlWrapper render={TextInput} name="motivation" display="Motivatie" control={this.contactForm.get('motivation')} />
                <FieldControlWrapper render={CheckboxInput} name="acceptTermAndConditions" display={termsAndConditionsLink} control={this.contactForm.get('acceptTermsAndConditions')} />

                <ul>
                  <li>Uw vraag wordt door deze website doorgestuurd naar de eigenaar.</li>
                  <li>Uw gegevens worden niet opgeslagen in dit register.</li>
                  <li>De eigenaar van het apparaat ontvangt uw mailadres om contact met u op te nemen.</li>
                </ul>

                <button className="action secundary-blue" type="submit" disabled={invalid}>
                  <span className="value">Versturen</span>
                </button>
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}

ContactForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      thingId: PropTypes.string.isRequired,
      locationId: PropTypes.string.isRequired
    })
  }),
};

export default ContactForm;
