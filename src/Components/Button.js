import React, { Component } from 'react'
import keys from "./keys";

export default class Button extends Component {
    render() {
        return (
            <div style={{ "display": "flex","justify-content":"space-around","flexWrap":"wrap",padding:"20px"}}>
            {Object.entries(keys).map((entry) => (
              <div key={entry[0]}  className="mt-2 mb-2 ml-2 mr-2" style={{flexBasis: "25%"}} >
                <button
                  className="btn btn-primary btn-xg btn-block"
                  onTouchEnd={this.props.mouseup.bind(this,entry[0])}
                  onMouseDown={this.props.mousedown}
                  onMouseUp={this.props.mouseup.bind(this,entry[0])}
                >
                  <div>{entry.map((item) => item)}</div>
                </button>
              </div>
            ))}
            <button
              className="btn btn-primary"
              style={{flexBasis: "25%"}}
              key="10"
              onClick={
                this.props.back}
            >
              <div>back</div>
            </button>

            <button
              className="btn btn-primary"
              key="11"
              style={{flexBasis: "25%"}}
              onClick={
                    this.props.clear}
            >
              <div>Clear</div>
            </button>
          </div>)
    }
}
