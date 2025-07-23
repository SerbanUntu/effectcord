import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, Smile, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  placeholder?: string;
}

export function MessageInput({ onSendMessage, placeholder = 'Type a message...' }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className={cn(
        "flex items-end space-x-3 p-3 bg-chat-input rounded-lg border transition-colors",
        isFocused ? "border-primary" : "border-border/50"
      )}>
        {/* Add attachment button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="w-8 h-8 flex-shrink-0 text-muted-foreground hover:text-foreground"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Attach File</p>
          </TooltipContent>
        </Tooltip>

        {/* Message input */}
        <div className="flex-1 min-w-0">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={cn(
              "w-full min-h-[20px] max-h-[120px] resize-none bg-transparent",
              "text-sm text-foreground placeholder-muted-foreground",
              "border-0 outline-0 focus:ring-0"
            )}
            rows={1}
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          {/* Gift button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-muted-foreground hover:text-foreground"
              >
                <Gift className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send Gift</p>
            </TooltipContent>
          </Tooltip>

          {/* Emoji button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-muted-foreground hover:text-foreground"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Emoji</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Character limit indicator (if needed) */}
      {message.length > 1900 && (
        <div className="absolute right-3 -top-6 text-xs text-muted-foreground">
          {2000 - message.length}
        </div>
      )}
    </form>
  );
}
