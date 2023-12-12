import James from '../components/JamesCard';
import Michael from '../components/MichaelCard';
import Stack from '@mui/material/Stack';

export const Cards = () => {
  const randomPlacement = Math.floor(Math.random() * 2);
  if (randomPlacement === 1) {
    return (
      <>
        <Michael />
        <James />
      </>
    );
  } else {
    return (
      <>
        <James />
        <Michael />
      </>
    );
  }
};

export default function Impressum() {
  return (
    <Stack
      direction="row"
      gap={2}
      useFlexGap
      flexWrap="wrap"
      alignItems="start"
      justifyContent="center"
    >
      <Cards />
    </Stack>
  );
}
