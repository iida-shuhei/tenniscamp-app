<template>
  <div>
    <h2 class="title">ダブルス選手登録</h2>
    <v-card class="mx-auto card" max-width="350">
      <v-container>
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
          <v-col>
            <div class="uploadButton btn">
              画像を選択
              <input
                type="file"
                class="btn"
                name="file"
                ref="image"
                @change="onFileChange"
                onchange="uv.style.display='inline-block'; uv.value = this.value;"
              />
              <v-icon right dark>mdi-cloud-upload</v-icon>
              <input type="text" id="uv" class="uploadValue" disabled />
            </div>
            <br />
            <br />
          </v-col>
          <v-btn
            outlined
            color="indigo"
            class="ma-2 white--text register"
            @click="registerDoublesPlayer()"
            :disabled="file === '' || doubles1 === ''  || doubles2 === ''"
          >
            ダブルス選手登録
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
      file: "",
      isPush: false,
      name: "",
      doubles1: "",
      doubles2: "",
      doublesPlayers1: [
        {
          singlesPlayerId: "",
          singlesPlayerName:""
        }
      ],
      doublesPlayers2: [
        {
          singlesPlayerId: "",
          singlesPlayerName:""
        }
      ],
    };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files[0];
      this.file = files[0];
    },
    registerDoublesPlayer() {
      this.isPush = true
      let formData = new FormData();
      let config = ""
      const obj = {
        doublesPlayerId1: this.doubles1,
        doublesPlayerId2: this.doubles2,
      }
      if(this.file !== "") {
        formData.append('file', this.file);
        formData.append('obj',new Blob([JSON.stringify(obj)], {type : 'application/json'}))
        config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
      } else {
        formData.append('obj',new Blob([JSON.stringify(obj)], {type : 'application/json'}))
      }
      Promise.resolve().then(() =>
      this.$axios.post('/registerDoublesPlayer', formData, config)
        .then((res) => {
          if(res.data === '') {
            alert('登録しました')
            this.$router.push('/')
          }
        })
      )
    },
  },
  watch: {
    doubles1() {
      this.$axios.get('/showPlayersExceptSinglesPlayerId', { params: { singlesPlayerId: this.doubles1 } }).then((res) => {
        this.doublesPlayers2 = res.data
      })
    }
  },
  created() {
    this.$axios.get('/showAllPlayers').then((res) => {
      this.doublesPlayers1 = res.data
    })
  }
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
  margin-top: 50px;
  text-align: center;
  margin-bottom: 50px;
  font-family: "Osaka", sans-serif;
}
.link {
  text-align: center;
  margin-top: 50px;
}
</style>