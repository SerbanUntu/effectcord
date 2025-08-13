// Core Effectcord Types

export interface User {
  id: string
  email: string
  username: string
  avatar?: string
  status: "online" | "idle" | "dnd" | "offline"
  createdAt: Date
}

export interface Server {
  id: string
  name: string
  icon?: string
  ownerId: string
  members: Array<ServerMember>
  channels: Array<Channel>
  roles: Array<Role>
  createdAt: Date
}

export interface ServerMember {
  userId: string
  serverId: string
  user: User
  roles: Array<string> // role IDs
  joinedAt: Date
}

export interface Channel {
  id: string
  name: string
  serverId: string
  type: "text"
  position: number
  rolePermissions: Record<string, Array<string>> // roleId -> permissions
  createdAt: Date
}

export interface Message {
  id: string
  content: string
  authorId: string
  author: User
  channelId: string
  reactions: Array<MessageReaction>
  createdAt: Date
  editedAt?: Date
}

export interface MessageReaction {
  id: string
  messageId: string
  emoji: string
  users: Array<string> // user IDs who reacted
}

export interface Role {
  id: string
  name: string
  color?: string
  permissions: Array<Permission>
  serverId: string
  position: number
  createdAt: Date
}

export interface ServerInvitation {
  id: string
  serverId: string
  server: Server
  invitedUserId: string
  invitedBy: string
  invitedByUser: User
  status: "pending" | "accepted" | "declined"
  createdAt: Date
}

// Permission system
export type Permission =
  // Admin
  | "admin"
  // General Server Permissions
  | "manage_server"
  | "manage_roles"
  | "manage_channels"
  | "kick_members"
  | "ban_members"
  | "create_invites"
  // Text Channel Permissions
  | "send_messages"
  | "delete_messages"
  | "add_reactions"
  | "mention_everyone"

export const PERMISSION_LABELS: Record<Permission, string> = {
  admin: "Administrator",
  manage_server: "Manage Server",
  manage_roles: "Manage Roles",
  manage_channels: "Manage Channels",
  kick_members: "Kick Members",
  ban_members: "Ban Members",
  create_invites: "Create Invites",
  send_messages: "Send Messages",
  delete_messages: "Delete Messages",
  add_reactions: "Add Reactions",
  mention_everyone: "Mention @everyone, @here, and All Roles"
}

// Auth types
export interface AuthUser {
  id: string
  email: string
  username: string
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  username: string
  password: string
}

// App state types
export interface AppState {
  user: AuthUser | null
  servers: Array<Server>
  currentServerId: string | null
  currentChannelId: string | null
  messages: Record<string, Array<Message>> // channelId -> messages
  invitations: Array<ServerInvitation>
}

// Socket events
export interface SocketEvents {
  // Connection
  connect: () => void
  disconnect: () => void

  // Messages
  "message:send": (data: { channelId: string; content: string }) => void
  "message:receive": (message: Message) => void
  "message:delete": (data: { messageId: string; channelId: string }) => void

  // Reactions
  "reaction:add": (data: { messageId: string; emoji: string }) => void
  "reaction:remove": (data: { messageId: string; emoji: string }) => void
  "reaction:update": (reaction: MessageReaction) => void

  // Invitations
  "invitation:send": (invitation: ServerInvitation) => void
  "invitation:receive": (invitation: ServerInvitation) => void
  "invitation:accept": (invitationId: string) => void
  "invitation:decline": (invitationId: string) => void

  // User status
  "user:status": (data: { userId: string; status: User["status"] }) => void
}
