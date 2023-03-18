module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define("Appointments", {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        TransactionId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TransactionStatus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        AppointmentStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PaidAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Notified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        createdAt: 'TimeStamp',
        updatedAt: false,
    });
    return Appointments;
};
