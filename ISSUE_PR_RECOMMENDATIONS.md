# eXist-db Dashboard: Issue & PR Triage Recommendations

Generated: 2026-03-20

---

## Open PRs — Dependabot (All Stale)

All 13 open Dependabot PRs are superseded by newer versions. Recommend closing all with the following comment:

> Closing this stale Dependabot PR. The dashboard is undergoing a comprehensive modernization that will address all dependency updates holistically. Thank you!

| PR | Title | Action |
|----|-------|--------|
| #274 | Bump cypress from 8.4.1 to 12.3.0 | **Close** — Cypress is now at 15.x; will upgrade directly |
| #271 | Bump qs from 6.5.2 to 6.5.3 | **Close** — will be resolved by dependency overhaul |
| #268 | Bump decode-uri-component from 0.2.0 to 0.2.2 | **Close** — security fix, will be resolved by dependency overhaul |
| #263 | Bump chai from 4.2.0 to 4.3.7 | **Close** — will upgrade directly |
| #254 | Bump @existdb/gulp-exist from 4.1.0 to 4.3.2 | **Close** — will upgrade directly |
| #252 | Bump del from 2.2.2 to 7.0.0 | **Close** — will upgrade or replace as part of build modernization |
| #248 | Bump async from 3.2.0 to 3.2.4 | **Close** — will be resolved by dependency overhaul |
| #234 | Bump minimist from 1.2.5 to 1.2.6 | **Close** — will be resolved by dependency overhaul |
| #232 | Bump bower from 1.8.8 to 1.8.14 | **Close** — Bower itself will be removed entirely |
| #227 | Bump pathval from 1.1.0 to 1.1.1 | **Close** — will be resolved by dependency overhaul |
| #205 | Bump brace-expansion from 1.1.11 to 2.0.1 | **Close** — will be resolved by dependency overhaul |
| #204 | Bump gulp-less from 4.0.1 to 5.0.0 | **Close** — LESS/Gulp may be replaced entirely |
| #25  | Modifications to plugins/browsing | **Close** — ancient PR (2015), no longer applicable to 2.x codebase |

---

## Open Issues — Bugs

### Critical / High Priority

| Issue | Title | Recommendation |
|-------|-------|----------------|
| #114 | Cannot change Admin password (high prio) | **Fix in Phase 2.** Investigate UserManager XQuery backend. Likely related to #93 and #107 — same root cause. |
| #93  | Changing admin password gives 500 (high prio) | **Fix in Phase 2.** Duplicate of / related to #114. Fix together, close one as duplicate. |
| #107 | Changing admin password throws exception | **Fix in Phase 2.** Third report of same password-change bug. Close as duplicate of #114 after fix. |
| #92  | Creating a group gives 500 error | **Fix in Phase 2.** Investigate group CRUD in UserManager XQuery modules. |
| #89  | Backup doesn't report warnings/errors (high prio) | **Fix in Phase 3/4.** Surface error details from backup XQuery response to the UI. |
| #73  | Dashboard doesn't proxy correctly (high prio) | **Fix in Phase 2.** Ensure all URLs are relative or respect configurable base path. Partially mitigated by Lit migration (cleaner URL handling). |

### Normal Priority

| Issue | Title | Recommendation |
|-------|-------|----------------|
| #277 | Invalid module import | **Fix in Phase 2.** Likely a broken import path in the Polymer component loading. Will be resolved by Lit migration; verify. |
| #276 | Blank page when accessing dashboard | **Fix in Phase 2.** Investigate routing/auth initialization. May be related to #129. |
| #278 | Package Manager shows false "Install successful" | **Fix in Phase 2.** Fix error handling — check actual response status before showing success toast. Related to #250. |
| #250 | Misleading success on failed install (missing dep) | **Fix in Phase 2.** Same root cause as #278. Close one as duplicate after fix. |
| #129 | Side panel not visible when already logged in | **Fix in Phase 2.** Race condition with auth state check on page load. Ensure sidebar visibility is re-evaluated after auth resolves. |
| #122 | Broken on macOS Safari | **Fix in Phase 1.** Polymer 2 Shadow DOM polyfill issues. Migration to Lit (native Shadow DOM everywhere) should resolve. Verify after migration. |
| #91  | Group view doesn't refresh after CRUD | **Fix in Phase 2.** Add proper data refresh/re-fetch after group operations. |
| #77  | Group managers missing from views | **Fix in Phase 2.** Fix group detail rendering in UserManager. |
| #76  | Creating user doesn't create personal group | **Fix in Phase 2.** Fix user creation XQuery to auto-create personal group (eXist-db convention). |
| #94  | Cursor doesn't change / shows caret | **Fix in Phase 3.** CSS fix — add `cursor: pointer` to interactive elements. |
| #88  | build.xml not well-formed XML | **Fix in Phase 0.** Quick fix — find and correct the XML error. |

---

## Open Issues — Enhancements

| Issue | Title | Recommendation |
|-------|-------|----------------|
| #275 | User manager: disable account support | **Implement in Phase 4.** Add enable/disable toggle to user management UI + XQuery backend. |
| #257 | Collection browser/manager missing | **Implement in Phase 4.** High-value feature for new users. Build tree-view collection navigator with basic CRUD. |
| #240 | Download progress indicator | **Implement in Phase 4.** Add progress bar/percentage to package install flow. |
| #213 | Update backup option info/defaults | **Implement in Phase 4.** Update backup form defaults and help text. Low effort. |
| #210 | Add restore to backup sidebar | **Implement in Phase 4.** Add restore UI alongside existing backup functionality. |
| #178 | README: launcher icon customization | **Address in Phase 5.** Document how to customize the launcher icon in the updated README. |
| #110 | Add 'data' package type | **Implement in Phase 4.** Extend package type enum in PackageManager to include 'data' alongside 'app' and 'lib'. |
| #109 | Configurable launcher filter | **Implement in Phase 4.** Allow filtering/categorizing apps in the launcher view. |
| #106 | Keyboard accessibility | **Implement in Phase 3.** Comprehensive keyboard navigation audit and fix. Use `@lion/ui` or similar for accessible base components. |
| #80  | Handle multiple repositories | **Implement in Phase 4.** Allow configuring multiple package repository URLs. |
| #51  | Customizable color schemes | **Implement in Phase 3.** CSS custom properties theming + light/dark mode. |
| #47  | XQuery linting in pre-commit hook | **Implement in Phase 0/5.** Add xqlint or similar to pre-commit. Low effort. |
| #16  | Add "repair packages" button | **Implement in Phase 4.** Add a button to trigger package repair/consistency check. |

---

## Open Issues — To Close

| Issue | Title | Reason to Close |
|-------|-------|-----------------|
| #84  | Deprecated repo message | **Close.** This IS the active repo now. The old `eXist-db/dashboard` is the deprecated one. Add a note confirming this. |
| #82  | Invalid qname text:groups | **Close.** Tagged `dashboard-1.x` only. Not applicable to 2.x codebase. |
| #27  | Collections Browser doesn't save changes | **Close.** Tagged `dashboard-1.x` only. The 2.x collections browser (#257) will be a fresh implementation. |

---

## Proposed Issue Comment Templates

### For issues being fixed in the overhaul:

> This issue is being addressed as part of a comprehensive dashboard modernization effort. The fix is planned for [Phase X]. We'll update this issue as progress is made.

### For issues being closed as duplicates:

> Closing as duplicate of #[NNN]. The fix will be tracked there.

### For issues being closed as no longer applicable:

> Closing — this issue applies to the 1.x dashboard which has been superseded by the 2.x codebase in this repository. [Additional context as needed.]

### For stale Dependabot PRs:

> Closing this stale Dependabot PR. The dashboard is undergoing a comprehensive dependency and framework modernization that will address all outdated dependencies. Thank you!
