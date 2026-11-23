# Git & GitHub Workflow

## Repository
`drsatanee-ent/lubdeemaimailook-frontend-backend`

Git tracks changes to source files and documentation. GitHub hosts the repository and displays commit history, pull requests, and Actions results.

## 1. Clone and inspect
```bash
git clone https://github.com/drsatanee-ent/lubdeemaimailook-frontend-backend.git
cd lubdeemaimailook-frontend-backend
git status
git log --oneline -5
```

## 2. Branch for a change
```bash
git switch main
git pull origin main
git switch -c docs/improve-testing-guide
```
Use descriptive branches such as `feature/demo-history`, `fix/form-validation`, or `docs/architecture`.

## 3. Edit, inspect, and commit
```bash
git diff
git add docs/testing-guide.md
git commit -m "docs: improve manual testing scenarios"
git push -u origin docs/improve-testing-guide
```
Avoid committing real patient information, secrets, credentials, or exported health records.

## 4. Pull request review
1. Open a Pull Request into `main`.
2. Explain the reason for the change and how it was tested.
3. Review the diff for accidental sensitive data.
4. Check GitHub Actions status.
5. Merge only after appropriate review.

Suggested commit prefixes: `feat:`, `fix:`, `docs:`, `test:`, `chore:`.

## 5. Release and rollback
- Use tags such as `v0.1.0-demo` for reviewed milestones.
- Review commit history with `git log --oneline`.
- Prefer `git revert <commit-sha>` to safely undo a shared commit, rather than rewriting published history.

## 6. GitHub Pages
Workflow file: `.github/workflows/pages.yml`. Pushing to `main` triggers a deployment attempt. Deployment success must be checked in the Actions tab; a green commit or uploaded file alone does not prove the site is live.

## 7. Evidence for a portfolio
- Repository link showing code and documentation
- Commit history showing version control
- Pull request(s), when available
- Successful Actions run, if deployment completes
- Live demo URL only after verification

**Scope:** This document describes a recommended collaboration process. It does not claim that all steps (reviews, tests, releases) have already occurred.
