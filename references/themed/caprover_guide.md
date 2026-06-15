# CapRover AI Automation Guide (M2M Reference)

> **Core Objective**: Autonomous management of CapRover environments exclusively via CLI & internal API. Bypasses GUI requirements.

## 1. Authentication & System Access

- **Context**: CapRover enforces authentication via Machine Password (Admin) or App-Specific Token (Least Privilege).
- **CLI Commands**:
  - `npx caprover login` -> Interactive auth -> writes state to `~/.captain/machines.json`.
  - `npx caprover list` -> Retrieve stored machine keys (e.g., `captain-01`).
  - `npx caprover deploy -a [APP_NAME] -t [TOKEN] -u [URL] -i [IMAGE]` -> Execute push. (Note: `-t` accepts either App Token or Admin Password).
  - `npx caprover api -n [MACHINE] -t [PATH] -m [GET|POST|PATCH] -d '[JSON]'` -> Interface directly with backend router.

## 2. API Schema: Application Lifecycle
*Base API Scope: `/user/apps/appDefinitions`*

- **List Apps** -> `GET /user/apps/appDefinitions`
  - Action: Retrieves total system state. Contains `appDefinitions[]`.
- **Register App** -> `POST /user/apps/appDefinitions/register/`
  - Payload: `{ "appName": "string", "hasPersistentData": boolean, "projectId": "string" }`
- **Delete App** -> `POST /user/apps/appDefinitions/delete/`
  - Payload: `{ "appName": "string", "volumes": [] }` (Add volume names to destroy data).
- **Rename App** -> `POST /user/apps/appDefinitions/rename/`
  - Payload: `{ "oldAppName": "string", "newAppName": "string" }`

## 3. API Schema: Configuration & State Mutation
*Base API Scope: `/user/apps/appDefinitions`*

- **Partial Update (Safe)** -> `PATCH /user/apps/appDefinitions/update/`
  - Payload: `{ "appName": "string", [MUTATION_KEYS] }`
  - Notes: Only modifies provided keys. Prevents struct wipe.
  - Key Targets:
    - `envVars`: `[{ "key": "K", "value": "V" }]`
    - `instanceCount`: `int`
    - `appDeployTokenConfig`: `{ "enabled": true }`
- **Full Override (Destructive)** -> `POST /user/apps/appDefinitions/update/`
  - Payload: Complete `AppDefinition` struct. Omitted keys -> wiped.

## 4. API Schema: Networking & Domains
*Base API Scope: `/user/apps/appDefinitions`*

- **Map Custom Domain** -> `POST /user/apps/appDefinitions/customdomain/`
  - Payload: `{ "appName": "string", "customDomain": "string" }`
- **Drop Custom Domain** -> `POST /user/apps/appDefinitions/removecustomdomain/`
  - Payload: `{ "appName": "string", "customDomain": "string" }`
- **Provision Domain SSL** -> `POST /user/apps/appDefinitions/enablecustomdomainssl/`
  - Payload: `{ "appName": "string", "customDomain": "string" }`
  - Constraint: Domain MUST resolve to CapRover IP before execution -> otherwise ACME failure.
- **Provision Base SSL** -> `POST /user/apps/appDefinitions/enablebasedomainssl/`
  - Payload: `{ "appName": "string" }`

## 5. API Schema: Observability
*Base API Scope: `/user/apps/appData`*

- **Fetch Build State** -> `GET /user/apps/appData/[APP_NAME]`
  - Action: Returns `isAppBuilding`, `isBuildFailed`, and `logs.lines[]`.

## 6. Autonomous Workflow Blueprints

### Generate & Extract App Deploy Token (Least Privilege Auth)
1. Execute `PATCH /user/apps/appDefinitions/update/` -> payload `{"appName": "x", "appDeployTokenConfig": {"enabled": true}}`.
2. Execute `GET /user/apps/appDefinitions`.
3. Traverse response -> `appDefinitions.find(a => a.appName === 'x').appDeployTokenConfig.appDeployToken`.

### Headless Environment Variable Injection
1. Execute `PATCH /user/apps/appDefinitions/update/` -> payload `{"appName": "x", "envVars": [{"key": "DATABASE_URL", "value": "pg://..."}]}`.
2. CapRover automatically restarts the container with new bindings.
