import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const COWSAY: Tool = {
  name: 'cowsay',
  title: 'Cow Say',
  description: 'Generate ASCII art of a cow saying something.',
  inputSchema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'The message for the cow to say.',
        default: 'Hello World!'
      },
      character: {
        type: 'string',
        description: 'The cow character to use.',
        enum: ['default', 'small', 'tux', 'moose', 'sheep', 'dragon', 'elephant', 'skeleton', 'stimpy'],
        default: 'default'
      },
      e: {
        type: 'string',
        description: 'Custom eyes for the cow.',
        default: 'oo'
      },
      T: {
        type: 'string',
        description: 'Custom tongue for the cow.'
      },
      r: {
        type: 'boolean',
        description: 'Use a random cow character.',
        default: false
      },
      b: {
        type: 'boolean',
        description: 'Borg mode - use borg face.',
        default: false
      },
      d: {
        type: 'boolean',
        description: 'Dead mode - use dead face.',
        default: false
      },
      g: {
        type: 'boolean',
        description: 'Greedy mode - use greedy face.',
        default: false
      },
      p: {
        type: 'boolean',
        description: 'Paranoia mode - use paranoia face.',
        default: false
      },
      s: {
        type: 'boolean',
        description: 'Stoned mode - use stoned face.',
        default: false
      },
      t: {
        type: 'boolean',
        description: 'Tired mode - use tired face.',
        default: false
      },
      w: {
        type: 'boolean',
        description: 'Wired mode - use wired face.',
        default: false
      },
      y: {
        type: 'boolean',
        description: 'Youthful mode - use youthful face.',
        default: false
      }
    },
    required: ['message']
  },
};

export const COWTHINK: Tool = {
  name: 'cowthink',
  title: 'Cow Think',
  description: 'Generate ASCII art of a cow thinking something.',
  inputSchema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'The message for the cow to think.',
        default: 'What to think about?'
      },
      character: {
        type: 'string',
        description: 'The cow character to use.',
        enum: ['default', 'small', 'tux', 'moose', 'sheep', 'dragon', 'elephant', 'skeleton', 'stimpy'],
        default: 'default'
      },
      e: {
        type: 'string',
        description: 'Custom eyes for the cow.',
        default: 'oo'
      },
      T: {
        type: 'string',
        description: 'Custom tongue for the cow.'
      },
      r: {
        type: 'boolean',
        description: 'Use a random cow character.',
        default: false
      },
      b: {
        type: 'boolean',
        description: 'Borg mode - use borg face.',
        default: false
      },
      d: {
        type: 'boolean',
        description: 'Dead mode - use dead face.',
        default: false
      },
      g: {
        type: 'boolean',
        description: 'Greedy mode - use greedy face.',
        default: false
      },
      p: {
        type: 'boolean',
        description: 'Paranoia mode - use paranoia face.',
        default: false
      },
      s: {
        type: 'boolean',
        description: 'Stoned mode - use stoned face.',
        default: false
      },
      t: {
        type: 'boolean',
        description: 'Tired mode - use tired face.',
        default: false
      },
      w: {
        type: 'boolean',
        description: 'Youthful mode - use youthful face.',
        default: false
      },
      y: {
        type: 'boolean',
        description: 'Wired mode - use wired face.',
        default: false
      }
    },
    required: ['message']
  },
};

export const LIST_COWS: Tool = {
  name: 'list_cows',
  title: 'List Cows',
  description: 'List all available cow characters.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const GET_VERSION: Tool = {
  name: 'get_version',
  title: 'Get Version',
  description: 'Get the current version of cowsay-mcp server.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};