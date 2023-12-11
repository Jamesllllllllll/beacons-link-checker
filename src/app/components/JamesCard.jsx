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

export default function James() {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
            minWidth: 300,
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
            src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white"
            alt="MaterialUI"
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
        <Button variant="outlined" size="small" href="https://jameskeezer.dev">
          Website
        </Button>
        <Button
          variant="outlined"
          size="small"
          href="https://linkedin.com/in/jameskeezer"
        >
          LinkedIn
        </Button>
      </CardActions>
    </Card>
  );
}
