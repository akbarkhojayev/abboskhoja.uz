import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Chip, Skeleton, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

const API_BASE = 'https://abboskhojauz.pythonanywhere.com';

function TimelineItem({ title, sub, meta, description, isLast, isDark, theme }) {
  return (
    <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 } }}>
      {/* Line */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.6 }}>
        <Box sx={{
          width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
          background: theme.palette.primary.main,
          boxShadow: `0 0 0 3px ${theme.palette.primary.main}22`,
        }} />
        {!isLast && (
          <Box sx={{
            width: 2, flex: 1, mt: 1, mb: 0,
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            borderRadius: 1,
            minHeight: 32,
          }} />
        )}
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0, pb: isLast ? 0 : 4 }}>
        <Box sx={{ display: 'flex', alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 1, flexWrap: 'wrap', mb: 0.4 }}>
          <Typography sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' }, color: theme.palette.text.primary, lineHeight: 1.3, wordBreak: 'break-word' }}>
            {title}
          </Typography>
          {meta && (
            <Typography sx={{ fontSize: '0.78rem', color: theme.palette.text.secondary, whiteSpace: 'nowrap', opacity: 0.7 }}>
              {meta}
            </Typography>
          )}
        </Box>
        {sub && (
          <Typography sx={{ fontSize: '0.88rem', color: theme.palette.primary.main, fontWeight: 500, mb: 0.8, wordBreak: 'break-word' }}>
            {sub}
          </Typography>
        )}
        {description && (
          <Box sx={{
            fontSize: '0.88rem',
            color: theme.palette.text.secondary,
            lineHeight: 1.75,
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            '& p': { m: 0, mb: 0.5 },
            '& *': { fontSize: 'inherit !important', color: 'inherit !important', background: 'none !important', maxWidth: '100%' },
          }}>
            {parse(description)}
          </Box>
        )}
      </Box>
    </Box>
  );
}

function About() {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const textColor = theme.palette.text.primary;
  const muted = theme.palette.text.secondary;

  useEffect(() => {
    axios.get(`${API_BASE}/user/`).then(res => setProfile(res.data[0])).catch(() => {});
    axios.get(`${API_BASE}/educations/`).then(res => setEducation(res.data.results || res.data)).catch(() => {});
    axios.get(`${API_BASE}/experiences/`).then(res => setExperience(res.data.results || res.data)).catch(() => {});
  }, []);

  if (!profile) {
    return (
      <Box sx={{ minHeight: '100vh', background: theme.palette.background.default, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md" sx={{ px: { xs: 2.5, sm: 4 } }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4, mb: 6 }}>
            <Skeleton variant="circular" width={120} height={120} sx={{ flexShrink: 0 }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="50%" height={48} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="35%" height={26} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="95%" height={18} />
              <Skeleton variant="text" width="85%" height={18} />
              <Skeleton variant="text" width="75%" height={18} />
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.default, py: { xs: 5, md: 9 } }}>
      <Container maxWidth="md" sx={{ px: { xs: 2.5, sm: 4 } }}>

        {/* ── Hero ── */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: { xs: 3, sm: 5 },
            mb: { xs: 5, md: 7 },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Avatar
            src={profile.avatar}
            alt={profile.first_name}
            sx={{
              width: { xs: 110, sm: 130, md: 150 },
              height: { xs: 110, sm: 130, md: 150 },
              flexShrink: 0,
              border: `3px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
              boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.45)' : '0 8px 32px rgba(0,0,0,0.1)',
            }}
          />

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              fontWeight={800}
              sx={{
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.6rem' },
                color: textColor,
                letterSpacing: '-0.5px',
                lineHeight: 1.1,
                mb: 0.6,
              }}
            >
              {profile.first_name} {profile.last_name}
            </Typography>

            {profile.job && (
              <Typography sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, color: theme.palette.primary.main, fontWeight: 500, mb: 1.5 }}>
                {profile.job}
              </Typography>
            )}

            {/* Meta chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 2 }}>
              {profile.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: muted, fontSize: '0.82rem' }}>
                  <LocationOnIcon sx={{ fontSize: 15 }} />
                  {profile.location}
                </Box>
              )}
            </Box>

            {/* Skills chips */}
            {profile.skills?.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                {profile.skills.map((s, i) => (
                  <Chip
                    key={i}
                    label={s.name}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: '0.73rem',
                      fontWeight: 500,
                      background: `${theme.palette.primary.main}14`,
                      color: theme.palette.primary.main,
                      border: `1px solid ${theme.palette.primary.main}28`,
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>

        {/* ── Bio ── */}
        {profile.bio && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            sx={{
              color: muted,
              fontSize: { xs: '0.95rem', sm: '1rem' },
              lineHeight: 1.85,
              mb: { xs: 5, md: 7 },
              pb: { xs: 5, md: 7 },
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
              '& p': { mb: 1.2, mt: 0 },
              '& p:last-child': { mb: 0 },
              '& *': { fontSize: 'inherit !important', color: 'inherit !important', background: 'none !important' },
            }}
          >
            {parse(profile.bio)}
          </Box>
        )}

        {/* ── Experience ── */}
        {experience.length > 0 && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{ mb: { xs: 5, md: 7 } }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 3.5 }}>
              <WorkOutlineIcon sx={{ fontSize: 18, color: muted }} />
              <Typography sx={{ fontWeight: 600, fontSize: '0.72rem', letterSpacing: 1.4, textTransform: 'uppercase', color: muted }}>
                Experience
              </Typography>
            </Box>
            {experience.map((exp, i) => (
              <TimelineItem
                key={exp.id}
                title={exp.position || exp.job_title}
                sub={exp.company}
                meta={`${exp.start_date} — ${exp.end_date || 'Present'}`}
                description={exp.description}
                isLast={i === experience.length - 1}
                isDark={isDark}
                theme={theme}
              />
            ))}
          </Box>
        )}

        {/* ── Education ── */}
        {education.length > 0 && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 3.5 }}>
              <SchoolOutlinedIcon sx={{ fontSize: 18, color: muted }} />
              <Typography sx={{ fontWeight: 600, fontSize: '0.72rem', letterSpacing: 1.4, textTransform: 'uppercase', color: muted }}>
                Education
              </Typography>
            </Box>
            {education.map((edu, i) => (
              <TimelineItem
                key={edu.id}
                title={edu.degree}
                sub={edu.school}
                meta={`${edu.start_year} — ${edu.end_year || 'Present'}${edu.teacher ? ` · ${edu.teacher}` : ''}`}
                description={edu.description}
                isLast={i === education.length - 1}
                isDark={isDark}
                theme={theme}
              />
            ))}
          </Box>
        )}

      </Container>
    </Box>
  );
}

export default About;
