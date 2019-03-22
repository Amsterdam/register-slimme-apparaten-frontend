import PropTypes from 'prop-types';
import React from 'react';
import {
    Accordion as AccesibleAccordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody
} from 'react-accessible-accordion';

import CarretRightIcon from '../../images/icon-carret-right.svg';

import './style.scss';

const Accordion = (props) => {
  const Tag = props.headingLevel;
  return (
    <AccesibleAccordion className={props.className}>
      <AccordionItem expanded={props.expanded} className="c-accordion c-accordion--light" hideBodyClassName="c-accordion--closed">
        <AccordionItemTitle className="c-accordion__toggle">
          <CarretRightIcon className="c-accordion__toggle-icon" />
          <Tag className="c-accordion__toggle-title">{ props.title }</Tag>
        </AccordionItemTitle>
        <AccordionItemBody className="c-accordion__content">
          { props.children }
        </AccordionItemBody>
      </AccordionItem>
    </AccesibleAccordion>
  );
};

Accordion.defaultProps = {
  headingLevel: 'h3',
};

Accordion.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
  headingLevel: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default Accordion;
