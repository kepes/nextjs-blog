import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Wave from "./svg/wave";

function SectionDivider(props) {
  const { svg, height } = props;
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        top: "-" + (height - 1) + "px",
        marginBottom: "-" + height + "px",
        left: 0,
        width: "100%",
        overflow: "hidden",
        lineHeight: 0,
        transform: "rotate(180deg)"
      }}
    >
      {svg == "wave" && (
        <Wave height={height} fill={theme.palette.background.paper} />
      )}
    </Box>
  );
}

SectionDivider.propTypes = {
  svg: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired
};

export default SectionDivider;
