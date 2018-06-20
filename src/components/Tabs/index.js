import React from 'react';
import './index.css';

// const win = window;

const UnderLineBar = ({ leftDistance, tintColor }) => {
  return (
    <div
      className="rb-tab-underline"
      style={{
        left: `${leftDistance}%`,
        borderColor: tintColor,
        transition: 'all ease-in-out .3s',
        top: 42,
      }}
    />
  );
};

class Tab extends React.Component {
  state = {
    currentPage: 0,
    contentWidth: 375,
  }

  static defaultProps = {
    tabs: [],
    initialPage: 0,
    tintColor: '#FF9900',
  }
  componentDidMount() {
    this.setState({
      currentPage: this.props.initialPage,
      contentWidth: this.contentContainer.getBoundingClientRect().width,
    });
  }
  handleHeaderTouch = (e, idx) => {
    this.setState({
      currentPage: idx,
    });
  }

  renderHeader = (currentPage, tabs) => {
    const itemWith = 33.3333;
    // controlling the header move around
    let translate = `translateX(${currentPage > 1 ? -itemWith * (currentPage - 1) : 0}%)`;
    // when reach the last one
    // do not move the header
    translate = currentPage + 1 === tabs.length ? `translateX(${-itemWith * (currentPage - 2)}%)` : translate;
    return (
      <div className="rb-tab-header-wrapper">
        <div className="rb-tab-header-container" style={{ transform: translate, transition: 'all ease-in-out .3s' }}>
          {tabs.map((tab, idx) => {
            // when is active
            // change className for change color
            const active = idx === currentPage ? 'rb-tab-active' : '';
            return (
              <div
                style={{ color: active === 'rb-tab-active' ? this.props.tintColor : '' }}
                onTouchEnd={e => this.handleHeaderTouch(e, idx)}
                className={`rb-tab-item ${active}`}
                key={idx}
              >
                {tab.title}
              </div>
            );
          })}
          <UnderLineBar tintColor={this.props.tintColor} leftDistance={itemWith * currentPage} />
        </div>
      </div>
    );
  }

  render() {
    const { children, tabs } = this.props;
    const { currentPage, contentWidth } = this.state;

    return (
      <div className="rb-tab-container">
        {this.renderHeader(currentPage, tabs)}
        <div className="rb-tab-content-wrap">
          <div
            ref={node => (this.contentContainer = node)}
            className="rb-tab-content-container"
            style={{
              display: 'flex',
              flexDirection: 'row',
              transition: 'all .3s',
              transform: `translateX(-${contentWidth * currentPage}px)`,
            }}
          >
            {children.map((child, idx) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: contentWidth,
                  }}
                  key={idx}
                >
                  {child}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Tab;