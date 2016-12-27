Olá Professor
Este projeto foi elaborado por:
Luís Coelho
Pedro Gomes


-O projeto não aparenta ter nenhum erro nem deixamos nenhuma funcionalidade por implementar. Aparece uns warnings do webGL na consola mas pelo que vi em fórum online não há problema nenhum.
-O código está relativamente simples, cada classe faz a sua função e está tudo devidamente comentado antes de cada método, assim como nos métodos mais longos há comentários pelo meio.


Pequena discrição do projeto:

A classe MySceneGraph é quem faz a leitura do ficheiro e construção do graphScene, as duas coisas são feitas em simultaneo, pois na nossa opnião não há necessidade de guardar informação para depois construir o graphScene para tal usa-se os seguintes métodos:
	- StartParser : verifica a estrutura do ficheiro e chama e faz o parser de cada bloco com os metodos
		- parseScene(...)
		- parseView(...), invés de guardar os valores, cria já as perspetivas e guarda-as em this.perspectives[id];
		- parseIllumination(...)
		- parseLights
		- parseTextures(...), é lida e criada a textura e guardada em this.texture[id][3]
		- parseMaterials(...), é lido e criado o material e guardado em this.materials[id]
		- parseTransformations(...), as transformações são lidas e cria-se a matriz de transformação guardada em this.transformations[id]
		- parsePrimitives(...), são lidos os parametros e as primitivas são instanciadas em this.primitives[id]	
		- parseComponents(...), cada component é lido e guarda-se os seus valores em this.components[id] com a ajuda de uma estrutura "Node"
	- createGraph(...) : invés de fazer-se um push dos material e texturas no display usa-se este método para fazer um pré-processamento dos nós, para que os nós filhos possam herdar a textura e material dos nós pais (se for o caso). 	
	- printErrors_Warings(...) : ao longo da leitura do ficheiro dsx são guardados todos os warnings e erros em arrays (this.warnings e this.errors), no fim dessa leitura são impressos.
	
A classe XMLscene está encarregue de fazer as atualizações da cena após a leitura do ficheiro dsx:
		- onGraphLoaded(), o background é redefinido, as luzes são inicializadas, os eixos e perspectiva também são redefinidos	
		- updateMaterials(), a ser chamado pela interface, muda o material dos objetos para tal, há uma visita em largura do grafo scene
		- updateView(), muda a perspectiva
		- updateLights(), acende e apaga as luzes da cena
		- display(), faz o display do node root	
		
		
A estrutura Node guarda os valores de cada component e é responsável por fazer o seu display e o display dos seus filhos, como tal, quando se faz display da cena, basta fazer display do nó raiz da cena

A classe Interface, é usada para ligar e desligar as luzes, assim como mudar de perspectiva (tecla "v") e mudar de material (tecla "m").		