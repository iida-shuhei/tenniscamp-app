<template>
  <div>
    <div v-if="loading">
      <Loading />
    </div>
    <div v-if="!loading">
      <h2 class="title">試合結果一覧</h2>
      <v-container>
        <v-radio-group v-model="match" row>
          <v-radio label="シングルス" value="1"></v-radio>
          <v-radio label="ダブルス" value="2"></v-radio>
        </v-radio-group>
        <v-row dense v-if="match == 1">
          <v-col v-for="(result, i) in results" :key="i" cols="12">
            <v-card>
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-col cols="4">
                  <v-card>
                    <span>{{ transferSinglesPlayerName(result.playerId) }}</span>
                  </v-card>
                </v-col>
                <v-col cols="1">
                  <span>{{ result.playerScore }}</span>
                </v-col>
                <v-col cols="1">ー</v-col>
                <v-col cols="1">
                  <span>{{ result.opponentScore }}</span>
                </v-col>
                <v-col cols="4">
                  <v-card>
                    <span>{{ transferSinglesOpponentName(result.opponentId) }}</span>
                  </v-card>
                </v-col>
              </div>
              <v-btn icon color="deep-orange" class="btn" @click="deleteSingles(result)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense v-if="match == 2">
          <v-col v-for="(result, i) in results" :key="i" cols="12">
            <v-card>
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-col cols="4">
                  <v-card>
                    <span>{{ transferDoublesPlayerName(result.playerId) }}</span>
                  </v-card>
                </v-col>
                <v-col cols="1">
                  <span>{{ result.playerScore }}</span>
                </v-col>
                <v-col cols="1">ー</v-col>
                <v-col cols="1">
                  <span>{{ result.opponentScore }}</span>
                </v-col>
                <v-col cols="4">
                  <v-card>
                    <span>{{ transferDoublesOpponentName(result.opponentId) }}</span>
                  </v-card>
                </v-col>
              </div>
              <v-btn icon color="deep-orange" class="btn" @click="deleteDoubles(result)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <div class="link">
        <router-link to="/">トップに戻る</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../components/Loading";
export default {
  data() {
    return {
      match: "1",
      loading: true,
      results: [
        {
          playerId: "",
          playerScore: "",
          opponentId: "",
          opponentScore: "",
        },
      ],
    };
  },
  components: {
    Loading,
  },
  watch: {
    match() {
      this.loading = true;
      if (this.match === "1") {
        this.$axios.get("/showSinglesResult").then((res) => {
          this.results = res.data;
          this.loading = false;
        });
      } else {
        this.loading = true;
        this.$axios.get("/showDoublesResult").then((res) => {
          this.results = res.data;
          this.loading = false;
        });
      }
    },
  },
  created() {
    this.$axios.get("/showSinglesResult").then((res) => {
      this.results = res.data;
      this.loading = false;
    });
  },
  methods: {
    transferSinglesPlayerName(playerId) {
      let player = this.$store.state.singlesPlayers.find(
        (player) => player.singlesPlayerId === playerId
      );
      return player.singlesPlayerName;
    },
    transferSinglesOpponentName(opponentId) {
      let opponent = this.$store.state.singlesPlayers.find(
        (opponent) => opponent.singlesPlayerId === opponentId
      );
      return opponent.singlesPlayerName;
    },
    transferDoublesPlayerName(playerId) {
      let player = this.$store.state.doublesPlayers.find(
        (player) => player.doublesPlayerId === playerId
      );
      return player.doublesPlayerName;
    },
    transferDoublesOpponentName(opponentId) {
      let opponent = this.$store.state.doublesPlayers.find(
        (opponent) => opponent.doublesPlayerId === opponentId
      );
      return opponent.doublesPlayerName;
    },
    deleteSingles(result) {
      let isOk = window.confirm("この試合結果を削除していい？");
      if (isOk) {
        this.$axios.post("/deleteSinglesScore", {
          playerId: result.playerId,
          opponentPlayerId: result.opponentId,
        }).then((res) => {
          if(res.data == "") {
            this.$router.push('/')
          }
        })
      }
    },
    deleteDoubles(result) {
      let isOk = window.confirm("この試合結果を削除していい？");
      if (isOk) {
        this.$axios.post("/deleteDoublesScore", {
          playerId: result.playerId,
          opponentPlayerId: result.opponentId,
        }).then((res) => {
          if(res.data == "") {
            this.$router.push('/')
          }
        })
      }
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
</style>