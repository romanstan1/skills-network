import {createMuiTheme} from "@material-ui/core/styles"

export const theme = {
  color: "mediumseagreen"
  // fontFamily: "Montserrat"
}


export const muiTheme = createMuiTheme({
  typography: {
    fontFamily: "Montserrat",
    color: "coral"
  },
  overrides: {
    MuiTypography: {
      body1: {
        color: "red"
      },
      subheading: {
        // textTransform: "uppercase",
        color: "green"
      }
    }
    // MuiMenuItem: {
    //   subheading: {
    //     textTransform: "uppercase",
    //     color: "green"
    //   }
    // }
  }
})
//   overrides: {
//     MuiButton: {
//       root: {
//         color: "green",
//         "&:hover": {
//           backgroundColor: "purple"
//         }
//       }
//     },
//     MuiListItemText: {
//       root: {
//         color: "red"
//       }
//     },
//     MuiTypography: {
//       root: {
//         color: "red"
//       }
//     }

//   },
//   typography: {
//     useNextVariants: true,
//     color: "red",
//     root: {
//       color: "red"
//     }
//   }
// })
// root: {
//   fontWeight: "bold",
//   backgroundColor: "red",
//   fontFamily: "Raleway"
// },
// MuiButton: {
//   root: {
//     fontWeight: "bold",
//     backgroundColor: "red",
//     fontFamily: "Raleway"
//   }
// },
// overrides: {
//   MuiButton: {
//     root: {
//       fontWeight: "bold",
//       backgroundColor: "red",
//       fontFamily: "Raleway"
//     }
//   }
// }
