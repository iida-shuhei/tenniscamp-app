<template>
  <div>
    <div v-if="loading">
      <Loading />
    </div>
    <div v-if="!loading">
      <v-card class="mx-auto card" max-width="350">
        <v-col>
          <v-img :src="this.img" class="img"></v-img>
        </v-col>
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
      </v-card>
    </div>
  </div>
</template>

<script>
import Loading from "../components/Loading";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      img: require("@/assets/tennis.jpg"),
      loading: true,
    };
  },
  components: {
    Loading,
  },
  created() {
    this.loading = true;
    //シングルスのリスト
    this.$axios
      .get("/showAllSinglesPlayers")
      .then((res) => {
        this.setSinglesPlayers(res.data);
      })
      .then(() => {
        Promise.resolve().then(() => {
          //ダブルスのリスト
          this.$axios
            .get("/showAllDoublesPlayer")
            .then((res) => {
              this.setDoublesPlayers(res.data);
            })
            .then(() => {
              Promise.resolve().then(() => {
                //総合結果が詰まったリスト
                this.$axios
                  .get("/showPlayers")
                  .then((res) => {
                    this.setAllPlayersList(res.data);
                  })
                  .then(() => {
                    Promise.resolve().then(() => {
                      //シングルスの結果が詰まったリスト
                      this.$axios
                        .get("/showSinglesPlayers")
                        .then((res) => {
                          this.setSinglesPlayersList(res.data);
                        })
                        .then(() => {
                          Promise.resolve().then(() => {
                            //ダブルスの結果が詰まったリスト
                            this.$axios
                              .get("/showDoublesPlayers")
                              .then((res) => {
                                this.setDoublesPlayersList(res.data);
                              })
                              .then(() => {
                                Promise.resolve().then(() => {
                                  //団体戦の結果が詰まったリスト
                                  this.$axios
                                    .get("/showPlayersTeamResult")
                                    .then((res) => {
                                      this.setPlayersTeamResult(res.data);
                                    })
                                    .then(() => {
                                      Promise.resolve().then(() => {
                                        this.loading = false;
                                      });
                                    });
                                });
                              });
                          });
                        });
                    });
                  });
              });
            });
        });
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
  /* margin-top: 50px; */
}
.title {
  text-align: center;
  /* margin-top: 50px; */
  font-family: "ヒラギノ角ゴ StdN", "Hiragino Kaku Gothic StdN", sans-serif;
  letter-spacing: 0.2em;
}
.text {
  text-align: center;
  margin: 0 auto;
}
.card {
  padding-bottom: 10px;
  margin-top: 20px;
}
.container {
  text-align: center;
}
</style>
