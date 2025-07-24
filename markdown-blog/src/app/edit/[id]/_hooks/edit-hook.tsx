// hooks/useEditArticle.ts
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ArticleContext } from '@/contexts/article.context';
import { notFound } from 'next/navigation';

interface UseEditArticleProps {
  articleId: string;
}

interface UseEditArticleReturn {
  article: any;
  title: string;
  description: string;
  content: string;
  isLoading: boolean;
  showSuccess: boolean;
  isInitialized: boolean;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setContent: (content: string) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
}

export const useEditArticle = ({ articleId }: UseEditArticleProps): UseEditArticleReturn => {
  const router = useRouter();
  const { getArticle, updateArticle } = useContext(ArticleContext);
  
  const article = getArticle(articleId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setDescription(article.description);
      setContent(article.content);
      setIsInitialized(true);
    } else {
      const timer = setTimeout(() => {
        if (!article) {
          notFound();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [article]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Judul dan konten tidak boleh kosong');
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      updateArticle({
        id: articleId,
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
      });

      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        router.push(`/article/${articleId}`);
      }, 2000);
      
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Terjadi kesalahan saat menyimpan artikel');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    const hasChanges = 
      title !== article?.title ||
      description !== article?.description ||
      content !== article?.content;

    if (hasChanges) {
      if (window.confirm('Ada perubahan yang belum disimpan. Yakin ingin keluar?')) {
        router.back();
      }
    } else {
      router.back();
    }
  };

  return {
    article,
    title,
    description,
    content,
    isLoading,
    showSuccess,
    isInitialized,
    setTitle,
    setDescription,
    setContent,
    handleSave,
    handleCancel,
  };
};