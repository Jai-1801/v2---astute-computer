import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  useAllCaseStudies,
  useDeleteCaseStudy,
  useUpdateCaseStudy,
} from '@/hooks/useCaseStudies';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Loader2,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  FileText,
  ExternalLink,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function CaseStudies() {
  const { data: caseStudies = [], isLoading } = useAllCaseStudies();
  const deleteMutation = useDeleteCaseStudy();
  const updateMutation = useUpdateCaseStudy();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({ title: 'Case study deleted' });
    } catch (error) {
      toast({
        title: 'Delete failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean, slug: string, title: string, category: string, short_description: string) => {
    try {
      await updateMutation.mutateAsync({
        id,
        slug,
        title,
        category,
        short_description,
        is_published: !currentStatus,
        published_at: !currentStatus ? new Date().toISOString() : null,
      });
      toast({
        title: currentStatus ? 'Unpublished' : 'Published',
      });
    } catch (error) {
      toast({
        title: 'Update failed',
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Case Studies</h1>
          <p className="text-muted-foreground">
            Manage your portfolio case studies
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/case-studies/new">
            <Plus className="h-4 w-4 mr-2" />
            New Case Study
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : caseStudies.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-lg">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No case studies yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first case study to get started
          </p>
          <Button asChild>
            <Link to="/admin/case-studies/new">
              <Plus className="h-4 w-4 mr-2" />
              Create Case Study
            </Link>
          </Button>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caseStudies.map((study) => (
                <TableRow key={study.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {study.thumbnail_url && (
                        <img
                          src={study.thumbnail_url}
                          alt=""
                          className="w-12 h-12 rounded object-cover"
                        />
                      )}
                      <div>
                        <div className="font-medium">{study.title}</div>
                        <div className="text-sm text-muted-foreground">
                          /{study.slug}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{study.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {study.is_published ? (
                      <Badge variant="default" className="bg-green-600">
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell>{study.display_order}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      {study.is_published && (
                        <Button variant="ghost" size="icon" asChild>
                          <a
                            href={`/case-studies/${study.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleTogglePublish(study.id, study.is_published, study.slug, study.title, study.category, study.short_description)
                        }
                        title={study.is_published ? 'Unpublish' : 'Publish'}
                      >
                        {study.is_published ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/case-studies/${study.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete case study?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{study.title}" and all
                              associated images. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(study.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
}
