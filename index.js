const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const store = new session.MemoryStore();
const PORT = 3001;

app.use(session({
  secret: "some secret",
  cookie: { maxAge: 60000 },
  saveUninitialized: false,
  store
}))

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    return callback(null, true);
  }
}));

const db = require("./models");


//Foreign Keys

// //One to Many
db.User.hasMany(db.Appointments, { foreignKey: 'UserId', as: 'appointment' });
db.Appointments.belongsTo(db.User, { foreignKey: 'UserId', as: 'user' });

db.Professional.hasMany(db.Appointments, { foreignKey: 'ProfessionalId', as: 'appointment' });
db.Appointments.belongsTo(db.Professional, { foreignKey: 'ProfessionalId', as: 'professional' });

db.User.hasMany(db.Reviews, { foreignKey: 'UserId', as: 'review' });
db.Reviews.belongsTo(db.User, { foreignKey: 'UserId', as: 'user' });

db.Professional.hasMany(db.Reviews, { foreignKey: 'ProfessionalId', as: 'review' });
db.Reviews.belongsTo(db.Professional, { foreignKey: 'ProfessionalId', as: 'professional' });

// db.User.hasMany(db.Status, { foreignKey: 'UserId', as: 'statuses' });
// db.Status.belongsTo(db.User, { foreignKey: 'UserId', as: 'user' });

// db.HelpType.hasMany(db.Case, { foreignKey: 'HelpTypeId', as: 'cases' });
// db.Case.belongsTo(db.HelpType, { foreignKey: 'HelpTypeId', as: 'helptype' });

// db.ChatSession.hasMany(db.ChatLog, { foreignKey: 'SessionId', as: 'chatlogs' });
// db.ChatLog.belongsTo(db.ChatSession, { foreignKey: 'SessionId', as: 'chatsession' });

// db.User.hasMany(db.ChatSession, { foreignKey: 'UserId', as: 'chatsessions' });
// db.ChatSession.belongsTo(db.User, { foreignKey: 'UserId', as: 'user' });

// db.enterpriseTable.hasMany(db.User, { foreignKey: 'EnterpriseId', as: 'users' });
// db.User.belongsTo(db.enterpriseTable, { foreignKey: 'EnterpriseId', as: 'enterprise' });

// //One To One

// db.Case.hasOne(db.ChatSession, { foreignKey: 'CaseId', as: 'session' });
// db.ChatSession.belongsTo(db.Case, { foreignKey: 'CaseId', as: 'case' });

// db.enterpriseTable.hasOne(db.User, { foreignKey: 'UserId', as: 'user' });
// db.User.belongsTo(db.enterpriseTable, { foreignKey: 'UserId', as: 'enterprise' });
// Routers
const Eppo = require("./routes/eppo");
app.use("/data", Eppo);

//OTP
const Otp = require("./routes/otp");
app.use("/otp", Otp);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
});

// Run All Crons
// const runCrons = require("./crons");
// runCrons();
