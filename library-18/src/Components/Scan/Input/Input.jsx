import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./input.css";

function Input({ handle_submit, setReg, reg }) {
    return (
        <div className="input-scanner">
            {/* <div> */}
            <form className="input-wrapper" onSubmit={handle_submit}>
                <div className="input-field">
                    <TextField
                        id="outlined-basic"
                        label="Register number"
                        variant="outlined"
                        size="small"
                        value={reg}
                        onChange={(e) => {
                            setReg(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <Button
                        type="submit"
                        className="inp-btn"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </div>
            </form>
            {/* </div> */}
        </div>
    );
}

export default Input;
