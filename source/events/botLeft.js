module.exports = (client, guild, sqlConnection) => {
    sqlConnection.query(`SELECT * FROM ${client.config.Config_Table} WHERE guild = '${guild.id}'`, (error, rows) => {
        if (error) return console.log(error.message);

        if (rows[0]) sqlConnection.query(`DELETE FROM ${client.config.mysql.connection.tables.config} WHERE guild = '${guild.id}'`); })
}