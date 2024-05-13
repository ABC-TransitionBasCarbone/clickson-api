import { signinHelper } from "../helpers/authentication";

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await signinHelper(email, password);

        res.status(200).send({ result });
    } catch (e) {
        console.error(e);
    }
};
