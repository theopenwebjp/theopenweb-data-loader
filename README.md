# Description

Package for loading data(including types) to local project.

## Installation

```bash
npm install @theopenweb/theopenweb-data-loader
```

## Usage

```bash
theopenweb-data-loader download [URL]
```

As a normal script: package.json

```json
{
    "scripts": {
        "update-types": "theopenweb-data-loader download https://raw.githubusercontent.com/theopenwebjp/theopenweb-public-contributions/master/contributions/manual-typescript-types/twilio.ts"
    }
}
```

As a one-time after-installation script: package.json

```json
{
    "scripts": {
        "postinstall": "theopenweb-data-loader download https://raw.githubusercontent.com/theopenwebjp/theopenweb-public-contributions/master/contributions/manual-typescript-types/twilio.ts"
    }
}
```

## Data directories/files

- .d.ts: /types/[FILENAME].d.ts
- .ts: /types/[FILENAME].ts
- .schema.json: /schema/[FILENAME].schema.json
- Other: /data/[FILENAME_AND_EXTENSION]

## Presets

Can manually specify any of the following presets using --preset=[PRESET]

- types
- schema
- data

## Specification

- Adds to new directory in newly(first time) generated file.
- On re-execution, generated files are updated.
- Directories are never overwritten.
- Only files that are generated are overwritten.

## Test

- Test from [./playground](./playground) directory to test cwd and not accidentally commit any downloaded files.
- [Example data URL](https://raw.githubusercontent.com/theopenwebjp/theopenweb-public-contributions/master/contributions/manual-typescript-types/twilio.ts)
- From playground directory: `node ../cli.js download --preset=types https://raw.githubusercontent.com/theopenwebjp/theopenweb-public-contributions/master/contributions/manual-typescript-types/twilio.ts`
