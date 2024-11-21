import { Octokit } from "octokit"
import { env } from 'node:process'

interface Payload {
  templateRepo: string;
  templateOwner: string;
  owner: string;
  repositoryName: string;
  repositoryDescription: string;
  visibility: 'public' | 'private' | 'internal';
}

// TODO: map the payload template to custom templates provided here...

export async function handler(event: Payload) {
  const client = new Octokit({
    auth: env["GH_TOKEN"]
  });

  const response = await client.request(`POST /repos/${event.templateOwner}/${event.templateRepo}/generate`, {
    owner: event.owner,
    name: event.repositoryName,
    description: event.repositoryDescription,
    include_all_branches: false,
    private: false,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  console.log(event)

  return {
    statusCode: response.status,
    body: JSON.stringify(response.data)
  }
}