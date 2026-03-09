import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { Loader2 } from "lucide-react";
import type { Page } from "@shared/schema";

export default function DynamicPage() {
  const params = useParams<{ slug: string }>();

  const { data: page, isLoading, error } = useQuery<Page>({
    queryKey: ["/api/pages", params.slug],
    queryFn: async () => {
      const res = await fetch(`/api/pages/${params.slug}`);
      if (!res.ok) throw new Error("Page not found");
      return res.json();
    },
    enabled: !!params.slug,
  });

  return (
    <>
      <Navbar />
      <main className="pt-[6.5rem] min-h-screen bg-background">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : error || !page ? (
          <div className="max-w-3xl mx-auto px-4 py-20 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="heading-page-not-found">Page Not Found</h1>
            <p className="text-muted-foreground">The page you're looking for doesn't exist or hasn't been published yet.</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-10 font-display" data-testid="heading-page-title">{page.title}</h1>
            <div
              className="prose prose-gray dark:prose-invert max-w-none text-foreground/90 prose-headings:text-foreground prose-headings:font-display prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground"
              data-testid="content-page-body"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
