#!/usr/bin/env python3
"""Workspace compliance auditor and refactoring tool.

This script scans the codebase workspace (excluding ignored paths) to detect:
1. Structural layout smells (SOLID, SoC, file sizes).
2. Defensive security hazards (swallowed exceptions, raw parameters).
3. Performance and caching anomalies (sync calls in async, DB queries).
4. Observability and logging gaps (print statements vs structured logs).
"""

import os
import re
import sys
import argparse
from pathlib import Path
from typing import List, Dict, Any

# Directories to ignore
IGNORED_DIRS = {".git", ".venv", "venv", "agentskills", "__pycache__", "node_modules"}

# Code patterns to scan
PATTERN_SWALLOWED_EXCEPT = re.compile(r"except\s+\w*Exception\w*:\s*(pass|print|continue)\b", re.IGNORECASE)
PATTERN_RAW_SQL = re.compile(r"\bexecute\s*\(\s*f[\"'].*?\{.*?\}[\"']\s*\)", re.IGNORECASE)
PATTERN_SYNC_IN_ASYNC = re.compile(r"async\s+def\s+\w+\(.*?\):.*?time\.sleep\(", re.DOTALL | re.IGNORECASE)
PATTERN_PRINT_LOG = re.compile(r"\bprint\s*\(\s*[\"'].*?[\"']\s*\)", re.IGNORECASE)


class CodeAuditor:
    def __init__(self, workspace_dir: Path):
        self.workspace_dir = workspace_dir
        self.report_data: Dict[str, List[Dict[str, Any]]] = {
            "architectural": [],
            "security": [],
            "performance": [],
            "observability": []
        }

    def scan_file(self, file_path: Path) -> None:
        """Scan a single file for structural patterns."""
        rel_path = file_path.relative_to(self.workspace_dir)
        try:
            content = file_path.read_text(encoding="utf-8", errors="ignore")
        except Exception as e:
            return

        lines = content.splitlines()
        num_lines = len(lines)

        # 1. Architectural Checks (SOLID / SoC / KISS)
        if num_lines > 300:
            self.report_data["architectural"].append({
                "file": str(rel_path),
                "line": 1,
                "rule": "Single Responsibility Principle (SRP) Warning",
                "description": f"File exceeds 300 lines ({num_lines} lines). Consider splitting concerns into separate modules.",
                "severity": "ADVISORY"
            })

        # Line-by-line checks
        for idx, line in enumerate(lines, 1):
            stripped = line.strip()

            # 2. Security & Resilience Checks
            if "except" in stripped and ("pass" in stripped or "print" in stripped):
                if PATTERN_SWALLOWED_EXCEPT.search(line):
                    self.report_data["security"].append({
                        "file": str(rel_path),
                        "line": idx,
                        "rule": "Swallowed Exception / Fail-Fast Violation",
                        "description": "Exceptions should not be silently swallowed with 'pass' or simple prints. Throw or log properly.",
                        "severity": "BLOCKING"
                    })

            if "execute(" in stripped and ("f\"" in stripped or "f'" in stripped):
                if PATTERN_RAW_SQL.search(line):
                    self.report_data["security"].append({
                        "file": str(rel_path),
                        "line": idx,
                        "rule": "Potential SQL Injection / Parameterized Queries Rule",
                        "description": "SQL parameters should not be formatted directly inside the execute call. Use parameterized query bindings.",
                        "severity": "BLOCKING"
                    })

            # 3. Performance & Sync in Async
            if "time.sleep" in stripped:
                # Check context (if inside an async def block)
                # For simplicity, we just flag time.sleep inside files containing async def
                if "async def" in content:
                    self.report_data["performance"].append({
                        "file": str(rel_path),
                        "line": idx,
                        "rule": "Sync Blocking Call in Async File",
                        "description": "Detected 'time.sleep()' inside a file utilizing asynchronous functions. Use 'await asyncio.sleep()' instead.",
                        "severity": "BLOCKING"
                    })

            # 4. Observability & Logging
            if stripped.startswith("print(") and not str(rel_path).endswith("run_refactor.py"):
                self.report_data["observability"].append({
                    "file": str(rel_path),
                    "line": idx,
                    "rule": "Unstructured Logging (Print Statement)",
                    "description": "Avoid using bare 'print()' statements. Use a structured JSON or context-aware logging system.",
                    "severity": "ADVISORY"
                })

    def run_workspace_audit(self) -> None:
        """Traverse the workspace and run scans on code files."""
        for root, dirs, files in os.walk(self.workspace_dir):
            # Prune ignored directories in-place
            dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]

            for file in files:
                if file == "run_refactor.py":
                    continue
                file_path = Path(root) / file
                # Scan code files (Python, JS, TS)
                if file_path.suffix in {".py", ".js", ".ts"}:
                    self.scan_file(file_path)

    def generate_report(self, output_path: Path, dry_run: bool) -> None:
        """Format and write the output report."""
        report_lines = [
            "# Workspace Architectural & Structural Audit Report",
            "",
            "This report aggregates findings across the codebase using the validation guidelines.",
            ""
        ]

        for section, issues in self.report_data.items():
            report_lines.append(f"## {section.capitalize()} Audit Results")
            if not issues:
                report_lines.append("[OK] No issues detected in this domain.")
                report_lines.append("")
                continue

            for issue in issues:
                sev_tag = f"**[{issue['severity']}]**"
                report_lines.append(f"### {issue['rule']} - {sev_tag}")
                report_lines.append(f"- **File:** `{issue['file']}:{issue['line']}`")
                report_lines.append(f"- **Description:** {issue['description']}")
                report_lines.append("")

        report_content = "\n".join(report_lines)

        if dry_run:
            print("\n=== DRY RUN AUDIT REPORT ===")
            print(report_content)
            print("============================\n")
        else:
            output_path.write_text(report_content, encoding="utf-8")
            print(f"Audit report written to {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Workspace compliance auditor.")
    parser.add_argument("--dry-run", action="store_true", help="Print the report instead of writing it to disk.")
    args = parser.parse_args()

    workspace_dir = Path(__file__).resolve().parent.parent.parent
    auditor = CodeAuditor(workspace_dir)
    auditor.run_workspace_audit()
    
    report_file = workspace_dir / "refactor_report.md"
    auditor.generate_report(report_file, args.dry_run)


if __name__ == "__main__":
    main()
