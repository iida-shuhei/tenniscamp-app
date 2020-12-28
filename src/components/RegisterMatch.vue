<template>
  <v-card class="mx-auto" max-width="350">
    <h2 class="title">試合結果登録</h2>
    <div v-if="err != ''" class="mx-auto box">
      <small class="err" style="white-space:pre-wrap;">{{ err }}</small>
      <br /><br />
    </div>
    <v-col>
      <v-radio-group v-model="match" row>
        <v-radio label="シングルス" value="1"></v-radio>
        <v-radio label="ダブルス" value="2"></v-radio>
      </v-radio-group>
      <v-select
        v-if="this.match == 1"
        v-model="singlesPlayer"
        :items="singlesPlayers"
        item-text="playerName"
        item-value="playerId"
        label="自分の名前を選択"
        no-data-text="データが登録されていません"
        required
      ></v-select>
      <v-select
        v-if="this.match == 1"
        v-model="singlesOpponent"
        :items="singlesOpponents"
        item-text="playerName"
        item-value="playerId"
        label="相手の名前を選択"
        no-data-text="データが登録されていません"
        required
      ></v-select>
      <v-select
        v-if="this.match == 2"
        v-model="doublesPlayer"
        :items="doublesPlayers"
        item-text="playerName"
        item-value="playerId"
        label="自分たちを選択"
        no-data-text="データが登録されていません"
        required
      ></v-select>
      <v-select
        v-if="this.match == 2"
        v-model="doublesOpponent"
        :items="doublesOpponents"
        item-text="playerName"
        item-value="playerId"
        label="相手を選択"
        no-data-text="データが登録されていません"
        required
      ></v-select>
      <v-row>
        <v-col>
          <v-select v-model="myScore" :items="scores" label="自分のスコア" required></v-select>
        </v-col>
        <v-col cols="1">
          <div><br />−</div>
        </v-col>
        <v-col>
          <v-select
            v-model="opponentScore"
            :items="scores"
            label="相手のスコア"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-select
        v-model="mission1"
        :items="missions"
        item-text="name"
        item-value="id"
        label="自分の達成ミッション"
        required
      ></v-select>
      <v-select
        v-model="mission2"
        :items="missions"
        item-text="name"
        item-value="id"
        label="相手の達成ミッション"
        required
      ></v-select>
      <small class="read">勝利7点,ミッション各1点</small>
      <v-row>
        <v-btn
          outlined
          color="indigo"
          class="ma-2 white--text register"
          @click="registerSingles()"
          v-if="this.match == 1"
          :disabled="singlesPlayer === '' || singlesOpponent === ''"
        >
          シングルスの試合結果登録
          <v-icon right dark>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
        <v-btn
          outlined
          color="indigo"
          class="ma-2 white--text register"
          @click="registerDoubles()"
          v-if="this.match == 2"
          :disabled="doublesPlayer === '' || doublesOpponent === ''"
        >
          ダブルスの試合結果登録
          <v-icon right dark>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
        <br />
      </v-row>
      <div class="link">
        <router-link to="/">トップに戻る</router-link>
      </div>
    </v-col>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      err: "",
      name: "",
      singlesPlayers: [
        {
          singlesPlayerId: "",
          singlesPlayerName: "",
        },
      ],
      singlesOpponents: [
        {
          singlesOpponentId: "",
          singlesOpponentName: "",
        },
      ],
      doublesPlayers: [
        {
          doublesPlayerId: "",
          doublesPlayerName: "",
        },
      ],
      doublesOpponents: [
        {
          doublesOpponentId: "",
          doublesOpponentName: "",
        },
      ],
      missions: [
        {
          id: 0,
          name: "クリアならず",
        },
        {
          id: 1,
          name: "１つクリア",
        },
        {
          id: 2,
          name: "２つクリア",
        },
        {
          id: 3,
          name: "３つクリア",
        },
      ],
      scores: ["0", "1", "2", "3", "4"],
      match: "1",
      singlesPlayer: "",
      singlesOpponent: "",
      doublesPlayer: "",
      doublesOpponent: "",
      myScore: "0",
      opponentScore: "0",
      mission1: 1,
      mission2: 1,
    };
  },
  watch: {
    singlesPlayer() {
      this.singlesOpponents = this.singlesPlayers.filter((player) => {
        if (player.playerId !== this.singlesPlayer) {
          return player;
        }
      });
    },
    doublesPlayer() {
      this.doublesOpponents = this.doublesPlayers.filter((player) => {
        if (player.playerId !== this.doublesPlayer) {
          return player;
        }
      });
    },
  },
  created() {
    this.singlesPlayers = this.$store.state.singlesPlayers;
    this.doublesPlayers = this.$store.state.doublesPlayers;
  },
  methods: {
    registerSingles() {
      this.$axios
        .post("/singlesScore", {
          singlesPlayerId: this.singlesPlayer,
          opponentSinglesPlayerId: this.singlesOpponent,
          myMatchScore: this.myScore,
          opponentMatchScore: this.opponentScore,
          mission1: this.mission1,
          mission2: this.mission2,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          if (err.response.data.status === 500) {
            this.err = "どちらが勝ったのかわからない、または\nその試合結果は既に登録されています。";
          }
        });
    },
    registerDoubles() {
      this.$axios
        .post("/doublesScore", {
          doublesPlayerId: this.doublesPlayer,
          opponentDoublesPlayerId: this.doublesOpponent,
          myMatchScore: this.myScore,
          opponentMatchScore: this.opponentScore,
          mission1: this.mission1,
          mission2: this.mission2,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          if (err.response.data.status === 500) {
            this.err = "どちらが勝ったのかわからない、または\nその試合結果は既に登録されています。";
          }
        });
    },
  },
};
</script>

<style scoped>
.uploadButton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  background: #099;
  color: #fff;
  text-align: center;
  padding: 7px;
  width: 180px;
  cursor: pointer;
}
.uploadButton:hover {
  background: #0aa;
}
.uploadButton input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}
.uploadValue {
  display: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  padding: 3px;
  color: #ffffff;
}
.btn {
  width: 100%;
}
.register {
  width: 94%;
}
.title {
  margin-top: 20px;
  text-align: center;
  margin-bottom: 0px;
  font-family: "Osaka", sans-serif;
}
.link {
  text-align: center;
  margin-top: 20px;
  padding-bottom: 20px;
}
.err {
  text-align: center;
  font-weight: bold;
}
.box {
  padding-left: 10px;
  text-align: center;
  color: red;
}
.read {
  font-weight: bold;
  color: #e98484;
}
</style>
