# Security Policy

## Reporting a vulnerability

Please **do not disclose vulnerabilities in public issues**. Use the repository's **Security** tab and **Report a vulnerability** (private vulnerability reporting) if enabled. If private reporting is unavailable, contact the maintainer through a private channel listed on their GitHub profile. Do not include exploit payloads, tokens, credentials, or other sensitive information in public tickets.

## Supported versions

Security fixes target the latest commit on the default branch. Older commits, forks, and historical releases are not guaranteed to receive updates.

## Handling reports

Include affected files and versions, impact, reproduction steps using synthetic data, and suggested remediation where possible. The maintainer will triage the report, verify it, implement a fix, and coordinate disclosure after remediation.

## Security practices

- Keep dependencies current and review Dependabot alerts and pull requests.
- Use least-privilege GitHub Actions permissions and pin third-party actions where possible.
- Never commit credentials, access tokens, `.env` secrets, or private keys.
- Run automated lint, build, tests and dependency/security checks where configured.

> This policy documents the disclosure process; it does **not** attest that the application is vulnerability-free or that security checks currently pass.
