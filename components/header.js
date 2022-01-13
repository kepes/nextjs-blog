import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "./responsiveAppBar";
import Image from "../public/images/banner.jpg";
import * as React from "react";
import SectionDivider from "./section_divider";

function Header(props) {
  const { sections, title } = props;
  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          bgcolor: "teal",
          backgroundImage: `url(${Image.src})`,
          minHeight: "38.195vh",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Container maxWidth="md">
          <header>
            <ResponsiveAppBar />
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              sx={{ flex: 1 }}
            >
              {title}
            </Typography>
          </header>
        </Container>
      </Box>
      <SectionDivider svg="wave" height={49} />
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  title: PropTypes.string.isRequired
};

export default Header;
