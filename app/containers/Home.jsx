import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import styles from '../css/components/home.css';
import mstyles from '../css/main.css';
import fa from 'font-awesome/css/font-awesome.css';


import hero from '../images/hero.jpg';

const cx = classnames.bind(styles);
const mcx = classnames.bind(mstyles);
const fax = classnames.bind(fa);

const Home = (props) => {
  return (
    <div className={cx("home")}>
      <section className={cx("hero")}>
        <div className={classnames(cx("hero-shade"), mcx("stretch"))}/>
        <div className={cx("hero-text")}>
          <div className={cx("hero-subtitle")}>
            <i className={fax("fa","fa-calendar-o")}></i>15-16.OCT&nbsp;&nbsp;
            <i className={fax("fa","fa-map-marker")}></i>COLLEGE OF MANAGEMENT
          </div>
          <h1>Reversim<br/>Summit 2017</h1>
          <h2>Coming Soon</h2>
        </div>
      </section>
      <section>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
        <p>bla bla bla</p>
      </section>
    </div>
  );
};

function stateToProps(state) {
  return { name: state.name };
}


export default connect(stateToProps, {})(Home);
