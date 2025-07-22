import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Share2, Download, RotateCcw, Twitter, Facebook } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface PastLifeResultProps {
  result: {
    image: string;
    story: string;
    era: string;
    name: string;
  };
  onTryAgain: () => void;
  originalImage?: File | null;
}

export function PastLifeResult({ result, onTryAgain }: PastLifeResultProps) {
  
  const handleShare = async (platform?: 'twitter' | 'facebook') => {
    const shareText = `I just discovered my past life! I was ${result.name} from the ${result.era}! 🔮✨ Try it yourself:`;
    const shareUrl = window.location.origin;
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: 'Soul Snap AI - My Past Life',
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        toast.success('Link copied to clipboard!');
      }
    } else {
      // Fallback to copying to clipboard
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = result.image;
    link.download = `${result.name}-past-life.png`;
    link.click();
    toast.success('Image downloaded!');
  };

  return (
    <div className="min-h-screen bg-gradient-mystical relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-portal opacity-30 animate-portal" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-cosmic bg-clip-text text-transparent mb-4 animate-glow">
              Your Past Life Revealed!
            </h1>
            <p className="text-accent text-lg">
              The cosmic energies have spoken...
            </p>
          </div>

          {/* Main Result */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Past Life Image */}
            <Card className="bg-card/10 backdrop-blur-lg border-accent/20 overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={result.image}
                  alt={`${result.name} from ${result.era}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-accent mb-1">
                    {result.name}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {result.era}
                  </p>
                </div>
              </div>
            </Card>

            {/* Story & Details */}
            <div className="space-y-6">
              <Card className="bg-card/10 backdrop-blur-lg border-accent/20 p-6">
                <h3 className="text-xl font-semibold text-accent mb-4 flex items-center">
                  <span className="mr-2">📜</span>
                  Your Past Life Story
                </h3>
                <p className="text-foreground leading-relaxed">
                  {result.story}
                </p>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card/5 backdrop-blur-sm border-accent/10 p-4 text-center">
                  <div className="text-2xl mb-2">⏰</div>
                  <h4 className="font-semibold text-accent text-sm">Era</h4>
                  <p className="text-xs text-muted-foreground">{result.era}</p>
                </Card>
                <Card className="bg-card/5 backdrop-blur-sm border-accent/10 p-4 text-center">
                  <div className="text-2xl mb-2">👤</div>
                  <h4 className="font-semibold text-accent text-sm">Identity</h4>
                  <p className="text-xs text-muted-foreground">{result.name}</p>
                </Card>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Primary Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="mystical"
                size="lg"
                onClick={() => handleShare()}
                className="flex-1 sm:flex-none"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Your Past Life
              </Button>
              
              <Button
                variant="cosmic"
                size="lg"
                onClick={handleDownload}
                className="flex-1 sm:flex-none"
              >
                <Download className="mr-2 h-5 w-5" />
                Save Image
              </Button>
            </div>

            {/* Social Share Buttons */}
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                className={cn(
                  "bg-card/20 backdrop-blur-sm border-accent/20",
                  "hover:bg-blue-500/20 hover:border-blue-500/50"
                )}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                className={cn(
                  "bg-card/20 backdrop-blur-sm border-accent/20",
                  "hover:bg-blue-600/20 hover:border-blue-600/50"
                )}
              >
                <Facebook className="h-4 w-4" />
              </Button>
            </div>

            {/* Try Again */}
            <div className="text-center pt-4">
              <Button
                variant="ghost"
                onClick={onTryAgain}
                className="text-muted-foreground hover:text-accent"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Try with another photo
              </Button>
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-card/5 backdrop-blur-sm border-accent/10 p-6 mt-8 text-center">
            <h3 className="text-lg font-semibold text-accent mb-2">
              Share the Magic! ✨
            </h3>
            <p className="text-muted-foreground text-sm">
              Your friends are waiting to discover their past lives too!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}