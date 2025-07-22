import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageUpload } from '@/components/ImageUpload';
import { PastLifeResult } from '@/components/PastLifeResult';
import { LoadingState } from '@/components/LoadingState';
import { PaywallModal } from '@/components/PaywallModal';
import { generatePastLifeImage, generatePastLifeStory } from '@/lib/pastLifeAI';
import { useUsageLimit } from '@/hooks/useUsageLimit';
import { toast } from 'sonner';
import crystalBall from '@/assets/crystal-ball.png';

export function PastLifeGenerator() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [result, setResult] = useState<{
    image: string;
    story: string;
    era: string;
    name: string;
  } | null>(null);
  
  const { hasReachedLimit, remainingUses, incrementUsage } = useUsageLimit();

  const handleGeneratePastLife = async () => {
    if (!selectedImage) {
      toast.error("Please upload a selfie first!");
      return;
    }

    // Check usage limit
    if (hasReachedLimit) {
      setShowPaywall(true);
      return;
    }

    setIsLoading(true);
    
    try {
      // Generate past life image and story
      const [pastLifeImage, pastLifeData] = await Promise.all([
        generatePastLifeImage(selectedImage),
        generatePastLifeStory()
      ]);

      // Increment usage count
      incrementUsage();

      setResult({
        image: pastLifeImage,
        story: pastLifeData.story,
        era: pastLifeData.era,
        name: pastLifeData.name
      });
      
      toast.success("Your past life has been revealed!");
    } catch (error) {
      console.error('Error generating past life:', error);
      toast.error("Failed to generate your past life. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    if (hasReachedLimit) {
      setShowPaywall(true);
      return;
    }
    setResult(null);
    setSelectedImage(null);
  };

  const handleUpgrade = () => {
    // In a real app, this would integrate with Stripe
    toast.success('Redirecting to payment... (Demo mode)');
    setShowPaywall(false);
    // For demo purposes, we'll reset the usage
    // resetUsage();
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (result) {
    return (
      <PastLifeResult
        result={result}
        onTryAgain={handleTryAgain}
        originalImage={selectedImage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mystical relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-portal opacity-30 animate-portal" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <img 
              src={crystalBall} 
              alt="Crystal Ball" 
              className="w-24 h-24 animate-float drop-shadow-2xl"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-cosmic bg-clip-text text-transparent mb-4 animate-glow">
            Soul Snap AI
          </h1>
          
          <p className="text-xl md:text-2xl text-accent mb-2">
            Discover Who You Were in a Past Life
          </p>
          
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Upload your selfie and let our mystical AI reveal your past life identity through the cosmos of time
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/10 backdrop-blur-lg border-accent/20 p-6 mb-6">
            <ImageUpload 
              onImageSelect={setSelectedImage}
              selectedImage={selectedImage}
              isLoading={isLoading}
            />
          </Card>

          <div className="text-center">
            <Button
              variant="mystical"
              size="lg"
              onClick={handleGeneratePastLife}
              disabled={!selectedImage || isLoading}
              className="w-full md:w-auto"
            >
              {hasReachedLimit ? '🔓 Upgrade for More' : '✨ Reveal My Past Life ✨'}
            </Button>
            
            {!hasReachedLimit && (
              <p className="text-center text-sm text-accent mt-2">
                {remainingUses} free reveals remaining
              </p>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <Card className="bg-card/5 backdrop-blur-sm border-accent/10 p-4 text-center">
              <div className="text-2xl mb-2">🔮</div>
              <h3 className="font-semibold text-accent mb-1">AI Powered</h3>
              <p className="text-sm text-muted-foreground">Advanced AI analyzes your features</p>
            </Card>
            
            <Card className="bg-card/5 backdrop-blur-sm border-accent/10 p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-accent mb-1">Instant Results</h3>
              <p className="text-sm text-muted-foreground">Get your past life in seconds</p>
            </Card>
            
            <Card className="bg-card/5 backdrop-blur-sm border-accent/10 p-4 text-center">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="font-semibold text-accent mb-1">Share Easily</h3>
              <p className="text-sm text-muted-foreground">Perfect for social media sharing</p>
            </Card>
            </div>
          </div>
        </div>
        
        <PaywallModal 
          isOpen={showPaywall}
          onClose={() => setShowPaywall(false)}
          onUpgrade={handleUpgrade}
        />
      </div>
  );
}