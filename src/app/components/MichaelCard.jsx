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
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Michael() {
  return (
    <Card sx={{ maxWidth: 325 }} variant="outlined">
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
            minWidth: 280,
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
      <Button variant="outlined" size="small" startIcon={<GitHubIcon />}href="https://github.com/mdwiltfong/" sx={{ textTransform: 'none' }}>
          GitHub
        </Button>
        <Button
          variant="outlined"
          size="small"
          href="https://linkedin.com/in/michael-wiltfong"
          startIcon={<LinkedInIcon />}
          sx={{ textTransform: 'none' }}
        >
          LinkedIn
        </Button>
      </CardActions>
    </Card>
  );
}
