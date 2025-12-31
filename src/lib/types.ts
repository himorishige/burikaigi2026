export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export type Comment = {
  id: string;
  text: string;
  pending?: boolean;
  createdAt: Date;
};

export type SortableItem = {
  id: string;
  text: string;
  order: number;
};

export type OptimisticToggleAction = {
  id: string;
  done: boolean;
};

export type OptimisticReorderAction = {
  fromIndex: number;
  toIndex: number;
};

export type AnalysisResult = {
  score: number;
  summary: string;
  details: string[];
};

