import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How do I create my first volunteer event?",
    answer: "Creating an event is simple! Click 'Create Event' from your dashboard, fill in the event details (name, date, location), define your volunteer shifts and roles, then publish. You can immediately share the event link with potential volunteers."
  },
  {
    question: "Can volunteers sign up for multiple shifts?",
    answer: "Yes! Volunteers can browse all available shifts for your event and sign up for as many as they'd like, as long as the shifts don't overlap in time. You'll see all their commitments in your event dashboard."
  },
  {
    question: "How do I manage volunteer check-ins on event day?",
    answer: "Vomo provides a mobile-friendly check-in interface. On event day, access your event dashboard and use the check-in feature to mark volunteers as present when they arrive. This helps you track attendance and shift fulfillment in real-time."
  },
  {
    question: "Can I send reminders to volunteers?",
    answer: "Absolutely! Vomo automatically sends reminder emails to volunteers 24 hours before their shifts. You can also send custom messages to all volunteers or specific shift groups directly from your event dashboard."
  },
  {
    question: "What happens if a volunteer needs to cancel?",
    answer: "Volunteers can cancel their shift commitments from their confirmation email or volunteer dashboard. You'll receive an instant notification so you can reach out to other volunteers or adjust your plans accordingly."
  },
  {
    question: "How many events can I create?",
    answer: "There's no limit! You can create and manage as many events as you need. All your past and upcoming events are accessible from your dashboard, making it easy to reuse event templates for recurring volunteer programs."
  },
  {
    question: "Can I export volunteer data?",
    answer: "Yes! You can export volunteer rosters, attendance records, and shift assignments to CSV format from any event dashboard. This is useful for reporting, record-keeping, or integration with other systems."
  },
  {
    question: "Is Vomo free to use?",
    answer: "Vomo offers a free tier for smaller organizations with basic event and volunteer management features. For larger organizations or those needing advanced features like custom branding and analytics, we offer affordable premium plans."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mt-2">
            Everything you need to know about Vomo.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a href="mailto:hello@vomo.app" className="text-primary hover:underline font-medium">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
