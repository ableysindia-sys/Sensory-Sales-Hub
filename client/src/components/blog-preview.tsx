import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Creating a Sensory-Friendly Environment at Home",
    image: "https://www.ableys.in/cdn/shop/articles/blog1_520x500_da76479d-78e5-4b42-b436-67e7c13af4ac.png?v=1734683438&width=533",
    date: "July 16, 2024",
    href: "#",
  },
  {
    title: "The Importance of Sensory Play for Children with Special Needs",
    image: "https://www.ableys.in/cdn/shop/articles/blog2.png?v=1721738978&width=533",
    date: "July 16, 2024",
    href: "#",
  },
  {
    title: "Adaptive Clothing: Comfort and Style for Special Needs Children",
    image: "https://www.ableys.in/cdn/shop/articles/blog_3.png?v=1721738943&width=533",
    date: "July 16, 2024",
    href: "#",
  },
];

export function BlogPreview() {
  return (
    <section className="py-16 sm:py-20" data-testid="section-blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-display" data-testid="heading-blog">
              Therapist-Approved Resources
            </h2>
            <div className="w-12 h-0.5 bg-primary mt-3" />
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            data-testid="link-view-all-blog"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <a
              key={i}
              href={post.href}
              className="group block"
              data-testid={`card-blog-${i}`}
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  data-testid={`img-blog-${i}`}
                />
              </div>
              <h3
                className="font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors line-clamp-2"
                data-testid={`text-blog-title-${i}`}
              >
                {post.title}
              </h3>
              <div className="w-8 h-0.5 bg-border mb-2" />
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
