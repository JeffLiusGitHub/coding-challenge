import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
const NotFound = () => {
  return (
    <>
      <Container fixed>
        <Box sx={{ height: '100vh' }}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
          >
            <Typography
              component="h1"
              variant="h4"
              align="center"
              gutterBottom="true"
            >
              404
            </Typography>
            <Typography component="h1" variant="h5" align="center">
              This page could not be found.
            </Typography>
          </Stack>
        </Box>
      </Container>
    </>
  );
};
export default NotFound;
