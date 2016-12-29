

jogaComputador(Board, X, Y, X1, Y1, Dificuldade, Jogada) :- movesAvailable(Moves, X, Y, X1, Y1), bestMove(Board, Moves, Dificuldade, Jogada).

movesAvailable(Board, Moves, X, Y, X1, Y1):- findall(Move, allPossibleMoves(Board, Move, X, Y, X1, Y1), Moves). 

teste(B,funcionaaaaaaaaaaaa).


bestMove(_, Moves, 1, D) :- generateRandomMove(Moves, D).
bestMove(Board, Moves, 2, D) :- assert(melhorJogada(5, 9999)), !, tentaMoves(Board, Moves, D, 2), alwaysYES(retracts).
bestMove(Board, Moves, 3, D) :- assert(melhorJogada(5, 9999)), tentaMoves(Board, Moves, D, 3), alwaysYES(retracts).

retracts:- retract(melhorJogada(_, _)), retract(melhorJogada(_, _)),retract(melhorJogada(_, _)),retract(melhorJogada(_, _)),retract(melhorJogada(_, _)),retract(melhorJogada(_, _)), retract(nJogadas(_)), retract(nJogadas(_)), retract(nJogadas(_)),retract(nJogadas(_)),retract(nJogadas(_)),retract(nJogadas(_)). 


tentaMoves(Board, [], D, Grau) :- retract(melhorJogada(D, _)).
tentaMoves(Board, [D|T], Di, Grau) :- tentaMovesAux(Board, D, Grau), tentaMoves(Board, T, Di, Grau).    

tentaMovesAux(Board, D, 2) :-  assert(nJogadas(9999)),  jogadorAtual(_, X, Y),  alwaysYES(movePC(Board, D, X, Y, 0, CF)), nJogadas(N), melhorJogada(_, NA), !, decideTroca(D, N, NA).
decideTroca(D, N, NA) :- N < NA, retract(nJogadas(_)), retract(melhorJogada(_, _)),   assert(melhorJogada(D, N)), !.
decideTroca(_, _, _) :- retract(nJogadas(_)).

tentaMovesAux(_, 5, 2).


tentaMovesAux(Board, D, 3) :-  assert(nJogadas(9999)), jogadorAtual(_, X, Y), jogadorOponente(_, X1, Y1),  alwaysYES(jogoEu(Board, 0, X, Y, X1, Y1, D)),   nJogadas(N), melhorJogada(_, NA), !, decideTroca(D, N, NA).
decideTroca(D, N, NA) :- N < NA, retract(nJogadas(_)), retract(melhorJogada(_, _)),   assert(melhorJogada(D, N)), !.
decideTroca(_, _, _) :- retract(nJogadas(_)).
tentaMovesAux(Board, D, 3) :- tentaMovesAux(Board, D, 2).













jogoEu(_, Contador, X, Y, X1, Y1, D) :- jogadaEfetuada(X, Y, D, X2, Y2), Contador1 is Contador + 1, testaFinall(X2, Y2, Contador1, C).
jogoEu(Tab, Contador, X, Y, X1, Y1, D) :- jogadaEfetuada(X, Y, D, X2, Y2), Contador1 is Contador + 1,  getPeca(Tab, X2, Y2, Peca), findall(Jogada, pecasCorretas(Peca, Jogada, X1, Y1), Moves), !, jogaAdversario(Tab, Contador1, X2, Y2, X1, Y1, Moves).

jogaAdversario(_, _, _, _, _, _, [5]).
jogaAdversario(_, _, _, _, _, _, []).
jogaAdversario(Tab, Contador, X, Y, X1, Y1, [D|T]) :- jogadaEfetuada(X1, Y1, D, X2, Y2), !, not(testaFinall( X2, Y2, Contador, L)),  getPeca(Tab, X2, Y2, Peca), findall(Jogada, pecasCorretas(Peca, Jogada, X, Y), Moves), !, passaAvez(Tab, Contador, X, Y, X2, Y2, Moves), !, jogaAdversario(Tab, Contador, X, Y, X1, Y1, T).

passaAvez(_, Contador, X, Y, X2, Y2, []).
passaAvez(Tab, Contador, X, Y, X2, Y2, [D|T]) :- jogoEu(Tab, Contador, X, Y, X2, Y2, D), passaAvez(Tab, Contador, X, Y, X2, Y2, T).

pecasCorretas(Peca, Jogada, X, Y) :- move(Peca, Jogada), testaMove(X, Y, Jogada).

/*
// Medio
*/
alwaysYES(Goal) :- not(Goal).
alwaysYES(Goal) :- call(Goal).



movePC(Tab, D, X, Y, Contador, ContadorFinal) :- jogadaEfetuada(X, Y, D, X1, Y1),   Contador1 is Contador + 1, testaFinal(X1, Y1, Contador1, ContadorFinal).

movePC(Tab, D, X, Y, Contador, ContadorFinal) :- jogadaEfetuada(X, Y, D, X1, Y1),   Contador1 is Contador + 1,  getPeca(Tab, X1, Y1, Peca), findall(Jogada, move(Peca, Jogada), Moves), !, jogadasPossiveis(Contador1, ContadorFinal, Moves, X1, Y1).

jogadasPossiveis(_, _, [5], _, _).
jogadasPossiveis(Contador, ContadorFinal, [], _, _) :- !, fail.
jogadasPossiveis(Contador, ContadorFinal, [H|T], X, Y) :- testaMove(X, Y, H), movePC(H, X, Y, Contador, ContadorFinal), !, jogadasPossiveis(Contador, ContadorFinal, T, X, Y).
jogadasPossiveis(Contador, ContadorFinal, [H|T], X, Y) :- jogadasPossiveis(Contador, ContadorFinal, T, X, Y).

testaFinal(8, 1, Contador, Contador) :-  nJogadas(X), Contador < X, retract(nJogadas(X)), assert(nJogadas(Contador)).
testaFinal(_, _, Contador, _):- Contador > 10.


testaFinall(8, 1, Contador, Contador) :-  nJogadas(X), Contador < X, retract(nJogadas(X)), assert(nJogadas(Contador)).
testaFinal1(_, _, Contador, _):- Contador > 7.







generateRandomMove([], 5).
generateRandomMove([H], H).
generateRandomMove(Moves, D) :- getLength(Moves, Length), repeat, random(Random), X is round(Length * Random), X > 0, X < Length + 1, !, getPeca([Moves], X, 1, D).  

getLength(Lista, Length) :- getLengthAux(Lista, Length, 0).
getLengthAux([], X, X).
getLengthAux([H|T], Length, X) :- X1 is X + 1, getLengthAux(T, Length, X1).

allPossibleMoves(Tab, D, X, Y, X1, Y1) :-getPeca(Tab, X1, Y1, Peca),!,  nextStep(X, Y, Peca, D).


nextStep(X, Y,  Peca, 1) :- testaMove(X, Y, 1), 	move(Peca, 1).
nextStep(X, Y,  Peca, 2) :- testaMove(X, Y, 2), 	move(Peca, 2).
nextStep(X, Y,  Peca, 3) :- testaMove(X, Y, 3), 	move(Peca, 3).
nextStep(X, Y,  Peca, 4) :- testaMove(X, Y, 4), 	move(Peca, 4).
nextStep(X, Y,  Peca, 6) :- testaMove(X, Y, 6), 	move(Peca, 6).
nextStep(X, Y,  Peca, 7) :- testaMove(X, Y, 7), 	move(Peca, 7).
nextStep(X, Y,  Peca, 8) :- testaMove(X, Y, 8), 	move(Peca, 8).
nextStep(X, Y, Peca, 9) :- testaMove(X, Y, 9), 	move(Peca, 9).


testaMove(X, Y, 1) :- X > 1, Y < 8.
testaMove(X, Y, 2) :- Y < 8.
testaMove(X, Y, 3) :- Y < 8, X < 8.
testaMove(X, Y, 4) :- X > 1.
testaMove(X, Y, 5).
testaMove(X, Y, 6) :- X < 8.
testaMove(X, Y, 7) :- Y > 1, X > 1.
testaMove(X, Y, 8) :- Y > 1.
testaMove(X, Y, 9) :- Y > 1, X < 8.


getPeca([H|T], X, 1, Peca) :- getPecaAux(H, X, Peca).
getPeca([H|T], X, Y, Peca) :- Y1 is Y - 1, getPeca(T, X, Y1, Peca).

getPecaAux([H|T], 1, H).
getPecaAux([H|T], X, Peca) :- X1 is X - 1, getPecaAux(T, X1, Peca).





move(sb, 5).
move(cb, 5).
move(cw, 5).
move(sw, 5).
move(b, 5).

move(uudddl, 8).
move(uudddl, 2).
move(uudddl, 1).

move(uuddll, 8).
move(uuddll, 2).
move(uuddll, 4).


move(urrrll, 9).
move(urrrll, 6).
move(urrrll, 4).

move(uurrll, 8).
move(uurrll, 6).
move(uurrll, 4).
	
move(rrdrdl, 6).
move(rrdrdl, 3).
move(rrdrdl, 1).

move(uudlll, 8).
move(uudlll, 1).
move(uudlll, 4).
	
move(uurrdr, 8).
move(uurrdr, 6).
move(uurrdr, 3).
	
move(drddll, 3).
move(drddll, 2).
move(drddll, 4).
	
move(urdrdl, 9).
move(urdrdl, 3).
move(urdrdl, 1).
	
move(uuurul, 8).
move(uuurul, 9).
move(uuurul, 7).
	
move(urdrdd, 9).
move(urdrdd, 3).
move(urdrdd, 2).
	
move(drdddl, 3).
move(drdddl, 2).
move(drdddl, 1).
	
move(uullul, 8).
move(uullul, 4).
move(uullul, 7).
	
move(drddul, 3).
move(drddul, 2).
move(drddul, 7).
	
move(urddul, 9).
move(urddul, 2).
move(urddul, 7).
	
move(uurrdd, 8).
move(uurrdd, 6).
move(uurrdd, 2).
	
move(uurrul, 8).
move(uurrul, 6).
move(uurrul, 7).
	
move(urllul, 9).
move(urllul, 4).
move(urllul, 7).
	
move(dlllul, 1).
move(dlllul, 4).
move(dlllul, 7).
	
move(uudlul, 8).
move(uudlul, 1).
move(uudlul, 7).
	
move(uurrdl, 8).
move(uurrdl, 6).
move(uurrdl, 1).
	
move(rrdrll, 6).
move(rrdrll, 3).
move(rrdrll, 4).
	
move(drdlul, 3).
move(drdlul, 1).
move(drdlul, 7).
	
move(urdlll, 9).
move(urdlll, 1).
move(urdlll, 4).
	
move(urrrdr, 9).
move(urrrdr, 6).
move(urrrdr, 3).
	
move(rrdrdd, 6).
move(rrdrdd, 3).
move(rrdrdd, 2).
	
move(uudrdl, 8).
move(uudrdl, 3).
move(uudrdl, 1).
	
move(rrddll, 6).
move(rrddll, 2).
move(rrddll, 4).

move(urrrdl, 9).
move(urrrdl, 6).
move(urrrdl, 1).
	
move(drdlll, 3).
move(drdlll, 1).
move(drdlll, 4).
	
move(uuurdr, 8).
move(uuurdr, 9).
move(uuurdr, 3).
	
move(ddllul, 2).
move(ddllul, 4).
move(ddllul, 7).
	
move(rrdlul, 6).
move(rrdlul, 1).
move(rrdlul, 7).
	
move(urdrll, 9).
move(urdrll, 3).
move(urdrll, 4).
	
move(rrdlll, 6).
move(rrdlll, 1).
move(rrdlll, 4).
	
move(uuddul, 8).
move(uuddul, 2).
move(uuddul, 7).
	
move(uudrll, 8).
move(uudrll, 3).
move(uudrll, 4).
	
move(dddlul, 2).
move(dddlul, 1).
move(dddlul, 7).

move(uudrul, 8).
move(uudrul, 3).
move(uudrul, 7).
	
move(uuurdd, 8).
move(uuurdd, 9).
move(uuurdd, 2).
	
move(rrddul, 6).
move(rrddul, 2).
move(rrddul, 7).
	
move(rrllul, 6).
move(rrllul, 4).
move(rrllul, 7).

move(drllul, 3).
move(drllul, 4).
move(drllul, 7).

move(uudrdd, 8).
move(uudrdd, 3).
move(uudrdd, 2).

move(urdddl, 9).
move(urdddl, 2).
move(urdddl, 1).

move(urrrdd, 9).
move(urrrdd, 6).
move(urrrdd, 2).

move(rrdrul, 6).
move(rrdrul, 3).
move(rrdrul, 7).

move(uuurll, 8).
move(uuurll, 9).
move(uuurll, 4).

move(uuurrr, 8).
move(uuurrr, 9).
move(uuurrr, 6).

move(rrdddl, 6).
move(rrdddl, 2).
move(rrdddl, 1).

move(urdrul, 9).
move(urdrul, 3).
move(urdrul, 7).

move(urdlul, 9).
move(urdlul, 1).
move(urdlul, 7).

move(uuurdl, 8).
move(uuurdl, 9).
move(uuurdl, 1).

move(dddlll, 2).
move(dddlll, 1).
move(dddlll, 4).

move(urddll, 9).
move(urddll, 2).
move(urddll, 4).

move(urrrul, 9).
move(urrrul, 6).
move(urrrul, 7).