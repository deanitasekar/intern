export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
}

export interface CreateArticleInput {
  title: string;
  description: string;
  content: string;
}

export interface UpdateArticleInput extends CreateArticleInput {
  id: string;
}