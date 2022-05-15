import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import watch from "./watch-dogs.svg";
import "./qr-scanner.css";

function QrScanner({ setWait, wait, setOpen, setBg, setMsg }) {
    const [reg, setReg] = useState("no res");

    async function handle_qr(qr) {
        console.log({ qr });
        console.log({ reg });

        setReg(qr);
        setWait(true);

        const response = await fetch(
            "http://localhost:3001/api/handle-in-out",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    reg: qr,
                }),
            }
        );

        const data = await response.json();
        console.log(data);

        if (data.action === "checkin") {
            setOpen(true);
            setMsg(`${data.reg} has successfuly checkin!`);
            setBg("green");
        } else if (data.action === "checkout") {
            setOpen(true);
            setMsg(`${data.reg} has successfuly checkedout!`);
            setBg("#1b73e8");
        }

        setTimeout(() => {
            setWait(false);
            setReg("no res");
        }, 1000);
    }

    return (
        <div className="qr-scanner">
            <div className="scanner-wrapper">
                {!wait ? (
                    <QrReader
                        className="actual-reader"
                        onResult={(result, error) => {
                            if (!!result) {
                                if (!wait) {
                                    handle_qr(String(result?.text));
                                }
                            }
                            if (!!error) {
                                console.info(error);
                            }
                        }}
                    />
                ) : (
                    // <div></div>
                    <img className="reader-loading" src={watch} alt="" />
                )}
                <p>{reg}</p>
            </div>
        </div>
    );
}

export default QrScanner;
