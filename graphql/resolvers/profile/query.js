const userModal = require('../../../model/user');

module.exports = {
  profile: async (parent, args, { LOGGED_IN, user }) => {
    if (!LOGGED_IN) throw new Error('Usuario no autorizado');

    const profile = await userModal.findById({ _id: user._id });
    return profile;
  },
};
