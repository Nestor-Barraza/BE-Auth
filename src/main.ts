import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import 'colors';

import AppModule from './components/app/app.module';
import AllExceptionsFilter from './filters/allExceptions.filter';
import setupSwagger from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.SERVER_PORT || 3000;

  setupSwagger(app);

  await app.listen(port, () => {
    console.info(
      `Documentation: http://localhost:${process.env.SERVER_PORT}/documentation`
        .bgBlue.black,
    );
    console.log(`The server is running on ${port} port`.bgGreen);
  });
}
bootstrap();
