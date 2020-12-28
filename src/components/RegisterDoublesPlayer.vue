<template>
  <v-card class="mx-auto" max-width="350">
    <h2 class="title">ダブルス選手登録</h2>
    <v-col>
      <v-row>
        <v-col>
          <v-select
            v-model="doubles1"
            :items="doublesPlayers1"
            item-text="singlesPlayerName"
            item-value="singlesPlayerId"
            label="名前を選択"
            no-data-text="全員登録されました"
            required
          ></v-select>
          <v-select
            v-model="doubles2"
            :items="doublesPlayers2"
            item-text="singlesPlayerName"
            item-value="singlesPlayerId"
            label="名前を選択"
            no-data-text="全員登録されました"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-btn
          outlined
          color="indigo"
          class="ma-2 white--text register"
          @click="registerDoublesPlayer()"
          :disabled="doubles1 === '' || doubles2 === ''"
        >
          ダブルス選手登録
          <v-icon right dark>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
        <br />
      </v-row>
    </v-col>
    <div class="link">
      <router-link to="/">トップに戻る</router-link>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      file: "",
      name: "",
      doubles1: "",
      doubles2: "",
      doublesPlayers1: [
        {
          singlesPlayerId: "",
          singlesPlayerName: "",
        },
      ],
      doublesPlayers2: [
        {
          singlesPlayerId: "",
          singlesPlayerName: "",
        },
      ],
    };
  },
  methods: {
    registerDoublesPlayer() {
      this.$axios
        .post("/doublesPlayer", {
          doubles1: this.doubles1,
          doubles2: this.doubles2,
        })
        .then(() => {
          alert("登録しました");
          this.$router.push("/");
        });
    },
  },
  watch: {
    doubles1() {
      this.doublesPlayers2 = this.doublesPlayers1.filter((player) => {
        if (player.singlesPlayerId !== this.doubles1) {
          return player;
        }
      });
    },
  },
  created() {
    this.$axios.get("/singlesPlayer/noDoublesId").then((res) => {
      this.doublesPlayers1 = res.data;
    });
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
  margin-top: 0px;
  padding-bottom: 20px;
}
</style>
