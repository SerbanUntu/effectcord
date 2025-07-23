// Mock data for Effectcord

import { type User, type Server, type Channel, type Message, type Role, type ServerMember, type ServerInvitation } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'john@example.com',
    username: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    status: 'online',
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'user-2',
    email: 'sarah@example.com',
    username: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a8a9fd?w=32&h=32&fit=crop&crop=face',
    status: 'online',
    createdAt: new Date('2024-01-02')
  },
  {
    id: 'user-3',
    email: 'mike@example.com',
    username: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    status: 'idle',
    createdAt: new Date('2024-01-03')
  },
  {
    id: 'user-4',
    email: 'emma@example.com',
    username: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    status: 'dnd',
    createdAt: new Date('2024-01-04')
  }
];

// Mock Roles
export const mockRoles: Role[] = [
  {
    id: 'role-owner',
    name: 'Owner',
    color: '#ff6b6b',
    permissions: ['admin'],
    serverId: 'server-1',
    position: 0,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'role-admin',
    name: 'Admin',
    color: '#4ecdc4',
    permissions: ['admin'],
    serverId: 'server-1',
    position: 1,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'role-moderator',
    name: 'Moderator',
    color: '#45b7d1',
    permissions: ['manage_channels', 'kick_members', 'delete_messages'],
    serverId: 'server-1',
    position: 2,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'role-member',
    name: '@everyone',
    permissions: ['send_messages', 'add_reactions'],
    serverId: 'server-1',
    position: 999,
    createdAt: new Date('2024-01-01')
  }
];

// Mock Channels
export const mockChannels: Channel[] = [
  {
    id: 'channel-1',
    name: 'general',
    serverId: 'server-1',
    type: 'text',
    position: 0,
    rolePermissions: {},
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'channel-2',
    name: 'development',
    serverId: 'server-1',
    type: 'text',
    position: 1,
    rolePermissions: {},
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'channel-3',
    name: 'random',
    serverId: 'server-1',
    type: 'text',
    position: 2,
    rolePermissions: {},
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'channel-4',
    name: 'announcements',
    serverId: 'server-1',
    type: 'text',
    position: 3,
    rolePermissions: {
      'role-member': ['send_messages'] // Only mods+ can send
    },
    createdAt: new Date('2024-01-01')
  }
];

// Mock Server Members
export const mockServerMembers: ServerMember[] = [
  {
    userId: 'user-1',
    serverId: 'server-1',
    user: mockUsers[0]!,
    roles: ['role-owner'],
    joinedAt: new Date('2024-01-01')
  },
  {
    userId: 'user-2',
    serverId: 'server-1',
    user: mockUsers[1]!,
    roles: ['role-moderator'],
    joinedAt: new Date('2024-01-02')
  },
  {
    userId: 'user-3',
    serverId: 'server-1',
    user: mockUsers[2]!,
    roles: ['role-member'],
    joinedAt: new Date('2024-01-03')
  },
  {
    userId: 'user-4',
    serverId: 'server-1',
    user: mockUsers[3]!,
    roles: ['role-member'],
    joinedAt: new Date('2024-01-04')
  }
];

// Mock Servers
export const mockServers: Server[] = [
  {
    id: 'server-1',
    name: 'Effectcord Development',
    icon: '🚀',
    ownerId: 'user-1',
    members: mockServerMembers,
    channels: mockChannels,
    roles: mockRoles,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'server-2',
    name: 'Gaming Community',
    icon: '🎮',
    ownerId: 'user-2',
    members: [mockServerMembers[0]!, mockServerMembers[1]!],
    channels: [
      {
        id: 'channel-5',
        name: 'general',
        serverId: 'server-2',
        type: 'text',
        position: 0,
        rolePermissions: {},
        createdAt: new Date('2024-01-05')
      }
    ],
    roles: [
      {
        id: 'role-owner-2',
        name: 'Owner',
        color: '#ff6b6b',
        permissions: ['admin'],
        serverId: 'server-2',
        position: 0,
        createdAt: new Date('2024-01-05')
      }
    ],
    createdAt: new Date('2024-01-05')
  }
];

// Mock Messages
export const mockMessages: Record<string, Message[]> = {
  'channel-1': [
    {
      id: 'msg-1',
      content: 'Welcome to Effectcord! 🎉',
      authorId: 'user-1',
      author: mockUsers[0]!,
      channelId: 'channel-1',
      reactions: [
        {
          id: 'reaction-1',
          messageId: 'msg-1',
          emoji: '🎉',
          users: ['user-2', 'user-3']
        },
        {
          id: 'reaction-2',
          messageId: 'msg-1',
          emoji: '👍',
          users: ['user-4']
        }
      ],
      createdAt: new Date('2024-01-01T10:00:00Z')
    },
    {
      id: 'msg-2',
      content: 'This looks amazing! Great work on the design.',
      authorId: 'user-2',
      author: mockUsers[1]!,
      channelId: 'channel-1',
      reactions: [],
      createdAt: new Date('2024-01-01T10:05:00Z')
    },
    {
      id: 'msg-3',
      content: 'I love how responsive the interface is. The dark theme is perfect! 🌙',
      authorId: 'user-3',
      author: mockUsers[2]!,
      channelId: 'channel-1',
      reactions: [
        {
          id: 'reaction-3',
          messageId: 'msg-3',
          emoji: '🌙',
          users: ['user-1', 'user-4']
        }
      ],
      createdAt: new Date('2024-01-01T10:10:00Z')
    },
    {
      id: 'msg-4',
      content: 'The real-time messaging works flawlessly. Socket.IO integration is smooth!',
      authorId: 'user-4',
      author: mockUsers[3]!,
      channelId: 'channel-1',
      reactions: [],
      createdAt: new Date('2024-01-01T10:15:00Z')
    }
  ],
  'channel-2': [
    {
      id: 'msg-5',
      content: 'Let\'s discuss the Effect-TS integration here.',
      authorId: 'user-1',
      author: mockUsers[0]!,
      channelId: 'channel-2',
      reactions: [],
      createdAt: new Date('2024-01-01T11:00:00Z')
    },
    {
      id: 'msg-6',
      content: 'The type safety with Effect is incredible. No more runtime errors! 💪',
      authorId: 'user-2',
      author: mockUsers[1]!,
      channelId: 'channel-2',
      reactions: [
        {
          id: 'reaction-4',
          messageId: 'msg-6',
          emoji: '💪',
          users: ['user-1', 'user-3']
        }
      ],
      createdAt: new Date('2024-01-01T11:05:00Z')
    }
  ],
  'channel-3': [
    {
      id: 'msg-7',
      content: 'Random chat time! 🎲',
      authorId: 'user-3',
      author: mockUsers[2]!,
      channelId: 'channel-3',
      reactions: [
        {
          id: 'reaction-5',
          messageId: 'msg-7',
          emoji: '🎲',
          users: ['user-4']
        }
      ],
      createdAt: new Date('2024-01-01T12:00:00Z')
    }
  ]
};

// Mock Invitations
export const mockInvitations: ServerInvitation[] = [
  {
    id: 'inv-1',
    serverId: 'server-1',
    server: mockServers[0]!,
    invitedUserId: 'user-4',
    invitedBy: 'user-1',
    invitedByUser: mockUsers[0]!,
    status: 'pending',
    createdAt: new Date('2024-01-01T09:00:00Z')
  }
];

// Current user (for demo purposes)
export const currentUser: User = mockUsers[0]!;
