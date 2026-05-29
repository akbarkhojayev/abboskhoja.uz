import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useThemeMode } from '../ThemeContext';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const API_BASE = 'https://abboskhojauz.pythonanywhere.com';

const ALL_PAGES = [
  { name: 'Projects',   path: '/projects' },
  { name: 'Blog',       path: '/blog' },
  { name: 'Algorithms', path: '/algorithms' },
  { name: 'About',      path: '/about' },
  { name: 'Contact',    path: '/contact' },
];


function Navbar() {
  const location = useLocation();
  const theme = useTheme();
  const { toggleColorMode } = useThemeMode();
  const isDark = theme.palette.mode === 'dark';
  const textColor = theme.palette.text.primary;
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [showAlgorithms, setShowAlgorithms] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE}/site-settings/`)
      .then(res => setShowAlgorithms(res.data.show_algorithms))
      .catch(() => {});
  }, []);

  const PAGES = ALL_PAGES.filter(p => p.path !== '/algorithms' || showAlgorithms);

  const bg      = isDark ? '#23262F' : '#f4f6fa';
  const bgHover = isDark ? '#181A20' : '#e0e7ef';

  return (
    <AppBar position="sticky" elevation={0} sx={{
      top: 0,
      zIndex: 1200,
      background: theme.palette.background.default,
      boxShadow: 'none',
      border: 'none',
    }}>
      <Toolbar sx={{
        minHeight: { xs: 56, sm: 64 },
        px: { xs: 2, sm: 3, md: 0 },
        justifyContent: 'center',
        background: theme.palette.background.default,
      }}>
        <Box sx={{
          width: '100%',
          maxWidth: 1200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mx: 'auto',
        }}>

          {/* Logo */}
          <Link
            to="/"
            style={{
              fontWeight: 600,
              fontSize: window.innerWidth < 600 ? 18 : 22,
              letterSpacing: 0.5,
              color: textColor,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.target.style.color = theme.palette.primary.main}
            onMouseLeave={e => e.target.style.color = textColor}
          >
            Abboskhoja's Blog
          </Link>

          {/* Desktop links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {PAGES.map((page, idx) => (
              <Link
                key={page.name}
                to={page.path}
                style={{
                  color: location.pathname === page.path
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  textDecoration: 'none',
                  fontSize: 16,
                  fontWeight: location.pathname === page.path ? 500 : 300,
                  marginLeft: idx === 0 ? 0 : 4,
                  letterSpacing: 0.4,
                  transition: 'color 0.2s ease',
                  padding: '8px 10px',
                }}
                onMouseEnter={e => e.target.style.color = theme.palette.primary.main}
                onMouseLeave={e => {
                  e.target.style.color = location.pathname === page.path
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary;
                }}
              >
                {page.name}
              </Link>
            ))}
            <IconButton
              onClick={toggleColorMode}
              aria-label="Toggle dark mode"
              sx={{
                ml: 1.5,
                color: textColor,
                background: bg,
                borderRadius: 2,
                '&:hover': { background: bgHover },
                transition: 'background 0.18s',
              }}
            >
              {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

          {/* Mobile controls */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={toggleColorMode}
              aria-label="Toggle dark mode"
              sx={{
                color: textColor,
                background: bg,
                borderRadius: 2,
                '&:hover': { background: bgHover, transform: 'scale(1.05)' },
                transition: 'all 0.2s ease',
              }}
            >
              {isDark
                ? <Brightness7Icon sx={{ fontSize: 20 }} />
                : <Brightness4Icon sx={{ fontSize: 20 }} />}
            </IconButton>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                color: textColor,
                background: bg,
                borderRadius: 2,
                '&:hover': { background: bgHover, transform: 'scale(1.05)' },
                transition: 'all 0.2s ease',
              }}
            >
              <MenuIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

        </Box>
      </Toolbar>

      {/* Mobile Bottom Sheet */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            borderRadius: '20px 20px 0 0',
            background: isDark ? '#1a1d25' : '#fff',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
            px: 2,
            pb: 3,
            pt: 1.5,
          },
        }}
      >
        {/* Handle bar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>
          <Box sx={{ width: 36, height: 4, borderRadius: 99, background: isDark ? '#444' : '#ddd' }} />
        </Box>

        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, px: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: textColor, letterSpacing: '-0.2px' }}>
            Abboskhoja's Blog
          </Typography>
          <IconButton
            size="small"
            onClick={() => setDrawerOpen(false)}
            sx={{ color: theme.palette.text.secondary, p: 0.5 }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Links */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {PAGES.map(page => {
            const active = location.pathname === page.path;
            return (
              <Box
                key={page.name}
                onClick={() => { setDrawerOpen(false); navigate(page.path); }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1.2,
                  borderRadius: 2.5,
                  cursor: 'pointer',
                  background: active
                    ? (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)')
                    : 'transparent',
                  transition: 'background 0.15s',
                  '&:active': { background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' },
                }}
              >
                <Box sx={{
                  width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                  background: active ? theme.palette.primary.main : 'transparent',
                  border: `1.5px solid ${active ? theme.palette.primary.main : (isDark ? '#555' : '#ccc')}`,
                  transition: 'all 0.15s',
                }} />
                <Typography sx={{
                  fontSize: '0.97rem',
                  fontWeight: active ? 600 : 400,
                  color: active ? textColor : theme.palette.text.secondary,
                }}>
                  {page.name}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
