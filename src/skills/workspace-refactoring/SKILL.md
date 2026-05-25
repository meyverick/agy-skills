---
name: workspace-refactoring
description: Conducts an autonomous, full-workspace architectural audit and structural refactoring. Activate this skill to verify codebase conformance with SOLID, Security, DevOps, and QA pillars, and programmatically generate refactoring checklists or run automated adjustments.
license: Apache-2.0
compatibility: Requires python and access to workspace files.
---

# Codebase Architectural Audit and Refactoring

This skill automates workspace-wide architectural audits and coordinates refactoring activities by invoking and aggregating the insights from the four core validation skills.

## Activation Criteria
Use this skill when:
- Conducting comprehensive codebase-wide audits for architectural alignment and compliance.
- Initiating automated structural refactoring campaigns.
- Running quality gates in CI/CD environments before pull request approvals.
- Checking for regressions in SOLID, defensive programming, performance, or structured logging.

---

## Core Capabilities & Orchestration

The `workspace-refactoring` skill utilizes the execution script `scripts/run_refactor.py` to inspect the workspace. It parses and applies constraints from:
1.  **`architectural-alignment-validation`**: Verifying structural coupling, DDD bounded contexts, and SOLID compliance.
2.  **`resilience-and-security-auditing`**: Scanning error pathways, input sanitization, and concurrency safeguards.
3.  **`cloud-native-infrastructure-optimization`**: Validating database connection blocks, caching policies, and performance.
4.  **`quality-assurance-and-observability-validation`**: Reviewing structured JSON log statements, testing mock layers, and API schemas.

---

## Execution Instructions

To execute the workspace-wide audit and refactoring suggestions:

### 1. Perform dry-run audit
Generates a comprehensive checklist of structural violations and recommendations:
```powershell
python scripts/run_refactor.py --dry-run
```

### 2. Run active audit
Generates the report and writes recommendations to `refactor_report.md`:
```powershell
python scripts/run_refactor.py
```

---

## Output Report format

The automated script generates a `refactor_report.md` file mapping directly to the 4 domain areas:
- **Architectural Gaps** (SOLID/DDD/DRY)
- **Security & Resilience Concerns** (Fail-fast/thread-safety/inputs)
- **Cloud-Native & Performance Risks** (N+1 queries/caching/12-factor)
- **Observability & Testing Gaps** (JSON logging/mocks)
