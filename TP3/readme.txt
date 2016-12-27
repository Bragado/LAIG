Ol� Professor
Este projeto foi elaborado por:
Lu�s Coelho
Pedro Gomes


-O projeto n�o aparenta ter nenhum erro nem deixamos nenhuma funcionalidade por implementar. Aparece uns warnings do webGL na consola mas pelo que vi em f�rum online n�o h� problema nenhum.
-O c�digo est� relativamente simples, cada classe faz a sua fun��o e est� tudo devidamente comentado antes de cada m�todo, assim como nos m�todos mais longos h� coment�rios pelo meio.


Pequena discri��o do projeto:

A classe MySceneGraph � quem faz a leitura do ficheiro e constru��o do graphScene, as duas coisas s�o feitas em simultaneo, pois na nossa opni�o n�o h� necessidade de guardar informa��o para depois construir o graphScene para tal usa-se os seguintes m�todos:
	- StartParser : verifica a estrutura do ficheiro e chama e faz o parser de cada bloco com os metodos
		- parseScene(...)
		- parseView(...), inv�s de guardar os valores, cria j� as perspetivas e guarda-as em this.perspectives[id];
		- parseIllumination(...)
		- parseLights
		- parseTextures(...), � lida e criada a textura e guardada em this.texture[id][3]
		- parseMaterials(...), � lido e criado o material e guardado em this.materials[id]
		- parseTransformations(...), as transforma��es s�o lidas e cria-se a matriz de transforma��o guardada em this.transformations[id]
		- parsePrimitives(...), s�o lidos os parametros e as primitivas s�o instanciadas em this.primitives[id]	
		- parseComponents(...), cada component � lido e guarda-se os seus valores em this.components[id] com a ajuda de uma estrutura "Node"
	- createGraph(...) : inv�s de fazer-se um push dos material e texturas no display usa-se este m�todo para fazer um pr�-processamento dos n�s, para que os n�s filhos possam herdar a textura e material dos n�s pais (se for o caso). 	
	- printErrors_Warings(...) : ao longo da leitura do ficheiro dsx s�o guardados todos os warnings e erros em arrays (this.warnings e this.errors), no fim dessa leitura s�o impressos.
	
A classe XMLscene est� encarregue de fazer as atualiza��es da cena ap�s a leitura do ficheiro dsx:
		- onGraphLoaded(), o background � redefinido, as luzes s�o inicializadas, os eixos e perspectiva tamb�m s�o redefinidos	
		- updateMaterials(), a ser chamado pela interface, muda o material dos objetos para tal, h� uma visita em largura do grafo scene
		- updateView(), muda a perspectiva
		- updateLights(), acende e apaga as luzes da cena
		- display(), faz o display do node root	
		
		
A estrutura Node guarda os valores de cada component e � respons�vel por fazer o seu display e o display dos seus filhos, como tal, quando se faz display da cena, basta fazer display do n� raiz da cena

A classe Interface, � usada para ligar e desligar as luzes, assim como mudar de perspectiva (tecla "v") e mudar de material (tecla "m").		