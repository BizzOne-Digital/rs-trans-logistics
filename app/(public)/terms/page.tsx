import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms & Conditions | Blue River Logistics' };

export default function TermsPage() {
  return (
    <div className="bg-[#070B12] pt-32 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="heading-xl text-white mb-4">Terms & Conditions</h1>
          <p className="text-slate-400">Last updated: January 1, 2026</p>
        </div>
        <div className="space-y-6">
          {[
            {
              title: '1. Acceptance of Terms',
              content: 'By accessing and using the Blue River Logistics website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.',
            },
            {
              title: '2. Services',
              content: 'Blue River Logistics provides full-service trucking and freight transportation services between Canada and the United States. All services are provided on a quote basis. Final service terms, pricing, and conditions will be outlined in individual freight agreements.',
            },
            {
              title: '3. Quote Requests',
              content: 'Submitting a quote request through our website does not constitute a binding contract. Quotes are provided based on the information submitted and are subject to change based on actual shipment conditions, availability, and verification of details.',
            },
            {
              title: '4. Freight Responsibility',
              content: 'Customers are responsible for providing accurate shipment information including dimensions, weight, contents, and any special handling requirements. Blue River Logistics is not liable for damages resulting from inaccurate information provided by the customer.',
            },
            {
              title: '5. Limitation of Liability',
              content: 'Blue River Logistics liability for any freight claim shall be limited to the lesser of the actual value of the goods or the maximum liability as specified in the applicable freight agreement. We are not liable for indirect, incidental, or consequential damages.',
            },
            {
              title: '6. Cross-Border Shipments',
              content: 'For shipments crossing the Canada-USA border, customers are responsible for ensuring compliance with all applicable customs, import/export regulations, and providing accurate documentation. Blue River Logistics acts as a transportation carrier and is not a customs broker.',
            },
            {
              title: '7. Website Use',
              content: 'You agree not to use this website for any unlawful purpose or in any way that could harm Blue River Logistics, its partners, or other users. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offence.',
            },
            {
              title: '8. Changes to Terms',
              content: 'Blue River Logistics reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after changes constitutes acceptance of the new terms.',
            },
            {
              title: '9. Contact',
              content: 'For questions about these Terms and Conditions, contact us at: Blue River Logistics, 12542 Grove Crescent, Surrey, BC V3V 2L7, Canada. Email: rajneelsampat00@gmail.com. Phone: +1 236 514 6876.',
            },
          ].map((section) => (
            <div key={section.title} className="glass-card border border-white/5 rounded-2xl p-6">
              <h2 className="text-white font-bold text-xl mb-3">{section.title}</h2>
              <p className="text-slate-400 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
