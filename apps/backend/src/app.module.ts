import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ComprasModule } from './compras/compras.module';

@Module({
  imports: [PrismaModule, ComprasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
