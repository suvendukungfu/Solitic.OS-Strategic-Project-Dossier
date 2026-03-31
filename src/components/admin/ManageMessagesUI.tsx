'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { 
  Search, 
  Trash2, 
  Mail, 
  User, 
  Calendar, 
  ChevronRight, 
  ExternalLink,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject: string;
  message: string;
  createdAt: string;
}

interface ManageMessagesUIProps {
  initialMessages: ContactMessage[];
}

export function ManageMessagesUI({ initialMessages }: ManageMessagesUIProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) =>
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  const selectedMessage = useMemo(() => 
    messages.find(m => m.id === selectedMessageId), 
    [messages, selectedMessageId]
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message? This action is irreversible.')) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessageId === id) setSelectedMessageId(null);
      toast.success('Message deleted successfully');
    } catch (err) {
      toast.error('Failed to delete message');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-5 h-5 text-gold" />
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
              SOLITIC.OS
            </span>
          </div>
          <h1 className="font-sans text-3xl font-black tracking-tight text-foreground">
            Strategic Messages
          </h1>
          <p className="font-sans text-sm text-muted-foreground/80 mt-1">
            Manage your inbound executive inquiries and consulting leads.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 bg-card border-border rounded-xl focus:ring-gold/20 focus:border-gold transition-all"
            />
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Messages List */}
        <section className="bg-card border border-border rounded-[2rem] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gold" />
              <span className="font-sans text-xs font-black uppercase tracking-widest text-foreground">
                Inbox ({filteredMessages.length})
              </span>
            </div>
          </div>

          <div className="divide-y divide-border/30 max-h-[700px] overflow-y-auto">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessageId(msg.id)}
                  className={`flex flex-col gap-2 p-6 cursor-pointer transition-all hover:bg-muted/10 group relative ${
                    selectedMessageId === msg.id ? 'bg-muted/20 border-l-4 border-l-gold' : 'border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <p className={`font-sans font-black text-sm transition-colors ${selectedMessageId === msg.id ? 'text-gold' : 'text-foreground'}`}>
                        {msg.subject}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground truncate max-w-sm mt-0.5">
                        {msg.name} · {msg.email}
                      </p>
                    </div>
                    <span className="font-sans text-[10px] text-muted-foreground/40 whitespace-nowrap pt-1 uppercase tracking-tighter">
                      {format(new Date(msg.createdAt), 'MMM d, h:mm a')}
                    </span>
                  </div>
                  
                  <p className="font-sans text-xs text-muted-foreground/60 line-clamp-2 mt-1 leading-relaxed">
                    {msg.message}
                  </p>

                  <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(msg.id);
                      }}
                      disabled={isDeleting === msg.id}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-24 text-center">
                <Mail className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
                <p className="font-sans text-muted-foreground italic text-sm">
                  No strategic inquiries found.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Message Preview */}
        <section className="relative">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card border border-border rounded-[2rem] p-8 h-fit sticky top-8 shadow-xl shadow-black/5"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-sans font-black text-xl text-foreground">
                      {selectedMessage.name}
                    </h2>
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="font-sans text-xs text-gold font-bold hover:underline flex items-center gap-1.5"
                    >
                      {selectedMessage.email}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 pb-6 border-b border-border/50">
                    <div>
                      <span className="font-sans text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 block mb-1">
                        Timeline
                      </span>
                      <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        {format(new Date(selectedMessage.createdAt), 'MMMM d, yyyy')}
                      </div>
                    </div>
                    {selectedMessage.phone && (
                      <div>
                        <span className="font-sans text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 block mb-1">
                          Phone
                        </span>
                        <div className="text-xs font-bold text-foreground">
                          {selectedMessage.phone}
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedMessage.company && (
                    <div className="pb-6 border-b border-border/50">
                      <span className="font-sans text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 block mb-1">
                        Company
                      </span>
                      <div className="font-sans text-sm font-bold text-foreground">
                        {selectedMessage.company}
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="font-sans text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 block mb-3">
                      Core Content
                    </span>
                    <div className="bg-muted/30 p-6 rounded-2xl border border-border/50 text-sm font-sans leading-relaxed text-foreground/80 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      asChild
                      className="w-full h-14 rounded-2xl bg-gold text-charcoal font-sans font-black text-sm tracking-tight shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all hover:-translate-y-1"
                    >
                      <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                        Construct Response
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full border-2 border-dashed border-border rounded-[2rem] flex flex-col items-center justify-center p-12 text-center opacity-50 bg-muted/5 min-h-[500px]">
                <div className="w-16 h-16 bg-muted/20 rounded-2xl flex items-center justify-center mb-6">
                  <Mail className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-sans font-bold text-lg text-foreground mb-2">
                  No Message Selected
                </h3>
                <p className="font-sans text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  Select a strategic inquiry from your inbox to review sender intelligence and construct a response.
                </p>
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
