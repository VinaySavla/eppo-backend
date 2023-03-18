module.exports = (sequelize, DataTypes) => {
    const PhoneOtp = sequelize.define("PhoneOtp", {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        MobileNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        OTP: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        createdAt: 'TimeStamp',
        updatedAt: false,
    });
    return PhoneOtp;
};
