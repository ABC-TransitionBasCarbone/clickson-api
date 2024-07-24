import { app } from ".";
import { getGraphQlOptions, handleFetch, handle500errors } from "./utils";

app.delete('/delete-user', async (req, res) => {
  const user = await getUser(req, res);
  console.log("🚀 ~ app.post ~ user:", user);
  const graphql = JSON.stringify({
    query: `
    mutation DeleteUser($id: ID!) {
      deleteUser(input: {id: $id}) {
        clientMutationId
        deletedId
      }
    }
    `,
    variables: { "id": user.id }
  });

  const requestOptions = getGraphQlOptions(graphql);

  try {
    const json = await handleFetch(requestOptions, res);

    const user = json.data.deleteUser.deleteId;
    console.log("🚀 ~ app.post ~ user:", user);
    return res.status(200).json("L'utilisateur a bien été supprimé " + user ?? "");
  } catch (error) {
    return handle500errors(error, res);
  }
});
app.post('/sign-up', async (req, res) => {
  const { username } = req.body;

  const graphql = JSON.stringify({
    query: `
    mutation SignUp($login: String!) {
      createUser(input: {username: $login}) {
        clientMutationId
      }
    }
    `,
    variables: { "login": username }
  });

  const requestOptions = getGraphQlOptions(graphql);

  try {
    const json = await handleFetch(requestOptions, res);

    const user = json.data.createUser.clientMutationId;
    return res.status(200).json({ user });
  } catch (error) {
    return handle500errors(error, res);
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const graphql = JSON.stringify({
    query: `
    mutation LoginUser($username: String!, $password: String!) {
        login(input: {username: $username, password: $password
        }) {
          user {
            email
            }
        }
    }
    `,
    variables: { "username": username, "password": password }
  });

  const requestOptions = getGraphQlOptions(graphql);

  try {
    const json = await handleFetch(requestOptions, res);

    const user = json.data.login.user;
    return res.status(200).json({ user });
  } catch (error) {
    return handle500errors(error, res);
  }
});
app.post('/reset-password', async (req, res) => {
  const { username } = req.body;

  const graphql = JSON.stringify({
    query: `
    mutation ResetPassword($username: String!) {
      sendPasswordResetEmail(input: {username: $username}) {
        clientMutationId
        success
      }
    }
    `,
    variables: { "username": username }
  });

  const requestOptions = getGraphQlOptions(graphql);

  try {
    const json = await handleFetch(requestOptions, res);

    const user = json.data.login.user;
    return res.status(200).json({ user });
  } catch (error) {
    return handle500errors(error, res);
  }
});
/**
 * @param mettre le refreshToken toutes les heures en entrée
 * TODO gérer la durée de validité du token dans le Wordpress
 */
app.post('/new-token', async (req, res) => {
  const { jwtRefreshToken } = req.body;

  const graphql = JSON.stringify({
    query: `
    mutation NewToken($jwtRefreshToken: String!) {
      refreshJwtAuthToken(input: {jwtRefreshToken: $jwtRefreshToken}) {
        authToken
      }
    }`,
    variables: { "jwtRefreshToken": jwtRefreshToken }
  });

  const requestOptions = getGraphQlOptions(graphql);

  try {
    const json = await handleFetch(requestOptions, res);
    const refreshJwtAuthToken = json.data.refreshJwtAuthToken.authToken;

    return res.status(200).send(refreshJwtAuthToken);
  } catch (error) {
    return handle500errors(error, res);
  }
});


async function getUser(req, res) {
  const { username } = req.body;

  const graphql = JSON.stringify({
    query: `
    query GetUser($login: String!) {
      users(where: {login: $login}, first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
    `,
    variables: { "login": username }
  });

  const requestOptions = getGraphQlOptions(graphql);

  try {
    const json = await handleFetch(requestOptions, res);

    return json.data.users.edges[0].node;
  } catch (error) {
    return handle500errors(error, res);
  }
}


