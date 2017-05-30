import React, { Component } from 'react';
import classnames from 'classnames/bind';
import styles from 'css/components/tabs.css';
import fa from 'font-awesome/css/font-awesome.css';
import ga from 'react-ga';

const cx = classnames.bind(styles);
const fax = classnames.bind(fa);

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
    this.onTabClicked = this.onTabClicked.bind(this);
    this.tabContentClass = this.tabContentClass.bind(this);
  }

  onTabClicked(index) {
    return (event) => {
      event.preventDefault();

      ga.event({
        category: 'About',
        action: 'Change tab',
        value: index
      });

      this.setState({ activeTab: index });
    };
  }

  tabContentClass(index) {
    return this.state.activeTab === index ? cx('tab-content', 'active') : cx('tab-content');
  }

  render() {
    const { minHeight, tabs } = this.props;
    const tabElements = tabs.map((tab, index) => {
      return (
        <li key={index} className={this.state.activeTab === index ? cx("tab-header", "active") : cx("tab-header")}>
          <a href={`#horizontal_tab${index}`} onClick={this.onTabClicked(index)} data-toggle="tab">
            <i className={fax('fa', tab.icon)} /> {tab.name}
          </a>
        </li>
      );
    });

    const tabContent = tabs.map((tab, index) => {
      return (
        <div key={index} id={`horizontal_tab${index}`} className={this.tabContentClass(index)}>
          {tab.content}
        </div>
      );
    });

    return (
      <div className={cx('tabs')} style={{minHeight}}>
        <ul className={cx('tab-headers')}>
          {tabElements}
        </ul>
        <div className={cx("tab-contents")}>
          {tabContent}
        </div>
      </div>
    );
  }
};