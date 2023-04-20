module.exports = (client) => {
    client.on('error', (error) => {
        console.log(`\nError:\n${error.stack}\n`);
    })

    process.on('unhandledRejection', (error) => {
        console.error(`\nUnhandled Rejection:\n${error.stack}\n`)
    })

    process.on('uncaughtException', (error) => {
        console.log(`\n${(error ? error.stack || error : '').toString().replace(new RegExp(`${__dirname}/`, 'g'), './')}\n`);
    })
}



// MAYBE SCRAP / SAVE???