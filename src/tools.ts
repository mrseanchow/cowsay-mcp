import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const COWSAY: Tool = {
  name: 'cowsay',
  description: 'Generate ASCII art of a cow saying something.',
  inputSchema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'The message for the cow to say.',
        default: 'Hello World!'
      },
      cow: {
        type: 'string',
        description: 'The cow character to use.',
        enum: ['default', 'small', 'tux', 'moose', 'sheep', 'dragon', 'elephant', 'skeleton', 'stimpy'],
        default: 'default'
      }
    },
    required: ['message']
  },
};

export const COWTHINK: Tool = {
  name: 'cowthink',
  description: 'Generate ASCII art of a cow thinking something.',
  inputSchema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'The message for the cow to think.',
        default: 'What to think about?'
      },
      cow: {
        type: 'string',
        description: 'The cow character to use.',
        enum: ['default', 'small', 'tux', 'moose', 'sheep', 'dragon', 'elephant', 'skeleton', 'stimpy'],
        default: 'default'
      }
    },
    required: ['message']
  },
};

export const LIST_COWS: Tool = {
  name: 'list_cows',
  description: 'List all available cow characters.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};