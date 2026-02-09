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
    <section className="relative py-24 sm:py-32 lg:py-40 bg-secondary/30">
      <div className="container-custom px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-14 lg:mb-20">
          <div>
            <BlurFade>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-xs uppercase tracking-[0.2em] text-foreground font-medium">
                  Insights
                </span>
              </div>
            </BlurFade>
            <BlurFade delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.15]">
                Latest from Our Blog
              </h2>
            </BlurFade>
          </div>
          <BlurFade delay={0.15}>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all mt-2"
            >
              View all articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </BlurFade>
        </div>

        {/* Blog Grid - Better bento layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {blogPosts.map((post, index) => (
            <BlurFade key={post.id} delay={0.2 + index * 0.08}>
              <article className="group cursor-pointer">
                {/* Image */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content */}
                <div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="px-3 py-1.5 bg-secondary/80 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-150 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-muted-foreground mb-5 line-clamp-2">
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
