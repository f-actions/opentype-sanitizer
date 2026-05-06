# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A GitHub Action that wraps the Python [`opentype-sanitizer`](https://github.com/googlefonts/ots-python) (`ots-python`) wrapper and runs it against font artifacts in CI. Despite the project name, this repo does **not** contain the OTS library itself — it's a thin Node.js Action runner that `pip install`s `opentype-sanitizer` and invokes `ots.sanitize()` on each font file matched by a glob.

The action consumes Python (the runner must have Python set up via `actions/setup-python` before this action runs) but is itself authored in Node.js — `runs.using: node20` in `action.yml`.

## Common commands

```bash
npm run lint        # eslint src/*.js
npm run lint:fix    # eslint with --fix
npm run package     # bundle src/index.js -> dist/index.js using @vercel/ncc
npm test            # eslint + jest (no test files currently exist under src/)
make dist           # equivalent to npm run package
```

There are no JS unit tests in this repo today; `tests/` holds only sample `.ttf` font files used by the CI workflows to exercise the Action end-to-end.

## Architecture

- `src/index.js` — the entire Action source (~40 lines), authored as ES modules (`package.json` has `"type": "module"`). Reads three inputs (`path`, `update-pip`, `version`), pip-installs `opentype-sanitizer`, then iterates the glob and shells out to `python -c "import ots; sys.exit(ots.sanitize(file).returncode)"` per file.
- `dist/index.js` — the bundled, committed output produced by `ncc`. **GitHub Actions executes this file directly**, not `src/index.js`. Any source change is invisible to consumers until `npm run package` is run and both `dist/index.js` and the auto-emitted `dist/package.json` (a one-liner declaring `"type": "module"`) are committed and pushed.
- `action.yml` — declares inputs and points `main` at `dist/index.js` under the `node24` runtime.
- `.github/workflows/{linuxci,macosci}.yml` — self-test the Action against the sample fonts in `tests/` across Python 3.8–3.11; they reference `f-actions/opentype-sanitizer@master`, so a push to `master` exercises the live action.

## Release flow (see `docs/MAINTAINER.md`)

1. Bump the version in `package.json`.
2. `npm run package` and commit `dist/index.js`.
3. Push a semver tag, then move the floating `v[MAJOR]` tag to the new release commit so consumers pinned to `@v3` etc. pick up the update.

## Things to watch for

- Editing `src/index.js` without rebuilding `dist/index.js` is a no-op for end users — always run `npm run package` and commit the bundle when changing source.
- The shelled-out Python command interpolates `${file}` into a `python -c "..."` string. Any change here needs to keep filenames with quotes / unusual characters from breaking the command.
- ESLint extends the `wesbos` config (`.eslintrc.yml`) with `quotes: 0` and `singleQuote: false` overrides — match double-quote style in `src/`.
