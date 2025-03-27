# Pokédex

Esse projeto é o segundo trabalho da disciplina de desenvolvimento web da Centro Universitário Municipal de Franca (Uni-FACEF) e consiste na criação de um site capaz de acessar a Api PokéAPI
e exibir informações sobre os Pokémons disponíveis.

![Image](https://github.com/user-attachments/assets/043a3eb0-7353-4c51-8d5f-36ddb9bcc85c)

## Instalação

Acesse o Site [Pokédex](https://italoweb99.github.io/pokedex/)

### Ou

Clone e instale as dependências
```
git clone https://github.com/italoweb99/pokedex.git
cd pokedex
npm install
```
Altere o arvivo vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

## Uso

### Seleção de Pokémons

Ao selecionar um Pokémon na lista a Direita as informações do mesmo serão exibidas na Tela a esquerda

![Image](https://github.com/user-attachments/assets/003cc157-6803-4a2d-813f-7a7d553d40dd)

Mais Pokémons podem ser ao navegar pelas setas

![Image](https://github.com/user-attachments/assets/b969e7b4-2e34-441b-a9f6-bb85d755f263)

Alternativamente também é possível pesquisar Pokémons a partir da barra de pesquisa

![Image](https://github.com/user-attachments/assets/ce6a884a-1456-4ae2-b773-5d33ec877ed3)

Ou pela página de mais informações

![Image](https://github.com/user-attachments/assets/b09b7a6e-6cb4-4446-a08b-fd4069e1e75c)

### Mais informações

Ao clicar no símbolo da mais serão exibidos mais informações sobre o Pokémon

![Image](https://github.com/user-attachments/assets/ea5497a4-37c7-4168-89eb-0223d310bf9d)


