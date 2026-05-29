import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function NotFound() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();

  const textColor  = isDark ? '#cccccc' : '#1a1a1a';
  const beamColor  = isDark ? 'rgba(80,180,140,0.22)' : 'rgba(120,210,170,0.45)';
  const beamStroke = isDark ? 'rgba(80,180,140,0.30)' : 'rgba(100,190,150,0.55)';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <Box sx={{
      height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
      overflow: 'hidden',
      background: theme.palette.background.default,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      px: { xs: 1, sm: 2 },
    }}>
      <Box sx={{ width: '100%', maxWidth: 580 }}>

        {/* ── Illustration ── */}
        <Box sx={{ position: 'relative', width: '100%' }}>
          <svg
            viewBox="0 0 580 430"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', display: 'block', overflow: 'visible' }}
          >
            {/* ── Beam (static shape, behind UFO) ── */}
            <defs>
              <linearGradient id="beamGrad" x1="390" y1="170" x2="330" y2="420" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={isDark ? '#60c8a0' : '#90ddb8'} stopOpacity="0.55" />
                <stop offset="100%" stopColor={isDark ? '#60c8a0' : '#90ddb8'} stopOpacity="0.10" />
              </linearGradient>
            </defs>

            <polygon
              points="358,132 400,118 452,418 248,418"
              fill="url(#beamGrad)"
              stroke={beamStroke}
              strokeWidth="1"
            />

            {/* ── UFO — static, rotated right ── */}
            <g transform="rotate(10, 395, 80)">
              <image
                href="/uforasm-removebg-preview.png"
                x="187" y="-52"
                width="415" height="300"
                preserveAspectRatio="xMidYMid meet"
              />
            </g>

            {/* ── "4" left (static) ── */}
            <text
              x="108" y="418"
              textAnchor="middle"
              fontFamily="'Arial Black','Arial',sans-serif"
              fontSize="220"
              fontWeight="900"
              fill={textColor}
            >4</text>

            {/* ── "0" — abducted: yuqoriga ko'tarilgan, biroz o'ngga, aylanadi ── */}
            <motion.g
              animate={{
                y: [0, -14, 0],
                rotate: [-4, 4, -4],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ originX: '348px', originY: '305px' }}
            >
              <text
                x="352" y="375"
                textAnchor="middle"
                fontFamily="'Arial Black','Arial',sans-serif"
                fontSize="220"
                fontWeight="900"
                fill={textColor}
              >0</text>
            </motion.g>

            {/* ── "4" right (static) ── */}
            <text
              x="510" y="418"
              textAnchor="middle"
              fontFamily="'Arial Black','Arial',sans-serif"
              fontSize="220"
              fontWeight="900"
              fill={textColor}
            >4</text>
          </svg>
        </Box>

        {/* ── Text & Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Typography fontWeight={700} sx={{
            fontSize: { xs: '1.5rem', sm: '1.9rem' },
            color: theme.palette.text.primary,
            mb: 0.6,
            mt: 0.5,
          }}>
            Oops! Page not found
          </Typography>

          <Typography sx={{
            fontSize: { xs: '1rem', sm: '1.1rem' },
            color: theme.palette.text.secondary,
            mb: 3,
          }}>
            Siz qidirayotgan sahifa mavjud emas.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              onClick={() => navigate('/')}
              variant="contained"
              disableElevation
              sx={{
                borderRadius: 99, px: 4, py: 1.2,
                fontWeight: 700, fontSize: '1rem',
                textTransform: 'none',
                background: isDark ? 'rgba(255,255,255,0.13)' : '#1a1a1a',
                color: '#fff',
                boxShadow: 'none',
                '&:hover': { opacity: 0.85, boxShadow: 'none' },
              }}
            >
              Bosh sahifa
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="outlined"
              sx={{
                borderRadius: 99, px: 3.5, py: 1.2,
                fontWeight: 700, fontSize: '1rem',
                textTransform: 'none',
                borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.2)',
                color: theme.palette.text.secondary,
                '&:hover': {
                  borderColor: theme.palette.text.primary,
                  color: theme.palette.text.primary,
                  background: 'transparent',
                },
              }}
            >
              Orqaga
            </Button>
          </Box>
        </motion.div>

      </Box>
    </Box>
  );
}

export default NotFound;
