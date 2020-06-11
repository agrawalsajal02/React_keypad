import React, { Component } from "react";
import keys from "./keys";
import Button from "./Button";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 400px;
  width: 350px;
  text-align: center;
  margin: auto;
  border: 2px red solid;
  background: #ffff00;
`;

const Textarea = styled.textarea`
  resize: none;
`;

export default class Keypad extends Component {
  state = {
    text: "" /* text displaying on screen */,
    keyId: -1 /* key position */,
    arrNo: 0 /* alphabet in perticular key position */,
    timerId: null /*  Previous timer Running  */,
    timeStamp: Date /*  time stamp of on mouse down */,
  };




  /**
   *
   *on Mouse down event trigger this func
   * @memberof Keypad
   */


   handleButtonPress = () => {
    const date = new Date().getTime();
    this.setState({ timeStamp: date });
  };





  /**
   *
   *on mouse up button to record time difference 
   * @memberof Keypad
   */


  handleButtonRelease = (id) => {
    /*   condiction for 0 and 1 keys  */

    if (id === "0" || id === "1") {
      const { text } = this.state;
      this.setState({
        text: text.concat(id),
        timerId: null,
        date: null,
        keyId: -1,
      });
    } else {
      /*   Difference between the mouse up and mouse down    */

      const currTime = new Date().getTime();
      if (currTime - this.state.timeStamp < 800) {
        if (this.state.timerId) {
          /*  Previous timer exits */

          clearTimeout(this.state.timerId);

          if (id === this.state.keyId) {
            /* Same Key is pressed again frequently */

            let { arrNo, text } = this.state;
            text = text.substring(0, text.length - 1);

            let arrPos = arrNo;

            /* Exception for 7 and 9 key , unless all revert back to 0 cyclically */
            if (!(id === "7" || id === "9")) {
              if (arrPos === 2) {
                arrPos = 0;
              } else {
                arrPos = arrPos + 1;
              }
            } else {
              if (arrPos === 3) {
                arrPos = 0;
              } else {
                arrPos = arrPos + 1;
              }
            }

            text = text.concat(keys[id][arrPos]);

            const time = this.timercall();
            this.setState({ timerId: time, arrNo: arrPos, text: text });
          } else {
            /*   Different Key is pressed frequently */
            let { text } = this.state;
            const time = this.timercall();
            this.setState({
              text: text.concat(keys[id][0]),
              keyId: id,
              arrNo: 0,
              timerId: time,
            });
          }
        } else {
          /*   if previous timer is not there  */
          const timer = this.timercall();

          let { text } = this.state;
          this.setState({
            text: text.concat(keys[id][0]),
            keyId: id,
            arrNo: 0,
            timerId: timer,
          });
        }
      } else {
        /*   Long press of key to show button   */
        let { text } = this.state;
        this.setState({
          text: text.concat(id.toString()),
          keyId: -1,
          arrNo: 0,
          timerId: null,
        });
      }
    }
  };

  /**
   *
   *Timer function to calculate time
   * @memberof Keypad
   */
  timercall = () => {
    const timer = setTimeout(() => {
      this.setState({ keyId: -1, arrNo: 0, timerId: null });
    }, 2000);
    return timer;
  };




  /**
   *
   * To remove the rightmost alphabet on screen
   * @memberof Keypad
   */
  remove = () => {
    clearTimeout(this.state.timerid);
    let { text } = this.state;
    const len = text.length;
    text = text.substring(0, len - 1);
    this.setState({ timerId: null, text: text });
  };



  /**
   *
   *To clear all screen 
   * @memberof Keypad
   */
  clear = () => {
    this.setState({
      text: "",
      keyId: -1,
      arrNo: 0,
      timerId: null,
      timeStamp: null,
    });
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <Wrapper>
          <h2 className="mt-3">Keypad</h2>
          <Textarea rows="1" cols="27" className="mt-2" readOnly value={text} />
          <div></div>

          <Button
            clear={this.clear}
            back={this.remove}
            mousedown={this.handleButtonPress}
            mouseup={(id) => {
              this.handleButtonRelease(id);
            }}
          />
        </Wrapper>
      </div>
    );
  }
}
