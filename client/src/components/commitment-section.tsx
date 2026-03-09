import { Button } from "@/components/ui/button";
import { SITE_IMAGES } from "@/lib/catalogue-data";

export function CommitmentSection() {
  return (
    <section className="py-16 sm:py-20" data-testid="section-commitment">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="rounded-lg overflow-hidden">
            <img
              src={SITE_IMAGES.workshop}
              alt="Abley's workshop and team"
              className="w-full h-auto object-cover"
              loading="lazy"
              data-testid="img-commitment"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-display mb-4" data-testid="heading-commitment">
              Our Commitment to Your Family
            </h2>
            <p className="text-base font-semibold text-foreground mb-4">
              A Mission Born from a Need for Practical Solutions
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Navigating the world of child development and special needs can be overwhelming. We know this because we've been there. Abley's was founded by a team of parents and professionals who saw a critical need for accessible, high-quality sensory tools and developmental aids in India.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              We realized that while information is important, families and therapists need practical, tangible solutions to support children every day. This realization is the foundation of Abley's.
            </p>
            <Button variant="outline" className="rounded-none text-sm" data-testid="button-learn-more">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
