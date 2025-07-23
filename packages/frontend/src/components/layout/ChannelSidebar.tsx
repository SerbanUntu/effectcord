import { type Server, type User } from '@/types';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';
import { 
  Hash, 
  Plus, 
  UserPlus,
  ChevronDown,
  Crown,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChannelSidebarProps {
  server?: Server;
  currentChannelId: string;
  onChannelSelect: (channelId: string) => void;
  user: User;
}

export function ChannelSidebar({ 
  server, 
  currentChannelId, 
  onChannelSelect, 
  user 
}: ChannelSidebarProps) {
  if (!server) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <p>No server selected</p>
      </div>
    );
  }

  const sortedChannels = [...server.channels].sort((a, b) => a.position - b.position);
  const isOwner = server.ownerId === user.id;

  return (
    <div className="h-full flex flex-col">
      {/* Server Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-border/30 bg-card/50">
        <div className="flex items-center space-x-2 flex-1">
          <h2 className="font-semibold text-foreground truncate">{server.name}</h2>
          {isOwner && (
            <Crown className="w-4 h-4 text-warning flex-shrink-0" />
          )}
        </div>
        <Button variant="ghost" size="icon" className="w-6 h-6">
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Channel List */}
      <div className="flex-1 overflow-y-auto chat-scrollbar">
        <div className="p-2">
          {/* Text Channels Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between px-2 py-1 mb-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Text Channels
              </h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-4 h-4 opacity-60 hover:opacity-100">
                    <Plus className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create Channel</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="space-y-0.5">
              {sortedChannels.map((channel) => (
                <Button
                  key={channel.id}
                  variant="ghost"
                  onClick={() => onChannelSelect(channel.id)}
                  className={cn(
                    "w-full justify-start h-8 px-2 text-sm font-medium transition-colors",
                    currentChannelId === channel.id
                      ? "bg-channel-active text-foreground"
                      : "text-muted-foreground hover:bg-channel-hover hover:text-foreground"
                  )}
                >
                  <Hash className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  <span className="truncate">{channel.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Voice Channels Section (Empty for now) */}
          <div className="mb-4">
            <div className="flex items-center justify-between px-2 py-1 mb-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Voice Channels
              </h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-4 h-4 opacity-60 hover:opacity-100">
                    <Plus className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create Channel</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="px-2 py-2 text-xs text-muted-foreground">
              No voice channels yet
            </div>
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className="border-t border-border/30 bg-card/30">
        <div className="p-2">
          <div className="flex items-center justify-between px-2 py-1 mb-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Members — {server.members.length}
            </h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-4 h-4 opacity-60 hover:opacity-100">
                  <UserPlus className="w-3 h-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Invite People</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="space-y-1 max-h-32 overflow-y-auto chat-scrollbar">
            {server.members.map((member) => {
              const isServerOwner = member.userId === server.ownerId;
              const hasAdminRole = member.roles.some(roleId => 
                server.roles.find(role => role.id === roleId)?.permissions.includes('admin')
              );
              
              return (
                <div
                  key={member.userId}
                  className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-muted/50 transition-colors"
                >
                  <div className="relative">
                    {member.user.avatar ? (
                      <Image
                        src={member.user.avatar}
                        alt={member.user.username}
                        className="w-6 h-6 rounded-full"
												width={24}
												height={24}
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
                        {member.user.username.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    
                    {/* Status indicator */}
                    <div className={cn(
                      "absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-background rounded-full",
                      member.user.status === 'online' ? 'bg-status-online' :
                      member.user.status === 'idle' ? 'bg-status-idle' :
                      member.user.status === 'dnd' ? 'bg-status-dnd' :
                      'bg-status-offline'
                    )} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium text-foreground truncate">
                        {member.user.username}
                      </span>
                      {isServerOwner && (
                        <Crown className="w-3 h-3 text-warning flex-shrink-0" />
                      )}
                      {hasAdminRole && !isServerOwner && (
                        <Shield className="w-3 h-3 text-primary flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
