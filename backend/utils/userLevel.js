const User = require('../models/user');

const setUserLevel = async (user, likes) => {

    const levels = ["Newbie", "Bronze", "Silver", "Gold", "Platinum", "Titanium", "Palladium", "Diamond", "Antimatter"];

    let userLevel = -1;
    let i = 0;

    while (userLevel < 0 && i < levels.length) {
        if (levels[i] === user.admin.level)
            userLevel = i;
        i++;
    }

    let newLevel = 0;
    switch (true) {
        case (likes >= 1000):
            newLevel = 8;
            break;
        case (likes >= 500):
            newLevel = 7;
            break;
        case (likes >= 250):
            newLevel = 6;
            break;
        case (likes >= 100):
            newLevel = 5;
            break;
        case (likes >= 50):
            newLevel = 4;
            break;
        case (likes >= 25):
            newLevel = 3;
            break;
        case (likes >= 10):
            newLevel = 2;
            break;
        case (likes >= 1):
            newLevel = 1;
            break;
        default:
            newLevel = 0;
    }

    if (newLevel > userLevel) {
        const admin = {
            date: user.admin.date,
            role: user.admin.role,
            level: levels[newLevel],
            enabled: user.admin.enabled,
        };

        const updatedUser = new User(user.email, user.username, user.password, user.prefs, admin, user._id);

        await updatedUser.save();

        return levels[newLevel];

    } else {
        return null;
    }
}

module.exports = setUserLevel;