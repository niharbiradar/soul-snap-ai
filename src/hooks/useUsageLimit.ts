import { useState, useEffect } from 'react';

const FREE_LIMIT = 3; // 3 free reveals
const STORAGE_KEY = 'soul-snap-usage';

export function useUsageLimit() {
  const [usageCount, setUsageCount] = useState(0);
  const [hasReachedLimit, setHasReachedLimit] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const count = stored ? parseInt(stored, 10) : 0;
    setUsageCount(count);
    setHasReachedLimit(count >= FREE_LIMIT);
  }, []);

  const incrementUsage = () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem(STORAGE_KEY, newCount.toString());
    setHasReachedLimit(newCount >= FREE_LIMIT);
    return newCount;
  };

  const getRemainingUses = () => Math.max(0, FREE_LIMIT - usageCount);

  const resetUsage = () => {
    setUsageCount(0);
    localStorage.setItem(STORAGE_KEY, '0');
    setHasReachedLimit(false);
  };

  return {
    usageCount,
    hasReachedLimit,
    remainingUses: getRemainingUses(),
    incrementUsage,
    resetUsage,
    freeLimit: FREE_LIMIT
  };
}