import { type MessageReaction } from '@/types';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { socketService } from '@/lib/socket';

interface EmojiReactionsProps {
  reactions: MessageReaction[];
  currentUserId: string;
  messageId: string;
}

export function EmojiReactions({ reactions, currentUserId, messageId }: EmojiReactionsProps) {
  const handleReactionClick = (emoji: string, hasReacted: boolean) => {
    if (hasReacted) {
      socketService.removeReaction(messageId, emoji);
    } else {
      socketService.addReaction(messageId, emoji);
    }
  };

  const handleAddReaction = () => {
    // In a real app, this would open an emoji picker
    // For demo, we'll just add a random emoji
    const emojis = ['👍', '❤️', '😂', '😮', '😢', '😡', '🎉', '🔥'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]!;
    socketService.addReaction(messageId, randomEmoji);
  };

  if (reactions.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-1 flex-wrap">
      {reactions.map((reaction) => {
        const hasReacted = reaction.users.includes(currentUserId);
        const userCount = reaction.users.length;
        
        return (
          <Tooltip key={reaction.id}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleReactionClick(reaction.emoji, hasReacted)}
                className={cn(
                  "h-6 px-2 text-xs border-border/50 hover:border-primary transition-colors",
                  hasReacted && "bg-primary/20 border-primary"
                )}
              >
                <span className="mr-1">{reaction.emoji}</span>
                <span className="text-xs">{userCount}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {hasReacted 
                  ? `You${userCount > 1 ? ` and ${userCount - 1} other${userCount > 2 ? 's' : ''}` : ''} reacted with ${reaction.emoji}`
                  : `${userCount} user${userCount > 1 ? 's' : ''} reacted with ${reaction.emoji}`
                }
              </p>
            </TooltipContent>
          </Tooltip>
        );
      })}
      
      {/* Add reaction button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddReaction}
            className="h-6 w-6 p-0 opacity-60 hover:opacity-100 transition-opacity"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Reaction</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
