export interface CustomTheme {
  textColor: string;
  backgroundColor: string;
  headerBackgroundColor: string;
  secondaryHeaderBackgroundColor: string;
  signInBackground: string;
  signInBackgroundHightlight: string;
  highlight: string;
  sideBarSelected: string;
}

export const darkTheme: CustomTheme = {
  textColor: "white",
  backgroundColor: "#181818",
  headerBackgroundColor: "#0E1015",
  secondaryHeaderBackgroundColor: "#0C0E13",
  signInBackground: "#181A20",
  signInBackgroundHightlight: "#181A30",
  highlight: "#fe718d",
  sideBarSelected: "#F5AB6E",
};

// export const lightTheme: CustomTheme = {
//   textColor: '#181818',
//   backgroundColor: 'white',
//   headerBackgroundColor: 'white',
//   secondaryHeaderBackgroundColor: '#525050',
// };
