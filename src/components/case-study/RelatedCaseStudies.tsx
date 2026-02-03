import { Link } from 'react-router-dom';
import { usePublishedCaseStudies } from '@/hooks/useCaseStudies';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface RelatedCaseStudiesProps {
  currentId: string;
  category: string;
}

export function RelatedCaseStudies({ currentId, category }: RelatedCaseStudiesProps) {
  const { data: allStudies = [] } = usePublishedCaseStudies();

  // Get related studies (same category first, then others)
  const relatedStudies = allStudies
    .filter((study) => study.id !== currentId)
    .sort((a, b) => {
      if (a.category === category && b.category !== category) return -1;
      if (a.category !== category && b.category === category) return 1;
      return 0;
    })
    .slice(0, 3);

  if (relatedStudies.length === 0) {
    return null;
  }

  return (
    <section className="bg-muted/30 py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8">Related Case Studies</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/case-studies/${study.slug}`}
                  className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-border/80 transition-all"
                >
                  {study.thumbnail_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={study.thumbnail_url}
                        alt={study.thumbnail_alt || study.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      {study.category}
                    </span>
                    <h3 className="text-lg font-bold mt-2 mb-2 group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      View case study
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
