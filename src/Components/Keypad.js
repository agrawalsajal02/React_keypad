import React, { Component } from "react";
import keys from "./keys";
import Button from "./Button"
import styled from 'styled-components';
export default class Keypad extends Component {
  
  
    state = {
    text: "" /* text displaying on screen */,
    key_id: -1 /* key position */,
    arr_no: 0 /* alphabet in perticular key position */,
    timerid: null /*  Previous timer Running  */,
    timeStamp: Date /*  time stamp of on mouse down */,
  };

  /*   on Mouse down event trigger this func  */
  /*   Set the  */

  handleButtonPress = () => {
    const date = new Date().getTime();
    this.setState({ timeStamp: date });
  };

  
  /*  on mouse up button to record time diffrenence */ 
  
  handleButtonRelease = (id) => {
    /*   condiction for 0 and 1 keys  */
    if (id === "0" || id === "1") {
      const state_copy = { ...this.state };
      state_copy.text = state_copy.text.concat(id);
      state_copy.timerid = null;
      state_copy.date = null;
      state_copy.id = -1;
      this.setState(state_copy);
      
    }else{


    /*   Difference between the mouse up and mouse down    */

    const currTime = new Date().getTime();
    if (currTime - this.state.timeStamp < 800) {
      if (this.state.timerid) {
    
    
   /*  Previous timer exits */      
        clearTimeout(this.state.timerid);

        if (id === this.state.key_id) {

        /* Same Key is pressed again frequently */

          const stateCopy = { ...this.state };

          stateCopy.text = stateCopy.text.substring(
            0,
            stateCopy.text.length - 1
          );

          let arr_pos =this.state.arr_no;
          
          /* Exception for 7 and 9 key , unless all revert back to 0 cyclically */
          if (!(id === "7" || id === "9")) {
            if (arr_pos === 2) {
              arr_pos = 0;
            } else {
              arr_pos = arr_pos + 1;
            }
          } else {
            if (arr_pos === 3) {
              arr_pos = 0;
            } else {
              arr_pos = arr_pos + 1;
            }
          }

          stateCopy.arr_no = arr_pos;

          stateCopy.text = stateCopy.text.concat(keys[id][arr_pos]);

          const time = this.timercall();
          stateCopy.timerid = time;
          this.setState(stateCopy);
        } else {

            /*   Different Key is pressed frequently */
          const stateCopy = { ...this.state };
          stateCopy.text = stateCopy.text.concat(keys[id][0]);
          stateCopy.key_id = id;
          stateCopy.arr_no = 0;
          const time = this.timercall();
          stateCopy.timerid = time;
          this.setState(stateCopy);
        }
      } else {

        /*   if previous timer is not there  */
        const timer = this.timercall();

        const stateCopy = { ...this.state };
        stateCopy.text = stateCopy.text.concat(keys[id][0]);
        stateCopy.key_id = id;
        stateCopy.arr_no = 0;
        stateCopy.timerid = timer;
        this.setState(stateCopy);
      }
    } else {

      /*   Long press of key to show button   */
      const stateCopy = { ...this.state };
      stateCopy.text = stateCopy.text.concat(id.toString());
      stateCopy.key_id = -1;
      stateCopy.arr_no = 0;
      stateCopy.timerid = null;
      this.setState(stateCopy);
    }
  };
  }


/* Timer function  */

  timercall = () => {
    const timer = setTimeout(() => {
      const stateCopy = { ...this.state };
      stateCopy.key_id = -1;
      stateCopy.arr_no = 0;
      stateCopy.timerid = null;
      this.setState(stateCopy);
    }, 2000);
    return timer;
  };



  /*   To remove the rightmost alphabet on screen */
  remove = () => {
    clearTimeout(this.state.timerid);
    const stateCopy = { ...this.state };
    const len = stateCopy.text.length;
    stateCopy.text = stateCopy.text.substring(0, len - 1);
    stateCopy.timerid = null;
    this.setState(stateCopy);
  };


  /*   To clear all screen */
  clear = () => {
    this.setState({
      ...this.state,
      text: "",
      key_id: -1,
      arr_no: 0,
      timerid: null,
      timeStamp: null,
    });
  };

  render() {
    return (
      <div>
        <Wrapper>
          <h2 className="mt-3">Keypad</h2>
          <textarea
          rows="1" cols="27"
            className="mt-2"
            readOnly
            style={{ resize: "none" }}
            value={this.state.text}
          />
          <div></div>
           
        <Button clear={this.clear} back={this.remove} 
        mousedown={this.handleButtonPress}
         mouseup={(id)=>{this.handleButtonRelease(id)}}   />            
          
        </Wrapper>
      </div>
    );
  }
}



const Wrapper =styled.div`
height: 400px;
width: 350px;
textAlign: center;
margin: auto;
border: 2px red solid;
background: #FFFF00;

`;