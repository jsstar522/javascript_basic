module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    comment: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('now()'),
    },
  },{
    tiemstamps: false,      //시간 자동생성 해제(create_at을 만들었으므로)
  })
}