import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ENV_PATH } from './constants/token.const';

@Injectable()
export class ConfigurationService {

    private config: any;

    constructor(
        @Inject(ENV_PATH) private readonly path: string
    ) {
        this.setEnvironment();
    }

    public get(key: string): string {
        return this.config[key];
    }

    private setEnvironment(): void {
        const filePath = path.resolve(__dirname, '../../', this.path);
        this.config = dotenv.parse(fs.readFileSync(filePath));
    }

}
