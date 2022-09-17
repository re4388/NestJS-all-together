import { Injectable, Scope } from '@nestjs/common';

// @Injectable()
@Injectable({ scope: Scope.TRANSIENT })
export class StorageService {

    constructor() {
        console.log(`Storage: ${Math.random()}`);
    }

    private list: any[] = [];

    public getItems(): any[] {
        return this.list;
    }

    public addItem(item: any): void {
        this.list.push(item);
    }

}