import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { SvgIcon } from "@mui/material";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {useTheme} from "@mui/material/styles"
import HoverPaper from "../components/HoverPaper/HoverPaper"

function useDynamicSVGImport(name, options = {}) {
  const ImportedIconRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { onCompleted, onError } = options;
  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        ImportedIconRef.current =
          //await import(`../components/icons/${name}.js`)
          (await import(`../assets/svg/${name}.svg`)).ReactComponent;
        if (onCompleted) {
          onCompleted(name, ImportedIconRef.current);
        }
      } catch (err) {
        if (onError) {
          onError(err);
        }
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name, onCompleted, onError]);

  return { error, loading, DynamicSvgIcon: ImportedIconRef.current };
}

/**
 * Simple wrapper for dynamic SVG import hook. You can implement your own wrapper,
 * or even use the hook directly in your components.
 */
const Icon = ({ name, onCompleted, onError, ...rest }) => {
  const { error, loading, DynamicSvgIcon } = useDynamicSVGImport(name, {
    onCompleted,
    onError,
  });
  if (error) {
    return error.message;
  }
  if (loading) {
    return "Loading...";
  }
  if (DynamicSvgIcon) {
    return <SvgIcon component={DynamicSvgIcon} {...rest} />;
    //return <DynamicSvgIcon {...rest} />;
  }
  return null;
};

const Item = styled(HoverPaper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  margin: theme.spacing(1),
  "& path.0 2-cupcake_svg__cls-5": {
    // '&' points to the root selector which is the same as the above (.MuiBox-root)
    fill: "green"
  },
}));

const StyledFeatured = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
  }));
  
function Featured(props) {
  const { sections, title, description } = props;

  const handleOnCompleted = useCallback(
    (iconName) => console.log(`${iconName} successfully loaded`),
    []
  );

  const handleIconError = useCallback((err) => console.error(err.message), []);
  const theme = useTheme();
  const featuredTheme = theme.template.featured;

  return (
    <StyledFeatured>
      <Typography
        component="h4"
        variant="h4"
        align="center"
        paragraph
        sx={featuredTheme.mainTitle}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        paragraph
        sx={featuredTheme.mainDescription}
      >
        {description}
      </Typography>
      <section></section>
      <Grid container spacing={0}>
        {sections.map(({ id, title, url, description, icon }) => (
          <Grid key={id} item sm={4}>
            <Item minelevation={5} maxelevation={24}>
              <Box>
                <Icon
                  name={icon}
                  sx={featuredTheme.icon}
                  onCompleted={handleOnCompleted}
                  onError={handleIconError}
                  inheritViewBox
                ></Icon>
              </Box>
              <Typography variant="h6" paragraph sx={featuredTheme.title}>
                {title}
              </Typography>
              <Typography variant="subtitle2" paragraph sx={featuredTheme.description}>
                {description}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </StyledFeatured>
  );
}

Featured.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Featured;
