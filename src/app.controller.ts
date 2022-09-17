import {
  Controller, Get, HttpException, HttpStatus, Inject,
  NotAcceptableException, Optional, Param, ParseIntPipe, Post,
  UploadedFile, UploadedFiles, UseFilters,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
// import { ConfigurationService } from './common/configuration/configuration.service';
import { Auth } from './decorators/auth.decorator';
import { Roles } from './decorators/roles.decorator';
import { User } from './decorators/user.decorator';
import { CustomException } from './exceptions/custom.exception';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { HelloWorldInterceptor } from './interceptors/hello-world.interceptor';
import { ParseIntPipe as CustomParseIntPipe } from './pipes/parse-int.pipe';
import { Storage2Service } from './common/storage2/storage2.service';
import { ModuleRef } from '@nestjs/core';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller()
@UseInterceptors(HelloWorldInterceptor)
// @UseGuards(AuthGuard)
export class AppController {


  private readonly storage2Service: Storage2Service;

  constructor(

    private readonly moduleRef: ModuleRef,



    private readonly appService: AppService,
    @Inject('MESSAGE_BOX') private readonly messageBox,
    @Inject('ALIAS_APP_SERVICE') private readonly alias: AppService,
    @Optional() @Inject('HANDSOME_MAN') private readonly handsomeMan = { name: '' },
    // private readonly configService: ConfigurationService
    private readonly configService: ConfigService,
  ) {

    this.storage2Service = this.moduleRef.get(Storage2Service, { strict: false });
    this.storage2Service.addData({ name: 'BEN_storage' });

    console.log(this.messageBox);
    console.log(this.alias === this.appService); // 進行比對
    console.log(this.handsomeMan);


    this.appService.addBookToStorage({ name: 'Nest Tutorial' });
    this.appService.addBookToBookStorage({ name: 'Angular Tutorial' });
    console.log(`AppController: ${Math.random()}`);



  }

  @Get('/todos')
  getTodos() {
    return this.appService.getTodos();
  }


  @Post('/multipleAnyField')
  @UseInterceptors(AnyFilesInterceptor())
  uploadMultipleFilesWithAnyField(@UploadedFiles() files: Express.Multer.File[]) {
    return files.map(({ fieldname, originalname }) => ({ fieldname, originalname }));
  }



  @Post('/multipleField')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'first' },
    { name: 'second' }
  ]))
  uploadMultipleFieldFiles(@UploadedFiles() files: { [x: string]: Express.Multer.File[] }) {
    const { first, second } = files;
    const list = [...first, ...second];
    return list.map(({ fieldname, originalname }) => ({ fieldname, originalname }));
  }



  @Post('/multiple')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return files.map(({ fieldname, originalname }) => ({ fieldname, originalname }));
  }




  @Post('/single')
  @UseInterceptors(FileInterceptor('file'))
  uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
    console.log("file", file);
    return file;
  }

  @Get()
  getHello2() {
    return this.storage2Service.getList();
  }


  @Get('/compare')
  getCompare() {
    return {
      storage: this.appService.getStorageList(),
      books: this.appService.getBookList()
    };
  }

  @Get()
  getHello() {
    const app_domain = this.configService.get('APP_DOMAIN');
    const redirect_url = this.configService.get('APP_REDIRECT_URL');
    return { app_domain, redirect_url };
  }


  // @Get()
  // getHello() {
  //   const database = this.configService.get('database');
  //   const db_host = this.configService.get('database.host'); // 取得 database 裡的 host
  //   const port = this.configService.get('PORT');
  //   return { database, db_host, port };
  // }


  // @Get()
  // getHello() {
  //   const username = this.configService.get('USERNAME');
  //   const port = this.configService.get('PORT');
  //   return { username, port };
  // }

  // @Get()
  // getHello() {
  //   return { username: this.configService.get('USERNAME') };
  // }

  // @Auth('staff')
  // @Get()
  // getHello(@User('name') name: string): string {
  //   return name;
  // }

  // @UseGuards(RoleGuard)
  // @Roles('admin')
  // @Get()
  // getHello(@User('name') name: string): string {
  //   return name;
  // }

  // @Get()
  // getHello(@User('name') name: string): string {
  //   return name;
  // }

  // @Get()
  // getHello(@User() user: any): string {
  //   return user;
  // }

  // @Get()
  // getAll() {
  //   return [];
  // }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

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



  // @Get()
  // @UseFilters(HttpExceptionFilter)
  // getHello(): string {
  //   // throw new Error('出錯囉!');
  //   // throw new HttpException('出錯囉!', HttpStatus.BAD_REQUEST);

  //   // throw new HttpException({
  //   //   code: HttpStatus.BAD_REQUEST,
  //   //   msg: '出錯囉!'
  //   // }, HttpStatus.BAD_REQUEST);

  //   throw new CustomException();
  //   return this.appService.getHello();
  // }


}
