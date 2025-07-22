import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Sparkles, Zap, Star } from 'lucide-react';
import { toast } from 'sonner';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function PaywallModal({ isOpen, onClose, onUpgrade }: PaywallModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const plans = {
    monthly: {
      price: '$2.99',
      period: 'month',
      features: ['Unlimited past life reveals', 'HD image generation', 'Premium historical eras', 'No watermarks', 'Priority support']
    },
    yearly: {
      price: '$19.99',
      period: 'year',
      savings: 'Save 44%',
      features: ['Everything in monthly', 'Bonus: Future life predictions', 'Exclusive ancient civilizations', 'Early access to new features', '12 months for price of 7!']
    }
  };

  const handleUpgrade = () => {
    toast('Redirecting to secure payment...');
    onUpgrade();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-gradient-cosmic border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Crown className="h-6 w-6 text-accent animate-glow" />
            Unlock Your Destiny
            <Crown className="h-6 w-6 text-accent animate-glow" />
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              You've used your free reveals! Upgrade to continue your spiritual journey.
            </p>
            <div className="bg-accent/20 rounded-lg p-3 mb-4">
              <p className="text-accent font-semibold">🎁 Special Launch Offer - Limited Time!</p>
            </div>
          </div>

          {/* Plan Toggle */}
          <div className="flex bg-card/30 rounded-lg p-1">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                selectedPlan === 'monthly' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all relative ${
                selectedPlan === 'yearly' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Yearly
              {selectedPlan === 'yearly' && (
                <span className="absolute -top-2 -right-2 bg-accent text-xs px-2 py-1 rounded-full">
                  Best!
                </span>
              )}
            </button>
          </div>

          {/* Selected Plan */}
          <Card className="bg-gradient-mystical border-accent/30 shadow-glow">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-white">
                  {plans[selectedPlan].price}
                  <span className="text-lg text-muted-foreground">/{plans[selectedPlan].period}</span>
                </div>
                {selectedPlan === 'yearly' && (
                  <div className="text-accent font-semibold">{plans.yearly.savings}</div>
                )}
              </div>
              
              <ul className="space-y-2 mb-6">
                {plans[selectedPlan].features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={handleUpgrade}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3"
              >
                <Crown className="mr-2 h-4 w-4" />
                Unlock Premium Magic
              </Button>
            </CardContent>
          </Card>

          <div className="text-center text-xs text-muted-foreground">
            <p>✨ 7-day money-back guarantee • Cancel anytime</p>
            <p>🔒 Secure payment powered by Stripe</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}