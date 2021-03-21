export interface CustomTheme {
  textColor: string;
  backgroundColor: string;
  headerBackgroundColor: string;
}

export const darkTheme: CustomTheme = {
  textColor: 'white',
  backgroundColor: '#181818',
  headerBackgroundColor: '#202020',
};

export const lightTheme: CustomTheme = {
  textColor: '#181818',
  backgroundColor: 'white',
  headerBackgroundColor: 'white',
};
