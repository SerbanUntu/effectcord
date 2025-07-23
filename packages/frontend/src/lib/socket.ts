// Mock Socket.IO service for Effectcord

import { type Socket } from 'socket.io-client';
import { type SocketEvents, type Message, type MessageReaction, type ServerInvitation, type User } from '@/types';

class SocketService {
  private socket: Socket | null = null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
  private listeners = new Map<string, ((...args: any[]) => void)[]>();

  // Initialize socket connection
  connect(userId: string): void {
    // In a real app, you'd connect to your socket server
    // For demo purposes, we'll create a mock connection
    console.log(`Mock socket connecting for user: ${userId}`);
    
    // Simulate connection events
    setTimeout(() => {
      this.emit('connect');
    }, 100);
  }

  // Disconnect socket
  disconnect(): void {
    console.log('Mock socket disconnecting');
    this.socket = null;
    this.emit('disconnect');
  }

  // Subscribe to events
  on<K extends keyof SocketEvents>(event: K, callback: SocketEvents[K]): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  // Unsubscribe from events
  off<K extends keyof SocketEvents>(event: K, callback: SocketEvents[K]): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  // Emit events to server
  emit<K extends keyof SocketEvents>(event: K, ...args: Parameters<SocketEvents[K]>): void {
    console.log(`Mock socket emitting: ${event}`, args);
    
    // Simulate server responses for demo
    if (event === 'message:send') {
      const [data] = args as [{ channelId: string; content: string }];
      this.simulateMessageReceive(data);
    }
  }

  // Emit events to listeners
  private emitToListeners<K extends keyof SocketEvents>(event: K, ...args: Parameters<SocketEvents[K]>): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => {
				try {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
          (callback as any)(...args);
        } catch (error) {
          console.error(`Error in socket listener for ${event}:`, error);
        }
      });
    }
  }

  // Mock message receive simulation
  private simulateMessageReceive(data: { channelId: string; content: string }): void {
    // Simulate a delay
    setTimeout(() => {
      const mockMessage: Message = {
        id: `msg-${Date.now()}`,
        content: data.content,
        authorId: 'current-user', // In a real app, this would come from the server
        author: {
          id: 'current-user',
          email: 'current@example.com',
          username: 'Current User',
          status: 'online',
          createdAt: new Date()
        },
        channelId: data.channelId,
        reactions: [],
        createdAt: new Date()
      };

      this.emitToListeners('message:receive', mockMessage);
    }, 100);
  }

  // Simulate receiving an invitation
  simulateInvitationReceive(invitation: ServerInvitation): void {
    setTimeout(() => {
      this.emitToListeners('invitation:receive', invitation);
    }, 100);
  }

  // Simulate user status updates
  simulateUserStatusUpdate(userId: string, status: User['status']): void {
    setTimeout(() => {
      this.emitToListeners('user:status', { userId, status });
    }, 100);
  }

  // Send message
  sendMessage(channelId: string, content: string): void {
    this.emit('message:send', { channelId, content });
  }

  // Delete message
  deleteMessage(messageId: string, channelId: string): void {
    this.emit('message:delete', { messageId, channelId });
  }

  // Add reaction
  addReaction(messageId: string, emoji: string): void {
    this.emit('reaction:add', { messageId, emoji });
    
    // Simulate reaction update
    setTimeout(() => {
      const mockReaction: MessageReaction = {
        id: `reaction-${Date.now()}`,
        messageId,
        emoji,
        users: ['current-user']
      };
      this.emitToListeners('reaction:update', mockReaction);
    }, 100);
  }

  // Remove reaction
  removeReaction(messageId: string, emoji: string): void {
    this.emit('reaction:remove', { messageId, emoji });
  }

  // Send invitation
  sendInvitation(serverId: string, userEmail: string): void {
    // In a real app, this would send to the server
    console.log(`Sending invitation to ${userEmail} for server ${serverId}`);
  }

  // Accept invitation
  acceptInvitation(invitationId: string): void {
    this.emit('invitation:accept', invitationId);
  }

  // Decline invitation
  declineInvitation(invitationId: string): void {
    this.emit('invitation:decline', invitationId);
  }

  // Update user status
  updateStatus(status: User['status']): void {
    this.emit('user:status', { userId: 'current-user', status });
  }
}

export const socketService = new SocketService();
