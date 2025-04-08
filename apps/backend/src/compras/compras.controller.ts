import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import {
  CriarPedido,
  ListarPedidos,
  BuscarPedidoPorId,
  AdicionarItemAoPedido,
  RealizarPedido,
} from '@dropshoes/compras';
import { CriarCompraDto } from './dto/criar-compra.dto';

@Controller('compras')
export class ComprasController {
  constructor(
    private readonly criarPedido: CriarPedido,
    private readonly listarPedidos: ListarPedidos,
    private readonly buscarPedidoPorId: BuscarPedidoPorId,
    private readonly adicionarItemAoPedido: AdicionarItemAoPedido,
    private readonly realizarPedido: RealizarPedido,
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
}
