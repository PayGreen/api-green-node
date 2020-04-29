import { Mode } from '../enums';
export interface IConfig{
    token?: string | null;
    refreshToken?: string | null;
    mode?: Mode | null;
    host?: string | null;
}