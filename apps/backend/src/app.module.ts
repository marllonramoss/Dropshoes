import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ComprasModule } from './compras/compras.module';
import { ProdutosModule } from './produtos/produtos.module';

@Module({
  imports: [PrismaModule, ComprasModule, ProdutosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
