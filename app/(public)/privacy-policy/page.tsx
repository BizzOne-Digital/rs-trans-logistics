import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy | RS Trans Logistics' };

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#070B12] pt-32 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="heading-xl text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-400">Last updated: January 1, 2026</p>
        </div>
        <div className="prose prose-invert max-w-none space-y-8">
          {[
            {
              title: '1. Information We Collect',
              content: 'We collect information you provide directly to us when you request a freight quote or contact us. This may include your name, company name, email address, phone number, and shipment details such as pickup and delivery locations, freight type, weight, and dimensions.',
            },
            {
              title: '2. How We Use Your Information',
              content: 'We use the information we collect to: provide and improve our trucking and freight services; respond to your quote requests and inquiries; communicate with you about your shipments; send you relevant updates about our services; and comply with legal obligations.',
            },
            {
              title: '3. Information Sharing',
              content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our business, provided they agree to keep your information confidential.',
            },
            {
              title: '4. Data Security',
              content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and access is restricted to authorized personnel only.',
            },
            {
              title: '5. Cookies',
              content: 'Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, but this may affect some functionality of our website.',
            },
            {
              title: '6. Your Rights',
              content: 'You have the right to access, correct, or delete your personal information that we hold. You may also opt out of receiving marketing communications from us at any time. To exercise these rights, please contact us at rajneelsampat00@gmail.com.',
            },
            {
              title: '7. Contact Us',
              content: 'If you have any questions about this Privacy Policy or our data practices, please contact us at: RS Trans Logistics, 12542 Grove Crescent, Surrey, BC V3V 2L7, Canada. Email: rajneelsampat00@gmail.com. Phone: +1 236 514 6876.',
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
