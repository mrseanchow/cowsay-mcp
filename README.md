# cowsay-mcp

[![smithery badge](https://smithery.ai/badge/@mrseanchow/cowsay-mcp)](https://smithery.ai/server/@mrseanchow/cowsay-mcp) <a href="https://github.com/mrseanchow/cowsay-mcp/stargazers"><img src="https://img.shields.io/github/stars/mrseanchow/cowsay-mcp" alt="Github Stars"></a> <a href="https://github.com/mrseanchow/cowsay-mcp/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-purple" alt="License"></a> <a href="https://github.com/mrseanchow/cowsay-mcp/issues/new"><img src="https://img.shields.io/badge/Report a bug-Github-%231F80C0" alt="Report a bug"></a>

Cowsay MCP Server, providing ASCII art cow capabilities for LLMs. This implementation allows language models to generate fun ASCII art cows with custom messages.

## 🛠️ Tools

- `cowsay`: Generate ASCII art with a cow saying your message
- `cowthink`: Generate ASCII art with a cow thinking your message
- `list_cows`: List all available cow characters

## 📦 Installation

### Installing via Smithery

To install cowsay-mcp for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@mrseanchow/cowsay-mcp):

```bash
npx -y @smithery/cli install @mrseanchow/cowsay-mcp --client claude
```

### Manual Installation

```shell
npm install -g cowsay-mcp
```

### Using npx

```shell
npx -y cowsay-mcp
```

## 🚀 Running on Cursor

Add this to your `mcp.json` file:

```json
{
  "mcpServers": {
    "cowsay-mcp": {
      "command": "npx",
      "args": ["-y", "cowsay-mcp"]
    }
  }
}
```

## 🌊 Running on Windsurf

Add this to your `./codeium/windsurf/model_config.json` file:

```json
{
  "mcpServers": {
    "cowsay-mcp": {
      "command": "npx",
      "args": ["-y", "cowsay-mcp"]
    }
  }
}
```

## 🎨 Available Cow Characters

The server provides a wide variety of cow characters, including but not limited to:
- `default`: The classic cow
- `small`: A smaller version of the default cow
- `tux`: A penguin character
- `moose`: A moose character
- `sheep`: A sheep character
- `dragon`: A dragon character
- `elephant`: An elephant character
- `skeleton`: A skeleton character
- `stimpy`: A Stimpy character

And many more! Use the `list_cows` tool to see all available characters.

## 📝 Example Usage

### cowsay Tool

```json
{
  "name": "cowsay",
  "parameters": {
    "message": "Hello from LLM!",
    "cow": "tux"
  }
}
```

### cowthink Tool

```json
{
  "name": "cowthink",
  "parameters": {
    "message": "What should I say next?",
    "cow": "moose"
  }
}
```

### list_cows Tool

```json
{
  "name": "list_cows",
  "parameters": {}
}
```

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

