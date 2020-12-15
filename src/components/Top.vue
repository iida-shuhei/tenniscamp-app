<template>
  <div>
    <h2 class="title">テニス合宿選手権</h2>
    <v-img :src="this.img" class="img"></v-img>
    <br />
    <v-container class="container">
      <v-row>
        <v-col>
          <router-link :to="{ name: 'ShowPlayerList' }">選手一覧</router-link>
        </v-col>
        <v-col>
          <router-link :to="{ name: 'EditMatch' }">試合結果一覧</router-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <router-link :to="{ name: 'RegisterSinglesPlayer' }">シングルス登録</router-link>
        </v-col>
        <v-col>
          <router-link :to="{ name: 'RegisterDoublesPlayer' }">ダブルス登録</router-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <router-link :to="{ name: 'RegisterMatch' }">試合結果登録</router-link>
        </v-col>
        <v-col>
          <router-link :to="{ name: 'RegisterPersonal' }">団体戦登録</router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      img: require("@/assets/tennis.jpg"),
    };
  },
  created() {
    this.$axios.get("/showAllSinglesPlayers").then((res) => {
      this.setSinglesPlayers(res.data);
    });
    this.$axios.get("/showAllDoublesPlayer").then((res) => {
      this.setDoublesPlayers(res.data);
    });
    this.$axios.get("/showPlayers").then((res) => {
      this.setAllPlayersList(res.data);
    });
    this.$axios.get("/showSinglesPlayers").then((res) => {
      this.setSinglesPlayersList(res.data);
    });
    this.$axios.get("/showDoublesPlayers").then((res) => {
      this.setDoublesPlayersList(res.data);
    });
    this.$axios.get("/showPlayersTeamResult").then((res) => {
      this.setPlayersTeamResult(res.data);
    });
  },
  methods: {
    ...mapActions([
      "setSinglesPlayers",
      "setDoublesPlayers",
      "setAllPlayersList",
      "setSinglesPlayersList",
      "setDoublesPlayersList",
      "setPlayersTeamResult",
    ]),
  },
};
</script>

<style scoped>
.img {
  margin-top: 50px;
}
.title {
  text-align: center;
  margin-top: 50px;
  font-family: "ヒラギノ角ゴ StdN", "Hiragino Kaku Gothic StdN", sans-serif;
  letter-spacing: 0.2em;
}
.text {
  text-align: center;
  margin: 0 auto;
}
.card {
  padding-bottom: 10px;
}
.container {
  text-align: center;
}
</style>
