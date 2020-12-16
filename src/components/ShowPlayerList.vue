<template>
  <v-card class="mx-auto" max-width="350">
    <h2 class="title">選手一覧</h2>
    <v-col>
      <v-radio-group v-model="scores">
        <v-row>
          <v-col>
            <v-radio label="シングルス" value="1"></v-radio>
          </v-col>
          <v-col>
            <v-radio label="ダブルス" value="2"></v-radio>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-radio label="団体戦" value="3"></v-radio>
          </v-col>
          <v-col>
            <v-radio label="総合" value="4"></v-radio>
          </v-col>
        </v-row>
      </v-radio-group>
    </v-col>
    <v-row dense>
      <v-col v-for="(player, i) in players" :key="i" cols="12" class="col">
        <v-card class="mx-auto" max-width="330">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title v-text="player.playerName"></v-card-title>
              <v-col>
                勝ち :
                <span v-text="player.totalWin"></span>回 <br />負け :
                <span v-text="player.totalLose"></span>回 <br />ミッション数 :
                <span v-text="player.totalMission"></span>個 <br />現在の得点 :
                <span v-text="player.totalScore"></span>点
                <br />
              </v-col>
            </div>
            <v-avatar class="ma-3" size="100" tile>
              <v-img :src="userImage"></v-img>
            </v-avatar>
          </div>
          <v-card-actions>
            現在の順位 :
            <span v-text="player.ranking"></span>位
          </v-card-actions>
          <v-card-actions v-if="scores === '1'">
            <v-btn small class="btn" color="error" @click="confirmDelete(player)"
              >この選手を削除</v-btn
            >
          </v-card-actions>
          <v-card-actions v-if="scores === '2'">
            <v-btn small class="btn" color="error" @click="confirmDoublesDelete(player)"
              >このダブルスペアを削除</v-btn
            >
          </v-card-actions>
          <v-card-actions v-if="scores === '3'">
            <v-btn small class="btn" color="error" @click="confirmTeamDelete(player)"
              >この選手の団体戦結果を削除</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div class="link">
      <router-link to="/">トップに戻る</router-link>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      userImage: require("@/assets/user.jpg"),
      players: [
        {
          imagePath: "",
          playerName: "",
          totalWin: "",
          totalLose: "",
          totalMission: "",
          totalScore: "",
          ranking: "",
          show: false,
        },
      ],
      scores: "1",
    };
  },
  created() {
    this.players = this.$store.state.singlesPlayersList;
  },
  watch: {
    scores() {
      if (this.scores === "1") {
        this.players = this.$store.state.singlesPlayersList;
      }
      if (this.scores === "2") {
        this.players = this.$store.state.doublesPlayersList;
      }
      if (this.scores === "3") {
        this.players = this.$store.state.playersTeamResult;
      }
      if (this.scores === "4") {
        this.players = this.$store.state.allPlayersList;
      }
    },
  },
  methods: {
    confirmDelete(player) {
      var result = confirm(
        player.playerName + "さんを削除しますか？削除すると試合結果も含め、すべて削除されます。"
      );
      if (result) {
        this.deletePlayer(player);
      }
    },
    confirmTeamDelete(player) {
      var result = confirm(
        player.playerName +
          "さんの団体戦結果を削除しますか？削除すると試合結果もすべて削除されます。"
      );
      if (result) {
        this.deleteTeamPlayer(player);
      }
    },
    confirmDoublesDelete(player) {
      var result = confirm(
        player.playerName + "ペアを削除しますか？削除すると試合結果もすべて削除されます。"
      );
      if (result) {
        this.deleteDoublesPlayer(player);
      }
    },
    deletePlayer(player) {
      this.$axios
        .post("/deletePlayer", {
          playerId: player.playerId,
        })
        .then(() => {
          this.$router.push("/");
        });
    },
    deleteTeamPlayer(player) {
      this.$axios
        .post("/deleteTeamPlayer", {
          playerId: player.playerId,
        })
        .then(() => {
          this.$router.push("/");
        });
    },
    deleteDoublesPlayer(player) {
      this.$axios
        .post("/deleteDoublesPlayer", {
          playerId: player.playerId,
        })
        .then(() => {
          this.$router.push("/");
        });
    },
  },
};
</script>

<style scoped>
.title {
  margin-top: 20px;
  text-align: center;
  font-family: "Osaka", sans-serif;
}
.link {
  text-align: center;
  margin-top: 20px;
  padding-bottom: 20px;
}
.right {
  margin: 0 0 0 auto;
}
.btn {
  width: 100%;
  font-weight: bold;
}
.col {
  padding-top: 0px;
  padding-bottom: 5px;
}
</style>
