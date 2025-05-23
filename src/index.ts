import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

import { getOctokit, initializeOctokit } from './github-auth.js';
import { setupErrorHandlers, handleToolError } from './error-handling.js';
import { tools, toolHandlers } from './tools/index.js';

// Main server setup
async function main() {
  // Initialize GitHub client
  initializeOctokit();

  // Setup error handlers
  setupErrorHandlers();

  const server = new Server({
    name: "github-actions-mcp-server",
    version: "1.0.0",
    capabilities: {
      tools: {},
    }
  });

  // List tools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
  });

  // Call tool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const octokit = getOctokit();

    try {
      // Find the handler for this tool
      const handler = toolHandlers[name];
      
      if (!handler) {
        throw new Error(`Unknown tool: ${name}`);
      }
      
      // Execute the tool handler with arguments and octokit client
      const result = await handler(args, octokit);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      const errorResponse = handleToolError(error, name);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(errorResponse, null, 2),
          },
        ],
        isError: true,
      };
    }
  });

  // Start server
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("GitHub Actions MCP Server running on stdio");
}

// Start the server
main().catch((error) => {
  console.error("Fatal error starting server:", error);
  process.exit(1);
});