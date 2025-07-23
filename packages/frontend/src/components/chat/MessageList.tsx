import { useEffect, useRef } from 'react';
import { type Message, type User } from '@/types';
import { MessageItem } from './MessageItem';

interface MessageListProps {
  messages: Message[];
  currentUser: User;
}

export function MessageList({ messages, currentUser }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-foreground">No messages yet</p>
          <p className="text-sm text-muted-foreground">
            Be the first to start the conversation!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto chat-scrollbar">
      <div className="p-4 space-y-4">
        {messages.map((message, index) => {
          const previousMessage = index > 0 ? messages[index - 1] : null;
          const isGrouped = 
            previousMessage &&
            previousMessage.authorId === message.authorId &&
            new Date(message.createdAt).getTime() - new Date(previousMessage.createdAt).getTime() < 5 * 60 * 1000; // 5 minutes

          return (
            <MessageItem
              key={message.id}
              message={message}
              currentUser={currentUser}
              isGrouped={isGrouped ?? false}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
