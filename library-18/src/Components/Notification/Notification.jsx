import React from "react";
import Snackbar from "@mui/material/Snackbar";

function Notification() {
    //snackbar
    const [open, setOpen] = useState(false);
    const [mgs, setMgs] = useState("");
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        // setOpen(false);
    };
    return (
        <div>
            <div>
                <Snackbar
                    // message="KH.SC.P2MCA21032 hash succesfully checked in"
                    message={mgs}
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={4000}
                    anchorOrigin={{
                        horizontal: "left",
                        vertical: "bottom",
                    }}
                    sx={{
                        width: 400,
                        color: "secondary",
                        "& .MuiSnackbarContent-root": {
                            backgroundColor: "green",
                            backgroundColor: "#FFCC00",
                            color: "black",
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default Notification;
