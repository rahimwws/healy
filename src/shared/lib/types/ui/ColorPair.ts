import { ColorsT } from '@/shared/lib/theme';

type ColorPair = { [K in keyof ColorsT]: [K, keyof ColorsT[K]] }[keyof ColorsT];

export default ColorPair;
