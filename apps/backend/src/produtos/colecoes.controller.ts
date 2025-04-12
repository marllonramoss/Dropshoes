import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  AdicionarColecao,
  ListarColecoes,
  BuscarColecaoPorId,
  EditarColecao,
  RemoverColecao,
  AdicionarColecaoAoProdutoUseCase,
} from '@dropshoes/produto';

@Controller('colecoes')
export class ColecoesController {
  constructor(
    private readonly adicionarColecao: AdicionarColecao,
    private readonly listarColecoes: ListarColecoes,
    private readonly buscarColecaoPorId: BuscarColecaoPorId,
    private readonly editarColecao: EditarColecao,
    private readonly removerColecao: RemoverColecao,
    private readonly adicionarColecaoAoProduto: AdicionarColecaoAoProdutoUseCase,
  ) {}

  @Post()
  async criar(@Body() dto: { nome: string }) {
    return await this.adicionarColecao.executar(dto);
  }

  @Get()
  async listar() {
    return await this.listarColecoes.executar();
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    const colecao = await this.buscarColecaoPorId.executar(id);

    if (!colecao) {
      throw new NotFoundException(`Coleção com ID ${id} não encontrada`);
    }

    return colecao;
  }

  @Put(':id')
  async editar(@Param('id') id: string, @Body() dto: { nome: string }) {
    return await this.editarColecao.executar(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remover(@Param('id') id: string): Promise<void> {
    await this.removerColecao.executar(id);
  }

  @Post(':colecaoId/produtos/:produtoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async adicionarAoProduto(
    @Param('colecaoId') colecaoId: string,
    @Param('produtoId') produtoId: string,
  ): Promise<void> {
    await this.adicionarColecaoAoProduto.executar({
      colecaoId,
      produtoId,
    });
  }
}
