<template>
  <main class="custom-main">
    <section class="custom-section">
      <div class="custom-header">
        <h1 class="ui dividing header">
          <div class="custom-title">
            구매 확정 리스트
          </div>
        </h1>
      </div>
      <div class="custom-caption">
<!--        <div class="custom-delete">-->
<!--          <button class="ui button">-->
<!--            삭제-->
<!--          </button>-->
<!--        </div>-->
<!--          <div class="custom-each">-->
<!--            <div class="ui selection dropdown">-->
<!--              <input type="hidden" name="gender">-->
<!--              <i class="dropdown icon"></i>-->
<!--              <div class="default text">5개씩 보기</div>-->
<!--              <div class="menu">-->
<!--                <div class="item">항목</div>-->
<!--                <div class="item">항목</div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
      </div>
      <div class="custom-list">
        <table class="ui unstackable fixed selectable celled table">
          <colgroup>
<!--            <col />-->
            <col />
            <col />
          </colgroup>
          <thead>
          <tr class="center aligned">
<!--            <th></th>-->
            <th>
              정산날짜
            </th>
            <th>
              쇼핑몰 명
            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="center aligned" v-for="confirm in confirmList" :key="confirm.calDt">
<!--            <td>
              <div class="ui checkbox">
                <input type="checkbox">
                <label></label>
              </div>
            </td>-->
            <td>
              {{ confirm.calDt }}
            </td>
            <td>
              <ul class="custom-label">
                <li v-for="nmShop in parseNmShop(confirm.nmShop)" :key="nmShop">
                  <router-link :to="`/confirms/detail?calDt=${confirm.calDt}&nmShop=${nmShop}`">
                    <div class="ui label">
                      {{ nmShop }}
                    </div>
                  </router-link>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="custom-button">
        <router-link to="/confirms/adjustment">
          <button class="ui primary button">
            정산하기
          </button>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import { confirmApi } from '@/api';

export default {
  name: "Confirms",
  created() {
    this.setData()
  },
  data() {
    return {
      confirmList: null
    }
  },
  methods: {
    async setData() {
      const { data } = await confirmApi.fetchConfirmList()
      this.confirmList = data
    },
    parseNmShop(nmShops) {
      return nmShops.split(' ').filter(el => el)
    }
  }
}
</script>
