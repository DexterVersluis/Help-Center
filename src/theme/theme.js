import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#823BEB',
      light: '#FF8E00',
      dark: '#7333d9',
      50: '#f0f4ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
    },
    secondary: {
      main: '#ED00B8',
      light: '#FFC9EC',
      dark: '#be185d',
    },
    success: {
      main: '#00B84D',
      light: '#81c784',
      dark: '#00a043',
    },
    warning: {
      main: '#FF8E00',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  typography: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '30px',
      fontWeight: 900,
      fontFamily: '"Nunito", sans-serif',
      color: '#823BEB',
    },
    h2: {
      fontSize: '22px',
      fontWeight: 900,
      fontFamily: '"Nunito", sans-serif',
      color: '#ED00B8',
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      fontFamily: '"Nunito", sans-serif',
      color: '#823BEB',
    },
    h4: {
      fontSize: '18px',
      fontWeight: 600,
      fontFamily: '"Nunito", sans-serif',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      fontFamily: '"Nunito", sans-serif',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      fontFamily: '"Nunito", sans-serif',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 600,
      fontFamily: '"Nunito", sans-serif',
      color: '#696A6A',
    },
    body2: {
      fontSize: '16px',
      fontWeight: 600,
      fontFamily: '"Nunito", sans-serif',
      color: '#696A6A',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          fontWeight: 600,
          padding: '10px 24px',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 600,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontFamily: '"Nunito", sans-serif',
          fontWeight: 900,
          fontSize: '30px',
          color: '#823BEB',
        },
        h2: {
          fontFamily: '"Nunito", sans-serif',
          fontWeight: 900,
          fontSize: '22px',
          color: '#ED00B8',
        },
        h3: {
          fontFamily: '"Nunito", sans-serif',
          fontWeight: 600,
          fontSize: '20px',
          color: '#823BEB',
        },
        h4: {
          fontFamily: '"Nunito", sans-serif',
          fontWeight: 600,
          fontSize: '18px',
        },
        body1: {
          fontFamily: '"Nunito", sans-serif',
          fontWeight: 600,
          fontSize: '16px',
          color: '#696A6A',
        },
        body2: {
          fontFamily: '"Nunito", sans-serif',
          fontWeight: 600,
          fontSize: '16px',
          color: '#696A6A',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme;