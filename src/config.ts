import { Minimum, MinLength } from "@deepkit/type";

export class Config {
    TG_TOKEN!: string & MinLength<5>;
    REPLY!: string & MinLength<5>;
    TG_TIMEOUT: number & Minimum<10000> = 10000;
}
