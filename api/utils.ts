import { token, wordpressApiUrl } from ".";

export function handle500errors(error: any, res: any) {
  console.error('Fetch error:', error);
  return res.status(500).json({ error: 'Internal Server Error' });
}
export function getGraphQlOptions(graphql: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  return {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow"
  } as RequestInit;
}
export async function handleFetch(requestOptions, res) {
  const response = await fetch(wordpressApiUrl, requestOptions);

  // Check response status early to avoid unnecessary parsing
  if (!response.ok) {
    const errorBody = await response.json();
    console.error('GraphQL errors:', errorBody.errors);
    return res.status(response.status).json({ errors: errorBody.errors });
  }

  const json = await response.json();

  if (json.errors) {
    console.error('GraphQL errors:', json.errors);
    return res.status(400).json({ errors: json.errors });
  }

  return json;
}
