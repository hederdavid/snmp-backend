<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# SNMP Backend

Este repositório contém o backend desenvolvido para o projeto de monitoramento de tráfego de rede, parte da disciplina **Projeto e Administração de Redes**, ministrada pelo professor **Igor Luiz Oliveira de Souza**. O backend é responsável por coletar dados SNMP de um roteador Mikrotik e disponibilizá-los para o frontend.

**Autores:** Heder Moreira David e Júlia Macêdo Galvão de Carvalho

## Objetivo

O objetivo deste backend é fornecer uma API que permita o monitoramento em tempo real do tráfego de rede de interfaces Ethernet de um roteador Mikrotik. Ele utiliza o protocolo SNMP para coletar informações como **Bytes Recebidos** e **Taxa de Transmissão**.

## Tecnologias Utilizadas

- **Framework:** NestJS
- **Protocolo:** SNMP (via biblioteca `net-snmp`)
- **Linguagem:** TypeScript
- **Outras Dependências:** RxJS, Cors

## Funcionalidades

- Coleta de dados SNMP em tempo real.
- Endpoints para consulta de tráfego de rede por interface.
- Logs detalhados para monitoramento e depuração.
- Suporte a CORS para integração com o frontend.

## Endpoints Disponíveis

### `GET /snmp/trafego`

Retorna os valores de tráfego de uma interface específica.

**Parâmetros de Query:**

- `rxPorta` (string): Número da porta para leitura de bytes recebidos.
- `txPorta` (string): Número da porta para leitura de bytes transmitidos.

**Exemplo de Resposta:**

```json
{
  "time": "2025-06-12T14:00:00.000Z",
  "valores": {
    "rxBytes": 123456,
    "txBytes": 654321
  }
}
```

### `GET /snmp/teste`

Retorna um valor aleatório para simulação de tráfego.

**Exemplo de Resposta:**

```json
{
  "time": "2025-06-12T14:00:00.000Z",
  "bytes": 7890
}
```

## Configuração do Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- NPM ou Yarn
- Roteador Mikrotik configurado com SNMP habilitado

### Instalação

1. Clone este repositório:

   ```sh
   git clone https://github.com/hederdavid/snmp-backend.git
   cd snmp-backend
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Configure o endereço IP e a comunidade SNMP no arquivo `src/snmp/snmp.service.ts`:

   ```typescript
   private readonly target = '10.4.22.200'; // IP do roteador Mikrotik
   private readonly community = 'public';  // Comunidade SNMP
   ```

4. Inicie o servidor de desenvolvimento:

   ```sh
   npm run start:dev
   ```

## Estrutura do Projeto

```plaintext
snmp-backend/
├── src/
│   ├── snmp/             # Módulo SNMP
│   │   ├── snmp.service.ts  # Serviço para comunicação SNMP
│   │   ├── snmp.controller.ts # Controlador dos endpoints
│   │   └── snmp.module.ts    # Módulo SNMP
│   ├── app.module.ts     # Módulo principal
│   ├── main.ts           # Arquivo principal
├── dist/                 # Arquivos compilados
├── package.json          # Configuração do projeto
├── tsconfig.json         # Configuração do TypeScript
└── README.md             # Documentação do projeto
```

## Integração com o Frontend

O frontend deste projeto está disponível no repositório [Gráfico de Tráfego de Rede](https://github.com/hederdavid/grafico-trafego). Ele consome os dados fornecidos por este backend para exibir gráficos interativos de tráfego de rede.

## Apresentação

Durante a apresentação, será demonstrado o funcionamento do backend ao monitorar o tráfego de rede em tempo real, utilizando o **Bandwidth Test** do roteador Mikrotik.

## Licença

Este projeto é de uso acadêmico e não possui uma licença específica.
