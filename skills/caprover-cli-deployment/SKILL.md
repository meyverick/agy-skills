---
name: caprover-cli-deployment
description: Guides agents through autonomous M2M application lifecycle management on a CapRover instance. Use when registering apps, configuring domains/SSL, mutating environment variables, or executing deployments.
---

# CapRover CLI Deployment

This skill standardizes the autonomous deployment and management of web applications to a self-hosted CapRover PaaS using the CapRover CLI and internal M2M API. It enforces Least Privilege authentication, immutable structural updates, and strictly programmatic state observation.

## When to Use

- **Use when** registering a new application on a CapRover instance.
- **Use when** mapping domains or enabling SSL.
- **Use when** configuring or injecting environment variables.
- **Use when** deploying an application codebase (`captain-definition`).
- **NOT for** managing CapRover swarm clusters or host nodes.
- **NOT for** interactive GUI tasks.

## Core Process

### Phase 1: Authentication & Least Privilege Extraction
CapRover enforces authentication via Admin Machine Password or Least-Privilege App Tokens. **You must exclusively deploy using App Tokens.**
1. Ensure the machine is authenticated: `npx caprover list`
2. If the app token is unknown, enable and extract it via the API:
   ```bash
   npx caprover api -n <MACHINE> -t /user/apps/appDefinitions/update/ -m PATCH -d '{"appName": "<APP_NAME>", "appDeployTokenConfig": {"enabled": true}}'
   ```
3. Fetch the token from the app struct: `GET /user/apps/appDefinitions`.

### Phase 2: App Registration & Domain Mapping (If new)
1. **Register**: 
   ```bash
   npx caprover api -n <MACHINE> -t /user/apps/appDefinitions/register/ -m POST -d '{"appName": "<APP_NAME>", "hasPersistentData": false}'
   ```
2. **Domain/SSL**:
   Ensure the custom domain resolves to the CapRover IP *before* SSL generation to avoid ACME limits.
   ```bash
   npx caprover api -n <MACHINE> -t /user/apps/appDefinitions/customdomain/ -m POST -d '{"appName": "<APP_NAME>", "customDomain": "<DOMAIN>"}'
   npx caprover api -n <MACHINE> -t /user/apps/appDefinitions/enablecustomdomainssl/ -m POST -d '{"appName": "<APP_NAME>", "customDomain": "<DOMAIN>"}'
   ```

### Phase 3: State & Environment Mutation
Never perform a full `POST` override of the `appDefinitions/update/` schema as it will wipe omitted keys. **Always use partial `PATCH` updates.**
```bash
npx caprover api -n <MACHINE> -t /user/apps/appDefinitions/update/ -m PATCH -d '{"appName": "<APP_NAME>", "envVars": [{"key": "DATABASE_URL", "value": "pg://..."}]}'
```
*Note: CapRover automatically restarts containers upon detecting env-var updates.*

### Phase 4: Everything-as-Code Deployment
Ensure the repository contains a `captain-definition` file (e.g., Schema Version 2).
Execute a non-interactive push using the extracted App Deploy Token:
```bash
npx caprover deploy -a <APP_NAME> -t <APP_DEPLOY_TOKEN> -b main
```

### Phase 5: Fail-Fast Observability
Do not assume success simply because the CLI exits. Immediately fetch the build state:
```bash
npx caprover api -n <MACHINE> -t /user/apps/appData/<APP_NAME> -m GET
```
Examine `isAppBuilding` and `isBuildFailed`. If `isBuildFailed` is true, immediately halt the pipeline and output the `logs.lines`.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just use the Admin Password for `caprover deploy` since I have it." | Security Pillar 12 demands Least Privilege. Deployments must use isolated App Tokens. |
| "I'll update the config using a `POST` override, it's easier." | `POST` is destructive and wipes unprovided configurations. Safe mutations exclusively require `PATCH`. |
| "The deployment command exited with code 0, so it worked." | CapRover pushes can fail asynchronously. You must invoke the `appData` API to verify `isBuildFailed`. |
| "I'll ask the user to configure the env vars in the UI." | Pillar 18 dictates Everything as Code. All configurations must be applied headlessly via the CLI. |

## Red Flags

- Deployment commands utilizing passwords (`-p`) instead of tokens (`-t`).
- Config modifications calling `POST /user/apps/appDefinitions/update/`.
- No observable verification step (Phase 5) following a deployment command.

## Verification

After completing a deployment or state mutation, verify:
- [ ] Authentication was strictly limited to the specific app (App Token).
- [ ] No configurations were destructively overwritten (used `PATCH`).
- [ ] Build state verification confirmed `isBuildFailed: false`.
- [ ] Application is accessible at the configured endpoints.
