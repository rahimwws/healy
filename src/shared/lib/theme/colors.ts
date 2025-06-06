export interface ColorsT {
  primary: {
    white: string;
    black: string;
    gray: string;
    red: string;
    orange: string;
    green: string;
    lightGray: string;
    blue: string;
  };
  bg: {
    light: string;
  };
  status: {
    success: string;
  };
}
export const lightColors: ColorsT = {
  primary: {
    white: '#FFFFFF',
    black: '#1E1E1E',
    gray: '#808080',
    red: 'rgba(246, 87, 55, 1)',
    orange: 'rgba(236, 105, 11, 1)',
    green: '#2DD51A',
    lightGray: 'rgba(128, 128, 128, 0.5)',
    blue: '#645DE4',
  },
  bg: {
    light: '#F7F7F7',
  },
  status: {
    success: 'rgba(22, 200, 124, 1)',
  },
};

export const darkColors: ColorsT = {
  primary: {
    white: '#1E1E1E',
    black: '#FFFFFF',
    gray: '#808080',
    red: 'rgba(246, 87, 55, 1)',
    orange: 'rgba(236, 105, 11, 1)',
    green: '#2DD51A',
    lightGray: 'rgba(128, 128, 128, 0.5)',
    blue: '#645DE4',
  },
  bg: {
    light: '#1A1A1A',
  },
  status: {
    success: 'rgba(22, 200, 124, 1)',
  },
};
