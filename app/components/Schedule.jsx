import React, { Component, Children, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/schedule.css';
import ga from 'react-ga';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { canUseDom } from 'features';
// import Speaker from 'components/Speaker';
import { push } from 'react-router-redux';
import Panel from './common/Panel';
const cx = classNames.bind(styles);

const TimeSlot = props => {
  const { children, time } = props;
  return (
      <Panel even={true}>
        <div style={{ width: 120, flexGrow: 0 }}>{time}</div>
        {children}
      </Panel>
    );
};

const Session = props => {
  let { title, speakers, proposal } = props;

  if (proposal && proposal.speaker_ids) {
    title = title !== undefined ?  `${title}: ${proposal.title}` : proposal.title;
    speakers = proposal.speaker_ids.map(s => s.name)
  }

  let speakerInfo;
  if (speakers) {
    speakerInfo =
      <strong className={cx('highlight', 'speaker-name')}>{(speakers || []).join(', ')}</strong>
  }

  return (
    <div className={cx({'schedule-item': true})}>
      <h6>{title}</h6>
      {speakerInfo}
      <em className={cx('hidden-md', 'hidden-lg', 'small')}>{ proposal && proposal.hall }</em>
    </div>
  );
};

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: 1
    };
  }

  changeDay(index) {
    return (event) => {
      event.preventDefault();

      this.setState({
        day: index,
      });
    };
  }

  isDayActive(index) {
    return this.state.day === index;
  }

  getProposal(id) {
    if (this.props.acceptedProposals === undefined) return null;

    return _.find(this.props.acceptedProposals, p => p.id === id);
  }

  getProposals(ids) {
    if (this.props.acceptedProposals === undefined) return null;

    return ids.map(id => this.props.acceptedProposals[this.props.acceptedProposals.findIndex(proposal => proposal.id === id)]);

    // return this.props.acceptedProposals.filter(p => ids.indexOf(p.id) !== -1);
  }

  render() {
    return (
      <div className={cx('row', 'schedule')}>
        <div style={{marginBottom: 20}}>
          {/* TODO link to calendar */}
          <a href='https://www.google.com/calendar/render?cid=NXRwMG82YWlsNGY3a25mN3ZqdjNjamhsZ2NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ' className={cx('btn', 'btn-sm', 'btn-outline-clr')}>Add to your Google calendar</a>
        </div>

        <Panel className={cx("days")} even={true}>
          <div className={cx("day", {"active": this.isDayActive(1)})}>
            <button onClick={this.changeDay.bind(this)(1)}>
              <h4 className={cx("highlight")}>Day 1</h4>
              <h6 className={cx("text-alt")}>15/10/2017</h6>
            </button>
          </div>
          <div className={cx("day", {"active": this.isDayActive(2)})}>
            <button onClick={this.changeDay.bind(this)(2)}>
              <h4 className={cx("highlight")}>Day 2</h4>
              <h6 className={cx("text-alt")}>16/10/2017</h6>
            </button>
          </div>
        </Panel>

        <Panel style={{ paddingLeft: 120, background: "#eff1f5"}} even={true}>
          <h6 style={{textAlign: "center"}}>Main Hall</h6>
          <h6 style={{textAlign: "center"}}>Hall 1</h6>
          <h6 style={{textAlign: "center"}}>Hall 2</h6>
        </Panel>

        <div className={cx("day-content")}>
          <TimeSlot time='08:00'>
            <Session title='Registration' />
          </TimeSlot>
          <TimeSlot time='10:00'>
            <Session
              title='Welcome + Keynote'
              proposal={this.getProposal('e00bb311-882d-6766-6411-1cc3930289d9')} />
          </TimeSlot>
        </div>
        {/*
          <Day active={this.isDayActive(1)}>
            <TimeSlot time='08:00'>
              <Session dispatch={dispatch} title='Registration' />
            </TimeSlot>

            <TimeSlot time='10:00'>
              <Session
                dispatch={dispatch}
                title='Welcome + Keynote'
                fromProposal={this.getProposal('e00bb311-882d-6766-6411-1cc3930289d9')} />
            </TimeSlot>

            <TimeSlot time='10:50'>
              <Session dispatch={dispatch} title='Break' />
            </TimeSlot>

            <TimeSlot time='11:10'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('da9ee1e1-e427-66c6-a659-2034cf715e25')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('38c6e7f0-3c48-1f82-e9c2-2a9a529fb498')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('5b94f5f9-f823-19fa-c32d-592d8e1b995e')} />
            </TimeSlot>

            <TimeSlot time='11:50'>
              <Session dispatch={dispatch} title='Break' />
            </TimeSlot>

            <TimeSlot time='12:00'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('7861a35f-d40e-6b2c-bcc4-674cdb96a3c6')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('a6be3746-f4a3-93e6-a9dd-39c2b6486c07')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('b4616643-299e-6b95-dec1-3956dc1b9e3d')} />
            </TimeSlot>

            <TimeSlot time='12:40'>
              <Session dispatch={dispatch} title='Lunch' />
            </TimeSlot>

            <TimeSlot time='13:40'>
              <GroupedSession
                dispatch={dispatch}
                title='Lightning Talks'
                fromProposals={this.getProposals([
                  'd4a93e38-e9d6-fa63-8fd3-35b09aff5c04',
                  '84fed3e0-843a-6549-d0fd-647f07d660b5',
                  '525504a6-d694-a0eb-f112-02b88e661ccc',
                  '376b38bb-52fa-ead7-2b81-19b2a3281182',
                  '88ca8cc1-3d3f-492a-ddb8-c841fc3362ba',
                  '3c3ef8e4-8593-2b5c-0df1-9946d6dcb3b2',
                ])} />

              <Session
                dispatch={dispatch}
                title='' />

              <Session
                dispatch={dispatch}
                title='' />
            </TimeSlot>

            <TimeSlot time='14:20'>
              <Session dispatch={dispatch} title='Break' />
            </TimeSlot>

            <TimeSlot time='14:30'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('e332ff16-5b9c-c95c-8f94-edd561046654')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('fac30d98-a041-a099-6514-e8599ebad53f')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('d4a1524a-e442-843c-8347-55bc4059e316')} />
            </TimeSlot>

            <TimeSlot time='15:00'>
              <Session dispatch={dispatch} title='Break' />
            </TimeSlot>

            <TimeSlot time='15:10'>
              <GroupedSession
                dispatch={dispatch}
                title='Open Source Israel'
                fromProposals={this.getProposals([
                  'a7234211-4edc-d6fb-ee8d-181f210d63b2',
                  '0c6e6c08-50c1-1923-257f-ce420fbe3e2e',
                  'afce4ef2-e1d5-b170-db6d-e69df4d327ed',
                  '0f686920-ef11-f26a-b55b-532f703485f7'
                ])} />

              <Session
                dispatch={dispatch}
                title='' />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('4c8947e4-881b-ee63-698a-090944af5ffb')} />
            </TimeSlot>

            <TimeSlot time='15:50'>
              <Session dispatch={dispatch} title='Break' />
            </TimeSlot>

            <TimeSlot time='16:10'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('106eada0-a4f5-229a-cad5-f0e1b2af4e94')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('a3060d0f-5721-a9a1-9075-0bceaf672a69')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('17a8dae8-3955-68bf-14f5-48a5371b30cf')} />
            </TimeSlot>

            <TimeSlot time='16:50'>
              <Session dispatch={dispatch} title='Break' />
            </TimeSlot>

            <TimeSlot time='17:00'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('9eecf51c-25c0-fbef-a514-abe734acd933')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('d42405d7-9413-dd17-809b-48d47b64eef5')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('e1230b05-1e24-4f66-cdf2-adc50f73c55e')} />
            </TimeSlot>

            <TimeSlot time='17:40'>
              <Session dispatch={dispatch} title='TBD' />
            </TimeSlot>

            <TimeSlot time='18:00'>
              <Session dispatch={dispatch} fromProposal={this.getProposal('ee7df39b-fc25-e5b8-33b0-37772188c3ce')} />
            </TimeSlot>

            <TimeSlot time='19:00'>
              <Session dispatch={dispatch} title='Goodbye' />
            </TimeSlot>
          </Day>

          <Day active={this.isDayActive(2)}>
            <TimeSlot time='08:00'>
              <Session dispatch={dispatch} title='Registration' />
            </TimeSlot>

            <TimeSlot time='10:00'>
              <Session
                dispatch={dispatch}
                title='Welcome + Keynote'
                fromProposal={this.getProposal('03430616-cc38-4381-ef47-f2ba4b9867c3')} />
            </TimeSlot>

            <TimeSlot time='10:50'>
              <Session dispatch={dispatch} title='Break' />
            </TimeSlot>

            <TimeSlot time='11:10'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('dca9c1fd-b847-6839-c80f-77981ebe157b')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('9faf7ca7-e749-2d32-f19f-8f8f5928efed')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('b49d88c3-a346-8580-f32f-c0f0995e829f')} />
            </TimeSlot>

            <TimeSlot time='11:50'>
              <Session dispatch={dispatch} title='Break' />
            </TimeSlot>

            <TimeSlot time='12:00'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('00a9fa70-cd08-191e-a13f-091a74732178')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('79ab3edd-860e-ccac-15d2-9e9d84958b7d')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('4d01de61-dc1c-beb0-194b-3823ff446ef1')} />
            </TimeSlot>

            <TimeSlot time='12:40'>
              <Session dispatch={dispatch} title='Lunch' />
            </TimeSlot>

            <TimeSlot time='13:40'>
              <GroupedSession
                dispatch={dispatch}
                title='Lightning Talks'
                fromProposals={this.getProposals([
                  'b8cdb69a-a176-044a-88f6-bb67e8c36964',
                  '623d431b-0a8a-af0a-cc5c-7ab9a686e570',
                  '6889b59a-c832-a2d9-a77c-86e7fb4bbda8',
                  'c145ca50-ba54-2238-b256-d253a90fd547',
                  '76be4439-4190-89cf-983c-715c1082cf7d',
                  '9fc853de-8503-20da-ec68-98eee1cb046d'
                ])} />

              <Session
                dispatch={dispatch}
                title='' />

              <Session
                dispatch={dispatch}
                title='' />
            </TimeSlot>

            <TimeSlot time='14:20'>
              <Session dispatch={dispatch} title='Break' />
            </TimeSlot>

            <TimeSlot time='14:30'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('49e134d7-71a7-2a6c-a736-acc7886d628b')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('17c7ad9d-8e74-3dbd-b98d-bf08711ba067')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('ddffb679-7379-875d-be34-5229baca2104')} />
            </TimeSlot>

            <TimeSlot time='15:00'>
              <Session dispatch={dispatch} title='Break' />
            </TimeSlot>

            <TimeSlot time='15:10'>
              <GroupedSession
                dispatch={dispatch}
                title='Open Source Israel'
                fromProposals={this.getProposals([
                  '9656687f-2329-7e80-6e09-fcca29a48be6',
                  '235320b6-6145-5bbb-3f49-8dc54066f496',
                  'bc845832-7415-cdb9-3f58-6638e3f3e187',
                  '750bb2f3-066f-1fc3-f0b9-76074bc217ea',
                ])} />

              <Session
                dispatch={dispatch}
                title='' />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('46721c9e-726c-dcd8-d89e-b6199345ea69')} />
            </TimeSlot>

            <TimeSlot time='15:50'>
              <Session dispatch={dispatch} title='Break' />
            </TimeSlot>

            <TimeSlot time='16:10'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('fe55ef2c-0beb-e5c1-f3b5-eac89fcb2ea7')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('ceb637ef-bce8-d099-411f-37f0b69a4e9a')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('de7ad17c-eb2d-906c-5e69-5fe43f481f95')} />
            </TimeSlot>

            <TimeSlot time='16:50'>
              <Session dispatch={dispatch} title='Break' />
            </TimeSlot>

            <TimeSlot time='17:00'>
              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('b2fcd845-f7c7-e10f-d061-c74a5fbf7129')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('9253832a-4869-4d15-2faf-33d5ea74cea9')} />

              <Session
                dispatch={dispatch}
                fromProposal={this.getProposal('82d5147e-3d89-967d-2d13-b4bf2bf78da3')} />
            </TimeSlot>

            <TimeSlot time='17:40'>
              <Session dispatch={dispatch} title='Pizza & Beer Break' />
            </TimeSlot>

            <TimeSlot time='18:00'>
              <Session dispatch={dispatch} title='Hall of Shame' />
            </TimeSlot>

            <TimeSlot time='19:00'>
              <Session dispatch={dispatch} title='Goodbye' />
            </TimeSlot>
          </Day>

         */}
      </div>
    );
  }
}


Schedule.propTypes = {
  user: PropTypes.object,
  acceptedProposals: PropTypes.array
};

export default Schedule;