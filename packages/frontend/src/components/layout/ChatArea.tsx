import { type Channel, type Message, type User } from '@/types';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Hash, AtSign } from 'lucide-react';
import { MessageList } from '../chat/MessageList';
import { MessageInput } from '../chat/MessageInput';

interface ChatAreaProps {
  channel?: Channel;
  messages: Message[];
  onSendMessage: (content: string) => void;
  currentUser: User;
}

export function ChatArea({ channel, messages, onSendMessage, currentUser }: ChatAreaProps) {
  if (!channel) {
    return (
      <div className="h-full flex items-center justify-center bg-chat-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Hash className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">No channel selected</h3>
            <p className="text-muted-foreground">Select a channel to start chatting</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-chat-background">
      {/* Channel Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-border/30 bg-card/30">
        <div className="flex items-center space-x-3">
          <Hash className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-semibold text-foreground">{channel.name}</h2>
          <div className="h-4 w-px bg-border/50" />
          <p className="text-sm text-muted-foreground">
            Welcome to #{channel.name}! This is the beginning of the channel.
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <AtSign className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Show Member List</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} currentUser={currentUser} />
      </div>

      {/* Message Input */}
      <div className="p-4">
        <MessageInput
          onSendMessage={onSendMessage}
          placeholder={`Message #${channel.name}`}
        />
      </div>
    </div>
  );
}
