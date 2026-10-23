# Phase 2 — Candidate Evidence (Draft)

**Status:** Draft for owner review. Not approved. Phase 2 is not complete.
**Scope:** Sitolo, Rustacean, USORA. Facts below were observed from the public GitHub repositories on 23 Oct 2026. Items marked **unverified** could not be checked.

## Sitolo — `jelome265/sitolo`

- **Purpose:** Business operating system for African SMEs, launching in Malawi (README).
- **Status:** Active development. README states current product phase is "Phase 4 Part 8 / PR-009: durable audit evidence + transactional outbox." Commercially pre-validation.
- **Observed recent activity:** Commits by the owner through 26 Sep 2026, including PR #67 and PR #68 transport audit.
- **Technology observed:** Rust Cargo workspace (`Cargo.toml`, `crates/`, `apps/`, `workspaces/`, `rust-toolchain.toml`). README describes Flutter (Android-first) and Tauri clients as architecture, not confirmed implemented.
- **Demo:** None found in the repository.
- **Licence:** Apache-2.0.
- **Limitations for the reader:** Product is pre-validation; the repository is large and documentation-heavy. Commercial pricing and segment claims are hypotheses per the README.
- **Concern:** Heavy design-document and agent-workflow content; a reviewer may not find the implementation quickly. Personal contribution to the Rust code should be reviewed before claiming specific features.

## Rustacean — `jelome265/Rustacean`

- **Purpose:** Enterprise engineering skills for Rust AI coding agents, backed by executable checks (installer, validator, lint policy, framework gate).
- **Status:** Released. README references `rustacean-skills` v0.2.0 (release commit 20 Oct 2026). Latest commits are docs and GitHub Pages deployment.
- **Technology observed:** Python 3 (`tools/`, `tests/python/`), Rust workspace (`crates/rustacean-conformance`), npm package wrapper, GitHub Actions workflows.
- **Evidence:** Unit tests (Python), CI workflow files, `AUDIT_REPORT.md`, `SECURITY.md`, Apache-2.0 licence. CI status badges were not checked (per owner instruction not to wait on CI).
- **Demo / website:** A project website on GitHub Pages is linked from the README (`https://jelome265.github.io/Rustacean/`). **Unverified:** the site did not respond from the sandbox; it must be opened in a browser before inclusion.
- **Limitations for the reader:** It is a set of guidance skills; the README states skills do not replace compilers, tests, CI, or review. The project should not be presented as a runtime tool.

## USORA — `jelome265/usora`

- **Purpose:** Multi-tenant Know Your Customer (KYC) platform for identity verification.
- **Status:** In development. Recent commits (Aug 2026) fix service test and build failures. Commit messages state **no local Maven run was available**, so the test fixes are not verified by execution.
- **Architecture (README):** Rust (API gateway, document/face/risk services) and Java 21 / Spring Boot services (tenant, core, identity, audit, compliance, integration, notification). PostgreSQL, Redis, Kafka, MinIO/S3.
- **Evidence:** Security audit file (`AUDIT-usora-security-2026-08-03.md`), Makefile, Docker Compose, infrastructure folder.
- **Demo:** None found.
- **Licence:** Not checked.
- **Limitations for the reader:** No live deployment identified. Compliance and KYC capability claims must not be made without evidence; the repository does not establish regulatory approval. The README mentions Java, which should be stated accurately as part of the project's technology.
- **Concern:** Recent commit history contains unverified test fixes. Do not claim tests pass.

## Owner decisions

1. **Featured projects:** Sitolo, USORA, and Rustacean.
2. **Rustacean website:** Confirmed by the owner as open in a browser; `https://jelome265.github.io/Rustacean/` may be linked.
3. **Contribution:** The owner is the author of these projects. Commit history is the record of contribution.
4. **USORA:** Shown as "In development", with a picture preview and no live demo. **Open:** the preview image must be supplied by the owner or chosen from an approved asset; no image has been selected yet.

## Phase 2 status

Draft. Pending: final copy for each card, the USORA preview image, and the owner's approval of the factual wording above.
