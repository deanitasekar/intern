"use client";

import {
  Article,
  CreateArticleInput,
  UpdateArticleInput,
} from "@/types/article.type";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface ArticleContextType {
  articles: Article[];
  isLoading: boolean;
  addArticle: (article: CreateArticleInput) => void;
  getArticle: (id: string) => Article | undefined;
  updateArticle: (article: UpdateArticleInput) => void;
  deleteArticle: (id: string) => void;
}

const ArticleContext = createContext<ArticleContextType>({
  articles: [],
  isLoading: true,
  addArticle: () => {},
  getArticle: () => undefined,
  updateArticle: () => {},
  deleteArticle: () => {},
});

interface ArticleProviderProps {
  children: React.ReactNode;
}

const STORAGE_ARTICLE_KEY = "blog_articles";

const initialArticles: Article[] = [
  {
    title: "Selamat Datang di Blog Sederhana",
    content: `# Selamat Datang di Blog Sederhana!

Ini adalah artikel pertama di blog sederhana yang dibuat dengan **Next.js**, **TypeScript**, dan **Material UI**.

## Fitur yang Tersedia

- ✍️ **Editor Markdown** - Tulis artikel dengan format Markdown
- 📝 **CRUD Operations** - Create, Read, Update, Delete artikel
- 💾 **Local Storage** - Data tersimpan di browser Anda
- 🎨 **Material UI** - Interface yang modern dan responsif

## Cara Menggunakan

1. Klik tombol **"Tambah Artikel"** untuk membuat artikel baru
2. Gunakan editor Markdown untuk menulis konten
3. Simpan artikel dan lihat hasilnya di halaman utama
4. Edit atau hapus artikel sesuai kebutuhan

Selamat menulis! 🚀`,
    createdAt: new Date().toISOString(),
    description: "Artikel pertama untuk memulai journey blogging Anda",
    id: uuidv4(),
  },
];

import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

const LoadingComponent: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={3}
        sx={{
          minHeight: "60vh",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "50%",
              padding: "3px",
              background:
                "linear-gradient(45deg, transparent, rgba(33, 150, 243, 0.1))",
              animation: "pulse 2s ease-in-out infinite",
            },
            "@keyframes pulse": {
              "0%, 100%": {
                opacity: 0.8,
                transform: "scale(1)",
              },
              "50%": {
                opacity: 0.4,
                transform: "scale(1.05)",
              },
            },
          }}
        >
          <CircularProgress
            size={48}
            thickness={3.6}
            sx={{
              color: "primary.main",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
        </Box>

        <Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 500,
              color: "text.primary",
              mb: 1,
              letterSpacing: "0.02em",
            }}
          >
            Loading
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export const ArticleProvider: React.FC<ArticleProviderProps> = ({
  children,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const articlesStorage = {
    getArticles: (): Article[] => {
      try {
        if (typeof window === "undefined") return [];
        const stored = localStorage.getItem(STORAGE_ARTICLE_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        console.error("Error reading from local storage:", error);
        return [];
      }
    },

    saveArticles: (articles: Article[]): void => {
      try {
        if (typeof window === "undefined") return;
        localStorage.setItem(STORAGE_ARTICLE_KEY, JSON.stringify(articles));
        console.log("Articles saved to localStorage:", articles.length);
      } catch (error) {
        console.error("Error saving to local storage:", error);
      }
    },
  };

  useEffect(() => {
    const loadArticles = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const storedArticles = articlesStorage.getArticles();

      if (storedArticles.length > 0) {
        setArticles(storedArticles);
        console.log(
          "Loaded articles from localStorage:",
          storedArticles.length
        );
      } else {
        setArticles(initialArticles);
        articlesStorage.saveArticles(initialArticles);
        console.log("Initialized with default articles");
      }

      setIsLoading(false);
    };

    loadArticles();
  }, []);

  useEffect(() => {
    if (!isLoading && articles.length > 0) {
      articlesStorage.saveArticles(articles);
    }
  }, [articles, isLoading]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addArticle = (articleData: CreateArticleInput) => {
    const newArticle: Article = {
      ...articleData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    console.log("Adding new article:", newArticle);

    setArticles((prev) => {
      const updatedArticles = [newArticle, ...prev];
      console.log("Updated articles array:", updatedArticles.length);
      return updatedArticles;
    });
  };

  const getArticle = (id: string) => {
    return articles.find((article) => article.id === id);
  };

  const updateArticle = (articleData: UpdateArticleInput) => {
    console.log("Updating article:", articleData);

    setArticles((prev) => {
      const updatedArticles = prev.map((article) =>
        article.id === articleData.id
          ? {
              ...article,
              title: articleData.title,
              description: articleData.description,
              content: articleData.content,
            }
          : article
      );
      console.log("Articles after update:", updatedArticles.length);
      return updatedArticles;
    });
  };

  const deleteArticle = (id: string) => {
    console.log("Deleting article with id:", id);

    setArticles((prev) => {
      const updatedArticles = prev.filter((article) => article.id !== id);
      console.log("Articles after delete:", updatedArticles.length);
      return updatedArticles;
    });
  };

  const contextValue: ArticleContextType = {
    articles,
    isLoading,
    addArticle,
    getArticle,
    updateArticle,
    deleteArticle,
  };

  return (
    <ArticleContext.Provider value={contextValue}>
      {isClient && isLoading ? <LoadingComponent /> : children}
    </ArticleContext.Provider>
  );
};

export { ArticleContext };
export default ArticleProvider;
