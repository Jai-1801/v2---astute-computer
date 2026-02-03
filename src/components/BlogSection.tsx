import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlurFade } from '@/components/ui/BlurFade';
import skyscrapersImg from '@/assets/sections/skyscrapers.jpg';
import aiPurpleImg from '@/assets/sections/ai-purple-abstract.jpg';
import indiaImg from '@/assets/sections/why-partner-india.jpg';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Document Digitization in India',
    excerpt: 'How AI-powered OCR is transforming how businesses handle their paper archives.',
    image: skyscrapersImg,
    category: 'Technology',
    date: 'Jan 15, 2025',
  },
  {
    id: 2,
    title: 'Digital Branding Trends for 2025',
    excerpt: 'Key visual identity strategies that will define successful brands this year.',
    image: aiPurpleImg,
    category: 'Branding',
    date: 'Jan 10, 2025',
  },
  {
    id: 3,
    title: 'Building Scalable Custom Software',
    excerpt: 'Best practices for developing applications that grow with your business.',
    image: indiaImg,
    category: 'Development',
    date: 'Jan 5, 2025',
  },
];

export function BlogSection() {
  return (
    <section className="relative py-20 sm:py-24 md:py-32 bg-secondary/30">
      <div className="container-custom px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <BlurFade>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs sm:text-sm uppercase tracking-widest text-primary font-medium">
                  Insights
                </span>
              </div>
            </BlurFade>
            <BlurFade delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Latest from Our Blog
              </h2>
            </BlurFade>
          </div>
          <BlurFade delay={0.15}>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              View all articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </BlurFade>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post, index) => (
            <BlurFade key={post.id} delay={0.2 + index * 0.08}>
              <article className="group bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-150">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="px-3 py-1 bg-secondary rounded-full">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-150 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
