import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useAllCaseStudies } from '@/hooks/useCaseStudies';
import { useContactMessages } from '@/hooks/useContactMessages';
import { useNewsletterSubscribers } from '@/hooks/useNewsletterSubscribers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Eye, EyeOff, Plus, ArrowRight, MessageSquare, Users } from 'lucide-react';

export default function AdminDashboard() {
  const { data: caseStudies = [] } = useAllCaseStudies();
  const { messages, unreadCount } = useContactMessages();
  const { totalCount: subscriberCount } = useNewsletterSubscribers();

  const publishedCount = caseStudies.filter((s) => s.is_published).length;
  const draftCount = caseStudies.filter((s) => !s.is_published).length;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Astute Computer CMS
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Case Studies</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseStudies.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {messages.length}
              {unreadCount > 0 && (
                <span className="ml-2 text-sm font-normal text-destructive">
                  ({unreadCount} new)
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriberCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full justify-start">
              <Link to="/admin/case-studies/new">
                <Plus className="h-4 w-4 mr-2" />
                Create New Case Study
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/case-studies">
                <FileText className="h-4 w-4 mr-2" />
                Manage All Case Studies
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Case Studies</CardTitle>
          </CardHeader>
          <CardContent>
            {caseStudies.slice(0, 5).map((study) => (
              <Link
                key={study.id}
                to={`/admin/case-studies/${study.id}`}
                className="flex items-center justify-between py-2 hover:bg-muted/50 px-2 rounded -mx-2"
              >
                <div>
                  <div className="font-medium text-sm">{study.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {study.category}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
            {caseStudies.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No case studies yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
