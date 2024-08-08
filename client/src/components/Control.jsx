// import React from "react";
// import { Slider } from "@mui/material";
// import { FastForward, FastRewind, Pause, PlayArrow, SkipNext, VolumeUp } from "@mui/icons-material";
// import { styled } from "@mui/material/styles";
// import { makeStyles } from "@mui/styles";
// import "./control.css";

// // Custom styles for sliders using styled
// const PrettoSlider = styled(Slider)(({ theme }) => ({
//   height: "20px",
//   color: "#9556CC",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   "& .MuiSlider-thumb": {
//     height: 20,
//     width: 20,
//     backgroundColor: "#9556CC",
//     border: "2px solid currentColor",
//     marginTop: -3,
//     marginLeft: -12,
//     "&:focus, &:hover, &.Mui-active": {
//       boxShadow: "inherit",
//     },
//   },
//   "& .MuiSlider-track": {
//     height: 5,
//     borderRadius: 4,
//   },
//   "& .MuiSlider-rail": {
//     height: 5,
//     borderRadius: 4,
//   },
// }));

// // Styles for the control component
// const useStyles = makeStyles({
//   volumeSlider: {
//     width: "100px",
//     color: "#9556CC",
//   },
//   bottomIcons: {
//     color: "#999",
//     padding: "12px 8px",
//     "&:hover": {
//       color: "#fff",
//     },
//   },
// });

// const Control = () => {
//   const classes = useStyles(); // Use the styles

//   return (
//     <div className="control_Container">
//       <div className="top_container">
//         <h2>Video Player</h2>
//       </div>
//       <div className="mid__container">
//         <div className="icon__btn">
//           <FastRewind fontSize="medium" />
//         </div>

//         <div className="icon__btn">
//           <Pause fontSize="medium" />
//         </div>

//         <div className="icon__btn">
//           <FastForward fontSize="medium" />
//         </div>
//       </div>
//       <div className="bottom__container">
//         <div className="slider__container">
//           <PrettoSlider />
//         </div>
//         <div className="control__box">
//           <div className="inner__controls">
//             <div className="icon__btn">
//               <PlayArrow fontSize="medium" />
//             </div>
//             <div className="icon__btn">
//               <SkipNext fontSize="medium" />
//             </div>
//             <div className="icon__btn">
//               <VolumeUp fontSize="medium" />
//             </div>

//             <Slider className={classes.volumeSlider} />
//             <span>5/20</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Control;
