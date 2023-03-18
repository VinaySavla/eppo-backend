module.exports = (sequelize, DataTypes) => {
    const Professional = sequelize.define("Professional", {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        MobileNumber: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        Profession: {
            type: DataTypes.STRING,
            allowNull: false
        },
        City: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Experience: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Availability: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        About: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        createdAt: 'TimeStamp',
        updatedAt: false,
    });
    return Professional;
};
