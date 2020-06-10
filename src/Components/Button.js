import React, { Component } from "react";
import keys from "./keys";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 20px;
`;

const ButtonWrap = styled.div`
  flex: 1;
`;

export default class Button extends Component {
  render() {
    return (
      <Wrapper>
        {Object.entries(keys).map((entry) => (
          <ButtonWrap
            className="btn btn-primary btn-xg btn-block mx-3 my-2"
            onTouchEnd={() => {
              this.props.mouseup(entry[0]);
            }}
            onMouseDown={this.props.mousedown}
            onMouseUp={() => {
              this.props.mouseup(entry[0]);
            }}
          >
            <div>{entry.map((item) => item)}</div>
          </ButtonWrap>
        ))}
        <ButtonWrap
          className="btn btn-primary btn-xg btn-block  mx-3 my-2"
          key="10"
          onClick={this.props.back}
        >
          <div>back</div>
        </ButtonWrap>

        <ButtonWrap
          className="btn btn-primary  btn-xg btn-block  mx-3 my-2"
          key="11"
          onClick={this.props.clear}
        >
          <div>Clear</div>
        </ButtonWrap>
      </Wrapper>
    );
  }
}
