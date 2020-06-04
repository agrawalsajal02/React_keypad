import React, { Component } from "react";

var keys = {
  "1": Number,
  "2": ["a", "b", "c"],
  "3": ["d", "e", "f"],
  "4": ["g", "h", "i"],
  "5": ["j", "k", "l"],
  "6": ["m", "n", "o"],
  "7": ["p", "q", "r", "s"],
  "8": ["t", "u", "v"],
  "9": ["w", "x", "y", "z"],
  "0": Number,
};
export default class Keypad extends Component {
  constructor(props) {
    // keys.map((items)=>(console.log(items)))
    super(props);
    this.state = {
      text: "",
      id: 1,
      no: 0,
      timerid: null,
      date: Date,
    };

    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
  }
  handleButtonPress = () => {
    setTimeout(() => {}, 2000);

    clearTimeout(this.state.timerid);
    var d = new Date();
    var n = d.getTime();
    this.setState({ ...this.state, date: n });
  };

  handleButtonRelease = (id) => {
    clearTimeout(this.buttonPressTimer);
    this.setState({ ...this.setState, timerid: null });
    if (id === "0" || id === "1") {
      var te = { ...this.state };
      te.text = te.text.concat(id);
      this.setState(te);
      return;
    }

    var d = new Date();
    var n = d.getTime();
    if (n - this.state.date < 800) {
    
      if (this.state.timerid) {
        //   if timer exits
        clearTimeout(this.state.timerid);
    
        if (id === this.state.id) {
          var str = { ...this.state };
          str.text = str.text.substring(0, str.text.length - 1);

          var iter = this.state.no;
            if(!(id==='7'||id==='9')){
          if (iter === 2) {
            iter = 0;
          } else {
            iter = iter + 1;
          }
        }else{
            if (iter === 3) {
                iter = 0;
              } else {
                iter = iter + 1;
              }
            
        }

          str.no = iter;
          str.text = str.text.concat(keys[id][iter]);

          var time = this.timercall();
          str.timerid = time;
          this.setState(str);
        } 
        else {
          var str = { ...this.state };
          str.text = str.text.concat(keys[id][0]);
          str.id = id;
          str.no = 0;
          var time = this.timercall();
          str.timerid = time;

          this.setState(str);
        }
      } else {
    
        var tim = this.timercall();

        var t = { ...this.state };
        t.text = t.text.concat(keys[id][0]);
    t.id = id;
        t.no = 0;
        t.timerid = tim;
        this.setState(t);
      }
    } else {
      var copy = { ...this.state };
      copy.text = copy.text.concat(id.toString());
      copy.id = 1;
      copy.no = 0;
      copy.timerid = tim;
      this.setState(copy);
    }
  };

  timercall = () => {
    var time = setTimeout(() => {
      var st = { ...this.state };
      st.id = 1;
      st.no = 0;
      st.timerid = null;
      this.setState(st);
    }, 2000);
    return time;
  };

  remove = () => {
    clearTimeout(this.state.timerid);
    let str = { ...this.state };
    let len = str.text.length;
    str.text = str.text.substring(0, len - 1);
    str.timerid = null;
    this.setState(str);
  };

  clear = () => {
    this.setState({ ...this.state, text: "" });
  };

  render() {
    console.log(" re-rendering ");
    return (
      <div
        style={{
          width: "100%",
          textAlign: "center",
          margin: "auto",
          display: "block",
        }}
      >
        <div
          style={{
            height: "400px",
            width: "350px",
            textAlign: "center",
            margin: "auto",
            border: "2px red solid",
            "backgroundColor":"#FFFF00"
          }}
        >
          <h2 className="mt-3">Keypad</h2>
          <textarea className="mt-2" readOnly value={this.state.text} />
          <div></div>

          <div className="row pl-5 pt-3">
            {Object.entries(keys).map((entry) => (
              <div key={entry[0]}  className="col-3" style={{ margin: "5px" }}>
                <button
                  className="btn btn-primary"
                  onTouchEnd={() => this.handleButtonRelease(entry[0])}
                  onMouseDown={this.handleButtonPress}
                  onMouseUp={() => this.handleButtonRelease(entry[0])}
                >
                  <div>{entry.map((item) => item)}</div>
                </button>
              </div>
            ))}
            <button
              className="btn btn-primary ml-4" key="10"
              onClick={() => {
                this.remove();
              }}
            >
              <div>back</div>
            </button>

            <button
              className="btn btn-primary ml-4" key="11"
              onClick={() => {
                this.clear();
              }}
            >
              <div>Clear</div>
            </button>
          </div>

        </div>
      </div>
    );
  }
}
