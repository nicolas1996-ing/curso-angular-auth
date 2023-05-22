export type Colors = 'sky' | 'yellow' | 'green' | 'violet' | 'gray' | 'red' |  'success' | 'primary' | 'danger' | 'light' ;
export type ObjColor = Record<string, Record<string, boolean>>;

export const COLORS: ObjColor = {
  sky: {
    'bg-sky-700': true,
    'hover:bg-sky-800': true,
    'text-white': true,
  },
  yellow: {
    'bg-yellow-700': true,
    'hover:bg-yellow-800': true,
    'text-white': true,
  },
  green: {
    'bg-green-700': true,
    'hover:bg-green-800': true,
    'text-white': true,
  },
  violet: {
    'bg-violet-700': true,
    'hover:bg-violet-800': true,
    'text-white': true,
  },
  red: {
    'bg-red-700': true,
    'hover:bg-red-800': true,
    'text-white': true,
  },
  gray: {
    'bg-gray-700': true,
    'hover:bg-gray-800': true,
    'text-white': true,
  },
};

export const BACKGROUNDS: ObjColor = {
  sky: {
    'bg-sky-600': true,
  },
  yellow: {
    'bg-yellow-600': true,
  },
  green: {
    'bg-green-600': true,
  },
  violet: {
    'bg-violet-400': true,
  },
  red: {
    'bg-red-600': true,
  },
  gray: {
    'bg-gray-600': true,
  },
};

export const BACKGROUNDSNAVBAR: ObjColor = {
  sky: {
    'bg-sky-700': true,
  },
  yellow: {
    'bg-yellow-700': true,
  },
  green: {
    'bg-green-700': true,
  },
  violet: {
    'bg-violet-700': true,
  },
  red: {
    'bg-red-700': true,
  },
  gray: {
    'bg-gray-700': true,
  },
};