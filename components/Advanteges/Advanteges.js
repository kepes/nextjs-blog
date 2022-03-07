import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Advanteges(props) {
  const { title, subtitle, buttonText, buttonLink, list } = props;
  return (
    <React.Fragment>
      <Typography component="h2" variant="h2">
        {title}
      </Typography>
      <Typography component="div" variant="subtitle1">
        {subtitle}
      </Typography>
      <List
        dense={true}
        sx={{
          mt: 2,
        }}
      >
        {list.map((item, key) => (
          <ListItem key={key}>
            <ListItemIcon>
              <ArrowForwardIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        sx={{
          //width: "8vw",
          mt: 5,
        }}
      >
        {buttonText}
      </Button>
    </React.Fragment>
  );
}
