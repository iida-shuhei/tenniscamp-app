<template>
  <div>
    <v-card class="mx-auto" max-width="350">
      <h2 class="title">団体戦結果登録</h2>
      <v-col class="col">
        <v-select
          v-model="singles"
          :items="singlesPlayers"
          item-text="singlesPlayerName"
          item-value="singlesPlayerId"
          label="自分の名前を選択"
          no-data-text="データが登録されていません"
          required
        ></v-select>
        <v-radio-group v-model="result" row>
          <v-radio label="勝ち" value="1"></v-radio>
          <v-radio label="負け" value="2"></v-radio>
        </v-radio-group>
        <v-select
          v-model="mission"
          :items="missions"
          item-text="name"
          item-value="id"
          label="自分の達成ミッション"
          required
        ></v-select>
        <small class="read">勝利５点,ミッション各1点</small>
        <v-row>
          <v-btn
            outlined
            color="indigo"
            class="ma-2 white--text register"
            @click="registerPersonal()"
            :disabled="singles === ''"
          >
            団体戦結果登録
            <v-icon right dark>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
          <br />
        </v-row>
      </v-col>
      <div class="link">
        <router-link to="/">トップに戻る</router-link>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      singlesPlayers: [
        {
          singlesPlayerId: "",
          singlesPlayerName: "",
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
      result: "1",
      singles: "",
      mission: 1,
    };
  },
  created() {
    this.$axios.get("/showAllSinglesPlayers").then((res) => {
      this.singlesPlayers = res.data;
    });
  },
  methods: {
    registerPersonal() {
      this.$axios
        .post("/registerAdditionalScore", {
          playerId: this.singles,
          result: this.result,
          mission: this.mission,
        })
        .then(() => {
          this.$router.push("/");
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
  margin-bottom: 20px;
  font-family: "Osaka", sans-serif;
}
.link {
  text-align: center;
  margin-top: 0px;
  padding-bottom: 20px;
}
.err {
  text-align: center;
  font-weight: bold;
}
.box2 {
  width: 350px;
  padding: 0.5em 1em;
  margin: 2em 0;
  font-weight: bold;
  color: red; /*文字色*/
  background: #fff;
  border: solid 3px red; /*線*/
  border-radius: 10px; /*角の丸み*/
}
.box {
  margin-top: 20px;
  padding-bottom: 20px;
  text-align: center;
}
.read {
  font-weight: bold;
  color: #e98484;
}
.col {
  padding-top: 0px;
}
</style>
