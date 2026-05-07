# Changelog

## v4.0.1

- bump pinned `opentype-sanitizer` version in CI test workflows from `8.0.0` (no longer on PyPI) to `9.2.0`

## v4.0.0

- update f-actions/opentype-sanitizer Action to Node 24 (addresses GitHub node 20 deprecation warnings for end users of this Action)
- migrate source to ES modules; bump `@actions/core` to v3, `@actions/exec` to v3, `@actions/glob` to v0.7 (these toolkit majors are ESM-only)
- bump CI workflow actions: `actions/checkout@v4`, `actions/setup-python@v5`, `actions/setup-node@v4`, `github/codeql-action@v3`
- update CI Python matrix to 3.9–3.13 (Python 3.8 reached end-of-life)

## v3.0.0

- update f-actions/opentype-sanitizer Action to Node 20 (addresses GitHub node 16 deprecation warnings for end users of this Action)
- dependency updates

## v2.0.0

- update f-actions/opentype-sanitizer Action to node 16 (addresses GitHub node 12 deprecation warnings for end users of this Action)

## 1.0.2

- Action dependency updates (addresses node.js 12 deprecation warnings in this project's CI tests)
- move eslint.yml CI configuration to node 16
- add CodeQL code scanning
- update cPy CI test environments to versions 3.8, 3.9, 3.10, 3.11

## 1.0.1

- update documentation examples
- project dependency updates

## 1.0.0

- initial release