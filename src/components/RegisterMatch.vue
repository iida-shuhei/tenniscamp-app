<template>
  <div>
    <h2 class="title">試合結果登録</h2>
    <v-card class="mx-auto card" max-width="350">
      <v-container>
        <v-radio-group v-model="match" row>
          <v-radio label="シングルス" value="1"></v-radio>
          <v-radio label="ダブルス" value="2"></v-radio>
        </v-radio-group>
        <v-select
          v-if="this.match == 1"
          v-model="singles1"
          :items="singlesPlayers1"
          item-text="singlesPlayerName"
          item-value="singlesPlayerId"
          label="自分の名前を選択"
          no-data-text="データが登録されていません"
          required
        ></v-select>
        <v-select
          v-if="this.match == 1"
          v-model="singles2"
          :items="singlesPlayers2"
          item-text="singlesPlayerName"
          item-value="singlesPlayerId"
          label="相手の名前を選択"
          no-data-text="データが登録されていません"
          required
        ></v-select>
        <v-select
          v-if="this.match == 2"
          v-model="doubles1"
          :items="doublesPlayers1"
          item-text="doublesPlayerName"
          item-value="doublesPlayerId"
          label="自分たちを選択"
          no-data-text="データが登録されていません"
          required
        ></v-select>
        <v-select
          v-if="this.match == 2"
          v-model="doubles2"
          :items="doublesPlayers2"
          item-text="doublesPlayerName"
          item-value="doublesPlayerId"
          label="相手を選択"
          no-data-text="データが登録されていません"
          required
        ></v-select>
        <v-row>
          <v-col>
            <v-select v-model="score1" :items="scores" label="自分のスコア" required></v-select>
          </v-col>
          <v-col cols="1">
            <div><br />−</div>
          </v-col>
          <v-col>
            <v-select v-model="score2" :items="scores" label="相手のスコア" required></v-select>
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
            :disabled="singles1 === '' || singles2 === ''"
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
            :disabled="doubles1 === '' || doubles2 === ''"
          >
            ダブルスの試合結果登録
            <v-icon right dark>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
          <br />
        </v-row>
      </v-container>
    </v-card>
    <div class="link">
      <router-link to="/">トップに戻る</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      singlesPlayers1: [
        {
          singlesPlayerId: "",
          singlesPlayerName: "",
        },
      ],
      singlesPlayers2: [
        {
          singlesPlayerId: "",
          singlesPlayerName: "",
        },
      ],
      doublesPlayers1: [
        {
          doublesPlayerId: "",
          doublesPlayerName: "",
        },
      ],
      doublesPlayers2: [
        {
          doublesPlayerId: "",
          doublesPlayerName: "",
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
      singles1: "",
      singles2: "",
      doubles1: "",
      doubles2: "",
      score1: "0",
      score2: "0",
      mission1: 1,
      mission2: 1,
      // addMission: 1,
    };
  },
  watch: {
    singles1() {
      this.$axios
        .get("/findPlayersExceptSinglesPlayerId", {
          params: { singlesPlayerId: this.singles1 },
        })
        .then((res) => {
          this.singlesPlayers2 = res.data;
        });
    },
    doubles1() {
      this.$axios
        .get("/showPlayersExceptDoublesPlayerId", {
          params: { doublesPlayerId: this.doubles1 },
        })
        .then((res) => {
          this.doublesPlayers2 = res.data;
        });
    },
  },
  created() {
    this.$axios.get("/showAllSinglesPlayers").then((res) => {
      this.singlesPlayers1 = res.data;
    });
    this.$axios.get("/showAllDoublesPlayer").then((res) => {
      this.doublesPlayers1 = res.data;
    });
  },
  methods: {
    registerSingles() {
      this.$axios
        .post("/registerSinglesScore", {
          singlesPlayerId: this.singles1,
          opponentSinglesPlayerId: this.singles2,
          myMatchScore: this.score1,
          opponentMatchScore: this.score2,
          mission1: this.mission1,
          mission2: this.mission2,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    },
    registerDoubles() {
      this.$axios
        .post("/registerDoublesScore", {
          doublesPlayerId: this.doubles1,
          opponentDoublesPlayerId: this.doubles2,
          myMatchScore: this.score1,
          opponentMatchScore: this.score2,
          mission1: this.mission1,
          mission2: this.mission2,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          alert(err.response.data.message);
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
  margin-top: 30px;
  text-align: center;
  margin-bottom: 20px;
  font-family: "Osaka", sans-serif;
}
.link {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
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
