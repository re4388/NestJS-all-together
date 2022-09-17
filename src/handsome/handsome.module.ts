import { Module } from '@nestjs/common';



// const HANDSOME_BEN = {
//     provide: 'HANDSOME_MAN',
//     useValue: {
//         name: 'BEN'
//     }
// };

const HANDSOME_BEN = {
    provide: 'HANDSOME_MAN',
    useFactory: async () => {
        const getBEN = new Promise(resolve => {
            setTimeout(() => resolve({ name: 'BEN' }), 2000);
        });
        const BEN = await getBEN;
        return BEN;
    }
};


@Module({
    providers: [
        HANDSOME_BEN
    ],
    exports: [
        HANDSOME_BEN
    ]
})
export class HandsomeModule { }
