import React from "react";
import { useParams } from "./context";

import {
  AppBar,
  Box,
  createTheme,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Coronavirus,
  EmojiFlags,
  FmdGood,
  Hive,
  PlayArrow,
  Refresh,
  Settings,
} from "@mui/icons-material";

const modes = [
  { mode: "setStart", icon: <FmdGood />, name: "Start" },
  { mode: "setTarget", icon: <EmojiFlags />, name: "Target" },
  { mode: "addBricks", icon: <Hive />, name: "Bricks" },
  { mode: "addWeight", icon: <Coronavirus />, name: "Weight" },
];

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mode, setMode, algo, setAlgo, setReset, setRun } = useParams();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, ml: 1 }}>
              Options
            </Typography>

            {modes.map((elements, idx) => (
              <IconButton
                key={idx}
                size="small"
                edge="start"
                color="inherit"
                aria-label="option"
                sx={{
                  mr: 10,
                  display: { xs: "none", lg: "inline-flex" },
                  backgroundColor: mode === elements.mode ? "#ffca28" : "",
                }}
                onClick={() => {
                  if (mode === elements.mode) {
                    setMode(null);
                  } else {
                    setMode(elements.mode);
                  }
                }}>
                {elements.icon}
              </IconButton>
            ))}

            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="option"
              sx={{
                mr: 10,
                display: { xs: "none", lg: "inline-flex" },
              }}
              onClick={() => {
                setReset((prev) => !prev);
              }}>
              <Refresh />
            </IconButton>

            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="option"
              sx={{
                mr: 10,
                display: { xs: "none", lg: "inline-flex" },
              }}
              onClick={() => {
                setRun((prev) => !prev);
              }}>
              <PlayArrow />
            </IconButton>

            <Tooltip title="Path settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ mx: 2, display: { xs: "flex", lg: "none" } }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}>
                <Settings sx={{ width: 30, height: 30 }} />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
              <MenuItem>
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  aria-label="option"
                  sx={{
                    mr: 10,
                    display: { xs: "inline-flex", lg: "none" },
                  }}
                  onClick={() => {
                    setRun((prev) => !prev);
                  }}>
                  <PlayArrow sx={{ mr: 1 }} />
                  Run
                </IconButton>
              </MenuItem>

              <MenuItem>
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  aria-label="option"
                  sx={{
                    mr: 10,
                    display: { xs: "inline-flex", lg: "none" },
                  }}
                  onClick={() => {
                    setReset((prev) => !prev);
                  }}>
                  <Refresh sx={{ mr: 1 }} />
                  Reset
                </IconButton>
              </MenuItem>

              <Divider />
              {modes.map((elements, idx) => (
                <MenuItem
                  key={idx}
                  sx={{
                    backgroundColor: mode === elements.mode ? "#ffca28" : "",
                  }}>
                  <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="option"
                    sx={{ gap: 1 }}
                    onClick={() => {
                      if (mode === elements.mode) {
                        setMode(null);
                      } else {
                        setMode(elements.mode);
                      }
                    }}>
                    {elements.icon}
                    {elements.name}
                  </IconButton>
                </MenuItem>
              ))}
            </Menu>

            <FormControl sx={{ minWidth: { xs: 80, lg: 250 }, my: 1 }}>
              <InputLabel id="select-label">Choose your algorithm</InputLabel>
              <Select
                labelId="select-label"
                label="Choose your algorithm"
                value={algo}
                onChange={(e) => {
                  setAlgo(e.target.value);
                }}>
                <MenuItem value="BFS">BFS</MenuItem>
                <MenuItem value="DFS">DFS</MenuItem>
                <MenuItem value="Dijkstra">Dijkstra</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
};

export default NavBar;
