
'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <button
              type="button"
              key={ratingValue}
              onClick={() => setRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              className="cursor-pointer bg-transparent p-0"
            >
              <Star
                className={cn(
                  'h-6 w-6',
                  ratingValue <= (hover || rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-muted-foreground'
                )}
              />
            </button>
          );
        })}
      </div>
      {rating > 0 && <span className="text-sm text-muted-foreground">Você avaliou com {rating} estrela(s).</span>}
    </div>
  );
}
