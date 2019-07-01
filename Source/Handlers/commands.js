module.exports = (client) => {
    // Assistance Commands
    client.commands.set('help', require('../Commands/Assistance/help.js'));
    client.commands.set('support', require('../Commands/Assistance/support.js'));
    
    // Bot Commands
    client.commands.set('config', require('../Commands/Bot/config.js'));
    client.commands.set('info', require('../Commands/Bot/info.js'));
    client.commands.set('ping', require('../Commands/Bot/ping.js'));

    // Guild Commands
    client.commands.set('ban', require('../Commands/Guild/ban.js'));
    client.commands.set('kick', require('../Commands/Guild/kick.js'));
    client.commands.set('mute', require('../Commands/Guild/mute.js'));
    client.commands.set('purge', require('../Commands/Guild/purge.js'));
    client.commands.set('report', require('../Commands/Guild/report.js'));
    client.commands.set('setup', require('../Commands/Guild/setup.js'));
    client.commands.set('unban', require('../Commands/Guild/unban.js'));
    client.commands.set('unmute', require('../Commands/Guild/unmute.js'));

    // Misc Commands
    client.commands.set('8ball', require('../Commands/Misc/8ball.js'));
    client.commands.set('invite', require('../Commands/Misc/invite.js'));
    client.commands.set('leaderboard', require('../Commands/Misc/leaderboard.js'));
    client.commands.set('roll', require('../Commands/Misc/roll.js'));
    client.commands.set('stats', require('../Commands/Misc/stats.js'));
    client.commands.set('testcolor', require('../Commands/Misc/testcolor.js'));
    client.commands.set('tweet', require('../Commands/Misc/tweet.js'));
}