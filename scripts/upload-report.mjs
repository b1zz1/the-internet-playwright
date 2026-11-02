import { readFile } from "node:fs/promises"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
if (!uri) {
  console.warn("::warning::MONGODB_URI not set, skipping upload")
  process.exit(0)
}

const report = JSON.parse(await readFile("results/report.json", "utf8"))
const env = process.env

const doc = {
  receivedAt: new Date(),
  metadata: {
    repo: env.GITHUB_REPOSITORY,
    commitSha: env.GITHUB_SHA,
    branch: env.GITHUB_REF_NAME,
    event: env.GITHUB_EVENT_NAME, // push, schedule, workflow_dispatch
    runId: env.GITHUB_RUN_ID,
    runAttempt: env.GITHUB_RUN_ATTEMPT,
    runUrl: `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`,
  },
  report,
}

const client = new MongoClient(uri)
try {
  await client.connect()
  await client.db("the-internet").collection("test-reports").insertOne(doc)
} finally {
  await client.close()
}
