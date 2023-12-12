/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  CardActions,
  Button,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function James() {
  return (
    <Card sx={{ maxWidth: 325 }} variant="outlined">
      <CardMedia
        sx={{ height: 225 }}
        image="/images/jamesbike.png"
        title="random image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          James
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Front-End & Serverless API
        </Typography>
        <Stack
          sx={{
            minWidth: 280,
            justifyContent: 'space-around',
            flexFlow: 'row wrap',
            gap: '0.75rem',
            my: '1rem',
          }}
        >
          <img
            src={`https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white`}
            alt="NextJS"
            className="rounded"
          />
          <img
            src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=Puppeteer&logoColor=white"
            alt="Puppeteer"
            className="rounded"
          />
          <img
            src="https://img.shields.io/badge/Tailwind_CSS-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white"
            alt="Tailwind CSS"
            className="rounded"
          />
        </Stack>
      </CardContent>
      <CardActions className="justify-center mb-2">
        <Button variant="outlined" size="small" href="https://jameskeezer.dev" startIcon={<LanguageIcon />} sx={{ textTransform: 'none' }}>
          Website
        </Button>
        <Button variant="outlined" size="small" href="https://github.com/Jamesllllllllll" startIcon={<GitHubIcon />} sx={{ textTransform: 'none' }}>
          GitHub
        </Button>
        <Button
          variant="outlined"
          size="small"
          href="https://linkedin.com/in/jameskeezer"
          startIcon={<LinkedInIcon />}
          sx={{ textTransform: 'none' }}
        >
          LinkedIn
        </Button>
      </CardActions>
    </Card>
  );
}
