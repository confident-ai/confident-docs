<br/>
<div align="center">
  <a href="https://www.buildwithfern.com/?utm_source=github&utm_medium=readme&utm_campaign=sdk-starter&utm_content=logo">
    <img src="/fern/docs/assets/fern-logo.png" height="50" align="center" alt="header" />
  </a>
  
  <br/>

# SDK Starter

Generate production-ready TypeScript and Python SDKs in under 5 minutes using Fern.

</div>



## Quick Start

```bash

git clone https://github.com/fern-demo/confident-ai-fern-config.git

cd confident-ai-fern-config

npm install -g fern-api

fern docs dev
```

Should open up in localhost:3000

## Customer Showcase

Get inspired by SDKs built with Fern: [Merge](https://github.com/merge-api/merge-node-client) | [Square](https://github.com/square/square-go-sdk) | [ElevenLabs](https://github.com/elevenlabs/elevenlabs-python) | [Flatfile](https://github.com/FlatFilers/flatfile-node) |

---

## Requirements

- Node 18 or higher
- A [GitHub](https://github.com) account
- The [Fern GitHub App](https://github.com/apps/fern-api) installed

### Step 1: Use this template

1. Click on the **Use this template** button (found at the top right of this page). You must be logged into GitHub.
2. Choose the option to **create a new repository**. Name it whatever you'd like.

### Step 2: Clone and configure the repo

1. Clone your newly created repository and open it in your favorite code editor (e.g., VS Code).
2. Open `fern.config.json` and update the `organization` field with your organization name.

```json
{
  "organization": "confident-aianization-name",
  "version": "0.65.32"
}
```

### Step 3: Install and configure Fern

1. Install the Fern CLI globally:

```bash
npm install -g fern-api
```

2. Log in to Fern:

```bash
fern login
```

### Step 4: Configure your SDK settings

The repository comes pre-configured for TypeScript and Python SDK generation in `generators.yml`. You'll need to:

1. Create a GitHub repository for each SDK you want to generate
2. Install the [Fern GitHub App](https://github.com/apps/fern-api) in your target repository.
3. Uncomment and update the GitHub section in `generators.yml` with your repository information:

```yaml
# For Python SDK
github:
  repository: confident-ai/your-python-sdk-repo

# For TypeScript SDK
github:
  repository: confident-ai/your-typescript-sdk-repo
```

### Step 5: Generate your SDKs

To generate and publish your SDKs:

```bash
fern generate --group python-sdk
```

AND

```bash
fern generate --group ts-sdk
```

The generated SDKs will be:

- Committed to your specified GitHub repositories
- Published to npm (TypeScript) and PyPI (Python) if configured
- Version-controlled using semantic versioning

## Customization Options

The starter comes with some pre-configured options in `generators.yml`:

You can modify these configurations or add additional options by editing `generators.yml`.

---

## Support

Need help? [Set up a call](https://buildwithfern.com/contact) with an expert or email us at [support@buildwithfern.com](mailto:support@buildwithfern.com).
