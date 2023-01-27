const db = require("../model")

exports.findPanels = async (req, res) => {
    db.Panel.find()
        .then((panels) => {
            res.json(panels);
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.createPanel = async (req, res) => {
    try {
        const newPanel = await db.Panel.create(req.body.panel)
        const src = req.files['panel[panelSrc]'][0]
        newPanel.panelSrc = {
            url: src.path,
            filename: src.filename
        }
        const vol = req.files["panel[fromManga.MangaVol]"][0]
        newPanel.fromManga.MangaVol = {
            url: vol.path,
            filename: vol.filename
        }
        await newPanel.save();
        res.status(201).json(newPanel);
    }
    catch (e) {
        res.send(e)
    }


    /*  db.Panel.create(req.body.panel)
         .then((newPanel) => {
             res.status(201).json(newPanel);
         })
         .catch(err => {
             res.send(err);
         }) */
}

exports.findPanel = async (req, res) => {
    db.Panel.findById(req.params.panelId)
        .then((foundPanel) => {
            res.json(foundPanel);
        })
        .catch(err => {
            res.send(err)
        })
}

exports.deletePanel = async (req, res) => {
    db.Panel.remove({ _id: req.params.panelId })
        .then(function () {
            res.json({ message: "Deleted!" })
        })
        .catch(function (err) {
            res.send(err);
        })
}

exports.upvotePanel = async (req, res) => {
    const panel = await db.Panel.findById(req.params.panelId);
    panel.upvotes.push(req.user._id);
    await panel.save();
    res.json(panel);
}


exports.removeUpvotePanel = async (req, res) => {
    const panel = await db.Panel.findById(req.params.panelId);
    panel.upvotes.pop(req.user._id);
    await panel.save();
    res.json(panel);
}


exports.downvotePanel = async (req, res) => {
    const panel = await db.Panel.findById(req.params.panelId);
    panel.downvotes.push(req.user._id);
    await panel.save();
    res.json(panel)
}


exports.removeDownvotePanel = async (req, res) => {
    const panel = await db.Panel.findById(req.params.panelId);
    panel.downvotes.pop(req.user._id);
    await panel.save();
    res.json(panel);
}






module.exports = exports;