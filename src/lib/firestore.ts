import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from './firebase';
import { modules } from '@/app/dashboard/modules';
import type { UserProgress } from '@/types';

function getInitialProgress(): UserProgress {
  return modules.reduce((acc, module) => {
    const lessonProgress = module.lessons?.reduce((lessonAcc, lesson) => {
      lessonAcc[lesson.title] = false;
      return lessonAcc;
    }, {} as { [title: string]: boolean });
    
    acc[module.id] = lessonProgress ?? {};
    return acc;
  }, {} as UserProgress);
}


export async function initializeUserDocument(user: User) {
  const userRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    const initialProgress = getInitialProgress();
    
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      progress: initialProgress,
      createdAt: new Date(),
    });
  } else {
    // Ensure existing users have progress for all modules and lessons
    const existingData = docSnap.data();
    const existingProgress = existingData.progress || {};
    const initialProgress = getInitialProgress();
    
    // Deep merge to add missing modules/lessons without overwriting existing progress
    for (const moduleId in initialProgress) {
      if (!existingProgress[moduleId]) {
        existingProgress[moduleId] = initialProgress[moduleId];
      } else {
        for (const lessonTitle in initialProgress[moduleId]) {
          if (existingProgress[moduleId][lessonTitle] === undefined) {
            existingProgress[moduleId][lessonTitle] = false;
          }
        }
      }
    }
    
    await updateDoc(userRef, { progress: existingProgress });
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

export async function setLessonCompleted(uid: string, moduleId: string, lessonTitle: string, completed: boolean) {
  const userRef = doc(db, 'users', uid);
  const fieldPath = `progress.${moduleId}.${lessonTitle}`;
  
  await updateDoc(userRef, {
    [fieldPath]: completed
  });
}
