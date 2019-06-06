var Event_participant = require("./event_participant"),
    Group = require("./group"),
    Event_hall = require("./event_hall"),
    Participant = require("./participant"),
    User_group = require("./user_group"),
    Event = require("./event"),
    Attendance = require("./attendance"),
    Hall = require("./hall"),
    Template_hall = require("./template_hall"),
    User = require("./user")

exports.assignAPIRoutes = function (app) {
    app.get('/', (req, res) => {
        return res.send('Hello world ! Welcome to Clean architecture for Node.JS project')
    });

    //#region User route
    app.post('/event_participant/getAll', Event_participant.getAll);
    app.post('/event_participant/getById', Event_participant.getById);
    app.post('/event_participant/create', Event_participant.create);
    app.post('/event_participant/delete', Event_participant.delete);
    app.post('/event_participant/update', Event_participant.update);
    app.post('/group/getAll', Group.getAll);
    app.post('/group/getById', Group.getById);
    app.post('/group/create', Group.create);
    app.post('/group/delete', Group.delete);
    app.post('/group/update', Group.update);
    app.post('/event_hall/getAll', Event_hall.getAll);
    app.post('/event_hall/getById', Event_hall.getById);
    app.post('/event_hall/create', Event_hall.create);
    app.post('/event_hall/delete', Event_hall.delete);
    app.post('/event_hall/update', Event_hall.update);
    app.post('/participant/getAll', Participant.getAll);
    app.post('/participant/getById', Participant.getById);
    app.post('/participant/create', Participant.create);
    app.post('/participant/delete', Participant.delete);
    app.post('/participant/update', Participant.update);
    app.post('/user_group/getAll', User_group.getAll);
    app.post('/user_group/getById', User_group.getById);
    app.post('/user_group/create', User_group.create);
    app.post('/user_group/delete', User_group.delete);
    app.post('/user_group/update', User_group.update);
    app.post('/event/getAll', Event.getAll);
    app.post('/event/getById', Event.getById);
    app.post('/event/create', Event.create);
    app.post('/event/delete', Event.delete);
    app.post('/event/update', Event.update);
    app.post('/attendance/getAll', Attendance.getAll);
    app.post('/attendance/getById', Attendance.getById);
    app.post('/attendance/create', Attendance.create);
    app.post('/attendance/delete', Attendance.delete);
    app.post('/attendance/update', Attendance.update);
    app.post('/hall/getAll', Hall.getAll);
    app.post('/hall/getById', Hall.getById);
    app.post('/hall/create', Hall.create);
    app.post('/hall/delete', Hall.delete);
    app.post('/hall/update', Hall.update);
    app.post('/template_hall/getAll', Template_hall.getAll);
    app.post('/template_hall/getById', Template_hall.getById);
    app.post('/template_hall/create', Template_hall.create);
    app.post('/template_hall/delete', Template_hall.delete);
    app.post('/template_hall/update', Template_hall.update);
    app.post('/user/getAll', User.getAll);
    app.post('/user/getById', User.getById);
    app.post('/user/create', User.create);
    app.post('/user/delete', User.delete);
    app.post('/user/update', User.update);
}