import React, { ReactNode, useEffect, useState } from "react";
import { CanvasTree, CanvasTreeNode } from "../../utils/types/canvas-tree";
import TopBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Icon, Modal, Snackbar, TextField, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import "./style.scss";
import { CodeOutlined } from "@mui/icons-material";
import { stringToArray, getCodeFromArray } from "../../utils/functions";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const TreeVisualizer = (props: { radius?: number }) => {
  const [dataArray, setDataArray] = useState<Array<number | null>>([]);
  const [radius, setRadius] = useState<number>(30);
  const [canvas, setCanvas] = useState<CanvasTree>();
  const [canvasTree, setCanvasTree] = useState<Array<CanvasTreeNode>>();
  const [viewport, setViewPort] = useState<{ x: number; y: number }>({
    x: 450,
    y: 450,
  });
  const [textFieldData, setTextFieldData] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);
  const onSubmit = () => {
    setDataArray(stringToArray(textFieldData));
  };
  const onReset = () => {
    setDataArray([]);
  };
  const onCopyCode = () => {
    const resultString = getCodeFromArray(
      canvas?.getTree()?.getCodeIncPlusPlus() || []
    );
    navigator.clipboard.writeText(resultString);
    setIsToastOpen(true);
  };

  useEffect(() => {
    const canvasObj = new CanvasTree(dataArray, radius);
    setCanvas(canvasObj);
    setCanvasTree(canvasObj.getCanvasTree());
    setViewPort({ x: canvasObj.getWidth(), y: canvasObj.getHeight() });
  }, [radius, dataArray]);

  return (
    <>
      {/* side bar */}

      {/* top control bar */}
      <Box sx={{ flexGrow: 1 }}>
        <TopBar
          position="static"
          sx={{ backgroundColor: "transparent" }}
          elevation={0}
        >
          <Toolbar
            sx={{
              padding: "10px",
              justifyContent: "space-around",
              display: "flex",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                onReset();
                setTextFieldData("");
              }}
            >
              <RestartAltIcon fontSize="large"></RestartAltIcon>
            </IconButton>

            <CustomTextField
              label="Tree Data"
              className="custom-input"
              sx={{ width: "400px" }}
              value={textFieldData}
              onChange={(e) => {
                setTextFieldData(e.target.value);
              }}
              onKeyDown={(e) => {
                console.log(e);
                if (e.code === "Enter") {
                  onSubmit();
                }
              }}
            />
            <div className="button-grp">
              <Button
                disabled={radius <= 0}
                className="remove-btn"
                onClick={() => {
                  setRadius(radius - 1);
                }}
              >
                <RemoveIcon />
              </Button>
              <CustomTextField
                label="Radius"
                value={radius}
                className="custom-input"
                sx={{ width: "100px" }}
                InputProps={{
                  style: { padding: "0px 20px" },
                }}
              />
              <Button
                disabled={radius >= 100}
                className="add-btn"
                onClick={() => {
                  setRadius(radius + 1);
                }}
              >
                <AddIcon />
              </Button>
            </div>

            <div className="button-grp-2">
              <Button
                className="remove-btn"
                onClick={() => {
                  setViewPort({ x: viewport.x * 1.2, y: viewport.y });
                }}
              >
                <RemoveIcon />
              </Button>
              <Typography>Width</Typography>
              <Button
                className="add-btn"
                onClick={() => {
                  setViewPort({ x: viewport.x * 0.8, y: viewport.y });
                }}
              >
                <AddIcon />
              </Button>
            </div>

            <div className="button-grp-2">
              <Button
                className="remove-btn"
                onClick={() => {
                  setViewPort({ x: viewport.x, y: viewport.y * 1.3 });
                }}
              >
                <RemoveIcon />
              </Button>
              <Typography>Height</Typography>
              <Button
                className="add-btn"
                onClick={() => {
                  setViewPort({ x: viewport.x, y: viewport.y * 0.8 });
                }}
              >
                <AddIcon />
              </Button>
            </div>

            {/* <div style={{ flex: 1 }}></div> */}
            <Button
              style={{ backgroundColor: "white", height: "50px" }}
              onClick={onSubmit}
            >
              Generate
            </Button>
          </Toolbar>
        </TopBar>
      </Box>

      {/* code copy toast */}
      <Button onClick={onCopyCode}>
        <CodeOutlined />
      </Button>
      <Snackbar
        open={isToastOpen}
        autoHideDuration={6000}
        onClose={() => setIsToastOpen(false)}
        message="code copied!"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setIsToastOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />

      {/* canvas */}

      <div className="canvas-container" id="canvas-container">
        <div className="canvas-inner-container">
          <svg
            width={canvas?.getWidth() || "100%"}
            height={
              (canvas?.getHeight() &&
                canvas?.getHeight() + (canvas.getHeight() - viewport.y)) ||
              "100%"
            }
            style={{ overflow: "visible" }}
            preserveAspectRatio="none"
            viewBox={`0 0 ${viewport.x} ${viewport.y}`}
          >
            <g id="my-svg">
              {canvasTree?.map((data) => {
                return (
                  <>
                    <circle
                      cx={data.circleX}
                      cy={data.circleY}
                      r={radius}
                      stroke="black"
                      strokeWidth={1}
                      fill="white"
                    ></circle>

                    <text
                      x={data.circleX}
                      y={data.circleY}
                      text-anchor="middle"
                      stroke-width="2px"
                      fill=" rgb(4, 4, 61);"
                      alignment-baseline="middle"
                      style={{
                        fontSize: `${radius / 1}px`,
                        color: " rgb(4, 4, 61);",
                        backgroundColor: "whitesmoke",
                      }}
                    >
                      {data.value}
                    </text>
                  </>
                );
              })}
              {canvasTree?.map((data, index) => {
                let leftChildLine: ReactNode;
                let rightChildLine: ReactNode;
                if (data.isLeftChild) {
                  leftChildLine = (
                    <line
                      x1={data.lineLeftX}
                      y1={data.lineLeftY}
                      x2={canvasTree[data.leftChildIndex].lineUpX}
                      y2={canvasTree[data.leftChildIndex].lineUpY}
                      strokeWidth={2}
                      stroke={"white"}
                    />
                  );
                }
                if (data.isRightChild) {
                  rightChildLine = (
                    <line
                      x1={data.lineRightX}
                      y1={data.lineRightY}
                      x2={canvasTree[data.rightChildIndex].lineUpX}
                      y2={canvasTree[data.rightChildIndex].lineUpY}
                      strokeWidth={2}
                      stroke={"white"}
                    />
                  );
                }
                return (
                  <>
                    {leftChildLine} {rightChildLine}{" "}
                  </>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default TreeVisualizer;
