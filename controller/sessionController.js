const Session = require("../model/Session");

const createsession = async (req, res) => {
    const { event_id, title, start_time, end_time, speaker } = req.body
    console.log(req.body);
    // const session = await Session.create(req.body)
    // res.status(200).json(session)

    try {
        const startDate = new Date(start_time)
        const endDate = new Date(end_time)

        overlappingSession = await Session.findOne({
            event_id,
            $or: [
                {
                    start_time: { $lt: endDate },
                    end_time: { $gt: startDate },
                }
            ],
        });
        console.log('Overlapping session:', overlappingSession);

        if (overlappingSession) {
            return res.status(400).json({ message: 'Session time conflicts with an existing session.' })
        }

        const newSession = new Session({ event_id, title, start_time: startDate, end_time: endDate, speaker })
        await newSession.save();
        res.status(201).json(newSession)
    } catch (error) {
        console.error('Error creating session', error);
        
        res.status(500).json({ message: 'Server Error', error })
    }
}


const fetchsession = async (req, res) => {
    try {
        const session = await Session.find()
        res.status(200).json(session)
    }
    catch (err) {
        console.log(err)('Error in fetching events', err);
        res.status(500).json({ error: "failed to fetch events" })

    }
}

const fetchsessionByeventId = async (req, res) => {
    try {
        const eventid = req.params.id
        const sessions = await Session.find({ event_id: eventid })
        res.status(200).json(sessions)
    }
    catch (err) {
        console.log(err)("Error in fetching events", err);
        res.status(500).json({ error: "failed to fetch events" })

    }
}

const deletesession = async (req, res) => {
    try {
        const sessionid = req.params.id
        console.log(sessionid);
        const session = await Session.findByIdAndDelete(sessionid)
        res.status(200).json(session)
    } catch (error) {
        console.error("error fetching events:", error);
        res.status(500).json({ error: "failed to fetch events" })

    }
}

const updatesession = async (req, res) => {
    try {
        const sessionid = req.params.id
        console.log(req.body);
        const session = await Session.findByIdAndUpdate(sessionid, req.body, { new: true })
        console.log(session);
        res.status(200).json(session);
    } catch (error) {
        console.error("error fetching events:", error);
        res.status(500).json({ error: "failed to fetch events" })

    }
}

module.exports = { createsession, fetchsession, fetchsessionByeventId, deletesession, updatesession }