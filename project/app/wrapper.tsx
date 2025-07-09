'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default function LocalWrapper({ children }: { children: React.ReactNode }) {
  return (
		<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
				</ThemeProvider>
  )
}