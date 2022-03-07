import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Hash from '../../lib/hash';

export default function Advanteges({
  title,
  subtitle,
  buttonText,
  buttonLink,
  list,
}) {
  return (
    <>
      <Typography component="h2" variant="h2">
        {title}
      </Typography>
      <Typography component="div" variant="subtitle1">
        {subtitle}
      </Typography>
      <List
        dense
        sx={{
          mt: 2,
        }}
      >
        {list.map((item) => (
          <ListItem key={Hash(item)}>
            <ListItemIcon>
              <ArrowForwardIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        href={buttonLink}
        sx={{
          // width: "8vw",
          mt: 5,
        }}
      >
        {buttonText}
      </Button>
    </>
  );
}

Advanteges.defaultProps = {
  title: null,
  subtitle: null,
  buttonText: null,
  buttonLink: null,
  list: [],
};

Advanteges.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
};
