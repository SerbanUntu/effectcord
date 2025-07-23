import { useState } from 'react';
import { type Message, type User } from '@/types';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { MoreHorizontal, Reply, Trash2, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { EmojiReactions } from './EmojiReactions';
import Image from 'next/image';

interface MessageItemProps {
  message: Message;
  currentUser: User;
  isGrouped: boolean;
}

export function MessageItem({ message, currentUser, isGrouped = false }: MessageItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isOwnMessage = message.authorId === currentUser.id;
  const messageTime = format(new Date(message.createdAt), 'h:mm a');

  const handleCopyMessage = async () => {
    await navigator.clipboard.writeText(message.content);
  };

  const handleDeleteMessage = () => {
    // In a real app, this would call an API
    console.log('Delete message:', message.id);
  };

  if (isGrouped) {
    return (
      <div
        className={cn(
          "group relative pl-14 pr-12 py-0.5 hover:bg-message-hover rounded transition-colors message-hover",
          isHovered && "bg-message-hover"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Timestamp on hover */}
        <div className="absolute left-0 top-0.5 w-12 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity text-right pr-2">
          {messageTime}
        </div>

        {/* Message content */}
        <div className="text-sm text-foreground leading-relaxed">
          {message.content}
        </div>

        {/* Reactions */}
        {message.reactions.length > 0 && (
          <div className="mt-1">
            <EmojiReactions 
              reactions={message.reactions} 
              currentUserId={currentUser.id}
              messageId={message.id}
            />
          </div>
        )}

        {/* Message actions */}
        {isHovered && (
          <div className="absolute right-4 top-0 flex items-center space-x-1 bg-background border border-border rounded shadow-lg">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Reply className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reply</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleCopyMessage} className="w-8 h-8">
                  <Copy className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy Text</p>
              </TooltipContent>
            </Tooltip>

            {isOwnMessage && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleDeleteMessage}
                    className="w-8 h-8 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>More</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative py-2 px-4 hover:bg-message-hover rounded transition-colors message-hover",
        isHovered && "bg-message-hover"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {message.author.avatar ? (
            <Image
              src={message.author.avatar}
              alt={message.author.username}
							width={40}
							height={40}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
              {message.author.username.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        {/* Message content */}
        <div className="flex-1 min-w-0">
          {/* Author and timestamp */}
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="font-medium text-foreground">
              {message.author.username}
            </span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(message.createdAt), 'MMM d, yyyy h:mm a')}
            </span>
          </div>

          {/* Message text */}
          <div className="text-sm text-foreground leading-relaxed">
            {message.content}
          </div>

          {/* Reactions */}
          {message.reactions.length > 0 && (
            <div className="mt-2">
              <EmojiReactions 
                reactions={message.reactions} 
                currentUserId={currentUser.id}
                messageId={message.id}
              />
            </div>
          )}
        </div>
      </div>

      {/* Message actions */}
      {isHovered && (
        <div className="absolute right-4 top-2 flex items-center space-x-1 bg-background border border-border rounded shadow-lg">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Reply className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reply</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleCopyMessage} className="w-8 h-8">
                <Copy className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy Text</p>
            </TooltipContent>
          </Tooltip>

          {isOwnMessage && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleDeleteMessage}
                  className="w-8 h-8 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>More</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
