import connectDB from './mongodb';
import AdminUser from '../models/AdminUser';
import SiteSettings from '../models/SiteSettings';
import Service from '../models/Service';
import bcrypt from 'bcryptjs';

const defaultServices = [
  {
    title: 'Dry Vans',
    slug: 'dry-vans',
    icon: 'truck',
    shortDescription: 'Secure enclosed trailer transportation for general freight and packaged goods.',
    detailedDescription:
      'Dry van transportation is ideal for businesses moving general freight that does not require temperature control. It provides secure enclosed protection for packaged goods, retail products, commercial shipments, and everyday freight moving across Canada and the USA.',
    bestFor: [
      'General freight',
      'Boxed goods',
      'Retail products',
      'Packaged shipments',
      'Non-temperature-sensitive loads',
    ],
    benefits: [
      { title: 'Enclosed Freight Protection', description: 'Your cargo stays safe inside a fully enclosed trailer.' },
      { title: 'Flexible Shipment Options', description: 'Suitable for a wide range of freight types and sizes.' },
      { title: 'Reliable Long-Distance Movement', description: 'Dependable service across Canada and the USA.' },
      { title: 'Ideal for Business Freight', description: 'Perfect for commercial and retail shipments.' },
    ],
    processSteps: [
      { step: 1, title: 'Request Quote', description: 'Submit your freight details for a custom quote.' },
      { step: 2, title: 'Confirm Booking', description: 'Approve quote and confirm pickup schedule.' },
      { step: 3, title: 'Freight Pickup', description: 'Our driver picks up your load on schedule.' },
      { step: 4, title: 'Transit', description: 'Your freight moves safely in our enclosed dry van.' },
      { step: 5, title: 'Delivery', description: 'Safe delivery to your destination on time.' },
    ],
    relatedServices: ['reefer-service', 'flatbed-curtain-roll-tite', 'step-deck'],
    sortOrder: 1,
    isActive: true,
    seoTitle: 'Dry Van Trucking Services | Canada & USA | RS Trans Logistics',
    seoDescription: 'Professional dry van transportation services between Canada and the USA. Secure enclosed freight solutions for general cargo.',
  },
  {
    title: 'Reefer Service',
    slug: 'reefer-service',
    icon: 'thermometer',
    shortDescription: 'Temperature-controlled freight solutions for products requiring climate consistency.',
    detailedDescription:
      'Our reefer service supports shipments that need controlled temperature conditions during transport. This service is suitable for refrigerated goods, food products, and other temperature-sensitive freight requiring reliable cold chain support.',
    bestFor: [
      'Food products',
      'Refrigerated goods',
      'Temperature-sensitive shipments',
      'Cold chain freight',
      'Climate-controlled cargo',
    ],
    benefits: [
      { title: 'Temperature-Controlled Transport', description: 'Maintain precise temperature throughout the journey.' },
      { title: 'Better Product Protection', description: 'Keep perishable goods fresh and safe.' },
      { title: 'Cold Chain Support', description: 'Seamless cold chain from pickup to delivery.' },
      { title: 'Suitable for Sensitive Shipments', description: 'Ideal for food, pharma, and climate-sensitive cargo.' },
    ],
    processSteps: [
      { step: 1, title: 'Request Quote', description: 'Share temperature requirements and freight details.' },
      { step: 2, title: 'Pre-Cool Unit', description: 'Reefer unit is pre-cooled to your required temperature.' },
      { step: 3, title: 'Freight Pickup', description: 'Careful loading to maintain cold chain.' },
      { step: 4, title: 'Monitored Transit', description: 'Temperature monitored throughout the journey.' },
      { step: 5, title: 'Safe Delivery', description: 'Delivery with full cold chain integrity.' },
    ],
    relatedServices: ['dry-vans', 'container-service', 'intermodal'],
    sortOrder: 2,
    isActive: true,
    seoTitle: 'Reefer Trucking Services | Temperature Controlled Freight | RS Trans Logistics',
    seoDescription: 'Temperature-controlled reefer freight services between Canada and the USA. Cold chain solutions for food and perishable goods.',
  },
  {
    title: 'Flatbed Tarp, Curtain Vans & Roll Tite',
    slug: 'flatbed-curtain-roll-tite',
    icon: 'package',
    shortDescription: 'Flexible freight solutions for oversized, covered, or specialized loads.',
    detailedDescription:
      'Flatbed tarp, curtain van, and roll tite services are built for freight that requires flexible loading, secure coverage, or specialized handling. This service is ideal for construction materials, machinery, industrial freight, and larger cargo.',
    bestFor: [
      'Construction materials',
      'Machinery',
      'Oversized freight',
      'Industrial loads',
      'Covered flatbed freight',
    ],
    benefits: [
      { title: 'Flexible Loading Options', description: 'Load from multiple sides for convenience.' },
      { title: 'Secure Coverage', description: 'Tarp and curtain systems protect your freight.' },
      { title: 'Suitable for Heavy Freight', description: 'Built for industrial and heavy cargo movement.' },
      { title: 'Specialized Load Support', description: 'Handles non-standard shapes and sizes.' },
    ],
    processSteps: [
      { step: 1, title: 'Request Quote', description: 'Provide load dimensions and weight.' },
      { step: 2, title: 'Equipment Selection', description: 'Right trailer type selected for your load.' },
      { step: 3, title: 'Secure Loading', description: 'Professional load securing and coverage.' },
      { step: 4, title: 'Transit', description: 'Safe movement with proper tie-down and coverage.' },
      { step: 5, title: 'Delivery', description: 'Careful unloading at your destination.' },
    ],
    relatedServices: ['dry-vans', 'step-deck', 'container-service'],
    sortOrder: 3,
    isActive: true,
    seoTitle: 'Flatbed Tarp & Curtain Van Services | RS Trans Logistics',
    seoDescription: 'Flatbed tarp, curtain van, and roll tite freight services between Canada and the USA. Flexible solutions for oversized and industrial loads.',
  },
  {
    title: 'Step Deck',
    slug: 'step-deck',
    icon: 'layers',
    shortDescription: 'Specialized hauling for taller or oversized freight requiring lower deck height.',
    detailedDescription:
      'Step deck service is designed for freight that is too tall for standard flatbed transportation. With a lower deck height, this service supports the safe movement of oversized machinery, equipment, and industrial cargo.',
    bestFor: [
      'Tall equipment',
      'Oversized loads',
      'Machinery',
      'Industrial freight',
      'Heavy cargo',
    ],
    benefits: [
      { title: 'Lower Deck Height', description: 'Accommodates taller loads within legal height limits.' },
      { title: 'Better Oversized Load Support', description: 'Designed for equipment exceeding standard dimensions.' },
      { title: 'Safe Hauling Solution', description: 'Engineered for safe transport of heavy machinery.' },
      { title: 'Suitable for Equipment Transport', description: 'Ideal for construction and industrial equipment.' },
    ],
    processSteps: [
      { step: 1, title: 'Request Quote', description: 'Submit height, width, and weight specifications.' },
      { step: 2, title: 'Permit Review', description: 'Oversized load permits reviewed if required.' },
      { step: 3, title: 'Equipment Pickup', description: 'Professional loading of your oversized freight.' },
      { step: 4, title: 'Safe Transit', description: 'Careful routing for oversized loads.' },
      { step: 5, title: 'Delivery', description: 'Safe unloading at destination.' },
    ],
    relatedServices: ['flatbed-curtain-roll-tite', 'dry-vans', 'container-service'],
    sortOrder: 4,
    isActive: true,
    seoTitle: 'Step Deck Trucking Services | Oversized Freight | RS Trans Logistics',
    seoDescription: 'Step deck trucking for oversized and tall freight between Canada and the USA. Lower deck height for industrial machinery and equipment.',
  },
  {
    title: 'Container Service',
    slug: 'container-service',
    icon: 'container',
    shortDescription: 'Reliable container transportation for import, export, and commercial logistics.',
    detailedDescription:
      'Container service supports businesses moving containerized freight between ports, terminals, warehouses, and delivery points. It is ideal for import/export operations and commercial logistics requirements.',
    bestFor: [
      'Shipping containers',
      'Import/export freight',
      'Terminal movements',
      'Warehouse delivery',
      'Commercial logistics',
    ],
    benefits: [
      { title: 'Container Freight Support', description: 'Handle 20ft and 40ft containers with ease.' },
      { title: 'Port and Terminal Movement', description: 'Seamless port pickup and delivery.' },
      { title: 'Import/Export Friendly', description: 'Ideal for businesses with cross-border container needs.' },
      { title: 'Reliable Logistics Connection', description: 'Connect your supply chain efficiently.' },
    ],
    processSteps: [
      { step: 1, title: 'Request Quote', description: 'Share container details and routing information.' },
      { step: 2, title: 'Booking Confirmation', description: 'Confirm pickup from port or warehouse.' },
      { step: 3, title: 'Container Pickup', description: 'Container collected from terminal or depot.' },
      { step: 4, title: 'Transit', description: 'Safe transport to destination.' },
      { step: 5, title: 'Delivery', description: 'Container delivered and released.' },
    ],
    relatedServices: ['intermodal', 'dry-vans', 'reefer-service'],
    sortOrder: 5,
    isActive: true,
    seoTitle: 'Container Trucking Services | Import Export Freight | RS Trans Logistics',
    seoDescription: 'Container transportation services between Canadian and US ports, terminals, and warehouses. Import/export freight logistics.',
  },
  {
    title: 'Intermodal',
    slug: 'intermodal',
    icon: 'git-merge',
    shortDescription: 'Efficient freight movement using multiple transportation methods.',
    detailedDescription:
      'Intermodal transportation combines different modes of freight movement to create flexible long-distance logistics solutions. It is useful for businesses that need efficient containerized cargo movement across longer routes.',
    bestFor: [
      'Long-distance freight',
      'Containerized cargo',
      'Rail-connected freight',
      'Multi-mode logistics',
      'Commercial shipping',
    ],
    benefits: [
      { title: 'Flexible Long-Distance Movement', description: 'Combine road and rail for optimal routing.' },
      { title: 'Multi-Mode Freight Support', description: 'Use the best transportation mode for each leg.' },
      { title: 'Efficient Container Logistics', description: 'Streamlined container handling across modes.' },
      { title: 'Useful for Large-Scale Transport', description: 'Cost-effective for high-volume freight.' },
    ],
    processSteps: [
      { step: 1, title: 'Request Quote', description: 'Submit origin, destination, and cargo details.' },
      { step: 2, title: 'Route Planning', description: 'Optimal intermodal route designed for your freight.' },
      { step: 3, title: 'First Mile Pickup', description: 'Truck picks up freight from origin.' },
      { step: 4, title: 'Rail/Multi-Mode Transit', description: 'Freight moves via optimal transport combination.' },
      { step: 5, title: 'Last Mile Delivery', description: 'Final delivery to your destination.' },
    ],
    relatedServices: ['container-service', 'dry-vans', 'reefer-service'],
    sortOrder: 6,
    isActive: true,
    seoTitle: 'Intermodal Freight Services | Canada USA | RS Trans Logistics',
    seoDescription: 'Intermodal transportation combining road and rail for efficient long-distance freight movement between Canada and the USA.',
  },
];

export async function seedDatabase() {
  try {
    await connectDB();

    // Create default admin user
    const existingAdmin = await AdminUser.findOne({ email: 'admin@rstranslogistics.com' });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('Admin123!', 12);
      await AdminUser.create({
        name: 'Admin User',
        email: 'admin@rstranslogistics.com',
        passwordHash,
        role: 'superadmin',
      });
      console.log('✅ Default admin user created');
      console.log('📧 Email: admin@rstranslogistics.com');
      console.log('🔑 Password: Admin123!');
      console.log('⚠️  CHANGE THESE CREDENTIALS BEFORE GOING TO PRODUCTION!');
    }

    // Create default site settings
    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      await SiteSettings.create({});
      console.log('✅ Default site settings created');
    }

    // Create default services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(defaultServices);
      console.log('✅ Default services created');
    }

    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Database seed error:', error);
    throw error;
  }
}
