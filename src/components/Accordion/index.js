import PropTypes from 'prop-types';
import React from 'react';
import {
  Accordion as AccesibleAccordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import CarretRightIcon from '../../images/icon-carret-right.svg';

import './style.scss';

const Accordion = props => (
  <AccesibleAccordion className={props.className}>
    <AccordionItem
      expanded={props.expanded}
      className="c-accordion c-accordion--light"
      hideBodyClassName="c-accordion--closed"
    >
      <AccordionItemTitle className="c-accordion__toggle">
        <CarretRightIcon className="c-accordion__toggle-icon" />
        <h4 className="c-accordion__toggle-title">{props.title}</h4>
      </AccordionItemTitle>
      <AccordionItemBody className="c-accordion__content">
        {props.children}
      </AccordionItemBody>
    </AccordionItem>
  </AccesibleAccordion>
);

Accordion.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Accordion;
