import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./styles.css";

import { initItems, newItem } from "./api";

class App extends React.Component {
  state = {
    name: "",
    data: [],
    enableSwitch: true,
    isLoading: true
  };
  onChangeName = e => {
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
      this.setState({ enableSwitch: false });
    } else {
      this.setState({ enableSwitch: true });
    }
    this.setState({ name: e.target.value });
  };
  addNewSwatch = async () => {
    let { data } = this.state;
    let getNewItem = await newItem(this.state.name);
    data.push(getNewItem);
    this.setState({ name: "", data: data, enableSwitch: true });
  };
  async componentDidMount() {
    let data = await initItems();
    setTimeout(() => {
      this.setState({ data: data, isLoading: false });
    });
  }
  render() {
    const { isLoading, enableSwitch, name } = this.state;
    return (
      <div className="App">
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <section>
            <input
              type="text"
              value={name}
              onChange={this.onChangeName}
              placeholder="#COFFEE"
            />
            <button onClick={this.addNewSwatch} disabled={enableSwitch}>
              Add Swatch
            </button>
            <CSSTransition
              in={true}
              appear={true}
              timeout={600}
              classNames="fade"
            >
              <ul>
                {this.state.data.map((ele, ind) => (
                  <li
                    className="color-block"
                    style={{ background: ele.color }}
                    key={ind}
                  >
                    {ele.name}
                  </li>
                ))}
              </ul>
            </CSSTransition>
          </section>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
