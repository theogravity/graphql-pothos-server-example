// https://github.com/Zaconly/ScheduleIt-Server-old/blob/aaf4f4dac25000aa0d3aed1cc3893cabe6e93e0d/src/utils/typings/dataloader-sequelize/index.d.ts
declare module 'dataloader-sequelize' {
  import { Sequelize } from 'sequelize-typescript';

  interface Options {
    max: number;
  }

  interface ContextProps {
    prime: (query: any) => any;
  }

  export const EXPECTED_OPTIONS_KEY: string;
  export function createContext(sequelize: Sequelize, options?: Options): ContextProps;
}
