import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

function MenuListItem({ menuPoint }) {
  return (
    <>
      {menuPoint.__component === 'menu.page' && (
        <Button
          href={`/post/${encodeURIComponent(
            menuPoint.page.data.attributes.slug,
          )}`}
        >
          {menuPoint.page.data.attributes.Title}
        </Button>
      )}
      {menuPoint.__component == 'menu.link' && (
        <Button href={menuPoint.url}>
          {menuPoint.title}
        </Button>
      )}
    </>
  );
}

export default function footerMenu({ menu, showColCaptions }) {
  const columns = menu.length;
  const colSize = 12 / columns;
  return (
    <Grid container spacing={2}>
      {menu.map((menuGroup) => (
        <Grid item xs={colSize}>
          {showColCaptions && (
            <Typography component="h4" variant="h4">
              {menuGroup.attributes.caption}
            </Typography>
          )}
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'center' }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            {menuGroup.attributes.elements.map((menuPoint) => (
              <MenuListItem menuPoint={menuPoint} />
            ))}
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
