# f-actions/opentype-sanitizer GitHub Action

![Version](https://img.shields.io/github/v/release/f-actions/opentype-sanitizer?sort=semver)
[![Linux CI](https://github.com/f-actions/opentype-sanitizer/workflows/Linux%20CI/badge.svg)](https://github.com/f-actions/opentype-sanitizer/actions?query=workflow%3A%22Linux+CI%22)
[![macOS CI](https://github.com/f-actions/opentype-sanitizer/workflows/macOS%20CI/badge.svg)](https://github.com/f-actions/opentype-sanitizer/actions?query=workflow%3A%22macOS+CI%22)
[![Lint](https://github.com/f-actions/opentype-sanitizer/workflows/Lint/badge.svg)](https://github.com/f-actions/opentype-sanitizer/actions?query=workflow%3ALint)

This GitHub Action installs the [Python wrapper for opentype-santizer](https://github.com/googlefonts/ots-python) and executes tests on font artifacts. It is confirmed to function with Ubuntu and macOS GitHub Action runners and cPython versions 3.6+.

## Quick Start

### Default

```yaml
name: OpenType Sanitizer tests

on: [push, pull_request]

jobs:
  opentype-sanitizer:
    runs-on: ubuntu-latest
    name: OpenType Sanitizer tests
    steps:
      - name: Check out source repository
        uses: actions/checkout@v3
      - name: Set up Python environment
        uses: actions/setup-python@v4
        with:
          python-version: "3.11"
      - name: OpenType Sanitizer tests
        uses: f-actions/opentype-sanitizer@v2
        with:
          path: path/to/*.ttf
```

### With custom settings

```yaml
name: OpenType Sanitizer tests

on: [push, pull_request]

jobs:
  opentype-sanitizer:
    runs-on: ubuntu-latest
    name: OpenType Sanitizer tests
    steps:
      - name: Check out source repository
        uses: actions/checkout@v3
      - name: Set up Python environment
        uses: actions/setup-python@v4
        with:
          python-version: "3.8"
      - name: OpenType Sanitizer tests
        uses: f-actions/opentype-sanitizer@v2
        with:
          update-pip: "true"
          version: "8.0.0"
          path: "path/to/*.ttf"
```

See the Inputs section below for details on the defaults and optional configuration settings.

## Inputs

Configure the Action with the following settings:

### `path`

**Mandatory** The path to the font artifact(s). You may use file path wildcards in this definition.  For example:

```yaml
path: "path/to/*.ttf"
```

will test all files with a `.ttf` extension in the `path/to` directory relative to the root of your source repository.

### `version`

**Optional** The `opentype-sanitizer` Python wrapper version. Options: [`"latest"`, "`[VERSION]`"]. Default: "latest" = latest PyPI release.

### `update-pip`

**Optional** Update `pip` before the `opentype-sanitizer` Python wrapper install. Options: [`"true"`, `"false"`]. Default: `"false"`.

## Outputs

None

## License

[Apache License, v2.0](LICENSE)
