// Mock AI service for generating past life content
// In a real implementation, this would connect to image generation APIs

const pastLifeEras = [
  { era: "Ancient Egypt (3100-30 BCE)", occupations: ["Pharaoh", "High Priest", "Scribe", "Merchant", "Architect"] },
  { era: "Medieval Europe (500-1500 CE)", occupations: ["Knight", "Noble", "Monk", "Blacksmith", "Court Musician"] },
  { era: "Ancient Rome (753 BCE-476 CE)", occupations: ["Senator", "Gladiator", "Philosopher", "Artisan", "Military Commander"] },
  { era: "Victorian England (1837-1901)", occupations: ["Inventor", "Artist", "Explorer", "Scholar", "Aristocrat"] },
  { era: "Renaissance Italy (1300-1600)", occupations: ["Artist", "Merchant", "Scholar", "Architect", "Patron of Arts"] },
  { era: "Ancient Greece (800-146 BCE)", occupations: ["Philosopher", "Poet", "Warrior", "Mathematician", "Oracle"] },
  { era: "Samurai Japan (1185-1868)", occupations: ["Samurai Warrior", "Tea Master", "Zen Monk", "Court Poet", "Sword Master"] },
  { era: "Wild West America (1860-1890)", occupations: ["Sheriff", "Pioneer", "Gold Prospector", "Saloon Owner", "Railroad Builder"] }
];

const namesByEra = {
  "Ancient Egypt": ["Ankh-es-en-Amun", "Khaemwaset", "Nefertiti", "Amenhotep", "Cleopatra"],
  "Medieval Europe": ["Sir Gareth", "Lady Guinevere", "Brother Marcus", "Isabella", "Lord Edmund"],
  "Ancient Rome": ["Marcus Aurelius", "Livia", "Gaius", "Octavia", "Decimus"],
  "Victorian England": ["Lord Montgomery", "Lady Catherine", "Professor Aldrich", "Miss Charlotte", "Sir Reginald"],
  "Renaissance Italy": ["Lorenzo", "Caterina", "Marco", "Isabella", "Francesco"],
  "Ancient Greece": ["Aristotle", "Athena", "Alexios", "Penelope", "Socrates"],
  "Samurai Japan": ["Takeshi", "Yuki", "Hiroshi", "Sakura", "Kenji"],
  "Wild West America": ["Marshal Cole", "Miss Ruby", "Black Jack", "Annie", "Sheriff Morgan"]
};

export async function generatePastLifeImage(userImage: File): Promise<string> {
  // Simulate image processing delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Get a random era for the AI generation prompt
  const selectedEra = pastLifeEras[Math.floor(Math.random() * pastLifeEras.length)];
  const occupation = selectedEra.occupations[Math.floor(Math.random() * selectedEra.occupations.length)];
  
  // Create AI-generated historical portrait using Lovable's image generation
  const prompt = `A detailed historical portrait of a ${occupation.toLowerCase()} from ${selectedEra.era}, painted in the artistic style of that era. Renaissance painting style, oil on canvas, museum quality, highly detailed facial features, period-accurate clothing and accessories, warm lighting, masterpiece quality. Ultra high resolution.`;
  
  try {
    // For now, we'll use a fallback since real AI generation requires external API
    // This would be replaced with actual AI service in production
    throw new Error('Using fallback generation');
  } catch (error) {
    console.error('AI image generation failed:', error);
    
    // Fallback to placeholder if AI generation fails
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Canvas not supported');
    
    canvas.width = 768;
    canvas.height = 768;
    
    // Create a mystical gradient background
    const gradient = ctx.createRadialGradient(384, 384, 0, 384, 384, 384);
    gradient.addColorStop(0, '#4B0082');
    gradient.addColorStop(0.5, '#8B008B');
    gradient.addColorStop(1, '#2E0854');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 768, 768);
    
    // Add mystical border
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, 688, 688);
    
    // Add text with shadow
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 32px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Your Mystical', 384, 350);
    ctx.fillText('Past Life Portrait', 384, 390);
    ctx.fillText(`${occupation}`, 384, 440);
    
    return canvas.toDataURL('image/png');
  }
}

export async function generatePastLifeStory(): Promise<{
  story: string;
  era: string;
  name: string;
}> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Randomly select an era and occupation
  const selectedEra = pastLifeEras[Math.floor(Math.random() * pastLifeEras.length)];
  const occupation = selectedEra.occupations[Math.floor(Math.random() * selectedEra.occupations.length)];
  
  // Get era key for names
  const eraKey = selectedEra.era.split(' ')[0] + ' ' + selectedEra.era.split(' ')[1];
  const names = namesByEra[eraKey as keyof typeof namesByEra] || ["Mystery", "Ancient", "Noble", "Wise", "Brave"];
  const name = names[Math.floor(Math.random() * names.length)];
  
  // Generate story based on era and occupation
  const stories = [
    `You were ${name}, a renowned ${occupation.toLowerCase()} in ${selectedEra.era}. Your wisdom and influence shaped the course of history, leaving behind a legacy that echoes through the ages. You were known for your compassion, intelligence, and remarkable ability to inspire others.`,
    
    `In your past life, you lived as ${name}, a respected ${occupation.toLowerCase()} during ${selectedEra.era}. Your life was filled with adventure, discovery, and meaningful connections. You had a natural gift for leadership and were beloved by all who knew you.`,
    
    `The cosmic energies reveal that you were ${name}, a powerful ${occupation.toLowerCase()} in ${selectedEra.era}. Your soul carried great responsibility and you used your position to bring positive change to your community. Your spirit was known for its courage and unwavering determination.`,
    
    `You once walked the earth as ${name}, an influential ${occupation.toLowerCase()} during the time of ${selectedEra.era}. Your past life was marked by creativity, passion, and a deep connection to the spiritual realm. You were a beacon of hope in challenging times.`
  ];
  
  const story = stories[Math.floor(Math.random() * stories.length)];
  
  return {
    story,
    era: selectedEra.era,
    name
  };
}