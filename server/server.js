const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const Logs = require("./Models/Logs");
const Users = require("./Models/User");
const Visitors = require("./Models/Visitors");
const User = require("./Models/User");
const { json } = require("express");

let app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const TIME_OUT = 30; // time in minutes
const secrete_key = "secrete_key";
mongoose.connect("mongodb://127.0.0.1:27017/Library");

app.post("/visitor", async (req, res) => {
    try {
        const visitor = await Visitors.findOne({
            register_number: req.register_number,
        });
        if (!visitor) {
            res.json({
                status: "ok",
                code: "-1",
                err: "visitor not registered",
            });
            return;
        }
        if (visitor.isVisiting) {
            console.log("visiting");
        } else {
            console.log("not visiting");
        }
    } catch (err) {
        res.json({ status: "err" });
    }
});

// login
app.post("/api/login", async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findOne({
            register_number: req.body.username,
            password: req.body.password,
        });
        if (user) {
            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                    register_number: user.register_number,
                    type: user.type,
                    isDisenabled: user.disenable,
                },
                secrete_key
            );
            res.json({ status: "ok", user: token });
        } else {
            res.json({ status: "ok", user: false });
        }
    } catch (err) {
        res.json({ status: "err" });
        console.log(err);
    }
});

// regestering a visitor
app.post("/reigster-visitor", async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        const decode = jwt.verify(token, secrete_key);
        if (decode) {
            const visitor = await Visitors.create({
                name: req.body.name,
                email: req.body.email,
                register_number: req.body.reg,
                registerBy: decode.register_number,
                isVisiting: false,
            });
            res.json({ status: "ok" });
            console.log("registered");
        } else {
            res.json({ status: "err", err: "token error" });
        }
    } catch (err) {
        res.json({ status: "err" });
        console.log(err);
    }
});

// settings
app.post("/api/fetch-user", async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        const decode = jwt.verify(token, secrete_key);
        if (decode) {
            const user = await User.findOne({
                register_number: decode.register_number,
            });
            res.json({
                status: "ok",
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                register_number: user.register_number,
                register_date: user.lastname,
                qr_delay: user.qr_delay,
                smart_catching: user.smart_catching,
                darkTheme: user.darkTheme,
                type: user.type,
            });
            console.log("user data fetched");
        } else {
            res.json({ status: "ok", error: "token error" });
        }
    } catch (err) {
        res.json({ status: "error" });
        console.log(err);
    }
});

const handle_checkin = async (user_reg, visitor) => {
    // toggling the visitor profile to true
    console.log(`checked in: ${visitor.register_number}`);

    // enabling the visitig flag
    await Visitors.updateOne(
        { register_number: visitor.register_number },
        { $set: { isVisiting: true } }
    );

    // updating the log
    await Logs.create({
        register_number: visitor.register_number,
        verifiedBy: user_reg,
        checkin: Date.now(),
        checkout: null,
        status: "checkedin",
    });
};

const handle_checkout = async (user_reg, visitor) => {
    // toggling the visitor profile to false
    console.log(`checked out: ${visitor.register_number}`);

    // disenabling the visitig flag
    await Visitors.updateOne(
        { register_number: visitor.register_number },
        { $set: { isVisiting: false } }
    );

    // updating the log
    const last_checkin = await Logs.find({
        register_number: visitor.register_number,
    })
        .sort({ checkin: -1 })
        .limit(1);
    const last_checkin_time = last_checkin[0].checkin;
    const last_checkin_id = last_checkin[0]._id;
    const time_difference = Date.now() - last_checkin_time;
    const minutes = Math.floor(time_difference / 60000);
    console.log({ minutes });
    if (TIME_OUT < minutes) {
        console.log("Time limit exceded");
        // return "-1";
        // tldr chekout data need to be handled if time out happens
    } else {
        console.log("time limit not exceded");
    }

    console.log({
        _id: last_checkin_id,
    });
    await Logs.updateOne(
        { _id: last_checkin_id, register_number: visitor.register_number },
        { $set: { checkout: Date.now(), status: "checkedout" } }
    );
    return 1;
};

app.post("/api/handle-in-out", async (req, res) => {
    console.log(req.body);
    try {
        const token = req.headers["x-access-token"];
        const decode = jwt.verify(token, secrete_key);
        if (decode) {
            const reg_no = req.body.reg;
            const visitor = await Visitors.findOne({
                register_number: reg_no,
            });
            if (!visitor) {
                res.json({ status: "ok", err: "visitor not valid" });
                console.log("visitor not found!");
                // this have to be handled in the front end
                return;
            }

            // toggling the checkin and checkout
            if (visitor.isVisiting) {
                await handle_checkout(reg_no, visitor);
                res.json({
                    status: "okay",
                    action: "checkout",
                    reg: visitor.register_number,
                });
            } else {
                await handle_checkin(decode.register_number, visitor);
                res.json({
                    status: "okay",
                    action: "checkin",
                    reg: visitor.register_number,
                });
            }
        } else {
            res.json({ status: "err", err: "token error" });
            return;
        }
    } catch (err) {
        res.json({ status: "err" });
        console.log(err);
    }
});

app.post("/api/settings/profile-changes", async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        const decode = jwt.verify(token, secrete_key);
        if (decode) {
            console.log(req.body);
            await User.updateOne(
                {
                    register_number: decode.register_number,
                },
                {
                    name: req.body.name,
                    lastname: req.body.last_name,
                    email: req.body.email,
                }
            );
            console.log("profile updated");
            res.json({ status: "ok" });
        } else {
            res.json({ status: "err", error: "invalid token" });
        }
    } catch (err) {
        res.json({ status: "err" });
        console.log(err);
    }
});

app.post("/api/settings/preferences-changes", async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        const decode = jwt.verify(token, secrete_key);
        if (decode) {
            await User.updateOne(
                {
                    register_number: decode.register_number,
                },
                {
                    qr_delay: req.body.qr_delay,
                    smart_catching: req.body.s_caching,
                    darkTheme: req.body.darkTheme,
                }
            );
            console.log("preferences updated");
            res.json({ status: "ok" });
        } else {
            res.json({ status: "err", error: "invalid token" });
        }
    } catch (err) {
        res.json({ status: "err" });
        console.log(err);
    }
});

app.post("/api/logs/fetch-active-visitors", async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        const decode = jwt.verify(token, secrete_key);
        if (decode) {
            let active_visitors = await Logs.find({
                status: "checkedin",
            });
            res.json({ status: "ok", active_visitors: active_visitors });
        } else {
            res.json({ status: "err", error: "invalid token" });
        }
    } catch (err) {
        res.json({ status: "err" });
        console.log(err);
    }
});

app.post("/api/logs/fetch-heatmap-log", async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        const decode = jwt.verify(token, secrete_key);
        if (decode) {
            const logs = await Logs.find({
                register_number: req.body.register_no.toUpperCase(),
                checkout: { $ne: null },
            });

            let hash = {};
            let years_hash = {};
            logs.map((element) => {
                let day = moment(element.checkin).format("YYYY-MM-DD");
                let value = Math.floor(
                    (element.checkout - element.checkin) / 60000
                );
                years_hash[moment(day).format("YYYY")] = true;
                if (hash.hasOwnProperty(day)) {
                    hash[day] += value;
                } else {
                    hash[day] = value;
                }
            });

            let years = [];
            for (let year in years_hash) {
                years.push(Number(year));
            }

            let payload = [];
            for (let key in hash) {
                day = key;
                let value = hash[key];
                payload.push({ day, value });
            }

            res.json({ status: "ok", years: years, logs: payload });
        } else {
            res.json({ status: "err", error: "invalid token" });
        }
    } catch (err) {
        res.json({ status: "err" });
        console.log(err);
    }
});

app.post("/api/logs/fetch-stat-log", async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        const decode = jwt.verify(token, secrete_key);
        if (decode) {
            let logs = [];
            logs = await Logs.find({
                register_number: req.body.register_no.toUpperCase(),
                checkout: { $ne: null },
            });
            let hash = {};
            logs.map((element) => {
                let day = moment(element.checkin).format("MM-DD-YYYY");
                let value = Math.floor(
                    (element.checkout - element.checkin) / 60000
                );
                if (hash.hasOwnProperty(day)) {
                    hash[day] += value;
                } else {
                    hash[day] = value;
                }
            });

            let payload = [];
            for (let key in hash) {
                day = key;
                let value = hash[key];
                payload.push({ day, value });
            }
            // console.log(payload);

            res.json({ status: "ok", logs: payload });
        } else {
            res.json({ status: "err", error: "invalid token" });
        }
    } catch (err) {
        res.json({ status: "err" });
        console.log(err);
    }
});

// User.create({
//     name: "vaisakh",
//     lastname: "b",
//     email: "vaisakh2077@gmail.com",
//     register_number: "vaisakh2077",
//     register_date: Date.now(),
//     qr_delay: 1,
//     smart_catching: true,
//     darkTheme: true,
//     password: "nasa",
//     type: "admin",
//     disenable: false,
// });

app.listen(PORT, (err) => {
    console.log(err);
});
