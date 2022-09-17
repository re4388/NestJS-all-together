import { Injectable } from '@nestjs/common';

@Injectable()
export class Storage2Service {
    private list: any[] = [];

    public addData(data: any): void {
        this.list.push(data);
    }

    public getList(): any[] {
        return this.list;
    }
}
