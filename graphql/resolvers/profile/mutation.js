const userModal = require('../../../model/user');
const hashService = require('../../../Services/hashService');

module.exports = {
  updateProfile: async (parent, { userDetails }, { LOGGED_IN, user }) => {
    if (!LOGGED_IN) throw new Error('No autorizado');

    await userModal.updateOne({ _id: user._id }, userDetails);

    return { message: 'Perfil actualizado' };
  },
  changePassword: async (
    parent,
    { oldPassword, newPassword },
    { LOGGED_IN, user }
  ) => {
    if (!LOGGED_IN) throw new Error('No autorizado');

    if (oldPassword === newPassword) {
      throw new Error("La vieja contraseña y la nueva deben ser diferentes");
    }

    const savedUser = await userModal.findById({ _id: user._id });
    const isPasswordMatch = await hashService.decryptPassword(
      oldPassword,
      savedUser.password
    );

    if (!isPasswordMatch) {
      throw new Error('La vieja contraseña no esta actualizada');
    }

    const hashPassword = await hashService.encryptPassword(newPassword);
    savedUser.password = hashPassword;
    await savedUser.save();

    return { message: 'La contraseña se ha actualizado' };
  },
};
