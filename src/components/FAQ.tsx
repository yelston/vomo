import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How does the monthly testing requirement work?",
    answer: "To maintain active status, you must complete at least one product test each month. Active members get priority access to post their own projects and participate in the community."
  },
  {
    question: "What types of products can I submit for testing?",
    answer: "Any digital product including web apps, mobile apps, SaaS tools, websites, prototypes, and digital services. We welcome products at any stage of development."
  },
  {
    question: "How long does each testing session take?",
    answer: "Testing sessions typically range from 15-45 minutes, depending on the project requirements set by the submitter. You'll see the estimated time before accepting a test."
  },
  {
    question: "What kind of feedback will I receive?",
    answer: "You'll receive structured feedback including usability ratings, detailed comments, suggestions for improvement, and insights about user experience from real community members."
  },
  {
    question: "Is there a limit to how many projects I can post?",
    answer: "Active members can post one project per month. This ensures fair access for all community members and maintains the quality of testing relationships."
  },
  {
    question: "How do I maintain my active status?",
    answer: "Complete at least one product test each month. We'll send reminders and show your status clearly in your dashboard to help you stay active in the community."
  },
  {
    question: "Can I choose which products to test?",
    answer: "Yes! Browse available projects and choose ones that interest you or match your expertise. You can see project descriptions, requirements, and estimated time before committing."
  },
  {
    question: "What happens if I go inactive?",
    answer: "Inactive members can still test products but cannot post their own projects until they become active again by completing a test. Your account and history remain intact."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about TestCircle's reciprocal testing community
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="bg-white rounded-lg shadow-soft border-0 px-6"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center bg-gradient-card rounded-2xl p-8 shadow-soft">
          <h3 className="text-2xl font-semibold mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Join our community and ask questions directly to other TestCircle members
          </p>
          <div className="text-primary font-medium">
            Contact us at: hello@testcircle.community
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;