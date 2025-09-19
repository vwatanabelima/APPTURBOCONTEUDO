import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from './firebase';
import { modules } from '@/app/dashboard/modules';
import type { UserProgress } from '@/types';

export async function initializeUserDocument(user: User) {
  const userRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    const initialProgress = modules.reduce((acc, module) => {
      acc[module.id] = false;
      return acc;
    }, {} as UserProgress);
    
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      progress: initialProgress,
      createdAt: new Date(),
    });
  }
}

export async function getUserProgress(uid: string): Promise<UserProgress | null> {
  const userRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data().progress as UserProgress;
  } else {
    console.warn(`No such document for user: ${uid}`);
    return null;
  }
}

export async function setModuleCompleted(uid: string, moduleId: string, completed: boolean) {
  const userRef = doc(db, 'users', uid);
  const fieldPath = `progress.${moduleId}`;
  
  await updateDoc(userRef, {
    [fieldPath]: completed
  });
}
