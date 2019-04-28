<template>
  <div class="tic_tac_toe">
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <div class="gap"></div>
          <h2 class="text-center">Tic Tac Toe</h2>
          <div class="gap"></div>
          <h3 class="text-center">{{ info() }}</h3>
          <div class="gap"></div>
          <div v-if="start">
            <table class="table">
              <tr>
                <td width="100" @click="cell(0)">{{ game[0] }}</td>
                <td width="100" @click="cell(1)">{{ game[1] }}</td>
                <td width="100" @click="cell(2)">{{ game[2] }}</td>
              </tr>
              <tr>
                <td width="100" @click="cell(3)">{{ game[3] }}</td>
                <td width="100" @click="cell(4)">{{ game[4] }}</td>
                <td width="100" @click="cell(5)">{{ game[5] }}</td>
              </tr>
              <tr>
                <td width="100" @click="cell(6)">{{ game[6] }}</td>
                <td width="100" @click="cell(7)">{{ game[7] }}</td>
                <td width="100" @click="cell(8)">{{ game[8] }}</td>
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
export default {
  name: 'TicTacToe',
  data() {
    return {
      restart: false,
      start: false,
      o:'O',
      x:'X',
      current_turn: '',
      total_turn: 0,
      game: [],
      winner: ''
    }
  },
  mounted() {
    this.game_start()
  },
  methods: {
    game_start: function() {
      this.start = true;
      this.current_turn = this.x;
      this.game = ["", "", "", "", "", "", "", "", ""];
    },
    game_restart: function() {
      this.game_start()
    },
    info: function(type = "") {
      return (this.current_turn == this.x) ? "Computer's turn" : "Your turn";
    },
    cell: function(index) {
      if(!this.game[index] && this.start){
        this.total_turn++;
        this.game[index] = this.current_turn;
        this.check_winner();
        this.swap_turn();
        console.log(this.game);
      }
    },
    check_winner: function() {
      const winner_combination = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];

      // check for winner
      winner_combination.forEach(wc => {
        const [a, b, c] = wc;
        const value_a = this.game[a];
        const value_b = this.game[b];
        const value_c = this.game[c];

        if(value_a && value_a == value_b && value_a == value_c) {
          // we got a winner
          this.winner = value_a;
          console.log("winner "+this.winner);
        }
      })

      // check for tie
      if(this.total_turn == this.game.length){
        console.log("tie");
      }
    },
    swap_turn: function() {
      this.current_turn = (this.current_turn == this.x) ? this.o : this.x ;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
