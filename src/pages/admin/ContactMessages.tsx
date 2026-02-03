import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useContactMessages, ContactMessage } from '@/hooks/useContactMessages';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Mail,
  MailOpen,
  Trash2,
  Eye,
  Loader2,
  Phone,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const SERVICE_OPTIONS = [
  'All Services',
  'Digital Branding',
  'Web Design',
  'AI Automation',
  'IT Support',
  'General Inquiry',
];

export default function ContactMessages() {
  const { isAdmin } = useAdminAuth();
  const [search, setSearch] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { messages, isLoading, markAsRead, markAsUnread, deleteMessage, isDeleting } =
    useContactMessages({
      search,
      service: serviceFilter,
      status: statusFilter,
    });

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      markAsRead(message.id);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteMessage(deleteId);
      setDeleteId(null);
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Contact Messages</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="rounded-full">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground">
          View and manage contact form submissions
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            {SERVICE_OPTIONS.slice(1).map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as 'all' | 'read' | 'unread')}
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Messages Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No messages found</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="hidden md:table-cell">Service</TableHead>
                <TableHead className="hidden lg:table-cell">Message</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow
                  key={message.id}
                  className={!message.is_read ? 'bg-primary/5' : ''}
                >
                  <TableCell>
                    {!message.is_read && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{message.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {message.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary">{message.service}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell max-w-[300px]">
                    <p className="truncate text-sm text-muted-foreground">
                      {message.message}
                    </p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(message.created_at), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewMessage(message)}
                        title="View message"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          message.is_read
                            ? markAsUnread(message.id)
                            : markAsRead(message.id)
                        }
                        title={message.is_read ? 'Mark as unread' : 'Mark as read'}
                      >
                        {message.is_read ? (
                          <Mail className="h-4 w-4" />
                        ) : (
                          <MailOpen className="h-4 w-4" />
                        )}
                      </Button>
                      {isAdmin && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(message.id)}
                          title="Delete message"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Message from {selectedMessage?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedMessage?.created_at &&
                formatDistanceToNow(new Date(selectedMessage.created_at), {
                  addSuffix: true,
                })}
            </DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-primary hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <a
                      href={`tel:${selectedMessage.phone}`}
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <Phone className="h-3 w-3" />
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Service</div>
                <Badge>{selectedMessage.service}</Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Message</div>
                <div className="p-3 bg-muted rounded-lg whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button asChild className="flex-1">
                  <a href={`mailto:${selectedMessage.email}`}>Reply via Email</a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this message?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The message will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
