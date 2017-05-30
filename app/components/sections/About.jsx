import React from 'react';
import Section from '../Section';
import Tabs from '../Tabs';
import Panel from 'components/common/Panel';
import classnames from 'classnames/bind';
import styles from 'css/main.css';
import aboutGeneralInfo from 'images/about-general-info.jpg';
import aboutSponsors from 'images/about-sponsors.jpg';
import aboutTopics from 'images/about-topics.jpg';

const cx = classnames.bind(styles);

const tabContent0 = (
  <Panel spacing="3rem">
    <div style={{ flex: "0 0 auto", paddingTop: "1rem" }}>
      <img src={aboutGeneralInfo} alt=""/>
    </div>
    <div>
      <h5>About Reversim Summit</h5>
      <p>Reversim summit is our intention to create a conference for developers by developers. Like in the podcast, we bring you the content we are interested in, and we hope you will be too.</p>
      <p>This is the fourth Reversim Summit. The summits of <a href="http://summit2013.reversim.com">2013</a> and <a href="http://summit2014.reversim.com">2014</a> (TLV Campus) and <a href="http://summit2015.reversim.com">2015</a> (Technion) also featured community content. Watch previous years&#39; sessions to get the general feel of the Revesim Summit spirit.</p>
      <br />
      <h5>About Reversim Podcast</h5>
      <p><a href="http://reversim.com/">Reversim</a> (רברס עם פלטפורמה) is a Hebrew podcast by <a href="https://twitter.com/orilahav">Ori Lahav</a> and <a href="http://tavory.com/">Ran Tavory</a> which brings together software developers and product, with over 300 recorded episodes and a few thousands listners.</p>
    </div>
  </Panel>
);

const tabContent1 = (
  <Panel spacing="3rem">
    <div>
      <h5>What talks will you find here?</h5>
      <p>We’re interested in everything including software development, software product development, UX, startups, mobile, web, devops, data processing, scaling, software company culture, tooling and more. There is no predefined list of topics, if you’d like to speak about something interesting, we want it!</p>
      <p>We do not set out with a predefined list of tracks. We would like to leave the topics (tracks) open and only after accepting the submissions we will split the sessions into tracks, but we shall not rule out a single good session just b/c it's not a natural fit to any of the predefined list, so don't worry so much about categorizing your submissions.</p>
      <p>Generally speaking - we are not looking for “intro to something software” or “something software 101”. We’re looking for something of greater depth. However, we are open to session “intro to something that isn’t software”, as long is this something is of general interest, for example “intro to moonwalking and breakdance”</p>
    </div>

    <div style={{ flex: "0 0 auto", paddingTop: "1rem" }}>
      <img src={aboutTopics} alt=""/>
    </div>
  </Panel>
);

const tabContent2 = (
  <Panel spacing="3rem">
    <div style={{ flex: "0 0 auto", paddingTop: "1rem" }}>
      <img src={aboutSponsors} alt=""/>
    </div>
    <div>
      <h5>Sponsorship plan</h5>
      <p>We feature a sponsorship plan for companies relevant to the conference attendees. The plan includes:</p>
      <h6>Featured job description</h6>
      <ul className={cx('with-bullets')}>
        <li>A featured job description near your company name at the sponsors page in our site, with a link to your site.</li>
        <li>A link to your careers / jobs page from the sponsors page in our site.</li>
      </ul>
      <h6>A Thank-you before the keynote sessions</h6>
      <p>We will thank all sponsors before the daily keynote session.</p>
      <h6>Website</h6>
      <ul className={cx('with-bullets')}>
        <li>A logo in the home page of the Reversim conference site.</li>
        <li>A section in the sponsors page in the Reversim conference site, with a link to the company’s home page.</li>
      </ul>
      <h6>Video</h6>
      <p>All major conference sessions are video-recorded and will be freely available on the web. Sponsors logos will appear in the cover page appearing before each session.</p>
      <h6>Tickets</h6>
      <p>Tickets are free, but they tend to vanish quickly. We provide each sponsor with 4 unnamed reservations that can be given to last-minute attendees.</p>
      <br />
      <h5>Becoming a sponsor</h5>
      <p>The sponsorship plan cost is 15,000 NIS + V.A.T.</p>
      <p>We do encourage sponsors to submit sessions. In fact, sessions by sponsors have been some of the best we had in previous summits. However, these sessions go through our independent submission and moderation process.</p>
      <p>To become a sponsor, please contact <a href="mailto:adam@matan.name">Adam matan</a>.</p>
    </div>
  </Panel>
);

export default class About extends React.Component {
  render() {
    const tabs = [
      {name: "General info", icon: "fa-code", content: tabContent0},
      {name: "Topics", icon: "fa-rocket", content: tabContent1},
      {name: "Sponsor info", icon: "fa-external-link", content: tabContent2}
    ];

    return (
      <Section name="About" icon="fa-star-o">
        <Tabs tabs={tabs} minHeight="717px"/>
      </Section>
    );
  }
}