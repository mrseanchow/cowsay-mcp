#!/usr/bin/env node
/**
 * Cowsay MCP Server
 * 
 * A TypeScript MCP server demonstrating migration from STDIO to HTTP transport.
 * Shows how to host a streamable HTTP server on Smithery using @smithery/cli with backwards compatibility.
 * 
 * See the full guide: https://smithery.ai/docs/migrations/typescript-with-smithery-cli
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import cowsay from 'cowsay';
import { COWSAY, COWTHINK, LIST_COWS, GET_VERSION } from './tools.js';

// Server version
export const version = '2.0.0';

// Optional: Define session configuration for server
// Learn more: https://smithery.ai/docs/build/session-config
export const configSchema = z.object({
    serverToken: z.string().optional().describe("Server access token"),
    caseSensitive: z.boolean().optional().default(false).describe("Whether character matching should be case sensitive"),
});

// Validate server token
const validateServerAccess = function (serverToken?: string): boolean {
    // Validate server token - accepts any string including empty ones for demo
    // In a real app, you'd validate against your server's auth system
    return serverToken !== undefined && serverToken.trim().length > 0 ? true : true;
}
// get server version
export function getVersion(): string {
    return version;
}

export default function createServer({
    config,
}: {
    config: z.infer<typeof configSchema>;
}) {
    // Create MCP server instance
    const mcp_server = new McpServer({
        name: "cowsay-mcp",
        version: version,
        description: 'A MCP server that provides cowsay functionality'
    });

    // Register tools
    mcp_server.registerTool("cowsay", {
        title: COWSAY.title,
        description: COWSAY.description,
        inputSchema: {
            message: z.string().describe('The message for the cow to say.'),
            character: z.string().optional().default('default').describe('The cow character to use.')
        },
    }, async ({ message, character }) => {
        // Validate server access
        if (!validateServerAccess(config.serverToken)) {
            throw new Error("Server access validation failed. Please provide a valid serverToken.");
        }
        // Apply user preferences from config
        const searchText = config.caseSensitive ? message : message.toLowerCase();
        const searchChar = config.caseSensitive ? character : character.toLowerCase();
        // Count occurrences of the specific character
        const result = await generateCowsay(searchText, searchChar);
        return {
            content: [
                {
                    type: "text",
                    text: result
                }
            ],
        };
    })


    mcp_server.registerTool("cowthink", {
        title: COWTHINK.title,
        description: COWTHINK.description,
        inputSchema: {
            message: z.string().describe('The message for the cow to think.'),
            character: z.string().optional().default('default').describe('The cow character to use.')
        },
    }, async ({ message, character }) => {
        // Validate server access
        if (!validateServerAccess(config.serverToken)) {
            throw new Error("Server access validation failed. Please provide a valid serverToken.");
        }
        // Apply user preferences from config
        const searchText = config.caseSensitive ? message : message.toLowerCase();
        const searchChar = config.caseSensitive ? character : character.toLowerCase();
        // Count occurrences of the specific character
        const result = await generateCowthink(searchText, searchChar);
        return {
            content: [
                {
                    type: "text",
                    text: result
                }
            ],
        };
    })

    mcp_server.registerTool("list_cows", {
        title: LIST_COWS.title,
        description: LIST_COWS.description,
        inputSchema: {},
    }, async () => {
        // Validate server access
        if (!validateServerAccess(config.serverToken)) {
            throw new Error("Server access validation failed. Please provide a valid serverToken.");
        }
        // Apply user preferences from config
        const result = await listCows();
        return {
            content: [
                {
                    type: "text",
                    text: `Available cow characters: ${result.join(', ')}`
                }
            ],
        };
    })


    mcp_server.registerTool("get_version", {
        title: GET_VERSION.title,
        description: GET_VERSION.description,
        inputSchema: {},
    }, async () => {
        if (!validateServerAccess(config.serverToken)) {
            throw new Error("Server access validation failed. Please provide a valid serverToken.");
        }
        const serverVersion = getVersion();
        return {
            content: [
                {
                    type: "text",
                    text: `cowsay-mcp version: ${serverVersion}`
                }
            ],
        };
    })
    return mcp_server.server;
}


export async function generateCowsay(message: string, cow: string): Promise<string> {
    try {
        const options = cow !== 'default' ? { f: cow } : {};
        return cowsay.say({ text: message, ...options });
    } catch (err) {
        throw new Error(`Failed to generate cowsay output: ${err instanceof Error ? err.message : String(err)}`);
    }
}

export async function generateCowthink(message: string, cow: string): Promise<string> {
    try {
        const options = cow !== 'default' ? { f: cow } : {};
        return cowsay.think({ text: message, ...options });
    } catch (err) {
        throw new Error(`Failed to generate cowthink output: ${err instanceof Error ? err.message : String(err)}`);
    }
}


export async function listCows(): Promise<string[]> {
    try {
        const cowsList = await new Promise<string[]>((resolve, reject) => {
            cowsay.list((error, cow_names) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(cow_names || []);
                }
            });
        });
        return cowsList;
    } catch (error) {
        return ['default', 'small', 'tux', 'moose', 'sheep', 'dragon', 'elephant', 'skeleton', 'stimpy'];
    }
}

// Optional: if you need backward compatibility, add stdio transport
// You can publish this to npm for users to run this locally
async function main() {
    // Get configuration from environment variables
    const serverToken = process.env.SERVER_TOKEN;
    const caseSensitive = process.env.CASE_SENSITIVE === 'true';

    // Create server with configuration
    const server = createServer({
        config: {
            serverToken,
            caseSensitive,
        },
    });
    // print server url and version
    // console.log(`Server Version: ${version}`);
    // Start receiving messages on stdin and sending messages on stdout
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

// By default, the server starts with stdio transport
main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});