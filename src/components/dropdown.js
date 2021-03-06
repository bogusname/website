import React, { Component } from "react";
import { injectIntl, Link, FormattedMessage } from "gatsby-plugin-intl";
class Dropdown extends Component {
  state = {
    showOptions: false
  };

  componentWillMount() {
    if (typeof document !== "undefined")
      document.addEventListener(
        "mousedown",
        this.handleClick.bind(this),
        false
      );
  }

  componentWillUnmount() {
    if (typeof document !== "undefined")
      document.removeEventListener(
        "mousedown",
        this.handleClick.bind(this),
        false
      );
  }

  handleClick(e) {
    if (
      !this.state.showOptions ||
      (this.node && this.node.contains(e.target))
    ) {
      return;
    }
    this.toggleOptions();
  }

  toggleOptions() {
    this.setState({
      showOptions: !this.state.showOptions
    });
  }

  render() {
    const data = this.props.data;
    const showOptions = this.state.showOptions;

    return (
      <li ref={node => (this.node = node)}>
        <a
          className={`hamburger-a dropdown-root ${
            showOptions ? "selected" : ""
          }`}
          onClick={this.toggleOptions.bind(this)}
        >
          {data.text}
        </a>
        {showOptions ? (
          <ul className="dropdown">
            {data.dropdownOptions.map((option, num) => {
              return (
                <li className="dropdown-item">
                  {this.props.data.intl && (
                    <Link to={option.url}>{option.text}</Link>
                  )}
                  {!this.props.data.intl && (
                    <a href={option.url}>{option.text}</a>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          ""
        )}
      </li>
    );
  }
}

export default injectIntl(Dropdown);
