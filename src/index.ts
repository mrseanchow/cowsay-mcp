#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { COWSAY, COWTHINK, LIST_COWS } from './tools.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import cowsay from 'cowsay';

const execAsync = promisify(exec);

export const server = new Server({
    name: 'cowsay-mcp',
    version: '1.0.0',
}, {
    capabilities: {
        tools: {},
        logging: {},
    },
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [COWSAY, COWTHINK, LIST_COWS],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        switch (name) {
            case 'cowsay': {
                if (!checkCowsayArgs(args)) {
                    throw new Error(`Invalid arguments for tool: [${name}]`);
                }

                const { message, cow = 'default' } = args;
                const result = await generateCowsay(message, cow);
                return {
                    success: true,
                    content: [
                        {
                            type: 'text',
                            text: result,
                        },
                    ],
                };
            }
            case 'cowthink': {
                if (!checkCowthinkArgs(args)) {
                    throw new Error(`Invalid arguments for tool: [${name}]`);
                }

                const { message, cow = 'default' } = args;
                const result = await generateCowthink(message, cow);
                return {
                    success: true,
                    content: [
                        {
                            type: 'text',
                            text: result,
                        },
                    ],
                };
            }
            case 'list_cows': {
                const result = await listCows();
                return {
                    success: true,
                    content: [
                        {
                            type: 'text',
                            text: `Available cow characters: ${result.join(', ')}`,
                        },
                    ],
                };
            }
            default: {
                throw new Error(`Unknown tool: ${name}`);
            }
        }
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);

        return {
            success: false,
            content: [
                {
                    type: 'text',
                    text: message,
                },
            ],
        };
    }
});

// 修改 generateCowsay 函数
async function generateCowsay(message: string, cow: string): Promise<string> {
    try {
        const cowOption = cow !== 'default' ? `-f ${cow}` : '';
        // 使用转义引号来处理message中的特殊字符
        const escapedMessage = message.replace(/'/g, "\\'");
        const { stdout } = await execAsync(`echo '${escapedMessage}' | npx cowsay ${cowOption}`);
        return stdout;
    } catch (error) {
        // 直接使用已导入的cowsay模块
        try {
            const options = cow !== 'default' ? { f: cow } : {};
            return cowsay.say({ text: message, ...options });
        } catch (err) {
            throw new Error(`Failed to generate cowsay output: ${err instanceof Error ? err.message : String(err)}`);
        }
    }
}

// 修改 generateCowthink 函数
async function generateCowthink(message: string, cow: string): Promise<string> {
    try {
        const cowOption = cow !== 'default' ? `-f ${cow}` : '';
        // 使用转义引号来处理message中的特殊字符
        const escapedMessage = message.replace(/'/g, "\\'");
        const { stdout } = await execAsync(`echo '${escapedMessage}' | npx cowsay -T '\\' ${cowOption}`);
        return stdout;
    } catch (error) {
        // 直接使用已导入的cowsay模块
        try {
            const options = cow !== 'default' ? { f: cow } : {};
            return cowsay.think({ text: message, ...options });
        } catch (err) {
            throw new Error(`Failed to generate cowthink output: ${err instanceof Error ? err.message : String(err)}`);
        }
    }
}

async function listCows(): Promise<string[]> {
    try {
        // 直接使用cowsay包的list函数获取奶牛角色列表
        const cowsList = await cowsay.list(() => {});
        // 移除每个奶牛角色名称中的.cow扩展名
        const cowsWithoutExtension = cowsList.map(cow => {
            // 检查字符串是否以.cow结尾，如果是则移除扩展名
            if (cow.endsWith('.cow')) {
                return cow.substring(0, cow.lastIndexOf('.cow'));
            }
            return cow;
        });
        return cowsWithoutExtension;
    } catch (error) {
        // 返回默认列表
        return ['default', 'small', 'tux', 'moose', 'sheep', 'dragon', 'elephant', 'skeleton', 'stimpy'];
    }
}

function checkCowsayArgs(args: unknown): args is { message: string, cow?: string } {
    return (
        typeof args === 'object' &&
        args !== null &&
        'message' in args &&
        typeof args.message === 'string' &&
        ('cow' in args ? typeof args.cow === 'string' : true)
    );
}

function checkCowthinkArgs(args: unknown): args is { message: string, cow?: string } {
    return checkCowsayArgs(args);
}

async function runServer() {
    try {
        process.stdout.write('Starting Cowsay MCP server...\n');
        const transport = new StdioServerTransport();
        await server.connect(transport);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        process.stderr.write(`Error starting Cowsay MCP server: ${message}\n`);
        process.exit(1);
    }
}

runServer().catch(error => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    process.stderr.write(`Error running Cowsay MCP server: ${errorMessage}\n`);
    process.exit(1);
});