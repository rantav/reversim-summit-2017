import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import styles from '../css/components/navigation.css';
import mStyles from '../css/main.css';

import logoImg from '../images/reversim_logo.png';
import logoImg2x from '../images/reversim_logo@2x.png';

const cx = classNames.bind(styles);
const mcx = classNames.bind(mStyles);

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fixed: false };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll.bind(this));
  }

  onScroll(e) {
    const fixed = window.scrollY > 60;
    this.setState({ fixed });
  }

  render() {
    let items = [
      { to: "about", text: "About" },
      { to: "team", text: "Team" },
      { to: "location", text: "Location" }
    ];

    items = items.map((item, i) => <li key={i}><Link to={item.to} className={cx("nav-link")} activeClassName={cx("active")}>{item.text}</Link></li>);

    return (
      <nav className={cx('navigation', { fixed: this.state.fixed })} role="navigation">
        <div className={cx('nav-content')}>
          <Link to="/" className={cx("logo")}>
            <img src={logoImg} alt="Reversim" width="143" height="63" className={mcx("retina-hide")} />
            <img src={logoImg2x} alt="Reversim" width="119" height="53" className={mcx("retina-show")} />
          </Link>
          <ul className={cx("nav-links")}>
            {items}
          </ul>
        </div>
      </nav>
    );
  }
}


Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
