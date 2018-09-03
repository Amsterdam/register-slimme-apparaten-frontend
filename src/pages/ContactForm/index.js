import React from 'react';
import PropTypes from 'prop-types';
import { FormBuilder, FieldGroup, Validators } from 'react-reactive-form';

import { getThing, getLocation } from '../../services/api/iot';
import { getMarkerType } from '../../services/iotmap';

import FieldControlWrapper from './components/FieldControlWrapper';
import CheckboxInput from './components/CheckboxInput';
import TextInput from './components/TextInput';
import TextAreaInput from './components/TextAreaInput';
import './style.scss';

const MAX_INPUT_LENGTH = 250;

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
    name: ['', [Validators.required, Validators.minLength(2)]],
    emailAddress: ['', [Validators.required, Validators.email]],
    questionAccess: [false],
    questionInfo: [false],
    questionUse: [false],
    questionPersonalData: [false],
    questionOther: ['', Validators.maxLength(MAX_INPUT_LENGTH)],
  });

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.contactForm);
  }

  render() {
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
              <td>{getMarkerType(this.state.thing).name}</td>
            </tr>
            <tr>
              <td><strong>Plaats</strong></td>
              <td>{this.state.location.name}</td>
            </tr>
          </tbody>
        </table> }

        <FieldGroup
          control={this.contactForm}
          render={() => (
            <form onSubmit={this.handleSubmit}>
              <div>
                <FieldControlWrapper render={TextInput} name="name" display="Uw naam" control={this.contactForm.get('name')} />
                <FieldControlWrapper render={TextInput} name="emailAddress" display="Uw e-mailadres" control={this.contactForm.get('emailAddress')} />
                <FieldControlWrapper render={CheckboxInput} name="wantsAccess" display="Ik wil toegang tot de data uit dit apparaat" control={this.contactForm.get('questionAccess')} />
                <FieldControlWrapper render={CheckboxInput} name="question1" display="Kan ik meer informatie krijgen over de data die uw 'slimme apparaat' (baken, camera, sensor ed) verzamelt?" control={this.contactForm.get('questionInfo')} />
                <FieldControlWrapper render={CheckboxInput} name="question2" display="Mag ik de verzamelde data evt gebruiken?" control={this.contactForm.get('questionUse')} />
                <FieldControlWrapper render={CheckboxInput} name="question3" display="Registreert uw slimme apparaat ook gegevens over personen?" control={this.contactForm.get('questionPersonalData')} />
                <FieldControlWrapper render={TextAreaInput} name="question4" display="Andere vraag of opmerking (maximaal 250 tekens):" maxLength={MAX_INPUT_LENGTH} control={this.contactForm.get('questionOther')} />

                <ul>
                  <li>De &quot;slimme apparaten&quot; in het register zijn van diverse organisaties.</li>
                  <li>De gegevens van de eigenaar van het slimme apparaat worden niet getoond ivm privacy.</li>
                  <li>De eigenaar bepaalt of hij reageert; hij is dat niet verplicht.</li>
                  <li>De mail wordt niet gearchiveerd in het register. Ook uw gegevens worden niet geregistreerd in het register.</li>
                </ul>

                <button className="action secundary-blue" type="submit">
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
