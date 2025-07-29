'use client';

import { ArticleCard } from '@/components/card.component';
import { ArticleContext } from '@/contexts/article.context';
import { Add, Article as ArticleIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Fade,
  Paper,
  Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default function HomePage() {
  const { articles, deleteArticle } = useContext(ArticleContext);
  const router = useRouter();

  const handleView = (id: string) => {
    router.replace(`/article/${id}`);
  };

  const handleEdit = (id: string) => {
    router.replace(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteArticle(id);
    }
  };

  if (articles === undefined) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress size={40} />
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={600}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Welcome to My Blog
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
          >
            Discover insightful articles, tutorials, and thoughts on various topics.
            Start your reading journey or create your own content.
          </Typography>
          <Button
            component={Link}
            href="/create"
            variant="contained"
            color='primary'
            size="large"
            startIcon={<Add />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: '0 4px 20px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                boxShadow: '0 8px 30px rgba(33, 150, 243, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Create New Article
          </Button>
        </Box>
      </Fade>

      {articles.length === 0 ? (
        <Fade in timeout={800}>
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              backgroundColor: 'background.paper',
              borderRadius: 4,
            }}
          >
            <ArticleIcon
              sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }}
            />
            <Typography variant="h3" color="text.secondary" gutterBottom>
              No Articles Yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Start your blogging journey by creating your first article.
            </Typography>
            <Button
              component={Link}
              href="/create"
              variant="contained"
              startIcon={<Add />}
              size="large"
            >
              Write Your First Article
            </Button>
          </Paper>
        </Fade>
      ) : (
        <>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h2" component="h2" gutterBottom>
              Recent Articles
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {articles.map((article) => (
              <Fade in timeout={600} key={article.id}>
                <Box sx={{ flex: '1 1 calc(33.333% - 24px)', minWidth: 200 }}>
                  <ArticleCard
                    article={article}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </Box>
              </Fade>
            ))}
          </Box>
        </>
      )}
    </Container>
  );
}