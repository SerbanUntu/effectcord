import { useState } from 'react';
import { type User } from '@/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Settings, 
  Mic, 
  MicOff, 
  Headphones, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { authService } from '@/lib/auth';
import { toast } from 'sonner';

interface UserAreaProps {
  user: User;
}

export function UserArea({ user }: UserAreaProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      toast.message("Signed out", {
        description: 'You have been successfully signed out.'
      });
    } catch (error) {
			console.error(error);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'online': return 'bg-status-online';
      case 'idle': return 'bg-status-idle';
      case 'dnd': return 'bg-status-dnd';
      case 'offline': return 'bg-status-offline';
      default: return 'bg-status-offline';
    }
  };

  return (
    <div className="h-14 flex items-center justify-between px-2 bg-card/50">
      {/* User Info */}
      <div className="flex items-center space-x-2 flex-1 min-w-0">
        <div className="relative">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.username}
              className="w-8 h-8 rounded-full"
								width={32}
								height={32}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
              {user.username.slice(0, 2).toUpperCase()}
            </div>
          )}
          
          {/* Status indicator */}
          <div className={cn(
            "absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-background rounded-full",
            getStatusColor(user.status)
          )} />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {user.username}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            #{user.id.slice(-4)}
          </p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-1">
        {/* Microphone */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className={cn(
                "w-8 h-8",
                isMuted ? "text-destructive hover:text-destructive" : "hover:text-foreground"
              )}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isMuted ? 'Unmute' : 'Mute'}</p>
          </TooltipContent>
        </Tooltip>

        {/* Headphones */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDeafened(!isDeafened)}
              className={cn(
                "w-8 h-8",
                isDeafened ? "text-destructive hover:text-destructive" : "hover:text-foreground"
              )}
            >
              <Headphones className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isDeafened ? 'Undeafen' : 'Deafen'}</p>
          </TooltipContent>
        </Tooltip>

        {/* Settings */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:text-foreground"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>User Settings</p>
          </TooltipContent>
        </Tooltip>

        {/* Sign Out */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="w-8 h-8 hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign Out</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
