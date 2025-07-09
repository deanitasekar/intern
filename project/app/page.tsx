'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Dialog, List, ListItem, ListItemButton, ListItemText, DialogTitle } from '@mui/material';

const numbers = ['1', '2'];

interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog 
      onClose={handleClose} 
      open={open} 
      sx={{ 
        backgroundColor: 'transparent',
        '& .MuiDialog-paper': {
          borderRadius: '8px',
          minWidth: '280px',
          backgroundColor: '#1e293b',
        }
      }}
    >
      <>
        <DialogTitle
          sx={{
            backgroundColor: 'transparent',
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: '600',
            textAlign: 'center',
            padding: '20px 20px 16px 20px'
          }}
        >
          Pick a number
        </DialogTitle>
        <List sx={{ pt: 0, pb: 1, px: 1 }}>
          {numbers.map((number) => (
            <ListItem
              disablePadding
              key={number}
              sx={{
                mb: 0.5,
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#334155'
                }
              }}
            >
              <ListItemButton
                onClick={() => handleListItemClick(number)}
                sx={{
                  padding: '10px 16px'
                }}
              >
                <ListItemText
                  primary={number}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: 'white',
                      fontSize: '1rem',
                      textAlign: 'center'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>
    </Dialog>
  );
}

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(numbers[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Container fixed>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          backgroundColor: '#1e293b',
        }}
      >
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          sx={{
            borderRadius: '6px',
            padding: '8px 20px',
            border: '1px solid #60a5fa',
            color: '#60a5fa',
            '&:hover': {
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(96, 165, 250, 0.1)'
            }
          }}
        >
          Open
        </Button>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            color: 'white',
            fontSize: '1rem',
          }}
        >
          Selected: {selectedValue}
        </Typography>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleCloseDialog}
        />
      </Box>
    </Container>
  );
}