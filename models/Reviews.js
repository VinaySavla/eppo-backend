module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define("Reviews", {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Review: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        createdAt: 'TimeStamp',
        updatedAt: false,
    });
    return Reviews;
};
