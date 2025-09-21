
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/auth-context';

type Comment = {
  id: number;
  author: string;
  avatar: string;
  initial: string;
  text: string;
  date: string;
};

const initialComments: Comment[] = [];

export function Comments() {
  const { user } = useAuth();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && user) {
        const comment: Comment = {
            id: comments.length + 1,
            author: user.email?.split('@')[0] || 'Usuário',
            avatar: user.photoURL || '',
            initial: user.email ? user.email.charAt(0).toUpperCase() : 'U',
            text: newComment,
            date: 'Agora mesmo'
        };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };
  
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : '?';

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Comentários</h3>
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage src={user?.photoURL ?? ''} />
          <AvatarFallback>{userInitial}</AvatarFallback>
        </Avatar>
        <form onSubmit={handleSubmit} className="flex-1 space-y-2">
          <Textarea
            placeholder="Deixe seu comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button type="submit" disabled={!newComment.trim()}>Enviar Comentário</Button>
        </form>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src={comment.avatar} />
              <AvatarFallback>{comment.initial}</AvatarFallback>
            </Avatar>
            <div className="flex-1 rounded-md bg-muted/50 p-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{comment.author}</p>
                <p className="text-xs text-muted-foreground">{comment.date}</p>
              </div>
              <p className="mt-1 text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
