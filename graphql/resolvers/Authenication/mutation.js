const UserDtos = require("../../../dtos/user");
const userModal = require("../../../model/user");
const validator = require("../../../Services/validator");
const hashService = require("../../../Services/hashService");

module.exports = {
  register: async (parent, { input }) => {
    const { name, email, password, role } = input;
    if (!validator.validateEmail(email)) throw new Error("Email invalido");

    const user = await userModal.findOne({ email }).exec();
    if (user) throw new Error("Este email esta registrado con otra cuenta");

    const hashPassword = await hashService.encryptPassword(password);
    await userModal.create({ name, email, password: hashPassword, role });

    return { message: "Este usuario ha sido registrado" };
  },

  login: async (parent, { email, password }) => {
    if (!validator.validateEmail(email)) throw new Error("Email invalido");
    const user = await userModal.findOne({ email });
    if (!user) {
      throw new Error(
        "El usuario aun no existe con este email, registrese YA"
      );
    }

    const isPasswordMatch = await hashService.decryptPassword(
      password,
      user.password
    );
    if (!isPasswordMatch) throw new Error("El email o la contraseña estan incorrectos chamaco");

    const token = hashService.createToken({ _id: user._id, role: user.role });
    return { message: "Se inicio sesion", token, user };
  },

  verify: async (parent, { id }) => {
    const user = await userModal.findById({ _id: id }).exec();
    if (!user) throw new Error("ID invalido");

    user.verified = true;
    await user.save();

    return { message: "El usuario ha sido verificado" };
  },

  forgetPassword: async (parent, { email }) => {
    if (!validator.validateEmail(email)) throw new Error("Email invalido");

    const savedUser = await userModal.findOne({ email });
    if (!savedUser) throw new Error("El usuario no existe con este email ID");

    const resetToken = hashService.generateForgetPasswordToken({ email });

    return {
      resetToken,
      message:
        "send this token to us during reset the password in Id field within 10 minutes.",
    };
  },

  reset: async (parent, { resetToken, password }) => {
    const { email } = hashService.verifyForgetPasswordToken(resetToken);
    const savedUser = await userModal.findOne({ email });
    const isPasswordMatch = await hashService.decryptPassword(
      password,
      savedUser.password
    );

    if (isPasswordMatch)
      throw new Error("La vieja contraseña y la nueva deben ser diferentes.");

    const hashPassword = await hashService.encryptPassword(password);
    savedUser.password = hashPassword;
    await savedUser.save();

    return { message: "La contraseña se ha actualizado de forma exitosa" };
  },
};
