import { Injectable } from '@nestjs/common';
import { GeradorDeId } from '@dropshoes/produto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UuidGeradorDeId implements GeradorDeId {
  gerar(): string {
    return uuidv4();
  }
}
