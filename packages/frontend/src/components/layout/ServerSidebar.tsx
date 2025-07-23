import { type Server } from '@/types';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServerSidebarProps {
  servers: Server[];
  currentServerId: string;
  onServerSelect: (serverId: string) => void;
}

export function ServerSidebar({ servers, currentServerId, onServerSelect }: ServerSidebarProps) {
  return (
    <div className="h-full flex flex-col items-center py-3 space-y-2">
      {/* Home/DM Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-12 h-12 rounded-2xl bg-background hover:bg-primary hover:rounded-xl",
              "transition-all duration-200 server-icon group"
            )}
          >
            <MessageSquare className="w-6 h-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Direct Messages</p>
        </TooltipContent>
      </Tooltip>

      {/* Separator */}
      <div className="w-8 h-0.5 bg-border/50 rounded-full" />

      {/* Server List */}
      <div className="flex flex-col space-y-2 flex-1">
        {servers.map((server) => (
          <Tooltip key={server.id}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onServerSelect(server.id)}
                className={cn(
                  "w-12 h-12 rounded-2xl transition-all duration-200 server-icon group relative",
                  currentServerId === server.id
                    ? "bg-primary text-primary-foreground rounded-xl"
                    : "bg-background hover:bg-primary hover:text-primary-foreground hover:rounded-xl"
                )}
              >
                {server.icon ? (
                  <span className="text-2xl">{server.icon}</span>
                ) : (
                  <span className="text-lg font-semibold">
                    {server.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
                
                {/* Active indicator */}
                {currentServerId === server.id && (
                  <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-foreground rounded-r-full" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{server.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Add Server Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-12 h-12 rounded-2xl bg-background hover:bg-success hover:rounded-xl",
              "transition-all duration-200 server-icon group"
            )}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Add a Server</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
