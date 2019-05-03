<template>
  <div class="tic_tac_toe">
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <div class="gap"></div>
          <h2 class="text-center">Tic Tac Toe</h2>
          <div class="gap"></div>
          <h3 class="text-center">{{ info }}</h3>
          <div class="gap"></div>
          <div v-if="start">
            <table class="table">
              <tr>
                <td width="100" :style="get_style(0)" @click="cell(0)">{{ board[0] }}</td>
                <td width="100" :style="get_style(1)" @click="cell(1)">{{ board[1] }}</td>
                <td width="100" :style="get_style(2)" @click="cell(2)">{{ board[2] }}</td>
              </tr>
              <tr>
                <td width="100" :style="get_style(3)" @click="cell(3)">{{ board[3] }}</td>
                <td width="100" :style="get_style(4)" @click="cell(4)">{{ board[4] }}</td>
                <td width="100" :style="get_style(5)" @click="cell(5)">{{ board[5] }}</td>
              </tr>
              <tr>
                <td width="100" :style="get_style(6)" @click="cell(6)">{{ board[6] }}</td>
                <td width="100" :style="get_style(7)" @click="cell(7)">{{ board[7] }}</td>
                <td width="100" :style="get_style(8)" @click="cell(8)">{{ board[8] }}</td>
              </tr>
            </table>
          </div>
          <div v-else>
            <center><button type="button" class="btn btn-dark" @click="game_start()">Start</button></center>
          </div>
          <div class="gap"></div>
          <center><button type="button" class="btn btn-dark" @click="game_restart()">Restart</button></center>
        </div>
        <div class="col-sm-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { close } from 'fs';

export default {
  name: 'TicTacToe',
  data() {
    return {
      start: false,
      info: "",
      board: [],
      style: [],
      total_turn: 0,
      player_human: "O",
      player_ai: "X",
      winner: "",
      win_combination: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ]
    }
  },
  mounted() {
    this.game_start()
  },
  methods: {
    game_start: function() {
      this.reset()
    },
    game_restart() {
      this.game_start();
    },
    reset: function() {
      this.start = true;
      this.info = "";
      this.winner = "";
      this.board = ["","","","","","","","",""];
      this.style = [[],[],[],[],[],[],[],[],[]];
      console.log("game started");
    },
    cell: function(index) {
      if(this.board[index] == ""){
        this.total_turn++;
        this.turn(index, this.player_human)
        if(this.check_tie()){
          // something
        }else{
          // console.log(this.best_spot());
          var best_spot = this.best_spot();
          this.turn(best_spot, this.player_ai)
        }
      }
    },
    turn: function(index, player) {
      if(!this.winner || true){
        console.log("pleyer "+player+" clicked at "+index)
        Vue.set(this.board, index, player)
        console.log(this.board)
        this.cell_deactivate(index)
        var game_won = this.check_win(this.board, player);
        if(game_won) this.game_over(game_won);
      }
    },
    best_spot: function() {
      var minmax = this.minmax(this.board, this.player_ai);
      console.log(minmax);
      return minmax.index;
    },
    minmax: function(board, player) {
      var empty_spot = this.empty_spot()
      // console.log(empty_spot);throw "";
      if(this.check_win(board, this.player_human)) return {score:-10}
      else if(this.check_win(board, this.player_ai)) return {score:10}
      else if(empty_spot.length == 0) return {score:0}
      // console.log(1);throw "";
      var moves = [];
      empty_spot.forEach((value, index) => {
        var move = {};
        move.index = value;
        board[value] = player;
        // console.log({move, board});throw "";
        if(player == this.player_ai){
          var result = this.minmax(board, this.player_human);
          // console.log(result);throw "";
          move.score = result.score;
        }else{
          var result = this.minmax(board, this.player_ai);
          // console.log(result);throw "";
          move.score = result.score;
        }

        board[value] = "";
        // console.log(move);
        moves.push(move);
      });
      // console.log(moves);throw "";

      var best_move;
      if(player == this.player_ai){
        var best_score = -100000;
        moves.forEach((value, index) => {
          if(value.score > best_score) {
            best_score = value.score;
            best_move = index
          }
        });
      }else{
        var best_score = 100000;
        moves.forEach((value, index) => {
          if(value.score < best_score) {
            best_score = value.score;
            best_move = index
          }
        });
      }
      // console.log(moves[best_move]);
      // console.log({best_move, best_score});throw "";
      return moves[best_move];
    },
    empty_spot: function() {
      var empty_spot = [];
      this.board.forEach((value, index) => {
        if(value=="") empty_spot.push(index)
      });
      return empty_spot
    },
    check_win: function(board, player) {
      var plays = board.reduce((a,b,c) => (b==player) ? a.concat(c) : a, [])
      var game_won = null;
      for(var [index, win] of this.win_combination.entries()) {
        if(win.every(elem => plays.indexOf(elem) > -1)) {
          game_won = {index: index, player: player};
          break;
        }
      }
      return game_won;
    },
    check_tie: function() {
      if(this.empty_spot().length==0){
        console.log("game is a tie")
        this.info = "Tie, You can't beat me.";
        return true;
      }else return false
    },
    game_over: function(game_won) {
      console.log("game win by "+game_won.player)
      this.info = (this.player_ai == game_won.player) ? "You lose :(" : "You Won :)";
      for(var index of this.win_combination[game_won.index]){
        this.style[index].push((this.player_ai == game_won.player) ? "background:red" : "background:green");
      }
      this.cell_deactivate()
    },
    cell_deactivate: function(index=null) {
      if(index!=null) {
        this.style[index].push("background:grey")
        this.style[index].push("cursor:not-allowed")
      }else{
        for(var i=0;i<9;i++) {
          this.style[i].push("cursor:not-allowed")
        }
      }
    },
    get_style: function(index) {
      return this.style[index].join(";");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
