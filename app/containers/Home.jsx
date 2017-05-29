import React from 'react';
import { connect } from 'react-redux';
import { Element } from 'react-scroll';
import feature from '../features';
import Hero from '../components/Hero';
import Messages from '../components/sections/Messages';
import About from '../components/sections/About';
import ScheduleSection from '../components/sections/ScheduleSection';
import Speakers from '../components/sections/Speakers';
import Timeline from '../components/sections/Timeline';
import Register from '../components/sections/Register';
import Proposals from '../components/sections/Proposals';
import CFP from '../components/sections/CFP';
import Team from '../components/sections/Team';
import Location from '../components/sections/Location';
import Networking from '../components/sections/Networking';
import Footer from '../components/Footer';

class Home extends React.Component {
  render() {
    const { speakers, proposals, user: { team, isReversimTeamMember }, reversimTweets, location, acceptedProposals } = this.props;

    const sections = [
      { name: "messages", el: Messages },
      { name: "about", el: About },
      { name: "schedule", el: ScheduleSection, feature: 'publishAgenda' },
      { name: "speakers", el: Speakers, props: { speakers }, feature: 'publishAgenda' },
      { name: "timeline", el: Timeline, feature: 'publishAgenda', isNot: true },
      { name: "register", el: Register },
      { name: "proposals", el: Proposals, props: { proposals, isReversimTeamMember }, feature: 'publishAgenda', isNot: true },
      { name: "cfp", el: CFP, feature: "submission" },
      { name: "team", el: Team, props: { team } },
      { name: "sponsors", el: Location },
      { name: "networking", el: Networking, feature: "networking" }
    ];

    const elements = sections
      .filter(section => {
        if (!section.feature) return true;
        return section.isNot ? !feature(section.feature, false) : feature(section.feature, false);
      })
      .map(section => {
        return (<Element name={section.name} ref={section.name} key={section.name}>
          {React.createElement(section.el, { name: section.name })}
        </Element>)
      });

    return (
      <div className="home">
        <Hero/>
        {elements}
        <Footer tweets={reversimTweets} />
      </div>
    );
  }
};

function stateToProps(state) {
  return state;
}


export default connect(stateToProps, {})(Home);
