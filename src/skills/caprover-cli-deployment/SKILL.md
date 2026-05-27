---
name: caprover-cli-deployment
description: Deploys and manages applications on a CapRover instance using the CapRover CLI and custom captain-definition configurations.
---

# CapRover CLI Deployment

This skill focuses on standardizing the deployment of web applications to a self-hosted CapRover PaaS instance using the CapRover Command Line Interface (CLI).

## Core Rules
1. **Everything as Code (Pillar 18):** All build and run configurations must be codified in a `captain-definition` file at the root of the repository. Manual build configurations via the CapRover web UI are strictly prohibited.
2. **Secret Safety (Pillar 12):** Never hardcode CapRover machine passwords, API endpoints, or auth tokens in `captain-definition` or source code files. Always use environment variables (e.g., `CAPROVER_AUTH_TOKEN`) and inject them via CI/CD secrets.
3. **Non-Interactive CI/CD (Pillar 13):** For automated pipelines (e.g., GitHub Actions), always use the non-interactive deployment command structure with explicit flags to avoid blocking the build loop with prompts:
   ```bash
   caprover deploy --caproverUrl <url> --caproverApp <app-name> --authToken <token> --branch <branch>
   ```
4. **Fail-Fast & Telemetry (Pillar 10, 11):** Validate that the local `captain-definition` schema matches Version 2 before executing a deployment. Check the deployment response status, and immediately fail the build pipeline with descriptive logs if CapRover returns a build failure or timeout.

## Reference Configurations

### 1. Standard Node.js `captain-definition`
```json
{
  "schemaVersion": 2,
  "templateId": "node/18"
}
```

### 2. Dockerfile-based `captain-definition` (Custom builds)
If the project requires complex dependencies, use a local `Dockerfile` and point the captain-definition to it:
```json
{
  "schemaVersion": 2,
  "dockerfilePath": "./Dockerfile"
}
```

## Non-Interactive Deployment Reference
```bash
# Set credentials as environment variables in your environment or CI/CD runner
export CAPROVER_URL="https://captain.your-domain.com"
export CAPROVER_APP="my-production-app"
export CAPROVER_AUTH_TOKEN="your_secure_auth_token_here"

# Execute the deployment
caprover deploy \
  --caproverUrl "$CAPROVER_URL" \
  --caproverApp "$CAPROVER_APP" \
  --authToken "$CAPROVER_AUTH_TOKEN" \
  --branch "main"
```
