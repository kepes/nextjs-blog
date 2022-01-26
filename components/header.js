import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "./responsiveAppBar";
import Image from "../public/images/banner.jpg";
import * as React from "react";
import SectionDivider from "./section_divider";
import Config from "../data/site_config";
import { Parallax, ParallaxBanner } from "react-scroll-parallax";
import ParalaxBackground from "./ParalaxBackground/ParalaxBackground";

function Header(props) {
  const { sections, title } = props;
  return (
    <React.Fragment>
        <ParalaxBackground
          image={Image}
          imageHeight={1440}
          component="header"
          sx={{
            bgcolor: "teal", // 
            minHeight: "81.805vh", // 38.195vh 61,805vh
            //backgroundSize: "cover",
            //backgroundPosition: "0px -750px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Container maxWidth="lg">
            <header>
              <ResponsiveAppBar />
              <Box
                sx={{
                  display: "flex",
                  paddingTop: {
                    xs: "20px",
                    sm: "20px",
                    md: "20px",
                    lg: "100px",
                  },
                  paddingBottom: {
                    xs: "30px",
                    sm: "100px",
                    md: "100px",
                    lg: "100px",
                  },
                  width: {
                    sm: "100%",
                    md: "50%",
                  },
                }}
              >
                <Paper
                  elevation={10}
                  sx={{
                    bgcolor: "rgba(255,255,255,.3)",
                    padding: "15px",
                    zIndex: "999999"
                  }}
                >
                  <Typography
                    component="h2"
                    variant="h3"
                    align="left"
                    paragraph
                    sx={{ flex: 1, fontWeight: "light", opacity: "1" }}
                  >
                    {Config.mainPage.header.bigText}
                  </Typography>
                  <Typography
                    align="left"
                    sx={{ flex: 1, fontWeight: "light", opacity: "1" }}
                  >
                    {Config.mainPage.header.smallText}
                  </Typography>
                </Paper>
              </Box>
            </header>
          </Container>
        </ParalaxBackground>
      <SectionDivider svg="wave" height={49} />
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
