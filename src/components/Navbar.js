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

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 260,
            background: theme.palette.background.paper,
            borderLeft: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
          },
        }}
      >
        <Box sx={{ pt: 3, px: 2 }} role="presentation">
          <Typography variant="h6" sx={{ mb: 3, color: textColor, fontWeight: 600, textAlign: 'center', pb: 2 }}>
            Menu
          </Typography>
          <List>
            {PAGES.map(page => (
              <ListItem key={page.name} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => { setDrawerOpen(false); navigate(page.path); }}
                  sx={{
                    borderRadius: 2,
                    color: location.pathname === page.path
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                    fontWeight: location.pathname === page.path ? 600 : 400,
                    background: location.pathname === page.path
                      ? (isDark ? '#333' : '#f5f5f5')
                      : 'transparent',
                    '&:hover': {
                      background: isDark ? '#333' : '#f5f5f5',
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <ListItemText
                    primary={page.name}
                    sx={{ '& .MuiListItemText-primary': { fontSize: '1rem' } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
