module.exports = (client, guild, con) => {
    con.query(`SELECT * FROM ${client.config.Config_Table} WHERE guild = '${guild.id}'`, (error, rows) => {
        if (error) {
            console.log(error);
        }

        if (rows[0]) {
            con.query(`DELETE FROM ${client.config.Config_Table} WHERE guild = '${guild.id}'`);
        }
    })
}