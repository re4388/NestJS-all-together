import { Controller, Get, HttpException, HttpStatus, Inject, NotAcceptableException, Optional, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomException } from './exceptions/custom.exception';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ParseIntPipe as CustomParseIntPipe } from './pipes/parse-int.pipe';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MESSAGE_BOX') private readonly messageBox,
    @Inject('ALIAS_APP_SERVICE') private readonly alias: AppService,
    @Optional() @Inject('HANDSOME_MAN') private readonly handsomeMan = { name: '' }
  ) {
    console.log(this.messageBox);
    console.log(this.alias === this.appService); // 進行比對
    console.log(this.handsomeMan);
  }

  // @Get(':id')
  // getUser(
  //   @Param('id', CustomParseIntPipe) id: number
  // ) {
  //   return this.appService.getUser(id)
  // }

  // @Get(':id')
  // getUser(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({
  //       exceptionFactory: () => new NotAcceptableException('無法解析為數字')
  //     })
  //   )
  //   id: number
  // ) {
  //   return this.appService.getUser(id);
  // }

  // @Get(':id')
  // getUser(
  //   @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  //   id: number
  // ) {
  //   return this.appService.getUser(id);
  // }

  // @Get(':id')
  // getUser(@Param('id', ParseIntPipe) id: number) {
  //   return this.appService.getUser(id);
  // }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  @UseFilters(HttpExceptionFilter)
  getHello(): string {
    // throw new Error('出錯囉!');
    // throw new HttpException('出錯囉!', HttpStatus.BAD_REQUEST);

    // throw new HttpException({
    //   code: HttpStatus.BAD_REQUEST,
    //   msg: '出錯囉!'
    // }, HttpStatus.BAD_REQUEST);

    throw new CustomException();
    return this.appService.getHello();
  }


}
