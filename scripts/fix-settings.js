const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb://localhost:27017/rs-trans-logistics');
  const db = mongoose.connection.db;

  // Remove any existing (empty/broken) settings docs
  await db.collection('sitesettings').deleteMany({});

  // Insert fresh settings with Blue River Logistics
  await db.collection('sitesettings').insertOne({
    companyName: 'Blue River Logistics',
    logo: '',
    favicon: '',
    phone: '+1 236 514 6876',
    email: 'rajneelsampat00@gmail.com',
    contactPerson: 'Rajneel Sampat',
    address: '12542 Grove Crescent, Surrey, BC V3V 2L7, Canada',
    serviceArea: 'Canada and USA',
    footerText: 'Full-service trucking solutions between Canada and the USA.',
    socialLinks: { facebook: '', twitter: '', linkedin: '', instagram: '' },
    brandColors: {
      primary: '#2563EB',
      secondary: '#111827',
      accent: '#F97316',
      accentOrange: '#F97316',
      background: '#070B12',
      backgroundSecondary: '#111827',
      textMuted: '#CBD5E1',
      metalGrey: '#64748B'
    },
    mapEmbed: '',
    seoTitle: 'Blue River Logistics | Canada & USA Trucking Services',
    seoDescription: 'Full-service trucking company based in Surrey, BC, providing dry van, reefer, flatbed, step deck, container, and intermodal freight services between Canada and the USA.',
    seoKeywords: 'Canada USA trucking, Surrey BC trucking, cross-border freight, dry van, reefer service, Blue River Logistics',
    ogImage: '',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  console.log('Site settings created: Blue River Logistics');

  // Verify
  const s = await db.collection('sitesettings').findOne({});
  console.log('Verified company name:', s.companyName);

  // Check services
  const count = await db.collection('services').countDocuments();
  console.log('Services in DB:', count);

  await mongoose.disconnect();
  console.log('Done!');
  process.exit(0);
}

run().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
