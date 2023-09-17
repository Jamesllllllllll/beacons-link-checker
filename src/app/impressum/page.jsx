/* eslint-disable @next/next/no-img-element */
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function Impressum() {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 2, sm: 4 }}
      useFlexGap
      flexWrap="wrap"
      alignItems="start"
      justifyContent="center"
    >
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
          <Button
            variant="outlined"
            size="small"
            href="https://jameskeezer.dev"
          >
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

      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 225 }}
          image="/images/michael.jpg"
          title="random image"
          className="bg-top"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Michael
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Database & Back-End
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
              src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"
              alt="Amazon AWS"
              className="rounded"
            />
            <img
              src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white"
              alt="Sequelize"
              className="rounded"
            />
            <img
              src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"
              alt="Postgres"
              className="rounded"
            />
          </Stack>
        </CardContent>
        <CardActions className="justify-center mb-2">
          <Button
            variant="outlined"
            size="small"
            href="https://www.linkedin.com/in/michael-wiltfong"
          >
            LinkedIn
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
}
