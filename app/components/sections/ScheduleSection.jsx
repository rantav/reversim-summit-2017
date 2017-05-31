import React from 'react';
import Section from '../Section';
import Schedule from '../Schedule';

export default (props) => {
  return (<Section name="Schedule" icon="fa-calendar-plus-o">
    <Schedule acceptedProposals={props.acceptedProposals} />
  </Section>);
};
