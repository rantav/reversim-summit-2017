import React from 'react';
import fa from 'font-awesome/css/font-awesome.css';
import classnames from 'classnames/bind';

const fax = classnames.bind(fa);

export default ({ name, children, icon }) => {
  const iconEl = icon ? <i className={fax("fa", icon)} style={{ color: "#1ac6ff", marginRight: "1rem" }}/> : null;
  const heading = name ? <h3>{iconEl}{name}</h3> : null;
  return (
    <section>
      { heading }
      { children }
    </section>
  );
};