<template>
  <div>
    <v-card class="mx-auto" max-width="350">
      <h2 class="title">ミッション登録</h2>
      <v-col class="col">
        <v-row>
          <v-col>
            <v-textarea v-model="mission" label="ミッション"></v-textarea>
          </v-col>
        </v-row>
        <v-col>
          <v-row>
            <v-btn
              outlined
              color="indigo"
              class="white--text register"
              @click="registerMission()"
              :disabled="mission === ''"
            >
              ミッション登録
              <v-icon right dark>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
            <br />
          </v-row>
        </v-col>
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
      mission: "",
    };
  },
  methods: {
    registerMission() {
      this.$axios
        .post("/mission", {
          mission: this.mission,
        })
        .then(() => {
          alert("登録しました");
          this.$router.push("/");
        });
    },
  },
};
</script>

<style scoped>
.btn {
  width: 100%;
}
.register {
  width: 100%;
}
.title {
  margin-top: 20px;
  text-align: center;
  font-family: "Osaka", sans-serif;
}
.link {
  text-align: center;
  margin-top: 0px;
  padding-bottom: 20px;
}
.col {
  padding-top: 5px;
}
</style>
