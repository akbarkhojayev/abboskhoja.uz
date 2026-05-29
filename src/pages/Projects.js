import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, Chip, Button, Grid, Card,
  CardMedia, CardContent, CardActions, Skeleton,
  Dialog, DialogContent, IconButton, Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import parse from 'html-react-parser';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';

const API_BASE = 'https://abboskhojauz.pythonanywhere.com';

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

function ProjectModal({ project, open, onClose, isDark, theme }) {
  if (!project) return null;
  const imgSrc = project.image || project.cover_images?.[0]?.image;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: isDark ? '#1a1d25' : '#fff',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          m: { xs: 1, sm: 2 },
          maxHeight: '90vh',
        },
      }}
    >
      <DialogContent sx={{ p: 0, overflow: 'auto' }}>
        {/* Close button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 10,
            background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(8px)',
            color: theme.palette.text.primary,
            '&:hover': { background: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,1)' },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* Image */}
        {imgSrc && (
          <Box sx={{ width: '100%', maxHeight: { xs: 220, sm: 320 }, overflow: 'hidden' }}>
            <Box
              component="img"
              src={imgSrc}
              alt={project.title}
              sx={{ width: '100%', height: { xs: 220, sm: 320 }, objectFit: 'cover', display: 'block' }}
            />
          </Box>
        )}

        <Box sx={{ p: { xs: 2.5, sm: 4 } }}>
          {/* Title */}
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              fontSize: { xs: '1.4rem', sm: '1.9rem' },
              color: theme.palette.text.primary,
              letterSpacing: '-0.5px',
              mb: 2,
            }}
          >
            {project.title}
          </Typography>

          {/* Tags */}
          {project.tag && project.tag.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 3 }}>
              {project.tag.map((tag, i) => (
                <Chip
                  key={i}
                  label={tag}
                  size="small"
                  sx={{
                    height: 26,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}44`,
                  }}
                />
              ))}
            </Box>
          )}

          <Divider sx={{ mb: 3, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />

          {/* Full description */}
          {project.description && (
            <Box
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: '0.9rem', sm: '0.95rem' },
                lineHeight: 1.8,
                mb: 3,
                '& p': { mb: 1 },
                '& h1,& h2,& h3': { color: theme.palette.text.primary, mt: 2, mb: 1 },
                '& ul,& ol': { pl: 2.5 },
                '& li': { mb: 0.5 },
              }}
            >
              {parse(project.description)}
            </Box>
          )}

          {/* Buttons */}
          {(project.git_hub || project.project_url) && (
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {project.git_hub && (
                <Button
                  startIcon={<GitHubIcon />}
                  href={project.git_hub}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    color: theme.palette.text.primary,
                    border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      background: `${theme.palette.primary.main}10`,
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  GitHub
                </Button>
              )}
              {project.project_url && (
                <Button
                  startIcon={<LaunchIcon />}
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: '#fff',
                    '&:hover': { opacity: 0.88, boxShadow: '0 4px 14px rgba(0,0,0,0.2)' },
                    transition: 'all 0.2s',
                  }}
                >
                  Live Demo
                </Button>
              )}
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function ProjectCard({ project, index, isDark, theme, onClick }) {
  const imgSrc = project.image || project.cover_images?.[0]?.image;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="show"
      style={{ height: '100%' }}
    >
      <Card
        onClick={onClick}
        elevation={0}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
          background: isDark ? 'rgba(25,28,36,0.95)' : '#fff',
          cursor: 'pointer',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: isDark
              ? '0 20px 48px rgba(0,0,0,0.45)'
              : '0 20px 48px rgba(0,0,0,0.12)',
          },
        }}
      >
        {/* Image */}
        <Box sx={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          {imgSrc ? (
            <CardMedia
              component="img"
              image={imgSrc}
              alt={project.title}
              sx={{
                height: { xs: 190, sm: 210, md: 220 },
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
                '&:hover': { transform: 'scale(1.04)' },
              }}
            />
          ) : (
            <Box
              sx={{
                height: { xs: 190, sm: 210, md: 220 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
                fontSize: '3rem',
                fontWeight: 900,
                color: theme.palette.primary.main,
              }}
            >
              {project.title?.charAt(0) || 'P'}
            </Box>
          )}
        </Box>

        {/* Content */}
        <CardContent sx={{ flex: 1, p: { xs: 2, sm: 2.5 }, pb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1rem', sm: '1.05rem' },
              color: theme.palette.text.primary,
              mb: 1,
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </Typography>

          {project.description && (
            <Box
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: '0.82rem', sm: '0.87rem' },
                lineHeight: 1.65,
                mb: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                '& p': { m: 0 },
                '& *': { fontSize: 'inherit !important', color: 'inherit !important' },
              }}
            >
              {parse(project.description)}
            </Box>
          )}

          {project.tag && project.tag.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, mt: 'auto' }}>
              {project.tag.map((tag, i) => (
                <Chip
                  key={i}
                  label={tag}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
                    color: theme.palette.text.secondary,
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  }}
                />
              ))}
            </Box>
          )}
        </CardContent>

        {/* Footer hint */}
        <Box sx={{ px: { xs: 2, sm: 2.5 }, pb: { xs: 1.5, sm: 2 }, pt: 0.5 }}>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              fontSize: '0.75rem',
              opacity: 0.8,
            }}
          >
            Batafsil ko'rish →
          </Typography>
        </Box>
      </Card>
    </motion.div>
  );
}

function Projects() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/projects/`)
      .then(res => setProjects(res.data.results || res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.default, py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>

        <Typography
          component={motion.h2}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          variant="h3"
          fontWeight={400}
          sx={{
            mb: { xs: 4, md: 6 },
            letterSpacing: '-1px',
            color: theme.palette.text.primary,
            fontFamily: 'Poppins, Montserrat, Inter, sans-serif',
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          Projects
        </Typography>

        {loading && (
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {[...Array(6)].map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 3, mb: 1 }} />
                <Skeleton variant="text" width="70%" height={28} sx={{ borderRadius: 1 }} />
                <Skeleton variant="text" width="90%" height={18} sx={{ borderRadius: 1 }} />
                <Skeleton variant="text" width="80%" height={18} sx={{ borderRadius: 1 }} />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && projects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
              No projects available
            </Typography>
          </Box>
        )}

        {!loading && projects.length > 0 && (
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {projects.map((project, i) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <ProjectCard
                  project={project}
                  index={i}
                  isDark={isDark}
                  theme={theme}
                  onClick={() => setSelected(project)}
                />
              </Grid>
            ))}
          </Grid>
        )}

      </Container>

      <ProjectModal
        project={selected}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        isDark={isDark}
        theme={theme}
      />
    </Box>
  );
}

export default Projects;
