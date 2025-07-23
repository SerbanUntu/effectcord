'use client';

import { useState, useEffect } from 'react';
import type { Server, User } from '@/types';
import { mockServers, mockMessages, currentUser } from '@/lib/mock-data';
import { ServerSidebar } from '../components/layout/ServerSidebar';
import { ChannelSidebar } from '../components/layout/ChannelSidebar';
import { ChatArea } from '../components/layout/ChatArea';
import { UserArea } from '../components/layout/UserArea';
import { socketService } from '@/lib/socket';

const Home = () => {
  const [servers] = useState<Server[]>(mockServers);
  const [currentServerId, setCurrentServerId] = useState<string>(mockServers[0]?.id ?? '');
  const [currentChannelId, setCurrentChannelId] = useState<string>('');
  const [messages, setMessages] = useState(mockMessages);
  const [user] = useState<User>(currentUser);

  const currentServer = servers.find(s => s.id === currentServerId);
  const currentChannel = currentServer?.channels.find(c => c.id === currentChannelId);

  // Set default channel when server changes
  useEffect(() => {
    if (currentServer && currentServer.channels.length > 0) {
      const defaultChannel = currentServer.channels.sort((a, b) => a.position - b.position)[0]!;
      setCurrentChannelId(defaultChannel.id);
    }
  }, [currentServerId, currentServer]);

  // Initialize socket connection
  useEffect(() => {
    socketService.connect(user.id);
    
    // Listen for new messages
    socketService.on('message:receive', (message) => {
      setMessages(prev => ({
        ...prev,
        [message.channelId]: [...(prev[message.channelId] ?? []), message]
      }));
    });

    return () => {
      socketService.disconnect();
    };
  }, [user.id]);

  const handleSendMessage = (content: string) => {
    if (currentChannelId) {
      socketService.sendMessage(currentChannelId, content);
    }
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Server Sidebar */}
      <div className="w-16 bg-server-background flex-shrink-0 border-r border-border/30">
        <ServerSidebar
          servers={servers}
          currentServerId={currentServerId}
          onServerSelect={setCurrentServerId}
        />
      </div>

      {/* Channel Sidebar */}
      <div className="w-60 bg-channel-background flex-shrink-0 border-r border-border/30">
        <ChannelSidebar
          server={currentServer}
          currentChannelId={currentChannelId}
          onChannelSelect={setCurrentChannelId}
          user={user}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Chat Area */}
        <div className="flex-1">
          <ChatArea
            channel={currentChannel}
            messages={messages[currentChannelId] ?? []}
            onSendMessage={handleSendMessage}
            currentUser={user}
          />
        </div>
      </div>

      {/* User Area - Fixed at bottom */}
      <div className="absolute bottom-0 left-16 w-60 bg-channel-background border-t border-border/30">
        <UserArea user={user} />
      </div>
    </div>
  );
}

export default Home;
