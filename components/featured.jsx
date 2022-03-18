import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import DynamicSvgIcon from './DynamicSvgIcon';
import HoverPaper from './HoverPaper/HoverPaper';
import mergeInstanceTheme from '../lib/merge-instance-theme';

const Item = styled(HoverPaper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  margin: theme.spacing(1),
  '& path.0 2-cupcake_svg__cls-5': {
    // '&' points to the root selector which is the same as the above (.MuiBox-root)
    fill: 'green',
  },
}));

const StyledFeatured = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
}));

export default function Featured(props) {
  const { sections, title, description, columns, id } = props;
  const theme = useTheme();
  const featuredTheme = mergeInstanceTheme(theme.template.featured, id);

  return (
    <StyledFeatured>
      {title !== null ? (
        <Typography
          component="h4"
          variant="h4"
          align="center"
          paragraph
          sx={featuredTheme.mainTitle}
        >
          {title}
        </Typography>
      ) : (
        ''
      )}
      {description !== null ? (
        <Typography
          variant="subtitle1"
          align="center"
          paragraph
          sx={featuredTheme.mainDescription}
        >
          {description}
        </Typography>
      ) : (
        ''
      )}
      <Grid container spacing={0}>
        {sections.map(({ id, title, description, icon, link }, key) => (
          <Grid key={id} item sm={12 / columns}>
            <Link href={link} underline="none">
              <HoverPaper
                minelevation={5}
                maxelevation={24}
                sx={[
                  {
                    textAlign: 'center',
                    padding: 2,
                    margin: 1,
                  },
                  (key % columns) % 2
                    ? featuredTheme.col.even
                    : featuredTheme.col.odd,
                  Math.floor(key / columns) % 2
                    ? featuredTheme.row.even
                    : featuredTheme.row.odd,
                ]}
              >
                {!icon ? (
                  ''
                ) : (
                  <Box>
                    <DynamicSvgIcon
                      name={icon}
                      sx={featuredTheme.icon}
                      inheritViewBox
                    />
                  </Box>
                )}
                <Typography paragraph sx={featuredTheme.title}>
                  {title}
                </Typography>

                <Typography paragraph sx={featuredTheme.description}>
                  {description}
                </Typography>
              </HoverPaper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </StyledFeatured>
  );
}

Featured.defaultProps = {
  title: null,
  description: null,
  columns: 3,
  id: null,
};

Featured.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string,
    }),
  ).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  columns: PropTypes.number,
  id: PropTypes.number,
};
