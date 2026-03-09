import { Link } from "wouter";
import { SITE_IMAGES } from "@/lib/catalogue-data";

export function CommitmentSection() {
  return (
    <section className="py-16 sm:py-20" data-testid="section-commitment">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-12">
          <div className="overflow-hidden rounded-lg">
            <img
              src={SITE_IMAGES.diy}
              alt="Abley's DIY sensory activities"
              className="w-full h-full object-cover"
              loading="lazy"
              data-testid="img-commitment-diy"
            />
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              src={SITE_IMAGES.workshop}
              alt="Abley's workshop and team"
              className="w-full h-full object-cover"
              loading="lazy"
              data-testid="img-commitment-workshop"
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold text-foreground font-display mb-5"
            data-testid="heading-commitment"
          >
            Our Commitment to Your Family
          </h2>
          <p className="text-base font-semibold text-foreground mb-4">
            A Mission Born from a Need for Practical Solutions
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Navigating the world of child development and special needs can be
            overwhelming. We know this because we've been there. Abley's was
            founded by a team of parents and professionals who saw a critical
            need for accessible, high-quality sensory tools and developmental
            aids in India.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            We realized that while information is important, families and
            therapists need practical, tangible solutions to support children
            every day. This realization is the foundation of Abley's.
          </p>
          <Link href="/page/about-us">
            <button
              className="inline-flex items-center justify-center border border-foreground px-8 py-3 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
              data-testid="button-learn-more"
            >
              Learn More About Us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
