import { forgotPasswordHelper, resetPasswordHelper, signinHelper } from "../helpers/authentication";

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await signinHelper(email, password);

        res.status(200).send({ result });
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: e })
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, token, password } = req.body;

        await resetPasswordHelper(email, token, password);

        res.status(200).send({ message: "password updated" });
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: e })
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const resetToken = await forgotPasswordHelper(email);

        res.status(200).send({ message: "token generated", token: resetToken });
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: e })
    }
};
