export type LessonProgress = {
  [lessonTitle: string]: boolean;
};

export type UserProgress = {
  [moduleId: string]: LessonProgress;
};
