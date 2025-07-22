import { Card } from '@/components/ui/card';
import crystalBall from '@/assets/crystal-ball.png';

const loadingMessages = [
  "Gazing into the cosmic void...",
  "Consulting ancient spirits...", 
  "Traveling through time dimensions...",
  "Channeling mystical energies...",
  "Reading the akashic records...",
  "Connecting with your soul's journey...",
  "Unveiling temporal mysteries..."
];

export function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-mystical relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-portal opacity-40 animate-portal" />
      
      <div className="relative z-10 text-center">
        <Card className="bg-card/10 backdrop-blur-lg border-accent/20 p-8 max-w-md mx-4">
          <div className="mb-6">
            <img 
              src={crystalBall} 
              alt="Crystal Ball" 
              className="w-20 h-20 mx-auto animate-float drop-shadow-2xl mb-4"
            />
            <div className="w-12 h-12 mx-auto mb-4">
              <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-accent mb-4 animate-glow">
            Revealing Your Past Life...
          </h2>
          
          <div className="space-y-2">
            {loadingMessages.map((message, index) => (
              <p 
                key={index}
                className="text-muted-foreground text-sm opacity-0 animate-pulse"
                style={{ 
                  animationDelay: `${index * 0.8}s`,
                  animationDuration: '1s',
                  animationFillMode: 'forwards'
                }}
              >
                {message}
              </p>
            ))}
          </div>
          
          <div className="mt-6 text-xs text-muted-foreground">
            This may take a moment...
          </div>
        </Card>
      </div>
    </div>
  );
}