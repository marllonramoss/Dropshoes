import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Put,
  NotFoundException,
} from '@nestjs/common';
import {
  CriarPedido,
  ListarPedidos,
  BuscarPedidoPorId,
  AdicionarItemAoPedido,
  RealizarPedido,
  AprovarPedido,
  RejeitarPedido,
  Id,
} from '@dropshoes/compras';
import { CriarCompraDto } from './dto/criar-compra.dto';
import { AdicionarItemDto } from './dto/adicionar-item.dto';

@Controller('compras')
export class ComprasController {
  constructor(
    private readonly criarPedido: CriarPedido,
    private readonly listarPedidos: ListarPedidos,
    private readonly buscarPedidoPorId: BuscarPedidoPorId,
    private readonly adicionarItemAoPedido: AdicionarItemAoPedido,
    private readonly realizarPedido: RealizarPedido,
    private readonly aprovarPedido: AprovarPedido,
    private readonly rejeitarPedido: RejeitarPedido,
  ) {}

  @Post()
  async criar(@Body() criarCompraDto: CriarCompraDto) {
    const primeiroItem = criarCompraDto.itens[0];

    const pedido = await this.criarPedido.executar({
      produtoId: primeiroItem.produtoId,
      quantidade: primeiroItem.quantidade,
      valorUnitario: primeiroItem.precoUnitario,
    });

    // Adiciona os demais itens ao pedido
    for (let i = 1; i < criarCompraDto.itens.length; i++) {
      const item = criarCompraDto.itens[i];
      await this.adicionarItemAoPedido.executar({
        pedidoId: pedido.getId().getValor(),
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        valorUnitario: item.precoUnitario,
      });
    }

    return pedido;
  }

  @Post(':id/itens')
  async adicionarItem(@Param('id') id: string, @Body() dto: AdicionarItemDto) {
    return await this.adicionarItemAoPedido.executar({
      pedidoId: id,
      produtoId: dto.produtoId,
      quantidade: dto.quantidade,
      valorUnitario: dto.valorUnitario,
    });
  }

  @Put(':id/realizar')
  async realizar(@Param('id') id: string) {
    return await this.realizarPedido.executar(id);
  }

  @Get()
  async listar() {
    return await this.listarPedidos.executar();
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    return await this.buscarPedidoPorId.executar(id);
  }

  @Get(':id/status')
  async verificarStatus(@Param('id') id: string) {
    const pedido = await this.buscarPedidoPorId.executar(id);

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }

    return {
      id: pedido.getId().getValor(),
      status: pedido.getStatus(),
      mensagem: `O pedido está com o status: ${pedido.getStatus()}`,
    };
  }

  @Put(':id/aprovar')
  @HttpCode(HttpStatus.NO_CONTENT)
  async aprovar(@Param('id') id: string): Promise<void> {
    const pedidoId = new Id(id);
    await this.aprovarPedido.executar(pedidoId);
  }

  @Put(':id/rejeitar')
  @HttpCode(HttpStatus.NO_CONTENT)
  async rejeitar(@Param('id') id: string): Promise<void> {
    const pedidoId = new Id(id);
    await this.rejeitarPedido.executar(pedidoId);
  }
}
