import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('E-commerce API')
  .setDescription('The e-commerce API description')
  .setVersion('1.0')
  .addBearerAuth(
    { 
      // I was also testing it without prefix 'Bearer ' before the JWT
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
      scheme: 'Bearer',
      type: 'http', // I`ve attempted type: 'apiKey' too
      in: 'Header'
    },
    'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
  )
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/api/v1/api-docs', app, document);

  await app.listen(3000);
  console.log('HTTP server is running.');
}
bootstrap();
